'use strict';

(function () {

  var SCALE_STEP = 25;
  var MAX_SCALE_VALUE = 100;
  var PIN_WIDTH = 18;
  var EFFECT_LEVEL_LINE_WIDTH = 455;

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

  var currentTransformScale = 1;
  var currentScaleValue = MAX_SCALE_VALUE;
  window.util.scaleControlValue.value = currentScaleValue + '%';
  var getResizeValue = function (transformValue, controlValue) {

    window.util.uploadedImg.style.transform = 'scale(' + transformValue + ')';
    window.util.scaleControlValue.value = controlValue + '%';

  };

  var reducePreviewSize = function (step) {

    if (currentScaleValue > step) {

      currentScaleValue -= step;
      currentTransformScale -= step / 100;

    }

  };

  var increasePreviewSize = function (step) {

    if (currentScaleValue + step <= MAX_SCALE_VALUE) {

      currentScaleValue += step;
      currentTransformScale += step / 100;

    }

  };

  window.util.buttonMinus.addEventListener('click', function () {

    reducePreviewSize(SCALE_STEP);
    getResizeValue(currentTransformScale, currentScaleValue);

  });

  window.util.buttonPlus.addEventListener('click', function () {

    increasePreviewSize(SCALE_STEP);
    getResizeValue(currentTransformScale, currentScaleValue);

  });

})();
