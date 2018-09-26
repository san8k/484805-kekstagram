'use strict';

(function () {

  var SCALE_STEP = 25;
  var MAX_SCALE_VALUE = 100;

  var currentTransformScale = 1;
  var currentScaleValue = MAX_SCALE_VALUE;
  var buttonMinus = window.util.uploadSection.querySelector('.scale__control--smaller');
  var buttonPlus = window.util.uploadSection.querySelector('.scale__control--bigger');
  var scaleControlValue = window.util.uploadSection.querySelector('input[name="scale"]');

  scaleControlValue.value = currentScaleValue + '%';
  var getResizeValue = function (transformValue, controlValue) {

    window.effects.uploadedImg.style.transform = 'scale(' + transformValue + ')';
    scaleControlValue.value = controlValue + '%';

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

  buttonMinus.addEventListener('click', function () {

    reducePreviewSize(SCALE_STEP);
    getResizeValue(currentTransformScale, currentScaleValue);

  });

  buttonPlus.addEventListener('click', function () {

    increasePreviewSize(SCALE_STEP);
    getResizeValue(currentTransformScale, currentScaleValue);

  });

})();
