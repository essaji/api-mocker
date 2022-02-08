# API Mocker!

No more excuse about the backend not being ready.

## Development

### Adding Data Source
Depending upon which datasource you're using (in our case mongodb)

From your terminal:

```shell
export DATABASE_PROVIDER="mongodb"
export DATABASE_URL="mongodb+srv://<USER>:<PASS>@cluster0.mxx5x.mongodb.net/<DATABASE_NAME>?retryWrites=true&w=majority"
```

And then
```sh
npm run dev
```

This starts your app in development mode, rebuilding assets on file changes.