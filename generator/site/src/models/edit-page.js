export default {
    initialState: {
        ajaxUrl: {value: void 0},
        routePath: {value: void 0},
        outPutDir: {value: void 0},
        outPutFile: {value: void 0},
        template: {value: 'templates/list-edit/edit.ejs'},
        fields: {value: [{id: 'init-field', title: '', dataIndex: ''}]},

        loading: false,
    },

    setFields: (state, {payload}) => ({...payload}),
}
