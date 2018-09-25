'use strict';

(function () {

  var hashtagsValidation = function (string) {

    var hashtagsLowerCase = string.value.toLowerCase();

    var hashtagsArray = hashtagsLowerCase.split(' ');

    if (hashtagsArray.length > 5) {

      return window.util.previewHashtags.setCustomValidity('Используйте не более пяти хэш-тегов');

    } else if (window.util.findUniqueStrings(hashtagsArray).length !== hashtagsArray.length) {

      return window.util.previewHashtags.setCustomValidity('Не повторяйте хэш-теги');

    } else {

      for (var i = 0; i < hashtagsArray.length; i++) {

        if (hashtagsArray[i].length > 20) {

          return window.util.previewHashtags.setCustomValidity('Длина хэш-тега должна быть не более 20 символов');

        } else if (hashtagsArray[i].match(/[^а-яёa-z0-9#]/gi)) {

          return window.util.previewHashtags.setCustomValidity('Используйте русские или латинские буквы и цифры');

        } else if (hashtagsArray[i].match(/^[^#]/)) {

          return window.util.previewHashtags.setCustomValidity('Пишите хэш-теги начиная с # через пробел');

        }

      }

    }

    return window.util.previewHashtags.setCustomValidity('');

  };

  window.util.submitButton.addEventListener('click', function () {

    hashtagsValidation(window.util.previewHashtags);

  });

})();
