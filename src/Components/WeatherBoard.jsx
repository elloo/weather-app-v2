import { useState, useEffect } from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import WeatherCard from './WeatherCard'
import WeatherGraph from './WeatherGraph'
import LocalWeatherRequest from './LocalWeatherRequest'
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";

export default function WeatherBoard(){
  //TO-DO: Location search component - dropdown of Australian cities
  //TO-DO: Search history with location and time JSON server
  
  const [currentCoords, setCurrentCoords] = useState({lat: -33.8688, lon: 151.2093})
  const geoSuccess = (pos) => setCurrentCoords({lat: pos.coords.latitude, lon: pos.coords.longitude})
  const geoError = (err) => {console.warn(`ERROR(${err.code}): ${err.message}`)}
  const getLocation = () => {
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(geoSuccess, geoError)
    } else {
      window.alert `Your browser does not support this feature`;
    }
  }

  const [dailyData, setDailyData] = useState([])
  
  useEffect(() => {
    const weatherApi = `https://api.openweathermap.org/data/2.5/onecall?lat=${currentCoords.lat}&lon=${currentCoords.lon}&appid=2b82c23cac4b047755e6cb97561de11e&units=metric`
    fetch(weatherApi)
    .then(response => {
      if (response.ok){
        return response.json()}
        // If !response.ok then go to .catch
        throw response
      })
      .then(data => {
        setDailyData(() => data.daily)   
      })
      .catch(error => console.error(error))
  }, [])
    
    const dailyWeatherCards = dailyData.map(day => {
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const unixDt = day.dt
      const date = new Date(unixDt * 1000);
      const dayName = days[date.getDay()];
      const weatherIconUrl = `http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`
      const weatherOverDay = [day.temp.morn, day.temp.day, day.temp.eve, day.temp.night]
      return <WeatherCard 
      key={unixDt} 
                unixDt={unixDt} 
                dayName={dayName} 
                weatherIconUrl={weatherIconUrl} 
                dailyMax={day.temp.max} 
                dailyMin={day.temp.min}
                weatherOverDay={weatherOverDay}
                ></WeatherCard>
    })


    return (
      <Router>
        <Row>
          {dailyWeatherCards}
        </Row>
        <Row>
          <Col>
            <Switch>
                <Route path="/:dayName/:unixDt" component={WeatherGraph}></Route>
            </Switch>
          </Col>
          <Col>
            <LocalWeatherRequest requestCoords={() => getLocation()}></LocalWeatherRequest>
          </Col>
        </Row>
      </Router>
    )
}