const BeerDataLayout = function(element, beer){

}

BeerDataLayout.prototype.displayData = function (div, beer) {
  div.appendChild(this.createCustomElement("h3", "textContent", beer.name));

  const list = document.createElement("ul");
  list.appendChild(this.createCustomElement("p", "textContent", `First Brewed: ${beer.first_brewed}`));
  list.appendChild(this.createCustomElement("p", "textContent", `ABV content: ${beer.abv}%`));
  list.appendChild(this.createCustomElement("p", "textContent", `${beer.description}`));
  div.appendChild(list);

  const image = this.createCustomElement("img", "src", `${beer.image_url}`)
  // image.style.height = `${beer.height/5}px`;
  div.appendChild(image);
};


BeerDataLayout.prototype.createCustomElement = function (type, attr, value) {
  const element = document.createElement(type);
  element[attr] = value;
  return element;
};
module.exports = BeerDataLayout;
