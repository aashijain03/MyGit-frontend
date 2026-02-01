import React, { useEffect, useState } from "react";
import HeatMap from "@uiw/react-heat-map";

const generateActivityData = (startDate, endDate) => {
  const data = [];
  let currentDate = new Date(startDate);
  const end = new Date(endDate);

  while (currentDate <= end) {
    data.push({
      date: currentDate.toISOString().split("T")[0],
      count: Math.floor(Math.random() * 20),
    });
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return data;
};

const HeatMapProfile = () => {
  const [activityData, setActivityData] = useState([]);

  useEffect(() => {
    const data = generateActivityData("2001-01-01", "2001-01-31");
    setActivityData(data);
  }, []);

  return (
    <div>
      <h4 style={{ color: "white" }}>Recent Contributions</h4>
      <HeatMap
        value={activityData}
        startDate={new Date("2001-01-01")}
        rectSize={14}
        space={3}
      />
    </div>
  );
};

export default HeatMapProfile;
