import { useLocation, useParams } from "react-router-dom"
import { Group } from '@visx/group'
import { Bar } from '@visx/shape'
import { scaleLinear, scaleBand } from '@visx/scale'
import { AxisRight, AxisBottom } from '@visx/axis'

// Graph made using example at https://github.com/airbnb/visx
export default function WeatherGraph(){

    const location = useLocation()
    const data = location.state.weatherChanges

    // Define the graph dimensions and margins
    const width = 250
    const height = 300
    const margin = { top: 20, bottom: 20, left: 20, right: 20 }
    
    // Then we'll create some bounds
    const xMax = width - margin.left - margin.right
    const yMax = height - margin.top - margin.bottom
    
    // We'll make some helpers to get at the data we want
    const x = d => d.timeOfDay
    const y = d => d.weatherOverDay
    
    // And then scale the graph by our data
    const xScale = scaleBand({
      range: [0, xMax],
      round: false,
      domain: data.map(x),
      padding: 0.1,
    })
    const yScale = scaleLinear({
      range: [yMax, 0],
      round: true,
      domain: [Math.min(...data.map(y)) - 0.1, Math.max(...data.map(y))],
    })
    
    // Compose together the scale and accessor functions to get point functions
    const compose = (scale, accessor) => data => scale(accessor(data))
    const xPoint = compose(xScale, x)
    const yPoint = compose(yScale, y)
    
    // Finally we'll embed it all in an SVG
    function BarGraph(props) {
      return (
        <svg width={width + 50} height={height}>
          {data.map((d, i) => {
            const barHeight = yMax - yPoint(d);
            return (
              <Group key={`bar-${i}`}>

                <AxisRight
                scale={yScale}
                top={0}
                left={xMax}
                label={'Temperature (°C)'}
                stroke={'#1b1a1e'}
                tickTextFill={'#1b1a1e'}
                />

                <AxisBottom
                scale={xScale}
                top={yMax}
                label={'2400hr Time'}
                stroke={'#1b1a1e'}
                tickTextFill={'#1b1a1e'}
                />

                <Bar
                  x={xPoint(d)}
                  y={yMax - barHeight}
                  height={barHeight}
                  width={xScale.bandwidth()}
                  fill="orange"
                />
              </Group>
            )
          })}
        </svg>
      );
    }
      
    const { unixDt, dayName } = useParams()
    const date = new Date(unixDt * 1000)
    const months = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    
    return <>
        <h1>{dayName} {months[date.getMonth()]} {date.getDate()}, {date.getFullYear()}</h1>
        <BarGraph/>
    </>
}