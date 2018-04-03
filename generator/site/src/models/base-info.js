export default {
    initialState: {
        name: {value: ''},
        chineseName: {value: ''},
        lowercaseName: {value: ''},
        capitalName: {value: ''},
        allCapitalName: {value: ''},
        pluralityName: {value: ''},
        permissionPrefix: {value: ''},
    },

    setFields: (state, {payload}) => ({...payload}),
}
