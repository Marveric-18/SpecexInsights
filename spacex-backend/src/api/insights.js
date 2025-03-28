import express from "express";

import { Launch } from "../models/launch.js";
import { Payload } from "../models/payloads.js";

import runETLPipeline from "../etl/index.js";

class Insights {
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.getRoutes();
  }

  getRoutes() {
    // Refresh Data : Runs ETL Pipeline
    this.router.get("/reload-data", async (req, res) => {
        await runETLPipeline();
        return res.json({ message : "Successful"}).status(200);
      });

    // To fetch Payload Statistics sent to outerspace
    this.router.get("/payload-statistics", async (req, res) => {
      const allPayloads = await Payload.find({ payload_weight: { $ne: null } });
      const payloadStat = getPayloadStatistics(allPayloads);
      return res.json({ ...payloadStat }).status(200);
    });

    // Launch Frequency by Year with Success and Failure counts in each year
    this.router.get("/launch-frequency-by-year", async (req, res) => {
      const allLaunches = await Launch.find({ launch_date: { $ne: null } });
      const frequencyByYear = getLaunchFrequencyByYear(allLaunches);
      return res.json(frequencyByYear).status(200);
    });

    // Launch Frequency by month
    this.router.get("/launch-frequency-by-month", async (req, res) => {
      const allLaunches = await Launch.find({ launch_date: { $ne: null } });
      const frequencyByMonth = getLaunchFrequencyByMonth(allLaunches);
      return res.json({ ...frequencyByMonth }).status(200);
    });

    // Insight between Rocket and Payload Efficiency and Spent revenue
    this.router.get("/rocket-payload-efficiency", async (req, res) => {
      const launchPayloadRocketInformation = await Launch.aggregate([
        {
          $lookup: {
            from: "rockets",
            localField: "rocket_id",
            foreignField: "rocket_id",
            as: "rocket",
          },
        },
        { $unwind: "$rocket" },
        {
          $lookup: {
            from: "payloads",
            localField: "launch_id",
            foreignField: "launch_id",
            as: "payloads",
          },
        },
        {
          $project: {
            rocket: 1,
            payloads: 1,
          },
        },
      ]);

      const insightData = getPayloadAndLaunchStatistics(
        launchPayloadRocketInformation
      );
      return res.json(insightData).status(200);
    });

    // Orbit wise data with success rate and total payload weight
    this.router.get("/orbitwise-risk", async (req, res) => {
      const payloadsWithLaunch = await Payload.aggregate([
        {
          $lookup: {
            from: "launches",
            localField: "launch_id",
            foreignField: "launch_id",
            as: "launch",
          },
        },
        {
          $unwind: "$launch",
        },
        {
          $group: {
            _id: {
              orbit: "$payload_orbit",
              success: "$launch.success",
            },
            count: { $sum: 1 },
            totalWeight: { $sum: "$payload_weight" },
          },
        },
      ]);
      const orbitWiseLaunchData = orbitSuccessFailureData(payloadsWithLaunch);
      return res.json(orbitWiseLaunchData).status(200);
    });
  }

}

// Insight of Launch Frequency By Year
const getLaunchFrequencyByYear = (launches) => {
  const launchDataBasedOnYear = {};

  launches.forEach((eachLaunch) => {
    const date = eachLaunch.launch_date;
    if (!date) return;

    const year = new Date(date).getFullYear();
    const is_success = eachLaunch.success;

    if (!launchDataBasedOnYear[year]) {
      launchDataBasedOnYear[year] = {
        totalLaunch: 0,
        successfulLaunch: 0,
        failedLaunch: 0,
      };
    }

    launchDataBasedOnYear[year].totalLaunch++;

    if (is_success === true) {
      launchDataBasedOnYear[year].successfulLaunch++;
    } else if (is_success === false) {
      launchDataBasedOnYear[year].failedLaunch++;
    }
  });

  return launchDataBasedOnYear;
};

// Insight of Launch Frequency By Month
// TODO: if time make Freq list by month and year combo
const getLaunchFrequencyByMonth = (launches) => {
  const frequency = {};
  const monthOrder = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  launches.forEach(({ launch_date }) => {
    if (!launch_date) return;
    const date = new Date(launch_date);
    const key = `${date.toLocaleString("default", { month: "long" })}`;
    frequency[key] = (frequency[key] || 0) + 1;
  });
  const sortedFrequency = Object.fromEntries(
    monthOrder
      .filter((month) => frequency.hasOwnProperty(month))
      .map((month) => [month, frequency[month]])
  );

  return sortedFrequency;
};

// Calculate Payload Statistics
const getPayloadStatistics = (payloads) => {
  const weights = payloads.map((eachPayload) => eachPayload.payload_weight);

  const total = weights.reduce((acc, curr) => acc + curr, 0);
  const average = weights.length > 0 ? total / weights.length : 0;

  return {
    total_payloads: payloads.length,
    average_weight: average.toFixed(2),
    max_weight: Math.max(...weights),
    min_weight: Math.min(...weights),
  };
};

// Payload and Launch Statistic
const getPayloadAndLaunchStatistics = (allLaunchPayloadRocket) => {
  const payloadRocketData = allLaunchPayloadRocket.map((eachData) => {
    return {
      rocket_name: eachData.rocket.rocket_name,
      rocket_type: eachData.rocket.rocket_type,
      cost_each_launch: eachData.rocket.cost_each_launch,
      total_payload_weight: eachData.payloads.reduce((acc, curr) => {
        return curr.payload_weight + acc;
      }, 0),
    };
  });

  const rocketPayloadInsight = {};

  payloadRocketData.forEach((item) => {
    if (!rocketPayloadInsight[item.rocket_name]) {
      rocketPayloadInsight[item.rocket_name] = {
        rocket_name: item.rocket_name,
        rocket_type: item.rocket_type,
        total_payload_weight: 0,
        total_launch_cost: 0,
        launch_count: 0,
      };
    }

    rocketPayloadInsight[item.rocket_name].total_payload_weight +=
      item.total_payload_weight;
    rocketPayloadInsight[item.rocket_name].total_launch_cost +=
      item.cost_each_launch;
    rocketPayloadInsight[item.rocket_name].launch_count += 1;
  });

  const efficiencyInsight = Object.values(rocketPayloadInsight).map((item) => ({
    ...item,
    avg_payload_weight: (item.total_payload_weight / item.launch_count).toFixed(
      2
    ),
    avg_cost_per_launch: (item.total_launch_cost / item.launch_count).toFixed(
      2
    ),
  }));
  return efficiencyInsight;
};


function orbitSuccessFailureData(orbitPayloadLaunchData) {
    const orbitWiseLaunchData = {};
  
    orbitPayloadLaunchData.forEach((eachData) => {
      const orbit = eachData._id.orbit || "Unknown Orbit";
      const success = eachData._id.success;
  
      if (!orbitWiseLaunchData[orbit]) {
        orbitWiseLaunchData[orbit] = {};
      }
  
      const statusKey =
        success === true ? "successful" :
        success === false ? "unsuccessful" :
        "unknown";
  
      if (!orbitWiseLaunchData[orbit][statusKey]) {
        orbitWiseLaunchData[orbit][statusKey] = {
          count: 0,
          totalWeight: 0
        };
      }
  
      orbitWiseLaunchData[orbit][statusKey].count += eachData.count;
      orbitWiseLaunchData[orbit][statusKey].totalWeight += eachData.totalWeight;
    });

    return orbitWiseLaunchData;
  }
  

export default new Insights().router;
