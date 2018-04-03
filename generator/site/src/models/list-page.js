export default {
    initialState: {
        ajaxUrl: {value: void 0},
        routePath: {value: void 0},
        outPutDir: {value: void 0},
        outPutFile: {value: void 0},

        outPutFileExist: false,
        loading: false,
    },

    setFields: (state, {payload}) => ({...payload}),
}
