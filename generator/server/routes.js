/*
 * 路由映射文件,配置越靠前，优先级越高
 * */
const express = require('express');
const router = express.Router();
const {
    generatorFiles,
    getSrcDirs,
    checkFileExist,
    getFileContent,
} = require('./controls/generator-files');

router.post('/api/generator-files', generatorFiles);

router.get('/api/get-src-dirs', getSrcDirs);
router.get('/api/check-file-exist', checkFileExist);
router.post('/api/get-file-content', getFileContent);


router.get('/', function (req, res, next) {
    res.render('index.html');
});

module.exports = router;
