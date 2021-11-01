import { useParams } from "react-router-dom";


//TO-DO: Pass dailyData into this component for rendering
export default function HourlyWeatherCard(){
    const { unixDt, dayName } = useParams()
    return <h1>{dayName}, {unixDt}</h1>
}