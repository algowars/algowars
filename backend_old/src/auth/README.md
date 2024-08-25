# Account Events Documentation

## Overview

This README details the event handling mechanisms within the account management system of the `algowars` backend. It covers the files responsible for defining and handling events related to account creation.

## Directory Structure

```text
- src/
  - account/
    - events/
      - account-created.event.ts
      - account-created.handler.ts
      - index.ts
```

## Detailed File Descriptions

### Event Definitions

- `account-created.event.ts`
  - **Description**: Defines the `AccountCreatedEvent` class. This event is triggered when a new account is successfully created within the system.
  - **Usage**: This event can be triggered by the account creation service upon the successful registration of a new user.

### Event Handlers

- `account-created.handler.ts`
  - **Description**: Implements the `AccountCreatedHandler` class which subscribes to and handles the `AccountCreatedEvent`.
  - **Functionality**: Upon catching this event, it may execute tasks such as sending a welcome email to the new user or logging the account creation in an audit log.

### Module Export

- `index.ts`
  - **Description**: Exports all the event handlers within the account module to facilitate easy integration and import into other parts of the application.
  - **Usage**: Allows for a clean import statement, such as `import { AccountCreatedHandler } from './account/events';` which simplifies the handling of dependency injection and modularity.

## Integration and Usage Example

Integrate the event and handler into your service like this:

```typescript
import { EventEmitter } from 'events';
import { AccountCreatedEvent, AccountCreatedHandler } from './account/events';

const eventEmitter = new EventEmitter();
const eventHandler = new AccountCreatedHandler();

// Subscribe the handler to the event.
eventEmitter.on('accountCreated', eventHandler.handle.bind(eventHandler));

// Emit an event when a new account is created.
eventEmitter.emit('accountCreated', new AccountCreatedEvent(userId, userEmail));
```

