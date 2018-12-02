const PubSub = require('../helpers/pub_sub.js')

const SelectAbvView = function (select) {
  this.abvs = null;
  this.select = select;
}

SelectAbvView.prototype.bindEvents = function () {
  PubSub.subscribe("BeerData:abv-data-ready", (abvs) => {
    this.abvs = abvs.detail;
    this.populateAbvs();
  });
  this.select.addEventListener('change', (event) => {
    PubSub.publish("SelectAbvView:selected-abv", event.target.value);
  });
};

SelectAbvView.prototype.populateAbvs = function () {
  for (abv of this.abvs){
    this.select.appendChild(this.createCustomElement("option", "textContent", abv));
  };
};

SelectAbvView.prototype.createCustomElement = function (type, attr, value) {
  const element = document.createElement(type);
  element[attr] = value;
  return element;
};

module.exports = SelectAbvView;
