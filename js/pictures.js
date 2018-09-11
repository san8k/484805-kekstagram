'use strict';

var PHOTO_COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

var PHOTO_DESCRIPTIONS = ['Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'];

var PHOTOS_COUNT = 25;

var getRandomInt = function (min, max) {

  return Math.floor(min + Math.random() * (max - min + 1));

};

var usersPhotos = [];

var getRandomCommentsList = function (amount) {

  var commentsList = [];
  var commentsListLength = getRandomInt(0, amount);

  for (var i = 0; i <= commentsListLength; i++) {

    commentsList.push(PHOTO_COMMENTS[getRandomInt(0, PHOTO_COMMENTS.length - 1)]);

  }

  return commentsList;

};

var getPhotoInfo = function (photosCount) {

  for (var i = 0; i < photosCount; i++) {

    var photoPage = {
      url: 'photos/' + (i + 1) + '.jpg',
      likes: getRandomInt(15, 200),
      comments: getRandomCommentsList(1),
      description: PHOTO_DESCRIPTIONS[getRandomInt(0, 5)],
    };

    usersPhotos.push(photoPage);

  }

};

getPhotoInfo(PHOTOS_COUNT);

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

var displayBigPicture = function (state) {

  return state === 'visible' ? bigPicture.classList.remove('hidden') : bigPicture.classList.add('hidden');

};

displayBigPicture('visible');

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

renderBigPhoto(usersPhotos[0]);

