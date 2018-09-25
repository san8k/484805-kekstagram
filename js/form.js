'use strict';

(function () {

  var onRedactorEscPress = function (evt) {

    if (evt.keyCode === window.util.ESC_KEYCODE && window.util.previewDescription !== document.activeElement && window.util.previewHashtags !== document.activeElement) {

      hideImageRedactor();

    }

  };

  var showImageRedactor = function () {

    window.util.uploadOverlay.classList.remove('hidden');
    window.util.effectLevelFieldset.classList.add('hidden');
    document.addEventListener('keydown', onRedactorEscPress);

  };

  var hideImageRedactor = function () {

    window.util.uploadOverlay.classList.add('hidden');
    window.util.uploadFile.value = null;
    document.removeEventListener('keydown', onRedactorEscPress);

  };

  window.util.uploadFile.addEventListener('change', showImageRedactor);

  window.util.uploadCancel.addEventListener('click', hideImageRedactor);

})();
