import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import { Link } from "react-router-dom";

// TO-DO: Highlight if clicked on
export default function WeatherCard({unixDt, dayName, weatherIconUrl, dailyMax, dailyMin, weatherOverDay}){
    
  const weatherChanges = []
  const timeOfDay = [600, 1200, 1800, 0]
  
  for (let i = 0; i < weatherOverDay.length; i++){
    const weatherObj = {}
    weatherObj.weatherOverDay = weatherOverDay[i]
    weatherObj.timeOfDay = timeOfDay[i]
    weatherChanges.push(weatherObj)
  }
  
  return (
    <Col>
      <Card>
        <Card.Body>
        <Card.Title><Link 
                        to={{
                          pathname: '/' + dayName + '/' + unixDt, 
                          state: { weatherChanges: weatherChanges }
                          }}>
                            {dayName}
            </Link></Card.Title>
          <Card.Subtitle>{dailyMax}°C</Card.Subtitle>
          <Card.Subtitle className='text-muted'>{dailyMin}°C</Card.Subtitle>
        </Card.Body>
        <Card.Img variant='bottom' src={weatherIconUrl} alt='Current weather condition'/>
      </Card>
    </Col>
  )
}