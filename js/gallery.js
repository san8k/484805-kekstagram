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

  var photosArr = [];
  var onLoad = function (data) {

    var fragment = document.createDocumentFragment();
    var createdElementsContainer = document.querySelector('.pictures');

    for (var i = 0; i < PHOTOS_COUNT; i++) {

      fragment.appendChild(renderPhoto(data[i]));
      photosArr.push(data[i]);
    }

    createdElementsContainer.appendChild(fragment);

  };

  var onError = function (message) {

    var errorNode = document.createElement('div');
    errorNode.style = 'z-index: 1000; margin: 0 auto; text-align: center; background-color: #ff1703;';
    errorNode.style.position = 'absolute';
    errorNode.style.left = 0;
    errorNode.style.right = 0;
    errorNode.style.fontSize = '40px';
    errorNode.textContent = message;
    document.body.insertAdjacentElement('afterbegin', errorNode);

  };

  window.downloadUsersPhotos(onLoad, onError);

  window.gallery = {
    usersPhotosArr: photosArr
  };


})();
