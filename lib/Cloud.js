const v2tov4 = (functionv2) => {
    return function (request) {
        return new Promise((resolve, reject) => {
            const response = {
                success: resolve,
                error: (...args) => {
                    let result = args[0];
                    if (args > 1) {
                        result = new Parse.Error(...args);
                    }
                    return reject(result);
                }
            };
            functionv2(request, response);
        })
    }
}

const getWrapper = (handler) => {
    if (handler.length == 2) {
        console.log(handler, 'v2')
        return v2tov4(handler);
    } else {
        console.log(handler, 'ok')
        return handler;
    }
}

Parse.Cloud.originDefine = Parse.Cloud.define;
Parse.Cloud.define = (cloudFName = '', handler = () => {}) => {
    Parse.Cloud.originDefine(cloudFName, getWrapper(handler));
}

Parse.Cloud.originJob = Parse.Cloud.job;
Parse.Cloud.job = (cloudFName = '', handler = () => {}) => {
    Parse.Cloud.originJob(cloudFName, getWrapper(handler));
}

Parse.Cloud.originAfterDelete = Parse.Cloud.afterDelete;
Parse.Cloud.afterDelete = (cloudFName = '', handler = () => {}) => {
    Parse.Cloud.originAfterDelete(cloudFName, getWrapper(handler));
}

Parse.Cloud.originAfterSave = Parse.Cloud.afterSave;
Parse.Cloud.afterSave = (cloudFName = '', handler = () => {}) => {
    Parse.Cloud.originAfterSave(cloudFName, getWrapper(handler));
}

Parse.Cloud.originBeforeDelete = Parse.Cloud.beforeDelete;
Parse.Cloud.beforeDelete = (cloudFName = '', handler = () => {}) => {
    Parse.Cloud.originBeforeDelete(cloudFName, getWrapper(handler));
}

Parse.Cloud.originBeforeSave = Parse.Cloud.beforeSave;
Parse.Cloud.beforeSave = (cloudFName = '', handler = () => {}) => {
    Parse.Cloud.originBeforeSave(cloudFName, getWrapper(handler));
}

module.exports = Parse;