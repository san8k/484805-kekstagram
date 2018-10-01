'use strict';

(function () {

  var PIN_WIDTH = 18;
  var EFFECT_LEVEL_LINE_WIDTH = 455;

  var effectPin = window.util.uploadSection.querySelector('.effect-level__pin');
  var effectValue = window.util.uploadSection.querySelector('.effect-level__value');
  var effectLevelFieldset = window.util.uploadSection.querySelector('.img-upload__effect-level');
  var uploadedImg = window.util.uploadSection.querySelector('.img-upload__preview');
  var effectLine = window.util.uploadSection.querySelector('.effect-level__line');
  var effectDepthLine = window.util.uploadSection.querySelector('.effect-level__depth');
  var effects = window.util.uploadSection.querySelector('.effects__list');


  var calculateEffectPower = function (pinPosition) {

    effectValue.value = pinPosition + PIN_WIDTH / 2;
    var currentPower = 100 * pinPosition / EFFECT_LEVEL_LINE_WIDTH;
    return currentPower;

  };

  var tuneEffect = function (power) {

    var currentFilter = uploadedImg.classList[1].split('--')[1];

    switch (currentFilter) {

      case 'chrome':
        uploadedImg.style.filter = 'grayscale(' + power / 100 + ')';
        break;

      case 'sepia':
        uploadedImg.style.filter = 'sepia(' + power / 100 + ')';
        break;

      case 'marvin':
        uploadedImg.style.filter = 'invert(' + power + '%)';
        break;

      case 'phobos':
        uploadedImg.style.filter = 'blur(' + (power / 33.3).toFixed(2) + 'px)';
        break;

      case 'heat':
        uploadedImg.style.filter = 'brightness(' + (power / 50 + 1) + ')';
        break;

      default:
        uploadedImg.style.filter = 'none';
        break;
    }

    return uploadedImg.style.filter;

  };

  var getCoordX = function (elem) {

    return elem.getBoundingClientRect().left;

  };

  effectPin.addEventListener('mousedown', function (evt) {

    var pinCoord = getCoordX(effectPin);
    var shiftX = evt.pageX - pinCoord;
    var lineCoord = getCoordX(effectLine);

    var onMouseMove = function (evtMove) {

      var newCoord = evtMove.pageX - shiftX - lineCoord + PIN_WIDTH / 2;

      if (newCoord < 0) {

        newCoord = 0;

      } else if (newCoord > EFFECT_LEVEL_LINE_WIDTH) {

        newCoord = EFFECT_LEVEL_LINE_WIDTH;

      }

      effectPin.style.left = newCoord * 100 / EFFECT_LEVEL_LINE_WIDTH + '%';
      effectDepthLine.style.width = newCoord * 100 / EFFECT_LEVEL_LINE_WIDTH + '%';
      tuneEffect(calculateEffectPower(effectPin.offsetLeft));
    };

    var onMouseUp = function () {

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      tuneEffect(calculateEffectPower(effectPin.offsetLeft));

    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  });

  var changeEffect = function (effectName) {

    var elementClassList = uploadedImg.classList;
    elementClassList.remove(elementClassList[1]);
    elementClassList.add('effects__preview--' + effectName);

    if (effectName === 'none') {

      effectLevelFieldset.classList.add('hidden');

    } else {

      effectLevelFieldset.classList.remove('hidden');

    }

  };

  effects.addEventListener('click', function (evt) {

    changeEffect(evt.target.defaultValue);
    uploadedImg.style.filter = tuneEffect(100);
    effectValue.value = 100;
    effectPin.style.left = '100%';
    effectDepthLine.style.width = '100%';

  }, true);

  window.effects = {
    effectLevelFieldset: effectLevelFieldset,
    uploadedImg: uploadedImg
  };

})();
