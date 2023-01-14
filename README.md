# Listify - Cassandra Keddis, Chelsea Dwarika, Sheri Lu, Gaurav Mahant

Listify is a smart to-do list application we created for our midterm project at Lighthouse Labs.

# Process and Outcomes

- Create __Entity Relationship Diagram__ based on given data requirements and relations.
- Create a __wireframe__ to start our CSS/SASS/HTML.
- Create database tables (__tasks__ and __users__).
- Create and insert task/user seed data into tables. 
- Create an __express__ server.
- Implement __Node Postgres__ *(pg)* to link server with database and show real task data to users.
- Implement the API __UClassify__ to filter tasks by one of four given categories: __Things to Eat__, __Things to Read__, __Things to Buy__, __Things to Watch__.

Users can login to view previously added to-do list items, add a new task with a __priority__ and a __due date__, edit a task, delete a task - these actions manipulate items both on the front end and in the database.
Users can filter tasks by one of the four categories using the API.


## Getting Started

1. Clone this project from github.

2. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`

3. Update the .env file with your correct local information

- username: `labber`
- password: `labber`
- database: `midterm`

4. Install dependencies: `npm i`

5. Fix to binaries for sass: `npm rebuild node-sass`

6. Reset database: `npm run db:reset`
Check the db folder to see what gets created and seeded in the SDB

7. Run the server: `npm run local`
- Note: nodemon is used, so you should not have to restart your server

8. Visit `http://localhost:8080/`


## Dependencies

- Node 10.x or above
- NPM 5.x or above
- PG 6.x
- cookie-parser
- cookie-session
- dotenv
- ejs
- express
- morgan
- pg
- sass
- tiny-json-http

## Dev Dependencies
- nodemon

## Screenshots

Listify Login Page
!["Listify Login Page"](https://github.com/cassie-eve/smartTodolist/blob/master/public/images/login_listify.png?raw=true)
Listify To-do List
!["Listify To-do List"](https://github.com/cassie-eve/smartTodolist/blob/master/public/images/todolist_listify.png?raw=true)
Listify UClassify Filters
!["Listify UClassify Filters"](https://github.com/cassie-eve/smartTodolist/blob/master/public/images/filters_listify.png?raw=true)


