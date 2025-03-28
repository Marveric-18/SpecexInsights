import { gql } from "graphql-request";

const SPACEX_LAUNCH_QUERY = gql`
    query FetchLaunches {
        launches {
            id
            upcoming
            launch_date_utc
            is_tentative
            details
            launch_year
            mission_name
            mission_id
            launch_success
            rocket {
                rocket_name
                rocket_type
                rocket {
                    id
                    cost_per_launch
                    description
                    company
                    stages
                    type
                    country
                    first_flight
                    success_rate_pct
                    name
                    second_stage {
                    engines
                    payloads {
                        composite_fairing {
                                diameter {
                                    meters
                                }
                                height {
                                    meters
                                }
                            }
                        }
                    }
                    diameter {
                        meters
                    }
                    mass {
                        kg
                    }
                    payload_weights {
                        id
                        kg
                        name
                    }
                   
                    height {
                        meters
                    }
                }
            
            }
            launch_site {
                site_name
            }
            links {
                article_link
            }
        }
    }
`


const SPACEX_ROCKETS_QUERY = gql`
    query Rockets {
        rockets {
            id
            name
            mass {
                kg
            }
            boosters
            company
            cost_per_launch
            country
            description
            diameter {
                meters
            }
            first_flight
            success_rate_pct
            type
            height {
                meters
            }
        }
    }
`


export {
    SPACEX_LAUNCH_QUERY,
    SPACEX_ROCKETS_QUERY
}