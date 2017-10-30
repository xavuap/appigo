// Generated by CoffeeScript 1.12.0
(function() {
  module.exports = function(platano) {
    var plato, sirvo, tajada;
    platano = platano.split("?")[0].split("/");
    platano.shift();
    if (platano[platano.length - 1] === "") {
      platano.pop();
    }
    plato = require("./leo.js");
    sirvo = require("./sirvo.js");
    while (platano.length) {
      tajada = platano.shift();
      if (plato[tajada] != null) {
        plato = plato[tajada];
      } else {
        return sirvo.disculpa;
      }
    }
    if (typeof plato !== "function") {
      return sirvo.disculpa;
    }
    return plato(sirvo);
  };

}).call(this);