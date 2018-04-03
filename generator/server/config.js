const config = {
    name: 'user-center',                // 模块名称
    chineseName: '中文名称',             // 中文名称
    lowercaseName: 'userCenter',        // 首字母小写 驼峰命名
    capitalName: 'UserCenter',          // 首字母大写 驼峰命令，一般用于命名class
    allCapitalName: 'USER_CENTER',      // 全部大写
    pluralityName: 'userCenters',       // 复数
    ajaxUrl: '/v1/user-center',         // ajax请求路径
    routePath: '/user/center/list',     // 路由地址
    permissionPrefix: 'USER_CENTER',    // 权限前缀
    fields: [                           // 字段配置
        {title: '用户名', dataIndex: 'name'},
        {title: '性别', dataIndex: 'gender'},
        {title: '年龄', dataIndex: 'age'},
        {title: '工作', dataIndex: 'job'},
    ],
    queryItems: [],
    toolItems: [],
    outPutFile: '../src/pages/user-center/UserCenterList.jsx', // 输出文件
    template: './templates/list-edit/list.ejs', // 使用的模版
};

module.exports = config;
