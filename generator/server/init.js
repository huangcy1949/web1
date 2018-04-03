/*
 * 代码生成工具
 * node init.js
 * */
const ejs = require('ejs');
const config = require('./config.js');
const writeFileSync = require('./utils').writeFileSync;

/**
 * 基于配置，生成文件
 * @param cfg 配置信息
 */
function generateFile(cfg) {
    const {
        template,
        outPutFile,
    } = cfg;

    ejs.renderFile(template, cfg, (err, content) => {
        if (err) {
            console.error(err);
        } else {
            writeFileSync(outPutFile, content);
            console.log('successfully');
        }
    });
}

generateFile(config);
