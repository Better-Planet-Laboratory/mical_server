# FarmGeek

## Project Description

The purpose of this repo is house the server side code for the FarmGeek web application. FarmGeek is a new web-based application for policy makers, researchers, funders, donors, and farm extension agents to identify the balance of the evidence for different on-farm interventions for agricultural outcomes such as yield, biodiversity, human health.

This repository has been developed by worklearn students at the University of British Columbia, under direction of Zia Mehrabi and Navin Ramankutty. It is currently maintained by Zia Mehrabi, at the University of Colorado Boulder. 

## 

[![Build Status](https://travis-ci.com/AgriculturalEvidence/mical_server.svg?branch=master)](https://travis-ci.com/AgriculturalEvidence/mical_server)
[![Coverage Status](https://coveralls.io/repos/github/AgriculturalEvidence/mical_server/badge.svg?branch=master)](https://coveralls.io/github/AgriculturalEvidence/mical_server?branch=master)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them. No need to install again if you already have installed these tools previously.

- This project uses Git as our version control manager. Install the latest version in order to have version control for the project.

- open your command line tool and navigate to the directory you wish to install the project into and download the project using git clone <project-repo-link>

- download latest version of node as npm (node package manager) and node.js server language are used in the project.

- This project uses the javascript framework Angular. Install Angular CLI by running this command on the command line at the root of your project directory.

Installing Docker

Install [Docker Desktop](https://www.docker.com/products/docker-desktop) for your Operating System (Mac, PC, Linux)

Installing Heroku CLI

Follow Heroku CLI installation through this [tutorial](https://devcenter.heroku.com/articles/heroku-cli)

### Installing

A step by step series of examples that tell you how to get a development env running

Install all project dependencies using npm command.

```
npm install
```

in the root directory, create a file called .env and populate with the following variables:

```
PORT=8888
DB_USER=root
DB_PASS=admin123
DEV_DB_NAME=Cluster0
PROD_DB_NAME=production
MONGODB_URI=mongodb+srv://admin:${DB_PASS}@cluster0.5he4u.mongodb.net/${DEV_DB_NAME}
```

Note: Change these environment variables and hide them from public if this project ever becomes public so that our db cannot be reached.

To run project locally use the command

```
npm run start
```

The app will run locally on the url http://localhost:8888

To update new application data onto database. (Right now the parser supports intervention data and yields data)

Ensure you have [MongoImport](https://docs.mongodb.com/database-tools/installation/installation/) CLI installed as this application uses it to push datasets into mongoDB database.

1. Replace the csv dataset with the new dataset. (Make sure the dataset you are replacing has the same name eg. 'intervention.csv')

2. Run `npm run parse`

3. Check MongoDB account on mongodb.com to check that the data was uploaded properly. (Ask Project head for account credentials).

This runs a script that uploads the csv file to the referenced mongo database. (Note for interventions.csv it is first converted into json before uploading to db due to previous design decisions)

## Running the tests (Tests are not working as of 2021)

The Project contains Unit tests using [Karma](https://karma-runner.github.io), and E2E tests using [Protractor](http://www.protractortest.org/).

### Run Test Suite

```
Run npm run test
```

## Deployment

Deployment of both client and server applications are done as a single docker container instance which is hosted via Heroku. The steps to deployment are outlined below.

1. Make sure you have Heroku CLI & Docker installed (follow Installing Section).

2. Run `npm run deploy-client` and `npm run deploy-server` to create local docker images of the client and server applications and push images into heroku docker registry as containers and release them into heroku hosting. Its possible this may not update due to something like 'The process type web was not updated, because it is already running the specified docker image.'
   This may occur if you run this script multiple times, it may use the previously saved docker image instead of your new one with your changes.
   If this happens delete the existing local docker images with `docker system prune -a` and rerun step 2 again.

3. If server instance gives an error of H14: No web dynos running, Run `heroku ps:scale web=1 <server-url>` in terminal.

4. We use Heroku as our web application hosting service to host both our client (mical) and server (mical_server) applications. Upon successful deployment, updates should be visible in https://askjames.com and https://farmgeek.com which are our custom domains. It can usually take a few minutes for changes to take effect.

5. Further information of deployments and web hosting service for both client and server apps can be found in the project's heroku account at heroku.com.

## Built With

- [NodeJs](http://nodejs.org) >= 6.x
- [mongodb](http://mongodb.org)
- [Heroku](https://www.heroku.com)
- [Docker](https://www.docker.com)

## Contributors

- **Jaehun Song**
- **Victor Pineda Gonzalez**
