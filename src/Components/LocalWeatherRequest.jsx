import Button from 'react-bootstrap/Button'

export default function LocalWeatherRequest({requestCoords}){
    return <Button variant="primary" onClick={requestCoords}>Request local weather data</Button>
}