---
sidebar_position: 1
---

# Auth0 Setup

To enable authentication on **Algowars**, you'll need to set up **Auth0**. This guide will walk you through creating an Auth0 application and configuring it for use with your project.

## Steps

### 1. Create an Auth0 Application

**Log in to Auth0 Dashboard**: Go to the [Auth0 Dashboard](https://manage.auth0.com/).

**Create a New Application**:

1. Click on **Applications** in the sidebar.
2. Click **Create Application**.
3. **Name**: `Algowars Application`
4. **Type**: Select **Single Page Application**.
5. Click **Create**.

### 2. Configure Application Settings

**Settings Tab**:

- **Allowed Callback URLs**:  
  `http://localhost:5173/app/account/setup`

- **Allowed Logout URLs**:  
  `http://localhost:5173`

- **Allowed Web Origins**:  
  `http://localhost:5173`

- **Save Changes**

### 3. Create an API in Auth0

**Navigate to APIs**:

1. Click on **APIs** in the Auth0 dashboard sidebar.
2. Click **Create API**.

**Create New API**:

- **Name**: `Algowars API`
- **Identifier**: `https://api.algowars.com` (this will be your API Audience)
- **Signing Algorithm**: `RS256`
- Click **Create**

### 4. Obtain Auth0 Credentials

You'll need the following credentials for your application:

- **Domain**: Found in your Auth0 dashboard under **Applications > Algowars Application > Settings**.
- **Client ID**: Also found under **Application Settings**.
- **Audience**: The **Identifier** you set when creating the API (e.g., `https://api.algowars.com`).

### 5. Update Environment Variables

In your frontend and backend projects, create or update your `.env` files with the following variables.

You can use these commands:

#### Client

```bash
cd client
cp .env.example .env
```

Update the client variables to your new gathered auth0 credentials:

```env
...
VITE_APP_AUTH_DOMAIN=your-auth0-domain.auth0.com
VITE_APP_AUTH_CLIENT_ID=your-client-id
VITE_APP_AUTH_AUDIENCE=https://algowars-development.com
...
```

#### Backend

```bash
cd backend
cp .env.example .env
```

Update the backend variables to your new gathered auth0 credentials:

```js title=".env"
...
ISSUER_BASE_URL=https://your-auth0-domain.auth0.com
AUDIENCE=https://algowars-development.com
...
```

**\*\*BE SURE TO INCLUDE THE `https://` BEFORE THE DOMAIN IN THE BACKEND SERVER.\*\***

#### Role-Based Access Control (RBAC)

To enable RBAC in your projects to have roles follow the last portion of this auth0 documentation: [Auth0 Tutorial](https://developer.auth0.com/resources/code-samples/full-stack/hello-world/basic-role-based-access-control/spa/react-typescript/nestjs-typescript#set-up-role-based-access-control-rbac)
