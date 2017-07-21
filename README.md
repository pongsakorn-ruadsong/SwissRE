# README

## Starting the app

Starting the rails server:

```
rails s
```

And the Webpack compilation:

```
./bin/webpack-dev-server
```

## deployment

Precompile the assets.

```
RAILS_ENV=production rails assets:precompile
```

Commit them and push to production.
