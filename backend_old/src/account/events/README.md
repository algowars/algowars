# Account Events

This documentation covers the event handling files used in the account management system.

## Project Structure

```text
- src/
  - account/
    - events/
      - account-created.event.ts
      - account-created.handler.ts
      - index.ts
```

## Files Overview

### `src/account/events/account-created.event.ts`

This file defines the `AccountCreatedEvent` class, which represents the event that is triggered when a new account is created.

### `src/account/events/account-created.handler.ts`

This file implements the `AccountCreatedHandler` class, which handles the `AccountCreatedEvent`. It contains the logic to be executed when the event is triggered.

### `src/account/events/index.ts`

This file exports all event handlers for easy integration into the application.

