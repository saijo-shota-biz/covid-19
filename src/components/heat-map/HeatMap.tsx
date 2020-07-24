import axios from 'axios';
import { geoMercator, geoPath } from 'd3-geo';
import React, { useEffect, useState } from "react";
import { feature } from 'topojson-client';
import { Prefecture } from "../../prefecture";

const HeatMap: React.FC<{ prefectures: Prefecture[] }> = ({ prefectures }) => {

  const [features, setFeatures] = useState([]);
  const [colors, setColors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    axios.get('./japan.topojson')
      .then(res => {
        setFeatures(feature(res.data, res.data.objects.japan).features);
      });
  }, []);

  useEffect(() => {
    setColors(prefectures.reduce((colors, prefecture) => {
      colors[prefecture.name_ja] = getColor(prefecture);
      return colors;
    }, {}));
  }, [prefectures])

  const getColor = (prefecture: Prefecture): string => {
    if (prefecture.cases > 1000) {
      return "#ff0000";
    } else if (prefecture.cases > 500) {
      return "#ff2b2b";
    } else if (prefecture.cases > 100) {
      return "#ff8080";
    } else if (prefecture.cases > 50) {
      return "#ffd5d5";
    } else if (prefecture.cases > 10) {
      return "#fff4f4";
    } else {
      return "#ffffff"
    }
  }

  const projection = () => {
    return geoMercator()
      .scale(1000)
      .center([150, 36])
  }

  return (
    <svg width={500} height={500}>
      <g className="prefectures">
        {features.map((d, i) => {
          const prefectureName = d["properties"]["nam_ja"];
          return (
            <path
              key={`path-${i}`}
              d={geoPath().projection(projection())(d)}
              className="prefecture"
              fill={colors[prefectureName]}
              stroke="#333333"
              strokeWidth={0.5}
            />
          )
        })}
      </g>
    </svg>
  )
}

export default HeatMap;