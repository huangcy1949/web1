const path = require('path');
const fs = require('fs');
const ejs = require('ejs');

/**
 * 连字符(-) 命名 转 首字母大写转驼峰命名
 * @param str
 */
function firstUpperCase(str) {
    const s = str.replace(/\b(\w)(\w*)/g, ($0, $1, $2) => $1.toUpperCase() + $2);
    return s.replace(/-/g, '');
}

/**
 * 连字符(-) 命名 转 首字母小写 驼峰命名
 * @param str
 */
function firstLowerCase(str) {
    return str.replace(/-(\w)/g, (a, b) => b.toUpperCase());
}

/**
 * 连字符(-) 命名 转 大写 + 下划线
 * @param str
 * @returns {string}
 */
function allUpperCase(str) {
    const s = str.toUpperCase();
    return s.replace(/-/g, '_');
}

/**
 * 写文件，如果目录不存在直接创建
 * @param toFile
 * @param content
 */
function writeFileSync(toFile, content) {
    const sep = path.sep;
    const folders = path.dirname(toFile).split(sep);
    let p = '';
    while (folders.length) {
        p += folders.shift() + sep;
        if (!fs.existsSync(p)) {
            fs.mkdirSync(p);
        }
    }

    fs.writeFileSync(toFile, content);
}


function walkDir(dir, root) {
    const sep = path.sep;

    const label = dir.split(sep)[dir.split(sep).length - 1];

    let result = {
        key: dir,
        label,
        value: dir,
        shortValue: dir.replace(root, ''),
    };


    fs.readdirSync(dir).forEach(function (filename) {
        const path = dir + sep + filename;
        const stat = fs.statSync(path);

        if (!result.children) result.children = [];

        if (stat && stat.isDirectory()) {
            result.children = result.children.concat(walkDir(path, root))
        }
    });

    return result;
}


/**
 * 基于配置，生成文件
 * @param cfg 配置信息
 */
function generateFile(cfg) {
    const {
        template,
        outPutFile,
    } = cfg;

    return new Promise((resolve, reject) => {
        ejs.renderFile(template, cfg, (err, content) => {
            if (err) {
                reject(err);
            } else {
                writeFileSync(outPutFile, content);
                resolve();
            }
        });
    });
}

module.exports = {
    firstUpperCase,
    firstLowerCase,
    allUpperCase,
    writeFileSync,
    walkDir,
    generateFile,
};
