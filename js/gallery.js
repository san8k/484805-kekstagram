'use strict';

(function () {

  var userPhotosArray;
  var filteredArray;

  var onSuccessLoadUsersPhotos = function (data) {

    userPhotosArray = data;
    var photosContainer = document.querySelector('.pictures');

    window.util.createElements(photosContainer, window.render.renderUserPhoto, userPhotosArray);

    var usersPhotosPreview = photosContainer.querySelectorAll('a');

    var addListenerOnPreviews = function (elements) {

      usersPhotosPreview.forEach(function (image, index) {

        image.addEventListener('click', function () {

          window.photo.renderBigPhoto(elements[index]);
          window.photo.showBigPicture();

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
      window.util.createElements(photosContainer, window.render.renderUserPhoto, photosArray);
      usersPhotosPreview = photosContainer.querySelectorAll('a');
      addListenerOnPreviews(photosArray);

      buttonNew.classList.remove('img-filters__button--active');
      buttonPopular.classList.remove('img-filters__button--active');
      buttonDiscussed.classList.remove('img-filters__button--active');

    };

    buttonPopular.addEventListener('click', function () {

      window.debounce(updateGallery(userPhotosArray));
      buttonPopular.classList.add('img-filters__button--active');


    });

    buttonNew.addEventListener('click', function () {

      filteredArray = window.filters.showNew(userPhotosArray);

      window.debounce(updateGallery(filteredArray));
      buttonNew.classList.add('img-filters__button--active');

    });

    buttonDiscussed.addEventListener('click', function () {

      filteredArray = window.filters.showDiscussed(userPhotosArray);

      window.debounce(updateGallery(filteredArray));
      buttonDiscussed.classList.add('img-filters__button--active');

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
