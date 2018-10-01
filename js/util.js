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

    }
  };

})();
