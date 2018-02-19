module.exports = {
    mongo : {
        getURL: function(){
            return 'mongodb://admin:admin@ds239988.mlab.com:39988/pebbl';
        }


    },
    api : {
        path: '/api',
        version: '/v1'
    }
}