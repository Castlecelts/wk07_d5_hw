const PubSub = require('../helpers/pub_sub.js')

const SelectRandomView = function (select) {
  this.select = select;
}

SelectRandomView.prototype.bindEvents = function () {
  this.select.addEventListener('click', (event) => {
    PubSub.publish("SelectRandomView:selected", this.select);
  });
};


module.exports = SelectRandomView;
