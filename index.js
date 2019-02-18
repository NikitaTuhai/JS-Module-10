"use strict";

/*
  Написать приложение для работы с REST сервисом, 
  все функции делают запрос и возвращают Promise 
  с которым потом можно работать. 
  
  Реализовать следующий функционал:
  - функция getAllUsers() - должна вернуть текущий список всех пользователей в БД.
  
  - функция getUserById(id) - должна вернуть пользователя с переданным id.
  
  - функция addUser(name, age) - должна записывать в БД юзера с полями name и age.
  
  - функция removeUser(id) - должна удалять из БД юзера по указанному id.
  
  - функция updateUser(id, user) - должна обновлять данные пользователя по id. 
    user это объект с новыми полями name и age.
  Документацию по бэкенду и пример использования прочитайте 
  в документации https://github.com/trostinsky/users-api#users-api.
  Сделать минимальный графический интерфейс в виде панели с полями и кнопками. 
  А так же панелью для вывода результатов операций с бэкендом.
*/

const URL = "https://test-users-api.herokuapp.com/users";

const users = document.querySelector(".users-form");
const userList = document.querySelector(".users-list");
const showUsers = document.querySelector(".js-show-users");
users.addEventListener("submit", getAllUsers);
//================================================================

const userByID = document.querySelector(".js-show-user-id");
const areaText = document.querySelector(".user-id");

const showIdForm = document.querySelector(".show-id-user-form");
const inputShowID = document.querySelector(".id");
showIdForm.addEventListener("submit", handleClickShowId);

function handleClickShowId(e) {
  e.preventDefault();
  getUserById(inputShowID.value);
}
//===================================================
const addUserForm = document.querySelector(".add-user-form");
const inputAge = document.querySelector(".age");
const inputName = document.querySelector(".name");
addUserForm.addEventListener("submit", handleClickAddUser);

function handleClickAddUser(e) {
  e.preventDefault();
  addUser(inputName.value, inputAge.value);
}
//================================================================
const dellForm = document.querySelector(".dell-user-form");
const inputDell = document.querySelector(".dell");
dellForm.addEventListener("submit", handleClickDell);

function handleClickDell(e) {
  e.preventDefault();
  removeUser(inputDell.value);
}

//================================================================
const updateForm = document.querySelector(".updated-user-form");
const inputNameUpdate = document.querySelector(".update-name");
const inputAgeUpdate = document.querySelector(".update-age");
const inputIdUpdate = document.querySelector(".update-id");

updateForm.addEventListener("submit", handleClickUpdate);

function handleClickUpdate(event) {
  event.preventDefault();
  const userUpdate = { name: inputNameUpdate.value, age: inputAgeUpdate.value };

  updateUser(inputIdUpdate.value, userUpdate);
}

//================================================================

function getAllUsers(e) {
  e.preventDefault();
  return fetch(URL, {
    method: "GET",
    accept: "application/json"
  })
    .then(res => res.json())
    .then(res => {
      createUserList(res.data);
    })
    .catch(error => {
      console.log("error", error);
    });
}

function createUserList(arrUsers) {
  arrUsers.forEach(item => {
    const list = document.createElement("li");
    list.textContent = `Имя:${item.name},ID:${item.id}`;

    userList.appendChild(list);
    showUsers.style.display = "block";
  });
}

function getUserById(id) {
  console.log(id);

  fetch(URL, {
    method: "GET",
    accept: "application/json"
  })
    .then(res => {
      if (res.ok) return res.json();
      throw new Error("error");
    })
    .then(res => {
      res.data.filter(user => {
        if (user.id === id) {
          const list = document.createElement("li");
          list.textContent = `Имя:${user.name},ID:${user.id}`;
          areaText.appendChild(list);
          userByID.style.display = "block";
        }
      });
    })
    .catch(error => {
      console.log("error", error);
    });
}

function addUser(name, age) {
  return fetch(URL, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({ name: name, age: age })
  })
    .then(res => {
      return res.json();
    })
    .catch(error => {
      console.log(error);
    });
}

function removeUser(id) {
  fetch(`https://test-users-api.herokuapp.com/users/${id}`, {
    method: "DELETE"
  })
    .then(() => console.log("success"))
    .catch(error => {
      console.log("error", error);
    });
}

function updateUser(id, user) {
  return fetch(`https://test-users-api.herokuapp.com/users/${id}`, {
    method: "PUT",
    body: JSON.stringify(user),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => {
      console.log("error", error);
    });
}
