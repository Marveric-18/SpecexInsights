import { ETLPipeline } from "./pipeline.js";

async function runETLPipeline() {

  const etl = new ETLPipeline();
  await etl.extractData();
  await etl.transformData();
  await etl.loadToDB();

}

export default runETLPipeline;