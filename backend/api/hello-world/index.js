const util = require('util');

exports.handler = async (event) => {
    return {
        statusCode: 200,
        body: util.inspect(event)/*JSON.stringify({
            message: 'hello world',
            event: 
        })*/
    };
}