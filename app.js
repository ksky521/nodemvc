//系统模块
var http = require('http');
var domain = require('domain');
var sysDomain = domain.create();
sysDomain.on('error', function(err) {
    delete err.domain;
    $.errlog(err, 0);
});

//全局~
global.$ = {
    version: '0.1.0'
};

var root = $.rootDir = __dirname + '/';
$.config = require(root + 'config/default.js');
var port = $.port = $.config.port || 80;
//路径
$.dir = {
    lib: root + 'lib/',
    system: root + 'system/',
    layout: root + 'layout/',
    module: root + 'module/',
    widget: root + 'widget/',
    config: root + 'config/',
    webroot: root + 'www/'
};
$.ejs = require('ejs');

//方便捕获系统级别的错误
sysDomain.run(function() {
    //下面加载模块有顺序！！！
    $.mime = require(root + 'system/mime.js');
    $.tools = require(root + 'system/tools.js');
    $.errlog = $.tools.log;
    $.log = require(root + 'system/log.js');
    $.layout = require(root + 'system/layout.js');
    $.router = require(root + 'system/router.js');
    $.mvc = require(root + 'system/mvc.js');
});



var app = http.createServer(function(req, res) {
    var dm = domain.create();

    dm.on('error', function(err) {
        $.errlog(err, 0);
        delete err.domain;
        err.type = err.type ? err.type : '500'
        try {
            res.on('finish', function() {
                process.nextTick(function() {
                    dm.dispose();
                });
            });
            err.url = req.url;
            if ($['is' + err.type]) {
                $['is' + err.type](req, res, err);
            }
        } catch (e) {
            delete e.domain;
            console.log(11111);
            $.errlog(e, 0);
            dm.dispose();
        }
    });

    dm.run(function() {
        $.mvc.start(req, res);
    });


}).listen(port);