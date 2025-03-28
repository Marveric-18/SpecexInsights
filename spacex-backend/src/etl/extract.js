import { request } from "graphql-request";
import axios from "axios";
import { SPACEX_ROCKETS_QUERY } from "./query.js";

const spacexGraphQLURL = "https://spacex-production.up.railway.app/";
const spacexApiURL = "https://api.spacexdata.com/v4";

export const fetchRocketInfo = async () => {
  try {
    const response = await request(spacexGraphQLURL, SPACEX_ROCKETS_QUERY);
    return response.rockets;
  } catch (error) {
    console.error("Error fetching rockets:", error);
    throw "Unable to fetch rocket information";
  }
};

export const fetchPayloadsInfo = async () => {
  try {
    const response = await axios.get(`${spacexApiURL}/payloads`);
    return response.data;
  } catch (error) {
    console.error("Error fetching payloads:", error);
    throw "Unable to fetch payloads information";
  }
};

export const fetchLaunchInfo = async () => {
  try {
    const response = await axios.get(`${spacexApiURL}/launches`);
    return response.data;
  } catch (error) {
    console.error("Error fetching launches:", error);
    throw "Unable to fetch launches information";
  }
};
