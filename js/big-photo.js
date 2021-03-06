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
  var MAX_COMMENTS_IN_BLOCK = 5;

  var bigPicture = document.querySelector('.big-picture');
  var commentsContainer = bigPicture.querySelector('.social__comments');
  var commentsLoader = bigPicture.querySelector('.social__comments-loader');

  var counter = {
    nextComments: MAX_COMMENTS_IN_BLOCK,
    addComments: function () {
      this.nextComments += MAX_COMMENTS_IN_BLOCK;
    },
    resetComments: function () {
      this.nextComments = MAX_COMMENTS_IN_BLOCK;
    }
  };

  var onLoaderClick;

  var onBigPictureEscPress = function (evt) {

    if (evt.keyCode === window.util.ESC_KEYCODE) {
      window.bigPhoto.hideBigPicture();
    }

  };

  var renderBigPhoto = function (currentPhoto) {

    var calculateCommentsNumber = function () {

      return currentPhoto.comments.length;
    };

    var bigPictureImage = bigPicture.querySelector('.big-picture__img');
    bigPictureImage.querySelector('img').src = currentPhoto.url;
    bigPicture.querySelector('.likes-count').textContent = currentPhoto.likes;
    bigPicture.querySelector('.comments-count').textContent = calculateCommentsNumber(currentPhoto);
    bigPicture.querySelector('.social__caption').textContent = PHOTO_DESCRIPTIONS[window.util.getRandomInt(0, 5)];
    var displayedCommentsCounter = bigPicture.querySelector('.display-comments-count');

    displayedCommentsCounter.textContent = (currentPhoto.comments.length < MAX_COMMENTS_IN_BLOCK) ? currentPhoto.comments.length : MAX_COMMENTS_IN_BLOCK;
    window.util.createElements(commentsContainer, window.renderer.renderSocialComment, currentPhoto.comments.slice(0, 5));

    onLoaderClick = function () {

      window.util.createElements(commentsContainer, window.renderer.renderSocialComment, currentPhoto.comments.slice(counter.nextComments, counter.nextComments + MAX_COMMENTS_IN_BLOCK));
      displayedCommentsCounter.textContent = parseInt(displayedCommentsCounter.textContent, 10) + MAX_COMMENTS_IN_BLOCK;

      if (displayedCommentsCounter.textContent > currentPhoto.comments.length) {
        displayedCommentsCounter.textContent = currentPhoto.comments.length;
      }

      if (counter.nextComments + MAX_COMMENTS_IN_BLOCK >= currentPhoto.comments.length) {
        commentsLoader.classList.add('hidden');
      }

      counter.addComments();

    };

    if (currentPhoto.comments.length <= 5) {
      commentsLoader.classList.add('hidden');
    } else {
      commentsLoader.classList.remove('hidden');
      commentsLoader.addEventListener('click', onLoaderClick);
    }

  };

  var showBigPicture = function () {

    bigPicture.classList.remove('hidden');
    document.addEventListener('keydown', onBigPictureEscPress);
    document.querySelector('body').classList.add('modal-open');

  };

  var hideBigPicture = function () {

    bigPicture.classList.add('hidden');
    document.removeEventListener('keydown', onBigPictureEscPress);
    commentsContainer.innerHTML = '';
    document.querySelector('body').classList.remove('modal-open');
    counter.resetComments();
    commentsLoader.removeEventListener('click', onLoaderClick);

  };

  bigPicture.querySelector('#picture-cancel').addEventListener('click', hideBigPicture);

  window.bigPhoto = {
    renderBigPhoto: renderBigPhoto,
    showBigPicture: showBigPicture,
    hideBigPicture: hideBigPicture
  };

})();
