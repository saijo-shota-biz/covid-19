import React, { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts';
import { Prefecture } from "../../prefecture";

const BarGraph: React.FC<{ prefectures: Prefecture[] }> = ({ prefectures }) => {

  const [data, setData] = useState<{ name: string, cases: number }[]>([]);

  useEffect(() => {
    setData(prefectures.map(prefecture => ({ name: prefecture.name_ja, cases: prefecture.cases })));
  }, [prefectures]);

  return (
    <BarChart
      width={1200}
      height={600}
      data={data}
      margin={{
        top: 5, right: 30, left: 20, bottom: 5,
      }}
    >
      <CartesianGrid />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="cases" fill="#8884d8" />
    </BarChart>
  )
}

export default BarGraph;