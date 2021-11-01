import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Container from 'react-bootstrap/Container'
import WeatherBoard from './Components/WeatherBoard';

function App() {
  return (
    <div className="App">
      <Container fluid>
        <WeatherBoard></WeatherBoard>
      </Container>
    </div>
  );
}

export default App;
