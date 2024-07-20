# Apollo Server with Express and TypeScript

This project sets up an Apollo Server with Express and TypeScript. It includes configuration for running the server and testing it with Jest and Supertest, as well as Docker support for containerization.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Running the Application](#running-the-application)
- [Running Tests](#running-tests)
- [Docker](#docker)
- [Contributing](#contributing)
- [License](#license)

## Features

- Apollo Server setup with Express and TypeScript
- GraphQL schema and resolvers configuration
- Testing with Jest and Supertest
- Docker support for containerization

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [npm](https://www.npmjs.com/) (Node package manager)

### Installation

1. Clone the repository:

   ```bash
   git clone git@github.com:fajarbh14/backend-test.git
   ```

2. Navigate into the project directory:

   ```bash
   cd your-repository
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Build the TypeScript code:

   ```bash
   npm run build
   ```

## Running the Application

To start with dev mode:

```bash
npm run dev
```

To start with build mode:

```bash
npm run start
```

To Run the unit testing :

```bash
npm run test
```

### Running with docker

```bash
docker-compose up --build
```

### Postman Documentation

https://blue-meadow-214897.postman.co/workspace/Team-Workspace~5c93292e-c5dc-4c89-87a7-70c91a07f7b4/collection/6698b26e3c1203dec9913640?action=share&creator=30453312

# Testing Guide

This guide outlines the steps to change the value of `patientId` for each test data category: medical-history, medication, and appointment.

## Instructions

### 1. Medical History

1. Open the `medical-history.test.ts` file located in the `test` directory.
2. Locate the `patientId` field in each test entry.
3. Modify the value of `patientId` to the desired value.
4. Save the changes to `medical-history.test.ts`.

### 2. Medication

1. Open the `medication.test.ts` file located in the `test` directory.
2. Locate the `patientId` field in each test entry.
3. Modify the value of `patientId` to the desired value.
4. Save the changes to `medication.test.ts`.

### 3. Appointment

1. Open the `appointment.test.ts` file located in the `test` directory.
2. Locate the `patientId` field in each test entry.
3. Modify the value of `patientId` to the desired value.
4. Save the changes to `appointment.test.ts`.
