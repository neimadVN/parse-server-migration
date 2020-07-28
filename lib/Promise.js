const _ = require('lodash');

class ParsePromise extends Promise {
    constructor(callingFunction){
        if (!callingFunction) {
            /** [i] external resolver style:
                    const pr = new Parse.Promise();
                    pr.then(() => console.log('pr resolved'))
                    setTimeout(pr.resolve, 5000)
            */
            let resolve, reject;
            super((_resolve, _reject) => {
                resolve = _resolve, reject = _reject
            });
            this.resolve = resolve, this.reject = reject
            return;
        }

        super(callingFunction);
    }

    /** support spreaded params in .then callback */
    then(...args) {
        if (_.isFunction(args[0]) && args[0].length > 1) {
            const originCallback = args[0];
            args[0] = (array) => {
                if (_.isArray(array)) {
                    return originCallback(...array);
                }
                return originCallback(array);
            } 
        }
        return super.then(...args);
    }
}

ParsePromise.as = ParsePromise.resolve;
ParsePromise.error = ParsePromise.reject;
// ParsePromise.is // dose not support
ParsePromise.when = function (...agr) {
    if (agr.length > 1) {
        return ParsePromise.all([...agr]).catch(err => {throw [err]});
    } else {
        return ParsePromise.all(agr[0]).catch(err => {throw [err]});
    }
};

// ParsePromise.protoype.always
ParsePromise.prototype.done = ParsePromise.prototype.then;
ParsePromise.prototype.fail = ParsePromise.prototype.catch;

Parse.Promise = ParsePromise;

module.exports = Parse;