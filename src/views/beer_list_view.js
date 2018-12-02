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

  PubSub.subscribe("SelectAbvView:selected-abv", (abv) => {
    this.clearView();
    console.log(abv.detail);
    console.log(this.beers);
    const beersByAbv = this.beers.filter(beer => beer.abv == abv.detail);
    console.log(beersByAbv);
    this.createBeerList(beersByAbv);
  });

  PubSub.subscribe("RandomBeerData:data-ready", (event) => {
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

    const imageDiv = document.createElement('div');
    imageDiv.className = "individual-beer-image";

    const infoDiv = document.createElement('div');
    infoDiv.className = "individual-beer-info";

    const beerDataLayout = new BeerDataLayout();
    beerDataLayout.displayImage(imageDiv, beer);
    beerDataLayout.displayData(infoDiv, beer);

    div.appendChild(imageDiv);
    div.appendChild(infoDiv);

    this.container.appendChild(div);
  }
};


module.exports = BeerListView;
