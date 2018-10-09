'use strict';

(function () {

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var fileChooser = window.util.uploadSection.querySelector('input[type="file"]');
  var previewContainer = window.util.uploadSection.querySelector('.img-upload__preview');
  var preview = previewContainer.querySelector('img');

  fileChooser.addEventListener('change', function () {

    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        preview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });

  window.file = {
    fileChooser: fileChooser
  };

})();
