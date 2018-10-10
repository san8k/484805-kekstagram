'use strict';

(function () {

  var userPhotos;
  var filteredPhotos;

  var onSuccessLoadUsersPhotos = function (data) {

    userPhotos = data;
    var photosContainer = document.querySelector('.pictures');

    window.util.createElements(photosContainer, window.renderer.renderUserPhoto, userPhotos);

    var usersPhotosPreview = photosContainer.querySelectorAll('a');

    var addListenerOnPreviews = function (elements) {

      usersPhotosPreview.forEach(function (image, index) {

        image.addEventListener('click', function () {

          window.bigPhoto.renderBigPhoto(elements[index]);
          window.bigPhoto.showBigPicture();

        });
      });

    };

    addListenerOnPreviews(userPhotos);

    window.filters.gallery.classList.remove('img-filters--inactive');
    var buttonPopular = window.filters.gallery.querySelector('#filter-popular');
    var buttonNew = window.filters.gallery.querySelector('#filter-new');
    var buttonDiscussed = window.filters.gallery.querySelector('#filter-discussed');

    var updateGallery = function (photosArray) {

      window.util.removeElements(usersPhotosPreview);
      window.util.createElements(photosContainer, window.renderer.renderUserPhoto, photosArray);
      usersPhotosPreview = photosContainer.querySelectorAll('a');
      addListenerOnPreviews(photosArray);

    };

    var debouncedFilter = window.debounce(updateGallery);

    var highlightButton = function (button) {

      buttonNew.classList.remove('img-filters__button--active');
      buttonDiscussed.classList.remove('img-filters__button--active');
      buttonPopular.classList.remove('img-filters__button--active');
      button.classList.add('img-filters__button--active');

    };

    buttonPopular.addEventListener('click', function () {

      highlightButton(buttonPopular);
      debouncedFilter(userPhotos);

    });

    buttonNew.addEventListener('click', function () {

      filteredPhotos = window.filters.showNew(userPhotos);
      highlightButton(buttonNew);
      debouncedFilter(filteredPhotos);

    });

    buttonDiscussed.addEventListener('click', function () {

      filteredPhotos = window.filters.showDiscussed(userPhotos);
      highlightButton(buttonDiscussed);
      debouncedFilter(filteredPhotos);

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

})();
