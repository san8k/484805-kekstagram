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

  var form = window.util.uploadSection.querySelector('.img-upload__form');
  var uploadOverlay = window.util.uploadSection.querySelector('.img-upload__overlay');

  var successTemplate = document.querySelector('#success')
      .content
      .querySelector('.success');
  var errorTemplate = document.querySelector('#error')
      .content
      .querySelector('.error');
  // var loadingTemplate = document.querySelector('#messages')
  //     .content
  //     .querySelector('img-upload__message--loading');

  var renderMessage = function (status, message) {
    var messageNode = status.cloneNode(true);

    if (errorTemplate) {

      messageNode.querySelector('.error__title').textContent = 'Ошибка загрузки файла. \n' + message;

    }

    return messageNode;
  };

  var showStatus = function (currentStatus) {

    var fragment = document.createDocumentFragment();
    var messageContainer = document.querySelector('main');
    fragment.appendChild(currentStatus);
    messageContainer.appendChild(fragment);

  };

  var onLoad = function () {

    hideImageRedactor();
    showStatus(renderMessage(successTemplate));

  };

  var onError = function (message) {

    hideImageRedactor();
    showStatus(renderMessage(errorTemplate, message));

  };

  form.addEventListener('submit', function (evt) {


    evt.preventDefault();
    window.uploadUserForm(onLoad, onError, new FormData(form));

  });

})();
