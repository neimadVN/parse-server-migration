Parse.Promise = Promise;

Parse.Promise.as = Promise.resolve;
Parse.Promise.error = Promise.reject;
// Parse.Promise.is // dose not support
Parse.Promise.when = function (...agr) {
    if (agr.length > 1) {
        return Promise.all([...agr]).then().catch(err => {throw [err]});
    } else {
        return Promise.all(agr[0]).catch(err => {throw [err]});
    }
};

// Parse.Promise.protoype.always
Parse.Promise.prototype.done = Promise.prototype.then;
Parse.Promise.prototype.fail = Promise.prototype.catch;

class OverriderParsePromise extends Parse.Promise {
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