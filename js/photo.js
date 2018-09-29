'use strict';

(function () {

  var PHOTO_DESCRIPTIONS = [
    'Тестим новую камеру!',
    'Затусили с друзьями на море',
    'Как же круто тут кормят',
    'Отдыхаем...',
    'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
    'Вот это тачка!'
  ];
  var bigPicture = document.querySelector('.big-picture');

  window.photo = {
    renderBigPhoto: function (currentPhoto) {

      var bigPictureImage = bigPicture.querySelector('.big-picture__img');
      bigPictureImage.querySelector('img').src = currentPhoto.url;
      bigPicture.querySelector('.likes-count').textContent = currentPhoto.likes;
      bigPicture.querySelector('.comments-count').textContent = currentPhoto.comments.length;
      bigPicture.querySelector('.social__caption').textContent = PHOTO_DESCRIPTIONS[window.util.getRandomInt(0, 5)];

      var socialComment = bigPicture.querySelectorAll('.social__comment');
      socialComment.forEach(function (elem, i) {

        socialComment[i].querySelector('p').textContent = currentPhoto.comments[i];
        socialComment[i].querySelector('img').src = 'img/avatar-' + window.util.getRandomInt(1, 6) + '.svg';

      });

      bigPicture.querySelector('.social__comment-count').classList.remove('visually-hidden');
      bigPicture.querySelector('.comments-loader').classList.remove('visually-hidden');

    },
    showBigPicture: function () {

      bigPicture.classList.remove('hidden');
      document.addEventListener('keydown', onBigPictureEscPress);

    },
    hideBigPicture: function () {

      bigPicture.classList.add('hidden');
      document.removeEventListener('keydown', onBigPictureEscPress);

    }
  };

  var onBigPictureEscPress = function (evt) {

    if (evt.keyCode === window.util.ESC_KEYCODE) {

      window.photo.hideBigPicture();

    }

  };


  bigPicture.querySelector('#picture-cancel').addEventListener('click', window.photo.hideBigPicture);

})();
