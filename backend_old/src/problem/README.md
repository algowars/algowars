# Domain

Problem

## Description

The **Problem Domain** is crucial for managing the lifecycle of coding problems. This includes creating, updating, retrieving, and deleting problems. Each problem is a unique entity with specific attributes that make it suitable for competitive programming.

## Entities

### Problem

| Column Name | Data Type   | Nullable | Length | Unique | Default           | Description               |
| ----------- | ----------- | -------- | ------ | ------ | ----------------- | ------------------------- |
| title       | string      | false    | 100    | false  |                   | The title of the problem. |
| question    | text        | false    |        | false  |                   | The problem description.  |
| slug        | string      | false    | 110    | true   |                   | Unique identifier slug.   |
| rating      | number      | true     |        | false  |                   | Rating of the problem.    |
| createdAt   | timestamptz | false    |        | false  | CURRENT_TIMESTAMP | Creation timestamp.       |
| updatedAt   | timestamptz | false    |        | false  | CURRENT_TIMESTAMP | Last updated timestamp.   |
