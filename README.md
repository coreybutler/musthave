[![Build Status](https://travis-ci.org/coreybutler/musthave.svg)](https://travis-ci.org/coreybutler/musthave)

# musthave

This module provides a simple and standard way of checking for object attributes.
The inspiration for this project was checking for the existence of environment variables.

**Installation:** `npm install musthave`

This module contains minimal dependencies and [helps keep npm fit](https://medium.com/@goldglovecb/npm-needs-a-personal-trainer-537e0f8859c6).

### Use: HasAll

If your application requires the presence of a couple of envrionment variables, it's a good idea to make sure they exist as a simple sanity check when your application launches. The following code will log a warning to the console and throw an error if `IMPORTANT_VAR_1` _and_ `IMPORTANT_VAR_2` aren't in the environment variables.

```js
var MustHave = require('musthave');
var mh = new MustHave();

mh.hasAll(process.env, 'IMPORTANT_VAR_1', 'IMPORTANT_VAR_2'); // returns boolean
```

If the `hasAll` method fails, the missing attributes are available in `mh.missing` (returned as an array of strings).

### Use: HasAny

If you need to make sure an object has _at least_ one attribute of a specific name, use the `hasAny()` method.

```js
var MustHave = require('musthave');
var mh = new MustHave();

mh.hasAny(process.env, 'IMPORTANT_VAR_1', 'IMPORTANT_VAR_2'); // returns boolean
```

The code above will throw an error only if `process.env` does NOT have `IMPORTANT_VAR_1` _or_ `IMPORTANT_VAR_2`.

### Use: HasExactly

If you need to make sure an object has only a specific set of named attributes, use the `hasExactly()` method.

```js
var MustHave = require('musthave');
var mh = new MustHave();

mh.hasExactly(process.env, 'IMPORTANT_VAR_1', 'IMPORTANT_VAR_2'); // returns boolean
```

The code above will **not** throw and error _only if `process.env` has_ `IMPORTANT_VAR_1` _and_ `IMPORTANT_VAR_2`. If `process.env` has both of these _and_ another attribute like `NODE_ENV`, this method will throw an error because the object is not exactly as defined. You probably don't want to use this on `process.env` because it can change from system to system, but it can be useful on other kinds of objects like data models.

### Handling Errors & Suppressing Warnings

If you want to suppress warning messages, the `MustHave` module can be configured to do so. It can also be configured to not throw errors so your app can handle them as it sees fit. To accomodate these use cases, there are two configuration options that can be passed to the `MustHave()` object. Not providing a configuration is the same as:

```js
var MustHave = require('musthave');
var mh = new MustHave({
  throwOnError: true,      // Set this to false if you want to handle errors on our own
  suppressWarnings: false  // Set this to true if you don't want console output for warnings.
});
```
