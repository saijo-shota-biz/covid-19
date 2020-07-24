import React, { useEffect, useState } from "react";
import { Prefecture } from "../../prefecture";
import "./Table.scss";

const Table: React.FC<{ prefectures: Prefecture[] }> = ({ prefectures }) => {

  const [sortedData, setSortedData] = useState(prefectures);
  const [sortKey, setSortKey] = useState("id");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | "">("");

  useEffect(() => {
    const sorted = sortedData.sort((a, b) => {
      if (sortOrder === "asc" || sortOrder === "") {
        return a[sortKey] - b[sortKey]
      } else if (sortOrder === "desc") {
        return b[sortKey] - a[sortKey]
      }
      return 0;
    });
    setSortedData([...sorted]);
  }, [sortKey, sortOrder]);

  const setSort = (selectedKey: string) => {
    if (selectedKey === sortKey) {
      if (sortOrder === "asc") {
        setSortOrder("desc");
      } else if (sortOrder === "desc") {
        setSortOrder("");
        setSortKey("id");
      } else {
        setSortOrder("asc");
      }
    } else {
      setSortOrder("asc");
      setSortKey(selectedKey);
    }
  }

  const thClassName = (selectedKey: string) => {
    return sortKey === selectedKey ? `sorted ${sortOrder}` : ""
  }

  return (
    <table className="table">
      <thead>
        <tr>
          <th className={thClassName("id")} onClick={() => setSort("id")}>No</th>
          <th className="no-clickable">都道府県名</th>
          <th className={thClassName("population")} onClick={() => setSort("population")}>人口</th>
          <th className={thClassName("cases")} onClick={() => setSort("cases")}>症例数</th>
          <th className={thClassName("deaths")} onClick={() => setSort("deaths")}>死者数</th>
          <th className={thClassName("pcr")} onClick={() => setSort("pcr")}>PCR検査数</th>
          <th className={thClassName("hospitalize")} onClick={() => setSort("hospitalize")}>入院者数</th>
          <th className={thClassName("severe")} onClick={() => setSort("severe")}>重度</th>
          <th className={thClassName("discharge")} onClick={() => setSort("discharge")}>退院者数</th>
        </tr>
      </thead>
      <tbody>
        { sortedData.map(prefecture => (
          <tr key={prefecture.id}>
            <td>{prefecture.id}</td>
            <td>{prefecture.name_ja}</td>
            <td align="right">{prefecture.population.toLocaleString()}</td>
            <td align="right">{prefecture.cases.toLocaleString()}</td>
            <td align="right">{prefecture.deaths.toLocaleString()}</td>
            <td align="right">{prefecture.pcr.toLocaleString()}</td>
            <td align="right">{prefecture.hospitalize.toLocaleString()}</td>
            <td align="right">{prefecture.severe.toLocaleString()}</td>
            <td align="right">{prefecture.discharge.toLocaleString()}</td>
          </tr>
        )) }
      </tbody>
    </table>
  );
}

export default Table;