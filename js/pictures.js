'use strict';

var ESC_KEYCODE = 27;
var PHOTOS_COUNT = 25;

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
    hideImgRedactor();
  }

};

var showImgRedactor = function () {

  uploadSection.querySelector('.img-upload__overlay').classList.remove('hidden');
  document.addEventListener('keydown', onRedactorEscPress);

};

var hideImgRedactor = function () {

  uploadSection.querySelector('.img-upload__overlay').classList.add('hidden');
  uploadFile.value = null;
  document.removeEventListener('keydown', onRedactorEscPress);

};

uploadFile.addEventListener('change', showImgRedactor);

uploadCancel.addEventListener('click', hideImgRedactor);

var miniPicturesContainer = document.querySelector('.pictures');
var picturesHrefs = miniPicturesContainer.querySelectorAll('a');

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

picturesHrefs.forEach(function (href, i) {

  href.addEventListener('click', function () {

    renderBigPhoto(usersPhotos[i]);
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

}, true);

var effectPower = function () {

  effectValue.value = levelPin.offsetLeft;
  var currentPower = 100 * levelPin.offsetLeft / 455;
  var currentFilter = uploadedImg.classList[1].split('--')[1];
  uploadedImg.style.filter = currentFilter + '(' + currentPower + ')';

};

levelPin.addEventListener('mouseup', function () {

  effectPower();

});
