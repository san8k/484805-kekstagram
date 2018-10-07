'use strict';

(function () {

  var userPhotosArray;
  var filteredArray;

  var onSuccessLoadUsersPhotos = function (data) {

    userPhotosArray = data;
    var photosContainer = document.querySelector('.pictures');

    window.util.createElements(photosContainer, window.renderer.renderUserPhoto, userPhotosArray);

    var usersPhotosPreview = photosContainer.querySelectorAll('a');

    var addListenerOnPreviews = function (elements) {

      usersPhotosPreview.forEach(function (image, index) {

        image.addEventListener('click', function () {

          window.bigPhoto.renderBigPhoto(elements[index]);
          window.bigPhoto.showBigPicture();

        });
      });

    };

    addListenerOnPreviews(userPhotosArray);

    window.filters.galleryFilters.classList.remove('img-filters--inactive');
    var buttonPopular = window.filters.galleryFilters.querySelector('#filter-popular');
    var buttonNew = window.filters.galleryFilters.querySelector('#filter-new');
    var buttonDiscussed = window.filters.galleryFilters.querySelector('#filter-discussed');

    var updateGallery = function (photosArray) {

      window.util.removeElements(usersPhotosPreview);
      window.util.createElements(photosContainer, window.renderer.renderUserPhoto, photosArray);
      usersPhotosPreview = photosContainer.querySelectorAll('a');
      addListenerOnPreviews(photosArray);

    };

    var debouncedFilter = window.debounce(updateGallery);

    var buttonHighliter = function (button) {

      buttonNew.classList.remove('img-filters__button--active');
      buttonDiscussed.classList.remove('img-filters__button--active');
      buttonPopular.classList.remove('img-filters__button--active');
      button.classList.add('img-filters__button--active');

    };

    buttonPopular.addEventListener('click', function () {

      buttonHighliter(buttonPopular);
      debouncedFilter(userPhotosArray);

    });

    buttonNew.addEventListener('click', function () {

      filteredArray = window.filters.showNew(userPhotosArray);
      buttonHighliter(buttonNew);
      debouncedFilter(filteredArray);

    });

    buttonDiscussed.addEventListener('click', function () {

      filteredArray = window.filters.showDiscussed(userPhotosArray);
      buttonHighliter(buttonDiscussed);
      debouncedFilter(filteredArray);

    });

  };

  var onErrorLoadUsersPhotos = function (message) {

    var errorNode = document.createElement('div');
    errorNode.style = 'z-index: 1000; margin: 0 auto; text-align: center; background-color: #ff1703;';
    errorNode.style.position = 'absolute';
    errorNode.style.left = 0;
    errorNode.style.right = 0;
    errorNode.style.fontSize = '20px';
    errorNode.textContent = message;
    document.body.insertAdjacentElement('afterbegin', errorNode);

  };

  window.backend.downloadUsersPhotos(onSuccessLoadUsersPhotos, onErrorLoadUsersPhotos);

  window.gallery = {
    usersPhotosArray: userPhotosArray,
  };

})();
