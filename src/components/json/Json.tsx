import React from "react";
import JSONTree from 'react-json-tree';
import { Prefecture } from "../../prefecture";

const Json: React.FC<{ prefectures: Prefecture[] }> = ({ prefectures }) => {
  return <JSONTree data={prefectures} />;
}

export default Json;