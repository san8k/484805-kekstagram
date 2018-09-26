'use strict';

(function () {

  var uploadOverlay = window.util.uploadSection.querySelector('.img-upload__overlay');
  var uploadFile = window.util.uploadSection.querySelector('#upload-file');
  var uploadCancel = window.util.uploadSection.querySelector('#upload-cancel');
  var previewDescription = window.util.uploadSection.querySelector('textarea[name="description"]');
  var onRedactorEscPress = function (evt) {

    if (evt.keyCode === window.util.ESC_KEYCODE && previewDescription !== document.activeElement && window.validation.previewHashtags !== document.activeElement) {

      hideImageRedactor();

    }

  };

  var showImageRedactor = function () {

    uploadOverlay.classList.remove('hidden');
    window.effects.effectLevelFieldset.classList.add('hidden');
    document.addEventListener('keydown', onRedactorEscPress);

  };

  var hideImageRedactor = function () {

    uploadOverlay.classList.add('hidden');
    uploadFile.value = null;
    document.removeEventListener('keydown', onRedactorEscPress);

  };

  uploadFile.addEventListener('change', showImageRedactor);

  uploadCancel.addEventListener('click', hideImageRedactor);

})();
