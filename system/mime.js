var defaultMime = 'text/defaultMime';
var mimes = {
    css: 'text/css',
    js: 'application/javascript',
    json: 'application/json',
    jpg: 'image/jpeg',
    gif: 'image/gif',
    jpeg: 'image/jpeg',
    html: 'text/html',
    htm: 'text/html',
    pdf: 'application/pdf',
    png: 'image/png',
    txt: defaultMime,
    text: defaultMime,
    ico: 'image/x-icon',

    '7z': 'application/x-7z-compressed',
    asf: 'video/x-ms-asf',
    au: 'audio/basic',
    chm: 'application/mshelp',
    crx: 'application/x-chrome-extension',

    doc: 'application/msword',
    exe: 'application/octet-stream',
    flw: 'flv-application/octet-stream',
    eot: 'application/vnd.ms-fontobject',
    hlp: 'application/mshelp',
    htc: 'text/x-component',
    jar: 'application/java-archive',
    'class': 'application/java-vm',
    log: defaultMime,
    less: defaultMime,
    m3u8: 'application/vnd.apple.mpegurl',
    mpg: 'video/mpeg',

    mid: 'audio/x-midi',
    midi: 'audio/x-midi',
    mp2: 'audio/x-mpeg',
    mp3: 'audio/mpeg',
    m4p: 'application/mp4',
    m4a: 'audio/mp4',
    php: 'application/x-httpd-php',
    phtml: 'application/x-httpd-php',
    ppt: 'application/mspowerpoint',
    manifest: 'text/cache-manifest',

    otf: 'font/opentype', //字体
    rsd: 'application/rsd+xml',
    rss: 'application/rss+xml',
    ra: 'audio/x-pn-realaudio',
    ram: 'audio/x-pn-realaudio',
    rm: 'video/x-pn-realvideo',
    rmvb: 'application/vnd.rn-realmedia',
    svg: 'image/svg+xml',
    swf: 'application/x-shockwave-flash',

    tiff: 'image/tiff',

    ts: 'video/MP2T',
    wav: 'audio/x-wav',
    wma: 'audio/x-ms-wma',
    wmv: 'video/x-ms-wmv',
    woff: 'font/opentype',
    wml: 'video/x-ms-asf',
    xml: 'application/xml',
    xls: 'application/vnd.ms-excel',
    xla: 'application/msexcel',
    default_type: 'application/octet-stream'
};

var $ = {
    mimes: mimes,
    //如果框架没有支持这个MIME,可以自己定义一个
    define: function(ext, mime) {
        if (!mimes[ext]) {
            mimes[ext] = mime;
        }
    },
    //通过accept获取扩展名
    accept2ext: function(accept, fallback) {
        accept = accept.replace(/;.*/, '').replace(/,.*/, '');
        for (var key in mimes) {
            if (mimes[key].test(accept)) {
                return key
            }
        }
        return '';
    },
    //通过accept获取mime
    accept2mime: function(accept) {
        return $.ext2mime($.accept2ext(accept));
    },
    //通过扩展名获取mime
    ext2mime: function(ext) {
        return mimes[ext] ? mimes[ext] : mimes.default_type;
    },
    //通过路径获取扩展名
    path2ext: function(path) {
        return path.replace(/.*[\.\/]/, '').toLowerCase();
    },
    //通过路径获取mime
    path2mime: function(path) {
        return $.ext2mime($.path2ext(path));
    }
};

module.exports = $;