'use strict';

var ESC_KEYCODE = 27;
var PHOTOS_COUNT = 25;
var SCALE_STEP = 25;

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

  if (evt.keyCode === ESC_KEYCODE) {
    hideImageRedactor();
  }

};

var showImageRedactor = function () {

  uploadSection.querySelector('.img-upload__overlay').classList.remove('hidden');
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

var levelPin = uploadSection.querySelector('.effect-level__pin');
var effectValue = uploadSection.querySelector('.effect-level__value');
var uploadedImg = uploadSection.querySelector('.img-upload__preview');

var effects = uploadSection.querySelector('.effects__list');

var changeEffect = function (effectName) {

  var elementClassList = uploadedImg.classList;
  elementClassList.remove(elementClassList[1]);
  elementClassList.add('effects__preview--' + effectName);

};

effects.addEventListener('click', function (evt) {

  changeEffect(evt.target.defaultValue);
  uploadedImg.style.filter = tuneEffect(100);

}, true);

var calculateEffectPower = function () {

  effectValue.value = levelPin.offsetLeft;
  var currentPower = 100 * levelPin.offsetLeft / 455;
  return currentPower;

};

var tuneEffect = function (power) {

  var currentFilter = uploadedImg.classList[1].split('--')[1];

  if (currentFilter === 'chrome') {

    uploadedImg.style.filter = 'grayscale(' + power / 100 + ')';

  } else if (currentFilter === 'sepia') {

    uploadedImg.style.filter = 'sepia(' + power / 100 + ')';

  } else if (currentFilter === 'marvin') {

    uploadedImg.style.filter = 'invert(' + power + '%)';

  } else if (currentFilter === 'phobos') {

    uploadedImg.style.filter = 'blur(' + (power / 33.3).toFixed(2) + 'px)';

  } else if (currentFilter === 'heat') {

    uploadedImg.style.filter = 'brightness(' + (power / 50 + 1) + ')';

  } else {

    uploadedImg.style.filter = 'none';

  }

  return uploadedImg.style.filter;

};

var onPinClick = function () {

  tuneEffect(calculateEffectPower());

};

levelPin.addEventListener('mouseup', onPinClick);

var buttonMinus = uploadSection.querySelector('.scale__control--smaller');
var buttonPlus = uploadSection.querySelector('.scale__control--bigger');
var scaleControlValue = uploadSection.querySelector('input[name="scale"]');
var currentTransformScale = 1;


buttonMinus.addEventListener('click', function () {

  var currentScaleValue = parseInt((scaleControlValue.value.split('')[0] + scaleControlValue.value.split('')[1]), 10);

  if (scaleControlValue.value.split('').length < 3) {

    currentScaleValue = parseInt(scaleControlValue.value.split('')[0], 10);

  }

  if (currentScaleValue >= SCALE_STEP) {

    scaleControlValue.value = (currentScaleValue - SCALE_STEP) + '%';
    currentTransformScale -= 0.25;
    uploadedImg.style.transform = 'scale(' + currentTransformScale + ')';

  }

});

buttonPlus.addEventListener('click', function () {

  var currentScaleValue = parseInt((scaleControlValue.value.split('')[0] + scaleControlValue.value.split('')[1]), 10);

  if (scaleControlValue.value.split('').length > 3) {

    for (var i = 1; i < scaleControlValue.value.split('').length; i++) {

      currentScaleValue += parseInt(scaleControlValue.value.split('')[i - 1], 10);

    }

  }

  if (currentScaleValue + SCALE_STEP <= 100) {

    scaleControlValue.value = (currentScaleValue + SCALE_STEP) + '%';
    currentTransformScale += 0.25;
    uploadedImg.style.transform = 'scale(' + currentTransformScale + ')';

  }

});

