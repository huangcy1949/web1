import {getUsersByPageSize} from './mockdata/user';

export default {
    'get /mock/user-center': (config) => {
        const {
            pageSize,
            pageNum,
        } = config.params;


        return new Promise((resolve) => {
            setTimeout(() => {
                resolve([200, {
                    pageNum,
                    pageSize,
                    total: 888,
                    list: getUsersByPageSize(pageSize),
                }]);
            }, 1000);
        });
    },
    'post /mock/user-center': true,
    'put /mock/user-center': true,
    'delete /mock/user-center/{id}': 'id',
}
