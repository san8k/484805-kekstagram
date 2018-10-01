'use strict';

(function () {

  var PHOTOS_COUNT = 25;

  var pictureTemplate = document.querySelector('#picture')
      .content
      .querySelector('a');

  var renderPhoto = function (photo) {

    var photoElement = pictureTemplate.cloneNode(true);
    photoElement.querySelector('img').src = photo.url;
    photoElement.querySelector('.picture__likes').textContent = photo.likes;
    photoElement.querySelector('.picture__comments').textContent = photo.comments.length;
    return photoElement;

  };


  var onSuccessLoadUsersPhotos = function (data) {
    var photosArr = [];
    var fragment = document.createDocumentFragment();
    var createdElementsContainer = document.querySelector('.pictures');

    for (var i = 0; i < PHOTOS_COUNT; i++) {

      fragment.appendChild(renderPhoto(data[i]));
      photosArr.push(data[i]);
    }

    createdElementsContainer.appendChild(fragment);

    var miniPicturesContainer = document.querySelector('.pictures');
    var miniPictures = miniPicturesContainer.querySelectorAll('img');

    miniPictures.forEach(function (image, index) {

      image.addEventListener('click', function () {

        window.photo.renderBigPhoto(photosArr[index - 1]);
        window.photo.showBigPicture();

      });
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
