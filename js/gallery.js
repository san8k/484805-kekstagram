'use strict';

(function () {

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

  var addPicturesToDOM = function (data, container) {

    var fragment = document.createDocumentFragment();
    var createdElements = document.querySelector(container);

    for (var i = 0; i < data.length; i++) {

      fragment.appendChild(renderPhoto(data[i]));

    }

    createdElements.appendChild(fragment);

  };

  addPicturesToDOM(window.pictures.usersPhotos, '.pictures');

})();
