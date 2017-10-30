# REST-GraphQL-comparison
NodeJS + ReactJS

GraphQL and REST performance comparison

Install RethinkDB to path C:/RethinkDB or change the path in package.json file. npm install to install node modules.  

npm run dev  - to run the project
  
localhost:3001 on frontend  
localhost:3000 on backend  
localhost:8080 on rethinkdb   
localhost:3000/graphql on graphiql UI  
localhost:3000/api/products on REST test  

Create table

r.db("sample_data").tableCreate("gibberish")

Open browser and go to localhost:3000/api/generate-gibberish and wait for the page to load