#What do this package do?
This package is used to apply newer **parse server** (v.3.x or above) from v.2.x without changing current source code.

#Including
In 3.0.0, Parse.Promise is deprecated/removed, those code using Parse.Promise would fail. Also, Cloud functions interface now is Promise, they don't use callback response.success or response.error anymore.

This package would override these deprecated/removed interfaces so old codes would work again
 * Parse.Promise => Promise
 * Parse.Cloud(request, response) => Parse.Cloud(request)

#Usage
install the package
```npm i parse-server-migration```

import the package anywhere is your code but make sure that you do it after init Parse server and before defining Cloud code
```require('parse-server-migration')```

I recommend that this package just help you deal with old legacy codes, for new code, please follow latest Parse.com guideline.