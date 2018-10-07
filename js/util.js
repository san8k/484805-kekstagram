'use strict';

(function () {

  var uploadSection = document.querySelector('.img-upload');

  window.util = {
    ESC_KEYCODE: 27,
    uploadSection: uploadSection,

    getRandomInt: function (min, max) {
      return Math.floor(min + Math.random() * (max - min + 1));
    },
    findUniqueStrings: function (array) {

      var obj = {};

      for (var i = 0; i < array.length; i++) {
        var string = array[i];
        obj[string] = true;
      }

      return Object.keys(obj);
    },
    createElements: function (container, renderFunction, elementsArray) {

      var fragment = document.createDocumentFragment();
      var createdElementsContainer = container;

      for (var i = 0; i < elementsArray.length; i++) {
        fragment.appendChild(renderFunction(elementsArray[i]));
      }

      createdElementsContainer.appendChild(fragment);

    },
    deleteElement: function (element) {
      element.remove();
    },
    removeElements: function (element) {

      Array.prototype.forEach.call(element, function (node) {
        node.parentNode.removeChild(node);
      });

    },
    compareRandom: function () {
      return Math.random() - 0.5;
    }
  };

})();
