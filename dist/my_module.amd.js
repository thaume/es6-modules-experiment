define("lib/prefix", 
  ["exports"],
  function(__exports__) {
    "use strict";
    let willNotBeExported = 143;
    function prefix(x) {
        return prefixConf + x;
    }
    let prefixConf = 'app-';

    __exports__.prefix = prefix;
    __exports__.prefixConf = prefixConf;
  });
define("main", 
  ["lib/prefix"],
  function(__dependency1__) {
    "use strict";
    var prefix = __dependency1__.prefix;
    console.log( prefix('users-model') );
  });