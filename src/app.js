const BeerData = require('./models/beer_data.js');
const BeerListView = require('./views/beer_list_view');

document.addEventListener('DOMContentLoaded', () => {
  console.log('JavaScript Loaded');

  const beerData = new BeerData();
  beerData.bindEvents();

  const listContainer = document.querySelector('div#beer-list');
  const beerListView = new BeerListView(listContainer);
  beerListView.bindEvents();
});
