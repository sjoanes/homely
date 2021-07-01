require('dotenv').config();

const _ = require('lodash');
const algoliasearch = require('algoliasearch');

function AlgoliaClient() {
  if (!(this instanceof AlgoliaClient)) {
    return new AlgoliaClient();
  }

  if (process.env.NODE_ENV != 'test') {
    this.search = algoliasearch(process.env.ALGOLIA_APPLICATION_ID, process.env.ALGOLIA_ADMIN_API_KEY_ID)
  } else {
    this.search = () => {};
  }

  if (process.env.NODE_ENV != 'test') {
    this.addObjects = function (indexName, objects, batchSize) {
        const index = this.algoliaSearch.initIndex(indexName);

        const DEFAULT_BATCH_SIZE = 1000;
        batchSize = batchSize || DEFAULT_BATCH_SIZE;

        const chunkedObjects = _.chunk(objects, batchSize);

        return Bluebird.each(chunkedObjects, objectChunk => index.addObjects(objectChunk));
    }
  } else {
    this.addObjects = () => {};
  }
}

module.exports = AlogliaClient;
