var cleanObj = {};
var emptyArr = [];
var arrSlice = emptyArr.slice;
var _ = {};
var config = require('../config/default.js');
_.logLevel = config.debug;
if(config.production){
    //如果是生产环境
    _.logLevel = -1;
}
/**
 *  将调试信息打印到控制台或页面
 *  $.log(str, level )
 *  @param {Any} str 用于打印的信息，不是字符串将转换为字符串
 *  @param {Number} level ? 通过它来过滤显示到控制台的日志数量。
 *          0为最少，只显示最致命的错误；7，则连普通的调试消息也打印出来。
 *          显示算法为 level <= config.debug。
 *          这个config.level默认为9。下面是level各代表的含义，生产环境为-1
 *          0 EMERGENCY 致命错误,框架崩溃
 *          1 ALERT 需要立即采取措施进行修复
 *          2 CRITICAL 危急错误
 *          3 ERROR 异常
 *          4 WARNING 警告
 *          5 NOTICE 通知用户已经进行到方法
 *          6 INFO 更一般化的通知
 *          7 DEBUG 调试消息
 *  @return {String}
 *  @api public
 */
_.log = function(str, level) {
    var show = level <= _.logLevel;
    if (show) {
            console.log(str);
    }
    return str;
}
/**
 * 混合杂糅
 * @param  {Object} target 目标对象，以此为基础的对象
 * @param  {Object} source 来源对象
 * @param  {Boolean} ride  是否覆盖同名属性
 * @return {Object}        处理完的对象
 */

_.mix = function mix(target, source, ride) {
    var args = arrSlice.call(arguments);
    var i = 1;
    var key;
    //如果最后参数是布尔，判定是否覆写同名属性
    ride = _.isBoolean(ride) ? ride : true;

    while ((source = args[i++])) {
        //source = [{a:1},{b:3}];
        if (_.isArray(source)) {
            for (var n = 0, len = source.length; n < len; n++) {
                mix(target, source[n], ride);
            }
            continue;
        }
        //杂糅只允许对象
        for (key in source) {
            if (ride || !(key in target)) {
                target[key] = source[key];
            }
        }
    }
    return target;
}

//基本类型判断
'Function,String,Number'.replace(/[^, ]+/g, function(t) {
    _['is' + t] = function(s) {
        return isType(s, t);
    }
});
_.isObject = function(obj) {
    return typeof obj === 'object';
}
_.isArray = Array.isArray;
_.isBoolean = function(obj) {
    return obj === true || obj === false || isType(obj, 'Boolean');
};

_.isUndefined = function(obj) {
    return obj === undefined;
};

/**
 * 获取类型
 * @param  {Object} obj 要判断的对象
 * @return {String}     返回类型
 */

function isType(obj, type) {
    return cleanObj.toString.call(obj).slice(8, -1) === type;
}


_.promise = require('./promise');
_.wait = require('./wait');

module.exports = _;