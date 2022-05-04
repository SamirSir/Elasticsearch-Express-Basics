const client = require('./connection');

client.indices.create({
    index: 'articles'
}, (err, resp, status) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log("Create index response: \n", resp);
    }
});
