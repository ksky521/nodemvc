var path = require('path');
var querystring = require('querystring');
var URL = require('url');

var root = $.rootDir;
var configDir = root + 'config/';
var routerMap = require(configDir + 'router');
var tools = $.tools;
var mime = $.mime;
var _ = {};


var reg2 = /{(.*?)}/g;
var reg3 = /^{|}$/g;
var regRouterMap = {};
for (var key in routerMap) {

    reg2.lastIndex = 0;
    var val = routerMap[key];
    if (tools.isString(val)) {
        val = {
            url: val
        };
    }
    var _url = val.url;
    var params = val.params || {};
    // var m = 
    var count = 1;
    var obj = {};
    _url = _url.replace(reg2, function(v) {
        reg2.lastIndex = 0;
        var name = v.replace(reg3, '');
        if (params[name]) {
            obj[count++] = name;
            return '(' + params[name] + ')';
        }
        return v;
    });
    obj.reg = new RegExp('^' + _url.replace(/\//g, '\\/') + '$');
    regRouterMap[key] = obj;
}
//修改好的正则
_.regRouterMap = regRouterMap;
reg2 = reg3 = null;

// console.log(regRouterMap);


//通过url获取Router相关信息
_.parse = function(url, method) {

    var obj = {
        url: url
    };
    /**
    '/abc/1.html?t=111'=>
    { search: '?t=111',
      query: 't=111',
      pathname: '/abc/1.html',
      path: '/abc/1.html?t=111',
      href: '/abc/1.html?t=111' }

    'abc/1.html?t=111'=>
    { search: '?t=111',
      query: 't=111',
      pathname: 'abc/1.html',
      path: 'abc/1.html?t=111',
      href: 'abc/1.html?t=111' }
    */
    obj.method = method = method ? method.toLowerCase() : 'get';
    var tmp = URL.parse(url, true); //true同时解析querystring

    var ext = mime.path2ext(tmp.pathname);
    url = tmp.pathname.replace(/^\/|\/$/g, ''); //去掉两头/
    if (url === '') {
        url = '/';
    } else {
        url = url.replace(/\..*$/, '');
    }
    var args = null;
    // var ext = url.mathch;
    for (var key in regRouterMap) {
        var _obj = regRouterMap[key];
        var arr = _obj.reg.exec(url);
        if (arr) {
            args = {};
            for (var i = 1, len = arr.length; i < len; i++) {
                var type = _obj[i];
                args[type] = arr[i];
            }
            key = key.split('/');
            obj.module = key[0];
            obj.action = key[1];

            break;
        }
    }
    obj.args = args;
    obj.query = tmp.query;
    return obj;
}



module.exports = _;