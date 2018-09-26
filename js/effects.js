'use strict';

(function () {

  var PIN_WIDTH = 18;
  var EFFECT_LEVEL_LINE_WIDTH = 455;

  var calculateEffectPower = function (pinPosition) {

    window.util.effectValue.value = pinPosition + PIN_WIDTH / 2;
    var currentPower = 100 * pinPosition / EFFECT_LEVEL_LINE_WIDTH;
    return currentPower;

  };

  var tuneEffect = function (power) {

    var currentFilter = window.util.uploadedImg.classList[1].split('--')[1];

    switch (currentFilter) {

      case 'chrome':
        window.util.uploadedImg.style.filter = 'grayscale(' + power / 100 + ')';
        break;

      case 'sepia':
        window.util.uploadedImg.style.filter = 'sepia(' + power / 100 + ')';
        break;

      case 'marvin':
        window.util.uploadedImg.style.filter = 'invert(' + power + '%)';
        break;

      case 'phobos':
        window.util.uploadedImg.style.filter = 'blur(' + (power / 33.3).toFixed(2) + 'px)';
        break;

      case 'heat':
        window.util.uploadedImg.style.filter = 'brightness(' + (power / 50 + 1) + ')';
        break;

      default:
        window.util.uploadedImg.style.filter = 'none';
        break;
    }

    return window.util.uploadedImg.style.filter;

  };

  var getCoordX = function (elem) {

    return elem.getBoundingClientRect().left;

  };

  window.util.effectPin.addEventListener('mousedown', function (evt) {

    var pinCoord = getCoordX(window.util.effectPin);
    var shiftX = evt.pageX - pinCoord;
    var lineCoord = getCoordX(window.util.effectLine);

    var onMouseMove = function (evtMove) {

      var newCoord = evtMove.pageX - shiftX - lineCoord + PIN_WIDTH / 2;

      if (newCoord < 0) {

        newCoord = 0;

      } else if (newCoord > EFFECT_LEVEL_LINE_WIDTH) {

        newCoord = EFFECT_LEVEL_LINE_WIDTH;

      }

      window.util.effectPin.style.left = newCoord * 100 / EFFECT_LEVEL_LINE_WIDTH + '%';
      window.util.effectDepthLine.style.width = newCoord * 100 / EFFECT_LEVEL_LINE_WIDTH + '%';
      tuneEffect(calculateEffectPower(window.util.effectPin.offsetLeft));
    };

    var onMouseUp = function () {

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      tuneEffect(calculateEffectPower(window.util.effectPin.offsetLeft));

    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  });

  var changeEffect = function (effectName) {

    var elementClassList = window.util.uploadedImg.classList;
    elementClassList.remove(elementClassList[1]);
    elementClassList.add('effects__preview--' + effectName);

    if (effectName === 'none') {

      window.util.effectLevelFieldset.classList.add('hidden');

    } else {

      window.util.effectLevelFieldset.classList.remove('hidden');

    }

  };

  window.util.effects.addEventListener('click', function (evt) {

    changeEffect(evt.target.defaultValue);
    window.util.uploadedImg.style.filter = tuneEffect(100);
    window.util.effectValue.value = 100;
    window.util.effectPin.style.left = '100%';
    window.util.effectDepthLine.style.width = '100%';

  }, true);

})();
