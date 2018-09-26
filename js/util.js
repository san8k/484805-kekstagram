'use strict';

(function () {

  var uploadSection = document.querySelector('.img-upload');
  window.util = {
    ESC_KEYCODE: 27,
    previewHashtags: uploadSection.querySelector('input[name="hashtags"]'),
    previewDescription: uploadSection.querySelector('textarea[name="description"]'),
    submitButton: uploadSection.querySelector('#upload-submit'),
    uploadFile: uploadSection.querySelector('#upload-file'),
    uploadCancel: uploadSection.querySelector('#upload-cancel'),
    effectPin: uploadSection.querySelector('.effect-level__pin'),
    effectValue: uploadSection.querySelector('.effect-level__value'),
    effectLevelFieldset: uploadSection.querySelector('.img-upload__effect-level'),
    uploadedImg: uploadSection.querySelector('.img-upload__preview'),
    effectLine: uploadSection.querySelector('.effect-level__line'),
    effectDepthLine: uploadSection.querySelector('.effect-level__depth'),
    effects: uploadSection.querySelector('.effects__list'),
    buttonMinus: uploadSection.querySelector('.scale__control--smaller'),
    buttonPlus: uploadSection.querySelector('.scale__control--bigger'),
    uploadOverlay: uploadSection.querySelector('.img-upload__overlay'),
    scaleControlValue: uploadSection.querySelector('input[name="scale"]'),
    getRandomInt: function (min, max) {

      return Math.floor(min + Math.random() * (max - min + 1));

    },
    findUniqueStrings: function (array) {

      var obj = {};
      for (var i = 0; i < array.length; i++) {

        var string = array[i];
        obj[string] = true;

      }

      return Object.keys(obj);

    }
  };

})();
