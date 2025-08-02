### Backend Application: CRUD for Directory and Tasks Collections

For this homework, you will create the backend of the application with CRUD functionalities for two collections: **Directory** and **Task**. Your task is to implement RESTful APIs that allow users to manage directories and tasks. The tasks collection should reference the directory collection to associate tasks with a specific directory.

#### Schema Details

1. **Directory Collection Schema**:

   - `name` (string): Represents the name of the directory.

   **Example**:

   ```json
   {
     "name": "Work Projects"
   }
   ```

2. **Tasks Collection Schema**:

   - `title` (string): Title of the task.
   - `description` (string): Detailed description of the task.
   - `completed` (boolean): Whether the task is completed.
   - `important` (boolean): Indicates if the task is marked as important.
   - `deadline` (Date): Due date of the task.
   - `dirId` (reference): A foreign key reference to the **Directory** collection.

   **Example**:

   ```json
   {
     "title": "Complete Backend Homework",
     "description": "Implement CRUD operations for directory and task collections",
     "completed": false,
     "important": true,
     "deadline": "2024-10-20T00:00:00Z",
     "dirId": "648e6b567e563f1d3ca67e4b"
   }
   ```

#### Requirements:

1. **CRUD for Directory**:

   - **Create a Directory** (`POST /api/directories`): Add a new directory.
   - **Read Directories** (`GET /api/directories`): Retrieve a list of all directories.
   - **Update a Directory** (`PUT /api/directories/:id`): Update the name of a specific directory.
   - **Delete a Directory** (`DELETE /api/directories/:id`): Delete a specific directory.

2. **CRUD for Tasks**:

   - **Create a Task** (`POST /api/tasks`): Add a new task. Each task must be associated with a directory via the `dirId` field.
   - **Read Tasks** (`GET /api/tasks`): Retrieve a list of all tasks.
   - **Read Tasks by Directory** (`GET /api/directories/:dirId/tasks`): Retrieve all tasks for a specific directory.
   - **Update a Task** (`PUT /api/tasks/:id`): Update details of a specific task (e.g., mark it as completed, change title, etc.).
   - **Delete a Task** (`DELETE /api/tasks/:id`): Delete a specific task.

3. **Relations**:
   - The `dirId` field in the **Tasks** collection should reference the **Directory** collection to establish a relation between tasks and directories.

#### OPTIONAL:

- Optional: Implement pagination for tasks if the list gets large.
