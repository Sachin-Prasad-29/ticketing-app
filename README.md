# ticketing-app

## Requirements

```
1.node version 16+
2.typescritpt installed on system
3. ts-node and ts-node-dev installed on system

```

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
