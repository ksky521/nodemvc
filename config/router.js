module.exports = {
    'index/index': '/',
    'index/detail': {
        url: 'view/{id}',
        params: {
            id: '\\d+'
        }
    },
    'index/list': {
        url: 'list/{type}/{page}',
        params: {
            type: 'test|demo',
            page: '\\d+'
        }
    }
};