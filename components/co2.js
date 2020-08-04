import fetch from 'unfetch'
import Chart from 'chart.js'
import preCo2Data from '../public/data/csvjson-co2.json'
import { Container, Grid } from 'semantic-ui-react'

class Co2 extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      co2Data: [],
      prehistoric: {},
      isLoading: true
    }
    this.url = 'api/co2-api'
  }
  async componentDidMount () {
    this.props.callBackPropCo2(this.state.isLoading)
    const date = []
    const amount = []
    preCo2Data.forEach(obj => {
      date.push(obj.year.split(',').filter(x => x)[0])
      amount.push(
        Number(parseFloat(obj.year.split(',').filter(x => x)[1]).toFixed(1))
      )
    })
    const co2Object = { date: date, amount: amount }
    this.setState({ prehistoric: co2Object })
    try {
      const response = await fetch(this.url)
      const data = await response.json()
      if (data) {
        this.setState({ co2Data: data, isLoading: false })
        this.props.callBackPropCo2(this.state.isLoading)
      }
    } catch (error) {
      console.log(error)
    }
  }
  goCo2 = isLoading => {
    this.props.callBackPropCo2(isLoading)
  }
  parsedCo2Data = (prehistoricData, currentData) => {
    const date = []
    const trend = []
    try {
      if (currentData.co2) {
        currentData.co2.forEach(obj => {
          date.push(`${obj.year}.${obj.month}.${obj.day}`)
          trend.push(obj.trend)
        })
        var ctx = 'myCo2Chart'
        const myChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: prehistoricData.date.concat(date),
            datasets: [
              {
                label: 'Carbon Dioxide',
                data: prehistoricData.amount.concat(trend),
                fill: false,
                borderColor: '#4984B8',
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
                suggestedMin: -800000
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
                  stacked: true
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
          onLoad={this.parsedCo2Data(
            this.state.prehistoric,
            this.state.co2Data
          )}
        />
        <div
          onLoad={() => {
            this.goCo2(this.state.isLoading)
          }}
        />
        <Container className='chart-container'>
          <canvas id='myCo2Chart'></canvas>
          <Grid centered columns='equal'>
            <Grid.Column width='14' fluid>
              {!this.state.isLoading && (
                <Container as='footer' style={{ marginTop: '-40px' }}>
                  <p>
                    From 1958, the measurements of carbon dioxide concentrations are done by Mauna Loa Observatory. Source: Ed Dlugokencky
                    and Pieter Tans, NOAA/GML (
                    <a
                      href='https://www.esrl.noaa.gov/gmd/ccgg/trends/'
                      target='_blank'
                    >
                      https://www.esrl.noaa.gov/gmd/ccgg/trends/
                    </a>
                    )
                  </p>
                  <p>Data source: 800,000 years ago to 1958 <a href='https://www.epa.gov/climate-indicators/climate-change-indicators-atmospheric-concentrations-greenhouse-gases' target='_blank'>https://www.epa.gov/climate-indicators/climate-change-indicators-atmospheric-concentrations-greenhouse-gases</a> </p>
                  <p>
                    <b>
                    From 2010.01.01 the data is measured on a quasi daily
                      basis
                    </b>
                  </p>
                </Container>
              )}
            </Grid.Column>
          </Grid>
        </Container>
      </>
    )
  }
}

export default Co2
