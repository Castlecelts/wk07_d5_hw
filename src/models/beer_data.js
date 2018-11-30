const PubSub = require('../helpers/pub_sub.js')
const RequestHelper = require('../helpers/request_helper.js')

const BeerData = function () {
  this.beerData = null;
}

BeerData.prototype.bindEvents = function () {
  const requestHelper = new RequestHelper("https://api.punkapi.com/v2/beers");
  requestHelper.get().then((data) => {
    this.beerData = data;
    PubSub.publish("BeerData:all-data-ready", data);
    // const regions = this.getRegions();
    // PubSub.publish("Munros:regions_data", regions);
  });
};

module.exports = BeerData;
