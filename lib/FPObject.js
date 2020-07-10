// https://parseplatform.org/Parse-SDK-JS/api/v1.11.1/
const _ = require('lodash');

const o_successHander = (data) => data;
const o_errHander = (err) => { throw err};

const generator = (functionName, optIdx) => {
    const Parse_OriginFunction = _.get(Parse, functionName);
    if (typeof Parse_OriginFunction !== 'function') {
        return Parse_OriginFunction;
    }

    _.set(Parse, `${functionName}Origin`, Parse_OriginFunction)
    _.set(Parse, functionName,
        function (...args) {
            const backboneOpts = arguments[--optIdx];
            let successHander = o_successHander;
            let errHander = o_errHander;
            
            if (typeof backboneOpts === 'object') {
                if (backboneOpts.success) {
                    successHander = backboneOpts.success;
                    delete backboneOpts.success;
                }
                if (backboneOpts.error) {
                    errHander = backboneOpts.error;
                    delete backboneOpts.error;
                }
            }
            return _.get(Parse, `${functionName}Origin`)(...args).then(successHander, errHander);
        }
    );
    return Parse[`${functionName}Origin`];
}

const BACKBONE_INDEX = {
    Analytics: {
        track: 3
    },
    Object: {
        saveAll: 2
    }
}

for (_class in BACKBONE_INDEX) {
    for (_method in BACKBONE_INDEX[_class]) {
        generator(`${_class}.${_method}`, _.get(BACKBONE_INDEX, `${_class}.${_method}`))
    }
}


module.exports = {};