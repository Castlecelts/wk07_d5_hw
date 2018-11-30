const PubSub = require('../helpers/pub_sub.js');
const BeerDataLayout = require('./beer_data_layout.js');

const BeerListView = function(container){
  this.container = container
  this.beers = null;
};

BeerListView.prototype.bindEvents = function () {
  PubSub.subscribe("BeerData:all-data-ready", (event) => {
    this.beers = event.detail;
    this.clearView();
    this.createBeerList(this.beers);
  });
};

BeerListView.prototype.clearView = function () {
  this.container.textContent = ' ';
};

BeerListView.prototype.createBeerList = function (dataArray) {
  for (const beer of dataArray) {
    const div = document.createElement('div');
    div.className = "individual-beer";
    const beerDataLayout = new BeerDataLayout();
    beerDataLayout.displayData(div, beer);
    this.container.appendChild(div);
  }
};

module.exports = BeerListView;
