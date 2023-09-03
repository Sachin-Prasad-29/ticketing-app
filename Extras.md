```


  if (err instanceof RequestValidationError) {
    const formattedErrors = err.errors.map((error) => {
      if (error.type === 'field') {
        return { message: error.msg, field: error.path };
      }
    });
    return res.status(400).send({ errors: formattedErrors });
  }

```

```
  serializeErrors() {
    return this.errors.map((err) => {
      if (err.type === 'field') {
        return { message: err.msg, field: err.path };
      }
      return { message: err.msg };
    });
  }
```

## Secrets command

kubectl create secret generic jwt-secret --from -literal=JWT_KEY='abcd'

{
"email":"sachin@gmail.com",
"password":"Test@123"
}

```
FROM node:alpine

WORKDIR /app
COPY package.json .
RUN npm install --omit=dev
COPY . .

CMD ["npm", "start"]
```


In the upcoming lecture, we will be setting up our test environment with MongoMemoryServer. If you are using the latest versions of this library a few changes will be required:

In auth/src/test/setup.ts, change these lines:

  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();
to this:

  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();


Remove the useNewUrlParser and useUnifiedTopology parameters from the connect method. Change this:

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
to this:

  await mongoose.connect(mongoUri, {});


Then, find the afterAll hook and add a conditional check:

afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }
  await mongoose.connection.close();
});


In the upcoming lecture (and later with the ticketing, orders and payments services) you may end up seeing a TS error like this in your test/setup.ts file:

Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature.ts(7017)

To fix, find the following lines of code in src/test/setup.ts:

declare global {
  namespace NodeJS {
    export interface Global {
      signin(): Promise<string[]>;
    }
  }
}
change to:

    declare global {
      var signin: () => Promise<string[]>;
    }