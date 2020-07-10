Parse.Promise = Promise;

Parse.Promise.as = Promise.resolve;
Parse.Promise.error = Promise.reject;
// Parse.Promise.is // dose not support
Parse.Promise.when = function (...agr) {
    if (agr.length > 1) {
        return Promise.all([...agr]);
    } else {
        return Promise.all(agr[0]);
    }
};

// Parse.Promise.protoype.always
Parse.Promise.prototype.done = Promise.prototype.then;
Parse.Promise.prototype.fail = Promise.prototype.catch;

module.exports = Parse;