import fetch from 'unfetch'
import Chart from 'chart.js'
import methaneDataFile from '../public/data/csvjson-methane.json'
import { Container, Grid } from 'semantic-ui-react'

class Methane extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      methaneData: {},
      prehistoricMethane: {},
      isLoading: true
    }
    this.url = 'api/methane-api'
  }

  async componentDidMount () {
    this.props.callBackPropMethane(this.state.isLoading)
    // processing of json file
    const date = []
    const amount = []

    methaneDataFile.forEach(obj => {
      date.push(obj.year.split(',').filter(x => x)[0])
      amount.push(
        Number(parseFloat(obj.year.split(',').filter(x => x)[1]).toFixed(1))
      )
    })
    const methaneObject = { date: date, amount: amount }

    this.setState({ prehistoricMethane: methaneObject })

    try {
      const response = await fetch(this.url)
      const data = await response.json()
      if (data) {
        this.setState({ methaneData: data, isLoading: false })
        this.props.callBackPropMethane(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  go = isLoading => {
    this.props.callBackPropMethane(isLoading)
  }

  parsedData = (methPrehistoricData, methaneData) => {
    const date = []
    const average = []
    try {
      if (methaneData.methane) {
        methaneData.methane.forEach(obj => {
          date.push(obj.date)
          average.push(obj.average)
        })
        var ctx = 'myMethChart'
        const myChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: methPrehistoricData.date.concat(date),
            datasets: [
              {
                label: 'Methane',
                data: methPrehistoricData.amount.concat(average),
                fill: false,
                borderColor: '#A75E09',
                backgroundColor: 'black',
                pointRadius: false,
                pointHoverBorderWidth: 10,
                pointBackgroundColor: 'rgba(255, 99, 132, 1)',
                pointHoverBackgroundColor: 'rgba(255, 99, 132, 1)',
                pointHoverBorderColor: 'black',
                borderWidth: 1,
                pointHoverRadius: 5
              }
            ]
          },
          options: {
            scales: {
              bounds: 'ticks',
              ticks: {
                suggestedMax: 800000,
                suggestedMin: -800000,
                stepSize: 2
              },
              yAxes: [
                {
                  stacked: true,
                  scaleLabel: {
                    display: true,
                    labelString: 'Part Per million (ppm)'
                  }
                }
              ],
              xAxes: [
                {
                  stacked: true,
                  scaleLabel: {
                    display: true,
                    labelString: 'Year'
                  }
                }
              ]
            }
          }
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  render () {
    return (
      <>
        <div
          onLoad={this.parsedData(
            this.state.prehistoricMethane,
            this.state.methaneData
          )}
        />
        <div
          onLoad={() => {
            this.go(this.state.isLoading)
          }}
        />
        <Grid.Column width='fourteen'>
          <Container
            className='chart-container'
            style={{ position: 'relative', width: '80vw' }}
          >
            <canvas id='myMethChart'></canvas>
          </Container>

          {!this.state.isLoading && (
            <Container as='footer' centered>
              {' '}
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo
              </p>
              <p>
                <b>(From 1983 the data is measured on a monthly basis)</b>
              </p>
            </Container>
          )}
        </Grid.Column>
      </>
    )
  }
}

export default Methane
