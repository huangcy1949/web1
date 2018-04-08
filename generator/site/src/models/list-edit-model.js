export default {
    initialState: {
        outPutDir: {value: void 0},
        outPutFile: {value: void 0},
        template: {value: 'templates/model/list-edit-model.ejs'},
        loading: false,
    },

    setFields: (state, {payload}) => ({...payload}),
}
