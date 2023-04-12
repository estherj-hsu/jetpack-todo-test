## Esther's Note

 - Use [JSONPlaceholder](https://jsonplaceholder.typicode.com/) for API
 - Fetch the first 10 items from the API onMount and add `completed`, `created_at`, and `updated_at`. By default, the first 3 items will be `completed: true`.

------------------------------


## Description

You are tasked with building a simple TODO application using Laravel, ReactJS (or Next.js), and Tailwind CSS.

The application should allow users to:

- Create a new TODO item
- Mark a TODO item as completed
- Delete a TODO item
- View a list of all TODO items

## Requirements

### Backend

The backend of the application should be built using Laravel.

The application should have a RESTful API that allows users to create, read, update, and delete TODO items.

Each TODO item should have the following properties:

- `id`: unique identifier for the TODO item
- `title`: the title of the TODO item
- `description`: a description of the TODO item
- `completed`: a boolean value indicating whether the TODO item has been completed or not
- `created_at`: the date and time when the TODO item was created
- `updated_at`: the date and time when the TODO item was last updated

### Frontend

The frontend of the application should be built using ReactJS and Tailwind CSS.

The frontend should have the following pages:

- A homepage that displays a list of all TODO items
- A page to create a new TODO item
- A page to edit an existing TODO item
- A page to view a single TODO item

The homepage should display a list of all TODO items, sorted by the date and time when they were created. Each TODO item in the list should display the following information:

- Title
- Description
- Date and time when the TODO item was created
- Status (completed or not)

The user should be able to mark a TODO item as completed, delete a TODO item, and navigate to the pages to create, edit, and view TODO items.

The create and edit pages should allow the user to enter the title and description of the TODO item, and mark it as completed or not.

The view page should display all the information about the TODO item, including the date and time when it was last updated.

## Instructions

1. Fork this repository
2. Implement the TODO application according to the requirements above
3. Push your code to your forked repository
4. Send the link to your forked repository to the interviewer
5. Jetpack team will review the candidate's code and assess their skills in a group interview

## Evaluation criteria

- Code quality and organization
- Use of best practices
- Use of Laravel, ReactJS, and Tailwind CSS
- Use of RESTful API principles
- User interface design and usability

## Bonus points

- Use of React Router for client-side routing
- Use of Redux for state management
- Use of Laravel Sanctum for authentication
- Use of Docker for containerization
- Use of automated testing (e.g., PHPUnit, Jest, Enzyme, etc.)
