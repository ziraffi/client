import { useState, useEffect } from 'react';
import { convertCsvToJson } from "../../utils/csvtojson";
import fs from 'fs';
import path from 'path';

const IndianPincodesAdv = () => {
  const [indiaStatesData, setIndiaStatesData] = useState([]);
  const jsonPath = '/assets/JSON';

  useEffect(() => {
    const loadIndiaStatesData = async () => {
      try {
        const response = await fetch('/assets/csv/IndianPincodesData.csv');
        const csvData = await response.text();
        const jsonData = await convertCsvToJson(csvData);
        setIndiaStatesData(jsonData);

        // Save JSON data to file
        const fileName = 'IndianPincodesData.json';
        const filePath = path.join(jsonPath, fileName);
        fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2));
        console.log(`JSON data saved to ${filePath}`);
      } catch (error) {
        console.error('Error loading or saving India States Data:', error);
      }
    };

    loadIndiaStatesData();
  }, []);

  return indiaStatesData;
};

export default IndianPincodesAdv;
