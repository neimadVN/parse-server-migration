# What do this package do?
This package is used to apply newer **parse server** (v.3.x or above) from v.2.x without changing current source code.

# Including
In 3.0.0, Parse.Promise is deprecated/removed, those code using Parse.Promise would fail. Also, Cloud functions interface now is Promise, they don't use callback response.success or response.error anymore.

This package would override these deprecated/removed interfaces so old codes would work again
 * Parse.Promise => Promise
 * Parse.Cloud(request, response) => Parse.Cloud(request)

# Usage
First, be free to upgrade your `parse-server` from v.2.x to latest
<pre><code>npm i parse-server@latest
npm i parse@latest</code></pre>

install `parse-server-migration` package

<pre><code>npm i parse-server-migration</code></pre>

import the package anywhere is your code but make sure that you do it after init Parse server and before defining Cloud code

<pre><code>require('parse-server-migration');</code></pre>

I recommend that this package just help you deal with old legacy codes, for new code, please follow latest Parse.com guideline.

# Some unsupported functions
 * `Parse.Promise.is`
 * `Parse.Promise.alway`

if these codes aboves appear in your source code, please update it, because there is no similar thing like this in current native Promise of JS.

Also, beware of `Parse.Promise.when`, because with this package, `.when` is an alias of `.all`, so in `.catch`, error is now an `Object.Error` instead of `Array<Object.Error>`