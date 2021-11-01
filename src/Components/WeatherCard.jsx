import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import { Link } from "react-router-dom";

// TO-DO: Highlight if clicked on
export default function WeatherCard({unixDt, dayName, weatherIconUrl, dailyMax, dailyMin}){
    return (
    <Col>
      <Card>
        <Card.Body>
          <Card.Title><Link to={'/' + dayName + '/' + unixDt}>{dayName}</Link></Card.Title>
          <Card.Subtitle>{dailyMax}°C</Card.Subtitle>
          <Card.Subtitle className='text-muted'>{dailyMin}°C</Card.Subtitle>
        </Card.Body>
        <Card.Img variant='bottom' src={weatherIconUrl} alt='Current weather condition'/>
      </Card>
    </Col>
  )
}