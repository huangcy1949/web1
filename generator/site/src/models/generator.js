import {ajax} from '../commons/ajax';

export default {
    initialState: {
        loading: false,
        srcDirectories: [],
    },

    generatorFiles: {
        payload: ({params, options} = {}) => ajax.post('/generator-files', params, options),
        reducer: {
            pending: () => ({loading: true}),
            resolve(state, {payload = {}}) {
                console.log(payload);
                return {};
            },
            complete: () => ({loading: false}),
        }
    },

    getFileContent: {
        payload: ({params, options} = {}) => ajax.post('/get-file-content', params, options),
    },

    getSrcDirs: {
        payload: ({params, options} = {}) => ajax.get('/get-src-dirs', params, options),
        reducer: {
            pending: () => ({loading: true}),
            resolve(state, {payload = {}}) {
                return {srcDirectories: payload};
            },
            complete: () => ({loading: false}),
        }
    },


    checkFileExist: {
        payload: ({params, options} = {}) => ajax.get('/check-file-exist', params, options),
    }
}
