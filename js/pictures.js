'use strict';

var photoComments = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

var photoDescriptions = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят', 'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......', 'Вот это тачка!'];

var getRandomInt = function (min, max) {
  return Math.floor(min + Math.random() * (max - min + 1));
};

var usersPhotos = [];
var photoPage = {};

for (var i = 0; i < 25; i++) {

  var commentsList = [];
  var commentsListLength = getRandomInt(0, 1);

  for (var j = 0; j <= commentsListLength; j++) {

    commentsList.push(photoComments[getRandomInt(0, 5)]);

  }

  photoPage = {
    url: 'photos/' + (i + 1) + '.jpg',
    likes: getRandomInt(15, 200),
    comments: commentsList,
    description: photoDescriptions[getRandomInt(0, 5)],
  };

  usersPhotos[i] = photoPage;
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
bigPicture.classList.remove('hidden');

var bigPictureImage = bigPicture.querySelector('.big-picture__img');
bigPictureImage.querySelector('img').src = usersPhotos[0].url;
bigPicture.querySelector('.likes-count').textContent = usersPhotos[0].likes;
bigPicture.querySelector('.comments-count').textContent = usersPhotos[0].comments.length;
bigPicture.querySelector('.social__caption').textContent = usersPhotos[0].description;

var socialComment = bigPicture.querySelectorAll('.social__comment');

for (var l = 0; l < socialComment.length; l++) {

  socialComment[l].querySelector('img').src = 'img/avatar-' + getRandomInt(1, 6) + '.svg';

  socialComment[l].querySelector('p').textContent = (usersPhotos[0].comments.length === 2) ? usersPhotos[0].comments[l] : usersPhotos[0].comments;

}

bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
bigPicture.querySelector('.comments-loader').classList.add('visually-hidden');

