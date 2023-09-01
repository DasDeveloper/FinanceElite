
# FianceElite

This web application allows users to record, track and manage their financial transactions using our reliable charts and tables.


## Run Locally

Clone the project

```bash
  git clone https://github.com/DasDeveloper/FinanceElite.git
```

Go to the project directory

```bash
  cd FinanceElite
```
Open two terminals. One for the client and one for the server.

For the client, cd to the client folder and run these command:
```bash
  cd client
  npm install
  npm start
  
```

For the server, cd to the server folder and run these command:
```bash
  cd server
  npm install
  npm start
  
```



## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DATABASE` = Your MongoDB database url.

`SECRET_SESSION_KEY` = A secret key for your encrypt your sessions.

`SESSION_MAX_AGE` = A number that represents how long a session should last in milliseconds. 

`STRIPE_PUBLIC_KEY` = The publishable key provided by Stripe.

`STRIPE_SECRET_KEY` = The secret key provided by Stripe. (Do not share this with anyone.)

`WEB_URL` = The url react application(client).




## Authors

- [@dasdeveloper](https://www.github.com/dasdeveloper)


 
