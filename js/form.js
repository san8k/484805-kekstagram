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
    window.resize.scaleControlValue.value = window.resize.MAX_SCALE_VALUE + '%';

  };

  var hideImageRedactor = function () {

    uploadOverlay.classList.add('hidden');
    uploadFile.value = null;
    document.removeEventListener('keydown', onRedactorEscPress);
    window.validation.previewHashtags.value = '';
    previewDescription.value = '';
    window.effects.uploadedImg.style.filter = 'none';
    window.effects.uploadedImg.style.transform = 'scale(1)';
    window.resize.currentTransformScale = 1;
    window.resize.currentScaleValue = window.resize.MAX_SCALE_VALUE;

  };

  uploadFile.addEventListener('change', showImageRedactor);

  uploadCancel.addEventListener('click', hideImageRedactor);

  var form = window.util.uploadSection.querySelector('.img-upload__form');

  var successTemplate = document.querySelector('#success')
      .content
      .querySelector('.success');
  var errorTemplate = document.querySelector('#error')
      .content
      .querySelector('.error');

  var renderMessage = function (status, message) {
    var messageNode = status.cloneNode(true);

    if (errorTemplate) {

      messageNode.querySelector('.error__title').textContent = 'Ошибка загрузки файла. ' + message;

    }

    return messageNode;
  };

  var showStatus = function (currentStatus) {

    var fragment = document.createDocumentFragment();
    var messageContainer = document.querySelector('main');
    fragment.appendChild(currentStatus);
    messageContainer.appendChild(fragment);


  };

  var deleteMessageNode = function (statusNode) {

    statusNode.remove();

  };

  var onLoad = function () {

    hideImageRedactor();
    showStatus(renderMessage(successTemplate));
    var successNode = document.querySelector('.success');
    var successButton = successNode.querySelector('.success__button');

    var onSuccessPressEsc = function (evt) {

      if (evt.keyCode === window.util.ESC_KEYCODE) {

        successNode.remove();

      }

    };
    successButton.addEventListener('click', function () {

      deleteMessageNode(successNode);

    });

    document.addEventListener('keydown', onSuccessPressEsc);

  };

  var onError = function (message) {

    hideImageRedactor();
    showStatus(renderMessage(errorTemplate, message));
    var errorNode = document.querySelector('.error');
    var errorButtons = errorNode.querySelectorAll('.error__button');

    var onErrorPressEsc = function (evt) {

      if (evt.keyCode === window.util.ESC_KEYCODE) {

        errorNode.remove();

      }

    };

    errorButtons.forEach(function (button) {

      button.addEventListener('click', function () {

        deleteMessageNode(errorNode);

      });

    });
    document.addEventListener('keydown', onErrorPressEsc);

  };

  form.addEventListener('submit', function (evt) {

    evt.preventDefault();
    window.uploadUserForm(onLoad, onError, new FormData(form));

  });

})();
