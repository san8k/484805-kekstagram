'use strict';

(function () {

  var SCALE_STEP = 25;
  var MAX_SCALE_VALUE = 100;

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
