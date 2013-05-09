var ejs = $.ejs;
var fs = require('fs');
var layoutDir = $.dir.layout;
var encoding = $.config.encoding;

var defaultLayout = fs.readFileSync(layoutDir + 'default.html', encoding).toString();

function render(tpl, actionObj, moduleName, actionName) {
    var layout = '';
    var data = actionObj.tplData || {};
    var layoutTemplate = actionObj.layout || moduleName;
    if (isExist(layoutDir + layoutTemplate + '.html')) {
        layout = fs.readFileSync(layoutDir + layoutTemplate + '.html', encoding).toString();
    } else {
        layout = defaultLayout;
    }

    var body = ejs.render(tpl, data);
    var html = ejs.render(layout, {
        body: body
    });
    return html;
}

function isExist(file) {
    return fs.existsSync(file);
}



var _ = {
    render: render
};
module.exports = _;