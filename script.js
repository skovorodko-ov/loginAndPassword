'use strict';

const btnNewUser = document.querySelector('.btnNewUser');
const btnUser = document.querySelector('.btnUser');
const users = document.querySelector('.users');
const title = document.querySelector('.title');

let usersData = JSON.parse(localStorage.getItem('usersData')) || [];

const addUserOnPage = function(a) {
    const li = document.createElement('li');
    li.innerHTML = '<div>' + a.name + ' ' + a.lastName + ', время регистрации: ' + a.time + '</div>' +
        '<button class="btnRemove">Удалить</button>';
    li.className = 'user';
    li.setAttribute('id', a.nikName);
    users.append(li);
};

if (usersData.length > 0) {
  usersData.forEach(function(elem) {
      addUserOnPage(elem);
  });
}

btnNewUser.addEventListener('click', function () {
  let user = {};
  let date = new Date();
  const month = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
  let second = function() {
    if (date.getSeconds() < 10) {
      return '0' + date.getSeconds();
    } else {
      return date.getSeconds();
    }
  };

  let userName = prompt('Введите имя и фамилию через пробел', 'Олег Сковородко');
  if (userName === null) {
    return;
  }

  if (userName.split(' ').length > 2 || userName.trim() === '' || userName.split(' ').length === 1) {
    alert('не верно ведены имя и фамилия');
    return;
  } else {
    user.name = userName.split(' ')[0];
    user.lastName = userName.split(' ')[1];
    user.time = date.getDate() + ' ' + month[date.getMonth()] + ' ' + date.getFullYear() + ', ' +
    date.getHours() + ':' + date.getMinutes() + ':' + second();
  }

  user.nikName = prompt('Введите свой логин', 'Anaken817');

  if (user.nikName === null || user.nikName.trim() === '') {
    alert('не верный формат логина!');
    return;
  }

  user.password = prompt('Введите пароль', '12345');

    if (user.password === null || user.password.trim() === '') {
    alert('не верный формат пароля!');
    return;
  }

  usersData.push(user);
  addUserOnPage(user);
  console.log(usersData);
  localStorage.setItem('usersData', JSON.stringify(usersData));
});

btnUser.addEventListener('click', function() {
  let enterNikname = prompt('Введите свой логин', 'Anaken817');

  if (enterNikname === null) {
    return;
  }

  let enterPassword = prompt('Введите пароль', '12345');

    if (enterPassword === null) {
    return;
  }

  let flag = 0;

  for (let i = 0; i < usersData.length; i++) {
    if (usersData[i].nikName === enterNikname && usersData[i].password === enterPassword) {
      title.classList.remove('unvizible');
      title.innerHTML = 'Привет ' + usersData[i].name + '!';
      break;
    } else {
      flag += 1;
    }
  }

  if (flag === usersData.length) {
    alert('Пользователь не найден');
  }

  usersData.forEach(function(elem) {
    if (elem.nikName === enterNikname && elem.password === enterPassword) {
      title.classList.remove('unvizible');
      title.innerHTML = 'Привет ' + elem.name + '!';
    }
  });
});

document.addEventListener('click', function(e) {
  if (e.target.classList.contains('btnRemove')) {
    e.target.parentNode.remove();
    usersData.forEach(function(item) {
        if (item.nikName === e.target.parentNode.getAttribute('id')) {
          let index = usersData.indexOf(item);
          usersData.splice(index, 1);
          localStorage.clear();
          localStorage.setItem('usersData', JSON.stringify(usersData));
        }
      });
  }
  console.log(usersData);
});