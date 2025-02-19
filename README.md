# Algowars

Algowars is an online competitive coding platform where users compete to solve coding challenges as fast as possible.

## Setup

### Requirements

node version: `20`

pnpm version: `10`

### Root Directory

Inside the root directory, run the following command:

`pnpm install --frozen-lockfile`

This will use pnpm to install the commands to run the mono repo.

To install the required dependencies of the client and backend, run:

`pnpm run install:all`

Environment Variables

Next, fill out the required environment variables.

## Start the Server

Now, start the application by running:

`pnpm run dev`

## Linting the Application

To lint the application, run the following command:

`pnpm run lint:all`

This will lint the client and backend applications. This will be important to run when making a PR.

## Building the application

To build the application, run the following command:

`pnpm run build:all`

This will build the client and backend application. This is for testing the build so that the PR will be successful.

## Documentation Website

[docs](https://docs-algowars.netlify.app/)

[deployed site](https://algowars.dev)

[jira](https://algowars-dev.atlassian.net/jira/software/c/projects/AW/boards/2)
