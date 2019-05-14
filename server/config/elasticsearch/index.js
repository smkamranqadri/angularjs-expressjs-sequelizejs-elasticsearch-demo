const elasticsearch = require('elasticsearch');

const elasticClient = new elasticsearch.Client({
  host: process.env.ELASTIC_HOST,
  log: 'info'
});

indexName = process.env.MYSQL_DATABASE;

const ping = function() {
  return elasticClient.ping({
    requestTimeout: 30000
  });
};

const deleteIndex = function() {
  return elasticClient.indices.delete({
    index: indexName
  });
};

const initIndex = function() {
  return elasticClient.indices.create({
    index: indexName
  });
};

const indexExists = function() {
  return elasticClient.indices.exists({
    index: indexName
  });
};

const sync = function() {
  return ping()
    .then(function() {
      console.log('Elasticsearch is running!');
      return indexExists();
    })
    .then(function(exists) {
      if (!exists) {
        return initIndex();
      }
    });
};

const addDocument = function(id, type, body) {
  return elasticClient.index({
    index: indexName,
    id,
    type,
    body
  });
};

const removeDocument = function(id) {
  return elasticClient.documents.destroy({
    id
  });
};

const search = function(type, body) {
  return elasticClient.search({ index: indexName, type, body });
};

module.exports = {
  elasticClient,
  sync,
  addDocument,
  removeDocument,
  search
};
