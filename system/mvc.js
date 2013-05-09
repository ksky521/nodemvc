//系统模块
var fs = require('fs');
var path = require('path');
var URL = require('url');
var querystring = require('querystring');

//非系统模块

var router = $.router;
var mime = $.mime;
var log = $.log;
var layout = $.layout;
var moduleDir = $.dir.module;
//配置相关

var config = $.config;
var charset = config.charset;
var encoding = config.encoding;
var _ = {
    start: handlerQuery
};

module.exports = _;



function handlerQuery(req, res) {
    //获取请求的module和action
    var moduleObj = router.parse(req.url, req.method);
    if (moduleObj.module && moduleObj.action) {
        //找到module和action啦
        var tmpDir = moduleDir + moduleObj.module;
        var dir = tmpDir + '/action/' + moduleObj.action + '.js';
        if (!fs.existsSync(dir)) {
            throw new Error(dir + '系统模块找不到');
        }
        var action = require(dir);
        var template;
        var method = req.method.toLowerCase();
        if (action[method]) {
            action[method](moduleObj, req, res);
            var templatePath = tmpDir + '/tpl/' + moduleObj.action + '.html';
            if (!fs.existsSync(templatePath)) {
                template = 'i am empty';
            } else {
                template = fs.readFileSync(templatePath, encoding).toString();
                template = layout.render(template, action, moduleObj.module, moduleObj.action);
            }
            renderHtml(template, res);
        } else {
            throw new Error(dir + 'action不支持' + method + '请求');
        }
    } else {
        is404(req, res, moduleObj);
    }
}
var renderHtml = function(tpl, res) {
    res.statusCode = 200;
    res.writeHead(200, {
        'Content-Type': $.mime.html + '; charset=' + charset,
        'Content-Length': tpl.length
    });
    res.end(tpl);
}
var is404 = $.is404 = function is404(req, res, data) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end(data.url + '没找到');
}

var is500 = $.is500 = function is500(req, res, data) {

    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/plain');
    res.end('500错误：' + data.message);
}

var sendJson = $.sendJson = function(req, res, data) {
    res.statusCode = 200;
    res.setHeader('Content-Type', $.mime.json);
    try {
        res.end(JSON.stringify(json));
    } catch (e) {
        res.end(JSON.stringify({
            message: '解析json数据失败'
        }));
    }
}