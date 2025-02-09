#Algowars

Algowars core application

##Setup

In the root directory, run the following command:

`pnpm run install:all`

This runs the commands install:backend and install:client. This will clean install the required dependencies in both the backend and client.

Environment Variables

Next, fill out the required environment variables.

Install Dependencies

To ensure dependencies are installed exactly as specified, run:

`pnpm install --frozen-lockfile`

Do this in the root directory so you can use concurrently to run the monolith application.

##Start the Server

Now, start the application by running:

`pnpm run dev`

## Documentation Website

[docs](https://docs-algowars.netlify.app/)

[deployed site](https://algowars.dev)

[jira](https://algowars-dev.atlassian.net/jira/software/c/projects/AW/boards/2)
