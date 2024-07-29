# Account Queries

This documentation covers the query handling files used in the account management system.

## Project Structure

```text
- src/
  - account/
    - queries/
      - find-account-by-id/
        - find-account-by-id.handler.ts
        - find-account-by-id.query.ts
      - find-account-by-sub/
        - find-account-by-sub.handler.ts
        - find-account-by-sub.query.ts
      - index.ts
```

## Files Overview

### `src/account/queries/find-account-by-id/find-account-by-id.handler.ts`

This file implements the `FindAccountByIdHandler` class, which handles the `FindAccountByIdQuery`. It contains the logic to be executed when the query is triggered to find an account by its ID.

### `src/account/queries/find-account-by-id/find-account-by-id.query.ts`

This file defines the `FindAccountByIdQuery` class, which represents the query to find an account by its ID.

### `src/account/queries/find-account-by-sub/find-account-by-sub.handler.ts`

This file implements the `FindAccountBySubHandler` class, which handles the `FindAccountBySubQuery`. It contains the logic to be executed when the query is triggered to find an account by its subject identifier.

### `src/account/queries/find-account-by-sub/find-account-by-sub.query.ts`

This file defines the `FindAccountBySubQuery` class, which represents the query to find an account by its subject identifier.

### `src/account/queries/index.ts`

This file exports all query handlers for easy integration into the application.
