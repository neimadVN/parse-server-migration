ParsePromise = Promise;

ParsePromise.as = Promise.resolve;
ParsePromise.error = Promise.reject;
// ParsePromise.is // dose not support
ParsePromise.when = function (...agr) {
    if (agr.length > 1) {
        return Promise.all([...agr]).then().catch(err => {throw [err]});
    } else {
        return Promise.all(agr[0]).catch(err => {throw [err]});
    }
};

// ParsePromise.protoype.always
ParsePromise.prototype.done = Promise.prototype.then;
ParsePromise.prototype.fail = Promise.prototype.catch;

class OverriderParsePromise extends ParsePromise {
    constructor(callingFunction){
        if (callingFunction) {
            return super(callingFunction);
        }
        
        let resolve, reject, promise = new Promise((_resolve, _reject) => {
            resolve = _resolve, reject = _reject
        })
        promise.resolve = resolve, promise.reject = reject
        return promise;
    }
}

Parse.Promise = OverriderParsePromise;

module.exports = Parse;