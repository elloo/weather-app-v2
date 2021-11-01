import { useState, useEffect } from 'react'
import Row from 'react-bootstrap/Row'
import WeatherCard from './WeatherCard'
import WeatherGraph from './WeatherGraph'
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";

export default function WeatherBoard(){
    const [dailyData, setDailyData] = useState([])
    //TO-DO: Location search component - dropdown of Australian cities
    //TO-DO: Search history with location and time JSON server
    const weatherApi = 'https://api.openweathermap.org/data/2.5/onecall?lat=33.8688&lon=151.2093&appid=2b82c23cac4b047755e6cb97561de11e&units=metric'
    
    useEffect(() => {
      fetch(weatherApi)
      .then(response => {
        if (response.ok){
          return response.json()}
          // If !response.ok then go to .catch
          throw response
        })
        .then(data => {
          setDailyData(data.daily)   
        })
        .catch(error => console.error(error))
      }, [])

      const dailyWeatherCards = dailyData.map(day => {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const unixDt = day.dt
        const date = new Date(unixDt * 1000);
        const dayName = days[date.getDay()];
        const weatherIconUrl = `http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`
        return <WeatherCard key={unixDt} unixDt={unixDt} dayName={dayName} weatherIconUrl={weatherIconUrl} dailyMax={day.temp.max} dailyMin={day.temp.min}></WeatherCard>
      })
  
      return (
        <Router>
            <Row>
            {dailyWeatherCards}
            </Row>
            <Switch>
                <Route path="/:dayName/:unixDt" component={WeatherGraph}></Route>
            </Switch>
        </Router>
      )
  }