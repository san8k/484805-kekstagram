'use strict';

(function () {

  window.renderer = {
    renderUserPhoto: function (photo) {

      var pictureTemplate = document.querySelector('#picture')
                      .content
                      .querySelector('a');
      var photoElement = pictureTemplate.cloneNode(true);
      photoElement.querySelector('.picture__likes').textContent = photo.likes;
      photoElement.querySelector('img').src = photo.url;
      photoElement.querySelector('.picture__comments').textContent = photo.comments.length;

      return photoElement;
    },
    renderSocialComment: function (comment) {

      var commentTemplate = document.querySelector('#socialComment')
                              .content
                              .querySelector('li');
      var commentElement = commentTemplate.cloneNode(true);
      commentElement.querySelector('img').src = 'img/avatar-' + window.util.getRandomInt(1, 6) + '.svg';
      commentElement.querySelector('p').textContent = comment;

      return commentElement;
    }
  };

})();
