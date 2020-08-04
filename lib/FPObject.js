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
            (optIdx == 'last') ? (optIdx = args.length - 1) : (optIdx--);
            const backboneOpts = arguments[optIdx];
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
    Cloud: {
        run: 3
    },
    Config: {
        get: 1
    },
    File: {
        // prototype: {
        //     save: 'last'
        // }
    },
    Object: {
        destroyAll: 2,
        fetchAll: 2,
        saveAll: 2,
        fetchAllIfNeeded: 2,
        // prototype: {
        //     destroy: 1,
        //     fetch: 1,
        //     save: 'last',
        //     setACL: 2,
        // }
    },
    User: {
        logIn: 3,
        become: 2,
        enableRevocableSession: 1,
        requestPasswordReset: 2,
        signUp: 4,
        // prototype: {
        //     _upgradeToRevocableSession: 1,
        //     logIn: 1,
        //     signUp: 2
        // },
    },
}

const execGenerator = (BB_TABLET = BACKBONE_INDEX, prefixRoute = '') => {
    for (_class in BB_TABLET) {
        for (_method in BB_TABLET[_class]) {
            const value = _.get(BB_TABLET, `${_class}.${_method}`);
            if (_.isObject(value)) {
                execGenerator({[_method]: value}, `${_class}.`);
            } else {
                prefixRoute && console.log(`${prefixRoute}${_class}.${_method}`, value);
                generator(`${prefixRoute}${_class}.${_method}`, value);
            }
        }
    }
}

execGenerator(BACKBONE_INDEX, '');

module.exports = {};