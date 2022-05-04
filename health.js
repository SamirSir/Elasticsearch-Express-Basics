const client = require('./connection');

/**
 * @description
 * Check health of our elasticsearch instance
 * which means we’re successfully connected to Elasticsearch!
*/
client.cluster.health({}, (err, resp, status) => {
    console.log(`--- Client Health ---\n--- Connected to Elasticsearch Successfully ---\n\n `, resp);
});
