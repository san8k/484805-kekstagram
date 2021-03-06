'use strict';

(function () {

  var uploadOverlay = window.util.uploadSection.querySelector('.img-upload__overlay');
  var uploadFile = window.util.uploadSection.querySelector('#upload-file');
  var uploadCancel = window.util.uploadSection.querySelector('#upload-cancel');
  var previewDescription = window.util.uploadSection.querySelector('textarea[name="description"]');

  var onRedactorEscPress = function (evt) {

    if (evt.keyCode === window.util.ESC_KEYCODE && previewDescription !== document.activeElement && window.validator.previewHashtags !== document.activeElement) {
      hideImageRedactor();
    }

  };

  var onFileChange = function () {

    uploadOverlay.classList.remove('hidden');
    window.effects.effectLevelFieldset.classList.add('hidden');
    document.addEventListener('keydown', onRedactorEscPress);
    window.resizer.scaleControlValue.value = window.resizer.MAX_SCALE_VALUE + '%';

  };

  var hideImageRedactor = function () {

    uploadOverlay.classList.add('hidden');
    uploadFile.value = null;
    document.removeEventListener('keydown', onRedactorEscPress);
    window.validator.previewHashtags.value = '';
    previewDescription.value = '';
    window.effects.uploadedImage.style.filter = 'none';
    window.effects.uploadedImage.style.transform = 'scale(1)';
    window.resizer.currentTransformScale = 1;
    window.resizer.currentScaleValue = window.resizer.MAX_SCALE_VALUE;
    window.file.chooser.value = null;

  };

  uploadFile.addEventListener('change', onFileChange);
  uploadCancel.addEventListener('click', function () {
    hideImageRedactor();
  });

  var form = window.util.uploadSection.querySelector('.img-upload__form');
  var successTemplate = document.querySelector('#success')
      .content
      .querySelector('.success');
  var errorTemplate = document.querySelector('#error')
      .content
      .querySelector('.error');


  var renderSuccess = function () {

    var successNode = successTemplate.cloneNode(true);

    return successNode;
  };

  var renderError = function (message) {

    var errorNode = errorTemplate.cloneNode(true);
    errorNode.querySelector('.error__title').textContent = 'Ошибка загрузки файла. ' + message;

    return errorNode;
  };

  var showStatus = function (currentStatus) {

    var fragment = document.createDocumentFragment();
    var messageContainer = document.querySelector('main');
    fragment.appendChild(currentStatus);
    messageContainer.appendChild(fragment);

  };

  var setKeydownListener = function (statusNode) {

    var onMessagePressEsc = function (evt) {

      if (evt.keyCode === window.util.ESC_KEYCODE) {
        statusNode.remove();
      }

      document.removeEventListener('keydown', onMessagePressEsc);

    };

    document.addEventListener('keydown', onMessagePressEsc);

  };

  var onSuccessUploadForm = function () {

    hideImageRedactor();

    showStatus(renderSuccess());
    var successNode = document.querySelector('.success');
    var successButton = successNode.querySelector('.success__button');

    successButton.addEventListener('click', function () {
      window.util.deleteElement(successNode);
    });

    window.addEventListener('click', function () {
      window.util.deleteElement(successNode);
    });

    setKeydownListener(successNode);

  };

  var onErrorUploadForm = function (message) {

    hideImageRedactor();
    showStatus(renderError(message));
    var errorNode = document.querySelector('.error');
    var errorButtons = errorNode.querySelectorAll('.error__button');

    errorButtons.forEach(function (button) {

      button.addEventListener('click', function () {
        window.util.deleteElement(errorNode);
      });

    });

    window.addEventListener('click', function () {
      window.util.deleteElement(errorNode);
    });

    setKeydownListener(errorNode);

  };

  form.addEventListener('submit', function (evt) {

    evt.preventDefault();
    window.backend.uploadUserForm(onSuccessUploadForm, onErrorUploadForm, new FormData(form));

  });

})();
