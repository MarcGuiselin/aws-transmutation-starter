const {Funnies} = require('funnies');

exports.handler = async (event) => {
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: new Funnies().message(),
        })
    };
}