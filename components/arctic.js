import fetch from 'unfetch'
import Chart from 'chart.js'
import { Container, Grid } from 'semantic-ui-react'

class Arctic extends React.Component {
  constructor (props) {
    super(props)
    this.state = { arcticData: [], isLoading: true }
    this.url = 'api/arctic-api'
  }

  async componentDidMount () {
    this.props.callBackPropArctic(this.state.isLoading)
    try {
      const response = await fetch(this.url)
      const data = await response.json()
      if (data) {
        this.setState({ arcticData: data, isLoading: false })
        this.props.callBackPropArctic(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  goArc = isLoading => {
    this.props.callBackPropArctic(isLoading)
  }

  displayArcticGraph = AData => {
    const yearArray = []
    const extentArray = []
    const areaArray = []
    try {
      if (AData) {
        AData.forEach(row => {
          const date = row.year
          const extent = row.extent
          const area = row.area
          yearArray.push(date)
          extentArray.push(parseFloat(extent))
          areaArray.push(parseFloat(area))
        })
      }
      var ctx = 'arcticChart'
      const myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: yearArray,
          datasets: [
            {
              label: 'Extent',
              data: extentArray,
              fill: false,
              borderColor: 'rgba(44, 130, 201, 1)',
              borderWidth: 1
            },
            {
              label: 'Area',
              data: areaArray,
              fill: false,
              borderColor: 'rgba(137, 196, 244, 1)',
              backgroundColor: 'rgba(255, 255, 255, 0.2)'
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          scales: {
            yAxes: [
              {
                stacked: false,
                scaleLabel: {
                  display: true,
                  labelString: 'Million square km'
                }
              }
            ],
            xAxes: [
              {
                stacked: false,
                scaleLabel: {
                  display: true,
                  labelString: 'Year'
                }
              }
            ]
          }
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  render () {
    return (
      <>
        <div onLoad={this.displayArcticGraph(this.state.arcticData.result)} />
        <div
          onLoad={() => {
            this.goArc(this.state.isLoading)
          }}
        />
        <Grid.Column width='fourteen'>
          <Container
            className='chart-container'
            style={{ position: 'relative', width: '80vw' }}
          >
            <canvas id='arcticChart'></canvas>
          </Container>

          {!this.state.isLoading && (
            <Container
              as='footer'
              className='ui center aligned column'
              style={{ marginTop: '-5px' }}
            >
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo
              </p>
            </Container>
          )}
        </Grid.Column>
      </>
    )
  }
}

export default Arctic
