'use strict';

var ESC_KEYCODE = 27;
var PHOTOS_COUNT = 25;
var SCALE_STEP = 25;
var MAX_SCALE_VALUE = 100;
var PIN_WIDTH = 18;
var EFFECT_LEVEL_LINE_WIDTH = 455;

var PHOTO_COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var PHOTO_DESCRIPTIONS = [
  'Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'
];

var getRandomInt = function (min, max) {

  return Math.floor(min + Math.random() * (max - min + 1));

};

var getRandomCommentsList = function (amount) {

  var commentsList = [];
  var commentsListLength = getRandomInt(0, amount);

  for (var i = 0; i <= commentsListLength; i++) {

    commentsList.push(PHOTO_COMMENTS[getRandomInt(0, PHOTO_COMMENTS.length - 1)]);

  }

  return commentsList;

};

var getPhotoInfo = function (photosCount) {

  var usersPhotosList = [];
  var photoPage = {};

  for (var i = 0; i < photosCount; i++) {

    photoPage = {
      url: 'photos/' + (i + 1) + '.jpg',
      likes: getRandomInt(15, 200),
      comments: getRandomCommentsList(1),
      description: PHOTO_DESCRIPTIONS[getRandomInt(0, 5)],
    };

    usersPhotosList.push(photoPage);

  }
  return usersPhotosList;

};

var usersPhotos = getPhotoInfo(PHOTOS_COUNT);

var pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('a');

var renderPhoto = function (photo) {

  var photoElement = pictureTemplate.cloneNode(true);
  photoElement.querySelector('img').src = photo.url;
  photoElement.querySelector('.picture__likes').textContent = photo.likes;
  photoElement.querySelector('.picture__comments').textContent = photo.comments.length;
  return photoElement;

};

var createFragment = function (data, container) {

  var fragment = document.createDocumentFragment();
  var createdElements = document.querySelector(container);

  for (var i = 0; i < data.length; i++) {

    fragment.appendChild(renderPhoto(data[i]));

  }

  createdElements.appendChild(fragment);

};

createFragment(usersPhotos, '.pictures');

var bigPicture = document.querySelector('.big-picture');

var renderBigPhoto = function (currentPhoto) {

  var bigPictureImage = bigPicture.querySelector('.big-picture__img');
  bigPictureImage.querySelector('img').src = currentPhoto.url;
  bigPicture.querySelector('.likes-count').textContent = currentPhoto.likes;
  bigPicture.querySelector('.comments-count').textContent = currentPhoto.comments.length;
  bigPicture.querySelector('.social__caption').textContent = currentPhoto.description;

  var socialComment = bigPicture.querySelectorAll('.social__comment');

  for (var i = 0; i < currentPhoto.comments.length; i++) {

    socialComment[i].querySelector('img').src = 'img/avatar-' + getRandomInt(1, 6) + '.svg';
    socialComment[i].querySelector('p').textContent = currentPhoto.comments[i];

  }

  bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
  bigPicture.querySelector('.comments-loader').classList.add('visually-hidden');

};

var uploadSection = document.querySelector('.img-upload');
var uploadFile = uploadSection.querySelector('#upload-file');
var uploadCancel = uploadSection.querySelector('#upload-cancel');

var onRedactorEscPress = function (evt) {

  if (evt.keyCode === ESC_KEYCODE && previewDescription !== document.activeElement && previewHashtags !== document.activeElement) {

    hideImageRedactor();

  }

};

var showImageRedactor = function () {

  uploadSection.querySelector('.img-upload__overlay').classList.remove('hidden');
  effectLevelFieldset.classList.add('hidden');
  document.addEventListener('keydown', onRedactorEscPress);

};

var hideImageRedactor = function () {

  uploadSection.querySelector('.img-upload__overlay').classList.add('hidden');
  uploadFile.value = null;
  document.removeEventListener('keydown', onRedactorEscPress);

};

uploadFile.addEventListener('change', showImageRedactor);

uploadCancel.addEventListener('click', hideImageRedactor);

var miniPicturesContainer = document.querySelector('.pictures');
var miniPictures = miniPicturesContainer.querySelectorAll('img');

var onBigPictureEscPress = function (evt) {

  if (evt.keyCode === ESC_KEYCODE) {

    hideIBigPicture();

  }

};

var showBigPicture = function () {

  bigPicture.classList.remove('hidden');
  document.addEventListener('keydown', onBigPictureEscPress);

};

var hideIBigPicture = function () {

  bigPicture.classList.add('hidden');
  document.removeEventListener('keydown', onBigPictureEscPress);

};

miniPictures.forEach(function (image, i) {

  image.addEventListener('click', function () {

    renderBigPhoto(usersPhotos[i - 1]);
    showBigPicture();

  });
});

bigPicture.querySelector('#picture-cancel').addEventListener('click', hideIBigPicture);

var effectLevelFieldset = uploadSection.querySelector('.img-upload__effect-level');
var effectPin = uploadSection.querySelector('.effect-level__pin');
var effectValue = uploadSection.querySelector('.effect-level__value');
var uploadedImg = uploadSection.querySelector('.img-upload__preview');
var effectLine = uploadSection.querySelector('.effect-level__line');
var effectDepthLine = uploadSection.querySelector('.effect-level__depth');

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

var effects = uploadSection.querySelector('.effects__list');

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

var buttonMinus = uploadSection.querySelector('.scale__control--smaller');
var buttonPlus = uploadSection.querySelector('.scale__control--bigger');
var scaleControlValue = uploadSection.querySelector('input[name="scale"]');
var currentTransformScale = 1;
var currentScaleValue = MAX_SCALE_VALUE;
scaleControlValue.value = currentScaleValue + '%';

var getResizeValue = function (transformValue, controlValue) {

  uploadedImg.style.transform = 'scale(' + transformValue + ')';
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

var previewHashtags = uploadSection.querySelector('input[name="hashtags"]');
var previewDescription = uploadSection.querySelector('textarea[name="description"]');
var submitButton = uploadSection.querySelector('#upload-submit');

var findUniqueStrings = function (array) {

  var obj = {};

  for (var i = 0; i < array.length; i++) {

    var string = array[i];
    obj[string] = true;

  }

  return Object.keys(obj);

};

var hashtagsValidation = function (string) {

  var hashtagsLowerCase = string.value.toLowerCase();

  var hashtagsArray = hashtagsLowerCase.split(' ');

  if (hashtagsArray.length > 5) {

    return previewHashtags.setCustomValidity('Используйте не более пяти хэш-тегов');

  } else if (findUniqueStrings(hashtagsArray).length !== hashtagsArray.length) {

    return previewHashtags.setCustomValidity('Не повторяйте хэш-теги');

  } else {

    for (var i = 0; i < hashtagsArray.length; i++) {

      if (hashtagsArray[i].length > 20) {

        return previewHashtags.setCustomValidity('Длина хэш-тега должна быть не более 20 символов');

      } else if (hashtagsArray[i].match(/[^а-яёa-z0-9#]/gi)) {

        return previewHashtags.setCustomValidity('Используйте русские или латинские буквы и цифры');

      } else if (hashtagsArray[i].match(/^[^#]/)) {

        return previewHashtags.setCustomValidity('Пишите хэш-теги начиная с # через пробел');

      }

    }

  }

  return previewHashtags.setCustomValidity('');

};

submitButton.addEventListener('click', function () {

  hashtagsValidation(previewHashtags);

});

