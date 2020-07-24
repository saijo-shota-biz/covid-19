import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './App.scss';
import BarGraph from './components/bar-graph/BarGraph';
import Button from './components/button/Button';
import Header from './components/header/Header';
import HeatMap from './components/heat-map/HeatMap';
import Json from './components/json/Json';
import Loader from './components/loader/Loader';
import Table from './components/table/Table';

const App = () => {

  const [prefectures, setPrefectures] = useState([]);
  const [type, setType] = useState(0);

  useEffect(() => {
    axios.get('https://covid19-japan-web-api.now.sh/api/v1/prefectures')
      .then(res => res.data)
      .then(data => setPrefectures(data))
      .then(() => setType(1));
  }, []);
  
  return (
    <div className="App">
      <Header></Header>
      <div className="buttons">
        <Button label="JSON" selected={type === 1} onClick={() => setType(1)}></Button>
        <Button label="TABLE" selected={type === 2} onClick={() => setType(2)}></Button>
        <Button label="HEAT MAP" selected={type === 3} onClick={() => setType(3)}></Button>
        <Button label="BAR GRAPH" selected={type === 4} onClick={() => setType(4)}></Button>
      </div>
      <div className="contents">
      {
        type === 0 ? <Loader />
        : type === 1 ? <Json prefectures={prefectures} />
        : type === 2 ? <Table prefectures={prefectures} />
        : type === 3 ? <HeatMap prefectures={prefectures} />
        : type === 4 ? <BarGraph prefectures={prefectures} />
        : <></>
      }
      </div>
    </div>
  );
}

export default App;
