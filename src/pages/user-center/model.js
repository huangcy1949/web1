import {ajax} from '../../commons/ajax';

export default {
    initialState: {
        dataSource: [],
        total: 0,
        loading: false,
        data: {},
        fetchingData: false,
        deleting: false,
        saving: false,
        updating: false,
    },

    getByPage: {
        payload: ({params, options}) => ajax.get('/mock/user-center', params, options),
        reducer: {
            pending: () => ({loading: true}),
            resolve: (state, {payload = {}}) => {
                const {total = 0, list = []} = payload;
                return {
                    dataSource: list,
                    total,
                };
            },
            complete: () => ({loading: false}),
        }
    },

    deleteById: {
        payload: ({params, options}) => ajax.del(`/mock/user-center/${params.id}`, null, options),
        reducer: {
            padding: () => ({deleting: true}),
            resolve: (state, {payload = ''}) => {
                const dataSource = [...state.dataSource];
                const newDataSource = dataSource.filter(item => item.id !== payload);
                return {
                    dataSource: newDataSource,
                };
            },
            complete: () => ({deleting: false}),
        },
    },

    getById: {
        payload: ({params, options}) => ajax.get(`/mock/user-center/${params.id}`, params, options),
        reducer: {
            pending: () => ({fetchingData: true}),
            resolve: (state, {payload = {}}) => ({data: payload}),
            complete: () => ({fetchingData: false}),
        }
    },

    save: {
        payload: ({params, options}) => ajax.post('/mock/user-center', params, options),
        reducer: {
            padding: () => ({saving: true}),
            complete: () => ({saving: false}),
        }
    },

    update: {
        payload: ({params, options}) => ajax.put('/mock/user-center', params, options),
        reducer: {
            padding: () => ({updating: true}),
            complete: () => ({updating: false}),
        }
    },
}