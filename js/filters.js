'use strict';

(function () {

  var galleryFilters = document.querySelector('.img-filters');

  window.filters = {
    galleryFilters: galleryFilters,
    showDiscussed: function (arr) {

      var sortedArr = arr.slice().sort(function (firstPhoto, secondPhoto) {

        return secondPhoto.comments.length - firstPhoto.comments.length;

      });

      return sortedArr;
    },
    showNew: function (arr) {

      var compareRandom = function () {

        return Math.random() - 0.5;

      };

      var newPhotosArr = arr.slice();
      newPhotosArr.sort(compareRandom).splice(10);

      return newPhotosArr;

    }
  };

})();

