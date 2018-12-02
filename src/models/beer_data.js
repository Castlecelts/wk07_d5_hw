const PubSub = require('../helpers/pub_sub.js')
const RequestHelper = require('../helpers/request_helper.js')

const BeerData = function () {
  this.beerData = null;
  this.randomBeerData = null;
}

BeerData.prototype.bindEvents = function () {
  const requestHelper = new RequestHelper("https://api.punkapi.com/v2/beers");
  requestHelper.get().then((data) => {
    this.beerData = data;
    PubSub.publish("BeerData:all-data-ready", data);

    const abvs = this.getAbvs();
    PubSub.publish("BeerData:abv-data-ready", abvs);
  });

  PubSub.subscribe("SelectRandomView:selected", (event) => {
    const requestHelperRandom = new RequestHelper("https://api.punkapi.com/v2/beers/random");
    requestHelperRandom.get().then((singleData) => {
      this.randomBeerData = singleData;
      PubSub.publish("RandomBeerData:data-ready", singleData);
    })
  })

};


BeerData.prototype.getAbvs = function () {
  const abvs = this.beerData.map(beer => beer.abv).filter((abv, index, abvs) => abvs.indexOf(abv) === index);
  return abvs.sort((a,b)=> a-b);
};

module.exports = BeerData;
