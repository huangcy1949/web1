const {walkDir} = require('./utils');

const result = walkDir('/Users/wangshubin/workspace/suixingpay/suixingpay-fe-admin/src');
console.log(JSON.stringify(result, null, 2));
