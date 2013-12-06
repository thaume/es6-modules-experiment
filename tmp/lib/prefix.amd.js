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