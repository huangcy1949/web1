const path = require('path');
const fs = require('fs');
const {walkDir, generateFile} = require('../utils');

module.exports = {
    generatorFiles(req, res, next) {
        const {baseInfo, listPage} = req.body;
        const generates = [];

        if (listPage) {
            listPage.outPutFile = path.resolve(listPage.outPutDir, listPage.outPutFile);
            const config = {
                fields: [                           // 字段配置
                    {title: '用户名', dataIndex: 'name'},
                    {title: '性别', dataIndex: 'gender'},
                    {title: '年龄', dataIndex: 'age'},
                    {title: '工作', dataIndex: 'job'},
                ],
                queryItems: [],
                toolItems: [],
                template: 'templates/list-edit/list.ejs',

                ...baseInfo,
                ...listPage,
            };
            generates.push(generateFile(config));
        }

        Promise.all(generates).then(() => {
            res.send(true);
        });
    },

    getSrcDirs(req, res, next) {
        const src = path.resolve('../../src');
        const pages = walkDir(path.resolve(src, 'pages'), path.resolve('../../'));
        const models = walkDir(path.resolve(src, 'models'), path.resolve('../../'));
        res.send([pages, models]);
    },

    checkFileExist(req, res, next) {
        const {files} = req.query;
        const result = [];

        files.forEach(item => {
            const {fileDir, fileName} = JSON.parse(item);
            const file = path.resolve(fileDir, fileName);
            const exist = fs.existsSync(file);
            result.push({
                fileName,
                exist,
            });
        });

        res.send(result);
    },
};
