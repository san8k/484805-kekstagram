'use strict';

(function () {

  var getRandomCommentsList = function (amount) {

    var commentsList = [];
    var commentsListLength = window.util.getRandomInt(0, amount);

    for (var i = 0; i <= commentsListLength; i++) {

      commentsList.push(window.data.PHOTO_COMMENTS[window.util.getRandomInt(0, window.data.PHOTO_COMMENTS.length - 1)]);

    }

    return commentsList;

  };

  var getPhotoInfo = function (photosCount) {

    var usersPhotosList = [];
    var photoPage = {};

    for (var i = 0; i < photosCount; i++) {

      photoPage = {
        url: 'photos/' + (i + 1) + '.jpg',
        likes: window.util.getRandomInt(15, 200),
        comments: getRandomCommentsList(1),
        description: window.data.PHOTO_DESCRIPTIONS[window.util.getRandomInt(0, 5)],
      };

      usersPhotosList.push(photoPage);

    }
    return usersPhotosList;

  };

  window.pictures = {
    usersPhotos: getPhotoInfo(window.data.PHOTOS_COUNT)
  };

})();
