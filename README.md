#mongoose-v2-compat
====================

Adds a compatibility layer to Mongoose v3 to regain most of the API sugar from Mongoose v2.

## install

```
npm install mongoose-v2-compat
```

Example:

```js
require('mongoose-v2-compat');

// now we can use all the old methods
mongoose.connectSet('...');

Thing.where('tags').$in(array).asc('name').run(callback);
```

## Provided methods

  - Query#$or
  - Query#$nor
  - Query#$gt
  - Query#$gte
  - Query#$lt
  - Query#$lte
  - Query#$ne
  - Query#$in
  - Query#$nin
  - Query#$all
  - Query#$regex
  - Query#$size
  - Query#$maxDistance
  - Query#$mod
  - Query#$near
  - Query#$exists
  - Query#$elemMatch
  - Query#$within
  - Query#$box
  - Query#$center
  - Query#$centerSphere
  - Query#$slice
  - Query#run
  - Query#notEqualTo
  - Query#wherein
  - Query#fields
  - Query#asc
  - Query#desc
  - mongoose.createSetConnection
  - mongoose.connectSet

## tests

Run the tests with `make test`.

[LICENSE](https://github.com/aheckmann/mongoose-v2-compat/blob/master/LICENSE)

