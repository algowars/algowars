# Account DTOs and Requests

This documentation covers the Data Transfer Objects (DTOs) and request DTOs used in the account management system.

## Project Structure

```text
- src/
  - account/
    - dto/
      - account.dto.factory.ts
      - account.dto.ts
      - request/
        - create-account-request.dto.ts
        - find-account.dto.ts
```

## Files Overview

### `src/account/dto/account.dto.factory.ts`

This factory class is responsible for creating instances of the account DTO. It ensures that DTO instances are created correctly and adhere to the expected structure.

### `src/account/dto/account.dto.ts`

This file defines the data transfer object (DTO) for the account, specifying the properties and validation rules for account data transfer between different parts of the application.

### `src/account/dto/request/create-account-request.dto.ts`

This file defines the DTO for creating an account request. It includes the necessary properties and validation rules required to create a new account.

### `src/account/dto/request/find-account.dto.ts`

This file defines the DTO for finding an account. It includes the necessary properties and validation rules required to search for an account.

## Usage

### Setting Up

1. **Clone the repository**: 
   ```bash
   git clone <repository-url>
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```