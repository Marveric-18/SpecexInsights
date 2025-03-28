// Transform Data into readble and custom context

export const transformRockets = (rocketData) =>
    rocketData.map((eachRocket) => ({
      rocket_id: eachRocket.id,
      rocket_name: eachRocket.name,
      rocket_type: eachRocket.type,
      cost_each_launch: eachRocket.cost_per_launch || null,
      success_rate: eachRocket.success_rate_pct || null,
      description: eachRocket.description,
      country: eachRocket.country,
      first_flight: eachRocket.first_flight ? new Date(eachRocket.first_flight) : null,
      height: eachRocket?.height?.meters || null,
      weight: eachRocket?.mass?.kg || null,
      diameter: eachRocket?.diameter?.meters || null,
    }));
  
  export const transformLaunches = (launchData) =>
    launchData.map((eachLaunch) => ({
      launch_id: eachLaunch.id,
      rocket_id: eachLaunch.rocket,
      launch_date: eachLaunch.date_utc ? new Date(eachLaunch.date_utc) :  null,
      launch_details: eachLaunch.details ?? null,
      article_link: eachLaunch.links?.article ?? null,
      success: eachLaunch.success ?? null,
      upcoming: eachLaunch.upcoming ?? null
    }));
  
  export const transformPayloads = (payloadsData) =>
    payloadsData.map((eachPayload) => ({
      payload_id: eachPayload.id,
      launch_id: eachPayload.launch ?? null,
      payload_name: eachPayload.name,
      payload_type: eachPayload.type,
      payload_weight: eachPayload.mass_kg ?? null,
      payload_orbit: eachPayload.orbit ?? null,
      is_reused: eachPayload.reused ?? null,
      reference_system: eachPayload.reference_system ?? null,
    }));
  