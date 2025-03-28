import { fetchRocketInfo, fetchPayloadsInfo, fetchLaunchInfo } from "./extract.js";
import { transformRockets, transformLaunches, transformPayloads } from "./transform.js";

import { Rocket } from "../models/rocket.js";
import { Launch } from "../models/launch.js";
import { Payload } from "../models/payloads.js";

// ETLPipeline Fetching Data from SpaceX Server and Processing It
export class ETLPipeline {
  // Extract Data from Spacex Server
  async extractData() {
    this.rocketData = await fetchRocketInfo();
    this.payloadsData = await fetchPayloadsInfo();
    this.launchData = await fetchLaunchInfo();
  }

  // Transform Fetched Data
  async transformData() {
    this.rocketTransformedData = transformRockets(this.rocketData);
    this.launchTransformedData = transformLaunches(this.launchData);
    this.payloadTransformedData = transformPayloads(this.payloadsData);
  }

  // Load Data to Database
  async loadToDB() {
    try {
      await Rocket.deleteMany({});
      await Rocket.insertMany(this.rocketTransformedData);

      await Launch.deleteMany({});
      await Launch.insertMany(this.launchTransformedData);

      await Payload.deleteMany({});
      await Payload.insertMany(this.payloadTransformedData);
    } catch (error) {
      console.error("Error loading to DB:", error);
    }
  }
}
