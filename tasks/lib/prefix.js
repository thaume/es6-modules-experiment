let willNotBeExported = 143;
function prefix(x) {
    return prefixConf + x;
}
let prefixConf = 'app-';

export { prefix, prefixConf };
