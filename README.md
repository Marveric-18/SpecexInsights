# Welcome to SpaceX Insights

SpaceX Insight is a project build upon SpaceX data - where ETL pipeline works over to extract data related to Launch, Rockets and Payloads and transformed it to show valuable insights.


## Prerequisites
- Node.js Version (18 or above) [Installation Guide](https://nodejs.org/en/download)
- MongoDB Service [Installation Guide](https://www.mongodb.com/try/download/community)

## Setup Check
- Make sure node.js version is installed : In your terminal run node -v
- Make sure mongodb service is running and is on port 27017 (if different port kindly change db link inside spacex-backend/src/db/index.js
- Make sure no service is running on PORT 3000 and 8082 on your local

## How to Run
- First clone SpecexInsights repo to your local computer using **git clone https://github.com/Marveric-18/SpecexInsights.git**
### Start Backend Service
- Open SpacexInsight project in your choice of code editor
- Open Terminal and go to **_spacex-backend_** directoy using **cd spacex-backend**
- Install dependencies using command **npm run install**
- run command **npm run start** <ins> If any issue revisit the Setup checks</ins>
### Start Frontend Service
- Open another Terminal and go to **_spacex-insights_** directoy using **cd spacex-backend**
- Install dependencies using command **npm run install**
- run command **npm run start** <ins> If any issue revisit the Setup checks</ins>




# How it works 
The project is devided into 3 parts
- ETL Pipeline
- Serving data through Backend Service
- Showing Insights through Frontend Service

## ETL Pipeline
To build a ETL Pipeline I have used ES6 class which has methods for each stage of ETL (Extract, Transform and Load)

### Extract
- To extract data we are using SpaceX-GraphQL Server and API Version (v4).
- The only reason to use API Version is that current version of SpaceX-GraphQL server is having some issue fetching payload data and some of the data of launch.
- I have fetched 3 datasets. Rocket Data using GraphQL Query &  Launch and Payload Data with v4 api request.
- Simply fetching data via both mediums and then saving it inside class variables.

### Transform
- For all fetched data of launch, rockets and payload I have transformation functions (mappers) which are converting it to more readable and efficient format.

### Load
- Cleaning all collections from database
- Load all transformed data to the database

### Database Schema
To efficiently connect Launch, Rocket and Payloads Data I have used the following schema

**Launch** {  
&nbsp;&nbsp;&nbsp;&nbsp;launch_id : PK of Launch Data,  
&nbsp;&nbsp;&nbsp;&nbsp;rocket_id :  Reference to rocket,  
&nbsp;&nbsp;&nbsp;&nbsp;...Rest of Launch Data  
}  

**Rocket** {  
&nbsp;&nbsp;&nbsp;&nbsp;rocket_id : PK of Rocket Data,  
&nbsp;&nbsp;&nbsp;&nbsp;...Rest of Rocket Data  
}  

**Payload** {  
&nbsp;&nbsp;&nbsp;&nbsp;payload_id : PK of Payload Data,  
&nbsp;&nbsp;&nbsp;&nbsp;launch_id :  Reference to Launch,  
&nbsp;&nbsp;&nbsp;&nbsp;...Rest of Payload Data  
}  

This ensures that connect all the records and query it.


## spacex-backend

### REST Api Setup
#### Get Methods
- **/insights/reload-data**: Reloads the data via running the ETL pipeline , cleaning older data and fetching new version of data
- **/insights/payload-statistics**: Fetch Payload Statistics sent to outerspace
- **/insights/launch-frequency-by-year**: Fetch Launch Frequency by Year with Success and Failure counts in each year
- **/insights/launch-frequency-by-month**: Fetch Launch Frequency by Each Month
- **/insights/rocket-payload-efficiency**: Fetch Insight between Rocket and Payload Efficiency and Spent revenue
- **/insights/orbitwise-risk**: Fetch Orbit wise data with success rate and total payload weight


## spacex-insights
- React with React Charts to show insights
- Please checkout this video on how it works.









