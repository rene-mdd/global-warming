import fetch from 'unfetch'
import Chart from 'chart.js'
import nitrousData from '../public/data/csvjson-nitrous.json'
const csv = require('csvtojson')
import { Container, Grid } from 'semantic-ui-react'

class Nitrous extends React.Component {
  constructor (props) {
    super(props)
    this.state = { nitrousData: {}, prehistoricNitrous: {}, isLoading: true }
    this.url = 'api/nitrous-oxide-api'
  }

  async componentDidMount () {
    this.props.callBackPropNitrous(this.state.isLoading)
    const date = []
    const amount = []

    nitrousData.forEach(obj => {
      date.push(obj.year.split(',').filter(x => x)[0])
      amount.push(parseFloat(obj.year.split(',').filter(x => x)[1]).toFixed(1))
    })

    const nitrousObject = { date: date, amount: amount }

    this.setState({ prehistoricNitrous: nitrousObject })

    try {
      const response = await fetch(this.url)
      const data = await response.json()
      if (data) {
        this.setState({ nitrousData: data, isLoading: false })
        this.props.callBackPropNitrous(this.state.isLoading)
      }
    } catch (error) {
      console.log(error)
    }
  }

  goNitrous = isLoading => {
    this.props.callBackPropNitrous(isLoading)
  }

  parsedNitrousData = (cleanNitrousPrehistoricData, cleanNitrousData) => {
    const date = []
    const average = []
    try {
      if (cleanNitrousData.nitrous) {
        cleanNitrousData.nitrous.forEach(obj => {
          date.push(obj.date)
          average.push(obj.average)
        })
        var ctx = 'myNitrousChart'
        const myChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: cleanNitrousPrehistoricData.date.concat(date),
            datasets: [
              {
                label: 'Nitrous Oxide',
                data: cleanNitrousPrehistoricData.amount.concat(average),
                fill: false,
                borderColor: '#FDB147',
                backgroundColor: 'rgba(255, 0, 0, 0.1);',
                pointRadius: 1.5,
                pointHoverBorderWidth: 1,
                pointBackgroundColor: 'rgba(255, 0, 0, 0.1);',
                pointHoverBackgroundColor: 'white',
                pointHoverBorderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                pointHoverRadius: 10
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
                  stacked: false,
                  scaleLabel: {
                    display: true,
                    labelString: 'Nitrous Oxide mole fraction (ppb)'
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
      }
    } catch (error) {
      console.log(error)
    }
  }

  render () {
    return (
      <>
        <div
          onLoad={this.parsedNitrousData(
            this.state.prehistoricNitrous,
            this.state.nitrousData
          )}
        />
        <div
          onLoad={() => {
            this.goNitrous(this.state.isLoading)
          }}
        />

        <Grid.Column width='fourteen'>
          <Container
            className='chart-container'
            style={{ position: 'relative', width: '80vw' }}
          >
            <canvas id='myNitrousChart'></canvas>
          </Container>

          {!this.state.isLoading && (
            <Container as='footer' className='ui center aligned column'>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo
              </p>
              <p>
                <b>(From 2001.01 the data is measured on a monthly basis)</b>
              </p>
            </Container>
          )}
        </Grid.Column>
      </>
    )
  }
}

export default Nitrous
