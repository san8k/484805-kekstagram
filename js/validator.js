'use strict';

(function () {

  var previewHashtags = window.util.uploadSection.querySelector('input[name="hashtags"]');
  var submitButton = window.util.uploadSection.querySelector('#upload-submit');

  var validateHashtags = function (string) {

    var hashtagsLowerCase = string.value.toLowerCase();
    var hashtags = hashtagsLowerCase.split(' ');

    if (hashtags.length > 5) {
      previewHashtags.style.borderColor = 'red';
      return previewHashtags.setCustomValidity('Используйте не более пяти хэш-тегов!');

    } else if (window.util.findUniqueStrings(hashtags).length !== hashtags.length) {
      previewHashtags.style.borderColor = 'red';
      return previewHashtags.setCustomValidity('Не повторяйте хэш-теги!');

    } else {
      previewHashtags.style.borderColor = 'red';

      for (var i = 0; i < hashtags.length; i++) {
        if (hashtags[i].length > 20) {
          return previewHashtags.setCustomValidity('Длина хэш-тега должна быть не более 20 символов!');

        } else if (hashtags[i].match(/^[^#]/)) {
          return previewHashtags.setCustomValidity('Пишите хэш-теги начиная с # через пробел!');

        } else if (hashtags[i].length !== 0 && hashtags[i].length < 2) {
          return previewHashtags.setCustomValidity('Хеш-тег не может быть пустым!');
        }
      }

    }
    previewHashtags.style.borderColor = null;
    return previewHashtags.setCustomValidity('');
  };

  submitButton.addEventListener('click', function () {
    validateHashtags(previewHashtags);
  });

  window.validator = {
    previewHashtags: previewHashtags
  };

})();
