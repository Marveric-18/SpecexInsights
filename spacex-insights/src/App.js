import { useState } from "react";
import "./App.css";
import RocketCharts from "./PayloadRocketEfficiencyChart.js";
import LaunchFrequencyChart from "./LaunchFrequencyChart.js";
import api from "./api.js";
import Button from "@mui/material/Button";
import { Divider } from "@mui/material";

function App() {
  const [rocketPayloadData, setRocketPayloadData] = useState(null);
  const [launchYearData, setLaunchYearData] = useState(null);
  const [extraInsights, setExtraInsights] = useState(null);

  // Refresh Data
  const reloadData = async () => {
    try {
      await api.get(`/reload-data`, {});
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch Rocket Payload Efficiency Data
  const fetchRocketPayloadData = async () => {
    try {
      const res = await api.get(`/rocket-payload-efficiency`, {});
      if (res.data) {
        setRocketPayloadData(res.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch Launch Frequency By Year Data
  const fetchLaunchByYearData = async () => {
    try {
      const res = await api.get(`/launch-frequency-by-year`, {});
      if (res.data) {
        setLaunchYearData(res.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch Payload Statistics
  const fetchPayloadStatistics = async () => {
    try {
      const res = await api.get(`/payload-statistics`, {});
      if (res.data) {
        setExtraInsights(res.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch Orbit Wise Risk
  const fetchOrbitWiseRisk = async () => {
    try {
      const res = await api.get(`/orbitwise-risk`, {});
      if (res.data) {
        setExtraInsights(res.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const [isDebounce, setIsDebounced] = useState(false);

  // Refresh Insight with Debounced Enabled
  const handleRefreshInsight = async () => {
    if (isDebounce) return;
    setIsDebounced(true);

    setRocketPayloadData(null);
    setLaunchYearData(null);
    setExtraInsights(null);
    try {
      await reloadData();

      await fetchRocketPayloadData();
      await fetchLaunchByYearData();
    } catch (err) {
      console.error("Failed to refresh data", err);
    } finally {
      setTimeout(() => setIsDebounced(false), 3000);
    }
  };

  return (
    <div className="App">
      <div style={{ marginTop: "100px" }}>
        <Button onClick={handleRefreshInsight} variant="contained" color="primary">Fetch Insights</Button>
  
        <div style={{ marginTop: "100px" }}>
          <Button style={{ margin: "10px" }} onClick={fetchPayloadStatistics} variant="contained" color="primary">
            Payload Statistics
          </Button>
          <Button style={{ margin: "10px" }} onClick={fetchOrbitWiseRisk} variant="contained" color="primary">
            Orbitwise Statistics
          </Button>
        </div>
  
        <div style={{ marginTop: "100px" }}>
          {extraInsights && <pre>{JSON.stringify(extraInsights, null, 2)}</pre>}
        </div>
      </div>
  
      <Divider style={{ marginTop: "50px" }} />
  
     {/* Graphs */}
      <div>
        <h1>Spacex Insights</h1>
        {rocketPayloadData && <RocketCharts rocketData={rocketPayloadData} />}
        {launchYearData && <LaunchFrequencyChart launchData={launchYearData} />}
      </div>
    </div>
  );
  
}

export default App;
