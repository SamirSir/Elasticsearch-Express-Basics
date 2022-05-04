const client = require('./connection');
const articlesJson = require('./articles.json');
var bulkArticlesArray = [];

const makeBulkArray = (articles, callback) => {
    for (let current in articles) {
        bulkArticlesArray.push(
            {
                index:
                {
                    _index: 'search-articles',
                    _type: 'articles',
                    _id: articles[current].ID
                }
            },
            {
                "Title": articles[current]["Title"],
                "Meta Description": articles[current]["Meta Description"],
                "Meta Keywords": articles[current]["Meta Keywords"],
                "Categories": articles[current]["Categories"],
                "Tags": articles[current]["Tags"],
                "Status": articles[current]["Status"]
            }
        );
    }
    callback(bulkArticlesArray);
}

const indexArticlesBulk = (bulkArr, callback) => {
    client.bulk({
        maxRetries: 5,
        index: 'search-articles',
        type: 'articles',
        body: bulkArr
    }, (err, resp, status) => {
        if (err) {
            console.log(err);
        }
        else {
            callback(resp.items);
        }
    })
}

makeBulkArray(articlesJson, (response) => {
    console.log('Bulk Articles: \n');
    console.log(JSON.stringify(response, null, 2));

    indexArticlesBulk(response, (response) => {
        console.log(response);
    })
});
