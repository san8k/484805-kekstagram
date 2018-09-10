'use strict';

var PHOTO_COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

var PHOTO_DESCRIPTIONS = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят', 'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......', 'Вот это тачка!'];

var PHOTOS_ARRAY_LENGTH = 25;

var getRandomInt = function (min, max) {

  return Math.floor(min + Math.random() * (max - min + 1));

};

var usersPhotos = [];
var photoPage = {};

var getRandomCommentsList = function (amount) {

  var commentsList = [];
  var commentsListLength = getRandomInt(0, amount);

  for (var i = 0; i <= commentsListLength; i++) {

    commentsList.push(PHOTO_COMMENTS[getRandomInt(0, PHOTO_COMMENTS.length - 1)]);

  }

  return commentsList;

};

for (var i = 0; i < PHOTOS_ARRAY_LENGTH; i++) {

  photoPage = {
    url: 'photos/' + (i + 1) + '.jpg',
    likes: getRandomInt(15, 200),
    comments: getRandomCommentsList(1),
    description: PHOTO_DESCRIPTIONS[getRandomInt(0, 5)],
  };

  usersPhotos.push(photoPage);

}

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

var fragment = document.createDocumentFragment();
var otherUsersPictures = document.querySelector('.pictures');

for (var k = 0; k < usersPhotos.length; k++) {

  fragment.appendChild(renderPhoto(usersPhotos[k]));

}

otherUsersPictures.appendChild(fragment);

var bigPicture = document.querySelector('.big-picture');

var displayBigPicture = function (state) {

  return state === 'visible' ? bigPicture.classList.remove('hidden') : bigPicture.classList.add('hidden');

};

displayBigPicture('visible');

var renderBigPhoto = function (photoIndex) {


  var bigPictureImage = bigPicture.querySelector('.big-picture__img');
  bigPictureImage.querySelector('img').src = usersPhotos[photoIndex].url;
  bigPicture.querySelector('.likes-count').textContent = usersPhotos[photoIndex].likes;
  bigPicture.querySelector('.comments-count').textContent = usersPhotos[photoIndex].comments.length;
  bigPicture.querySelector('.social__caption').textContent = usersPhotos[photoIndex].description;

  var socialComment = bigPicture.querySelectorAll('.social__comment');

  for (var i = 0; i < socialComment.length; i++) {

    socialComment[i].querySelector('img').src = 'img/avatar-' + getRandomInt(1, 6) + '.svg';
    socialComment[i].querySelector('p').textContent = usersPhotos[photoIndex].comments[i];

  }

};

renderBigPhoto(0);

bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
bigPicture.querySelector('.comments-loader').classList.add('visually-hidden');

