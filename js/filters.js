'use strict';

(function () {

  var galleryFilters = document.querySelector('.img-filters');

  window.filters = {
    galleryFilters: galleryFilters,
    showDiscussed: function (arr) {

      return arr.slice().sort(function (firstPhoto, secondPhoto) {

        return secondPhoto.comments.length - firstPhoto.comments.length;

      });


    },
    showNew: function (arr) {

      return arr.slice().sort(window.util.compareRandom).splice(15);

    }
  };

})();

