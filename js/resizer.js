'use strict';

(function () {

  var SCALE_STEP = 25;
  var MAX_SCALE_VALUE = 100;
  var scaleControlValue = window.util.uploadSection.querySelector('input[name="scale"]');

  window.resizer = {
    MAX_SCALE_VALUE: MAX_SCALE_VALUE,
    currentTransformScale: 1,
    currentScaleValue: MAX_SCALE_VALUE,
    scaleControlValue: scaleControlValue
  };

  var buttonMinus = window.util.uploadSection.querySelector('.scale__control--smaller');
  var buttonPlus = window.util.uploadSection.querySelector('.scale__control--bigger');
  scaleControlValue.value = window.resizer.currentScaleValue + '%';

  var getResizeValue = function (transformValue, controlValue) {

    window.effects.uploadedImg.style.transform = 'scale(' + transformValue + ')';
    scaleControlValue.value = controlValue + '%';

  };

  var reducePreviewSize = function (step) {

    if (window.resizer.currentScaleValue > step) {
      window.resizer.currentScaleValue -= step;
      window.resizer.currentTransformScale -= step / 100;
    }

  };

  var increasePreviewSize = function (step) {

    if (window.resizer.currentScaleValue + step <= MAX_SCALE_VALUE) {
      window.resizer.currentScaleValue += step;
      window.resizer.currentTransformScale += step / 100;
    }

  };

  buttonMinus.addEventListener('click', function () {

    reducePreviewSize(SCALE_STEP);
    getResizeValue(window.resizer.currentTransformScale, window.resizer.currentScaleValue);

  });

  buttonPlus.addEventListener('click', function () {

    increasePreviewSize(SCALE_STEP);
    getResizeValue(window.resizer.currentTransformScale, window.resizer.currentScaleValue);

  });

})();
