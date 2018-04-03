/*
 * 路由映射文件,配置越靠前，优先级越高
 * */
var express = require('express');
var router = express.Router();
const {generatorFiles, getSrcDirs, checkFileExist} = require('./controls/generator-files');

router.post('/api/generator-files', generatorFiles);

router.get('/api/get-src-dirs', getSrcDirs);
router.get('/api/check-file-exist', checkFileExist);

router.get('/', function (req, res, next) {
    res.render('index.html');
});

module.exports = router;
