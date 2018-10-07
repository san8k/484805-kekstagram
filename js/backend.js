'use strict';

(function () {

  var Url = {
    DOWNLOAD: 'https://js.dump.academy/kekstagram/data',
    UPLOAD: 'https://js.dump.academy/kekstagram'
  };

  var serverInteraction = function (interaction, url, onLoad, onError, data) {

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
      onError('Запрос не успел выполниться за ' + Math.floor(xhr.timeout / 1000) + ' секунд');
    });

    xhr.timeout = 10000;
    xhr.open(interaction, url);
    xhr.send(data);

  };

  window.backend = {
    downloadUsersPhotos: function (onLoad, onError) {
      serverInteraction('GET', Url.DOWNLOAD, onLoad, onError);
    },
    uploadUserForm: function (onLoad, onError, data) {
      serverInteraction('POST', Url.UPLOAD, onLoad, onError, data);
    }
  };

})();
