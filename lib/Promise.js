Parse.Promise = Promise;

Parse.Promise.as = Promise.resolve;
Parse.Promise.error = Promise.reject;
// Parse.Promise.is // dose not support
Parse.Promise.when = Promise.all;

// Parse.Promise.protoype.always
Parse.Promise.prototype.done = Promise.prototype.then;
Parse.Promise.prototype.fail = Promise.prototype.catch;

module.exports = Parse;