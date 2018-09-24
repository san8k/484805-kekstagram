'use strict';

(function () {

  var bigPicture = document.querySelector('.big-picture');

  var renderBigPhoto = function (currentPhoto) {

    var bigPictureImage = bigPicture.querySelector('.big-picture__img');
    bigPictureImage.querySelector('img').src = currentPhoto.url;
    bigPicture.querySelector('.likes-count').textContent = currentPhoto.likes;
    bigPicture.querySelector('.comments-count').textContent = currentPhoto.comments.length;
    bigPicture.querySelector('.social__caption').textContent = currentPhoto.description;

    var socialComment = bigPicture.querySelectorAll('.social__comment');

    for (var i = 0; i < currentPhoto.comments.length; i++) {

      socialComment[i].querySelector('img').src = 'img/avatar-' + window.util.getRandomInt(1, 6) + '.svg';
      socialComment[i].querySelector('p').textContent = currentPhoto.comments[i];

    }

    bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
    bigPicture.querySelector('.comments-loader').classList.add('visually-hidden');

  };

  var miniPicturesContainer = document.querySelector('.pictures');
  var miniPictures = miniPicturesContainer.querySelectorAll('img');

  var onBigPictureEscPress = function (evt) {

    if (evt.keyCode === window.util.ESC_KEYCODE) {

      hideIBigPicture();

    }

  };

  var showBigPicture = function () {

    bigPicture.classList.remove('hidden');
    document.addEventListener('keydown', onBigPictureEscPress);

  };

  var hideIBigPicture = function () {

    bigPicture.classList.add('hidden');
    document.removeEventListener('keydown', onBigPictureEscPress);

  };

  miniPictures.forEach(function (image, i) {

    image.addEventListener('click', function () {

      renderBigPhoto(window.pictures.usersPhotos[i - 1]);
      showBigPicture();

    });
  });

  bigPicture.querySelector('#picture-cancel').addEventListener('click', hideIBigPicture);

})();
