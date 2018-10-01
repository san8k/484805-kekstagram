'use strict';

(function () {

  var URL_DOWNLOAD = 'https://js.dump.academy/kekstagram/data';
  var URL_UPLOAD = 'https://js.dump.academy/kekstagram';

  var serverInteraction = function (interaction, url, onLoad, onError) {

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {

      switch (xhr.status) {

        case 200:
          onLoad(xhr.response);
          break;
        default:
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);

      }
      return xhr.response;
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000;

    xhr.open(interaction, url);
    xhr.send();

  };

  window.backend = {
    downloadUsersPhotos: function (onLoad, onError) {

      serverInteraction('GET', URL_DOWNLOAD, onLoad, onError);

    },
    uploadUserForm: function (onLoad, onError, data) {

      serverInteraction('POST', URL_UPLOAD, onLoad, onError, data);

    }
  };


})();
