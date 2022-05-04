const elasticsearch = require('elasticsearch');

const client = elasticsearch.Client({
    hosts: ["http://localhost:9200"]
});

module.exports = client;
