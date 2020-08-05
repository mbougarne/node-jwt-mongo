# Node JWT MongoDB

An app in Node with JWT and Mongo, it follows tutorial created on [BezKoder](https://bezkoder.com/node-js-mongodb-auth-jwt/)

## Install

To install the app, run:

```bash
git clone https://github.com/mbougarne/node-jwt-mongo.git
npm install
cp ./env.example ./.env
```

Then go to ```.env``` and update it with your credentials, after that run this command to migrate database:

```bash
npm run migrate
```

You can run the app then using ```npm start```

### Thanks

Thanks to  [BezKoder](https://bezkoder.com)
