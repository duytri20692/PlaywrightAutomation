# Playwright API Testing Framework

## Table of Contents

- [Overview](#overview)
- [Setup](#setup)
- [Running Tests](#running-tests)
- [Configuration](#configuration)
- [Test Plan](#test-plan)
- [Generating Reports](#generating-reports)
- [Generating Allure Reports](#generating-allure-reports)

## Overview

This repository contains an API testing framework using Playwright to test endpoints from the Reqres API (https://reqres.in/). The framework is designed to be reusable, scalable, and easy to maintain.


## Setup

### Prerequisites

- Node.js (version >= 14.x)
- npm (version >= 6.x) or yarn (version >= 1.x)

### Installation

1. Clone the repository:
```
   git clone https://github.com/duytri20692/PlaywrightAutomation
```
2. Navigate to the API project:
```
   cd PlaywrightAutomation
```
3. Install the dependencies:
```
    npm install
```
or
```
   yarn install
```

## Running Tests
### Run Tests in Test Environment
```
   npx playwright test --config=playwright.config.ts --project=test
```
#### Run Tests in Stage Environment
```
   npx playwright test --config=playwright.config.ts --project=stage
```

## Configuration
The configuration is managed in the `utils/config.js` file. You can set up different environments and credentials here.

## Test Plan
### Endpoints Selected
1. POST: /api/login (Login - Successful/Unsuccessful)
2. GET: /api/users/{id} (Retrieve a single user)
3. PUT: /api/users/{id} (Update a user)
4. DELETE: /api/users/{id} (Delete a user)

### Scenarios to Test
1. POST - Login Endpoint (/api/login):
- Positive Case: Test login with valid credentials.
- Negative Case: Test login with invalid credentials.
- Negative Case: Test login with missing fields.

2. GET - User Endpoint (/api/users/{id}) :
- Positive Case: Retrieve details of a valid user.
- Negative Case: Attempt to retrieve details of a non-existing user.
- Negative Case: Attempt to retrieve details without authentication.

3. PUT - User Endpoint (/api/users/{id}):
- Positive Case: Update details of a valid user.
- Negative Case: Attempt to update details of a non-existing user.
- Negative Case: Attempt to update details without authentication.

4. DELETE User Endpoint (/api/users/{id}):
- Positive Case: Successfully delete a user.
- Negative Case: Attempt to delete a non-existing user.
- Negative Case: Attempt to delete without authentication

### End-to-End/Workflow Tests
- Workflow 1: 
   -  Successfully log in
   -  Retrieve the user's details
   -  Update the user
   -  Delete the user 
- Workflow 2: 
   -  Fail to log in
   -  Attempt to retrieve user details (should fail)
   -  Handle unauthorized responses.

## Generating Reports
Reports are automatically generated after running the tests. The results will be displayed in the console log. For more detailed reports, you can configure and enhance the reporter in `utils/reporter.js`

## Generating Allure Reports
To generate Allure reports, follow these steps:
1. Generate Allure Report:
```
   allure generate ./allure-results --clean
```

2. Open Allure Report:
```
   allure open
```