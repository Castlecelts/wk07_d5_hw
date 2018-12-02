const BeerData = require('./models/beer_data.js');
const BeerListView = require('./views/beer_list_view');
const SelectAbvView = require('./views/select_abv_view');
const SelectRandomView = require('./views/select_random_view');

document.addEventListener('DOMContentLoaded', () => {
  console.log('JavaScript Loaded');

  const beerData = new BeerData();
  beerData.bindEvents();

  const listContainer = document.querySelector('div#beer-list');
  const beerListView = new BeerListView(listContainer);
  beerListView.bindEvents();

  const selectAbvView = new SelectAbvView(document.querySelector('#beer-selection'));
  selectAbvView.bindEvents();

  const randomBeerButton= document.querySelector('#random-beer-selection');
  const selectRandomView = new SelectRandomView(randomBeerButton);
  selectRandomView.bindEvents();
});
