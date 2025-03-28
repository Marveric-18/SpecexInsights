# Welcome to SpaceX Insights

SpaceX Insight is a project build upon SpaceX data - where ETL pipeline works over to extract data related to Launch, Rockets and Payloads and transformed it to show valuable insights.


## Prerequisites
- Node.js Version (18 or above) [Installation Guide]([https://www.mongodb.com/try/download/community](https://nodejs.org/en/download))
- MongoDB Service [Installation Guide](https://www.mongodb.com/try/download/community)

## Setup Check
- Make sure node.js version is installed : In your terminal run node -v
- Make sure mongodb service is running and is on port 27017 (if different post kindly change db link inside spacex-backend/src/db/index.js
- Make sure no service is running on PORT 3000 and 8082 on your local

## How to Run
- First clone SpecexInsights repo to your local computer using **git clone https://github.com/Marveric-18/SpecexInsights.git**
### Start Backend Service
- Open SpacexInsight project in your choice of code editor
- Open Terminal and go to **_spacex-backend_** directoy using **cd spacex-backend**
- Install dependencies using command **npm run install**
- run command **npm run start** <ins> If any issue revisit the [Setup checks](#setup-checks)</ins>
### Start Frontend Service
- Open another Terminal and go to **_spacex-insights_** directoy using **cd spacex-backend**
- Install dependencies using command **npm run install**
- run command **npm run start** <ins> If any issue revisit the [Setup checks](#setup-checks)</ins>




