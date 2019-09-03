const qtyElem = document.querySelector("#quantity");
const nameElem = document.querySelector("#name");
const unitElem = document.querySelector("#unit");
const list = document.querySelector("#item-list");

window.onload = loadPage();
function loadPage() {
  var myList = loadCookie();
  renderList(myList);
}

function loadCookie() {
  var myList = [];
  console.log(document.cookie);
  if (document.cookie) {
    var theString = JSON.parse(document.cookie);
    for (i = 0; i < theString.length; i++) {
      myList.push(theString[i]);
    }
    return myList;
  }
}

function renderList(listArr) {
  if (list.innerHTML === "") {
    for (i = 0; i < listArr.length; i++) {
      const row = document.createElement("tr");
      row.innerHTML = `
                  <td>${listArr[i].qty}<td>
                  <td>${listArr[i].name}<td>
                  <td>${listArr[i].units}<td>
                  <td class = "completed" >${listArr[i].completed}<td>
                  <td><button href="#" class="btn btn-primary btn-sm edit" id=e${i}>Edit</button><td>
                  <td><a href="#" class="btn btn-danger btn-sm delete" id=${i}>X</a><td>
              `;
      list.appendChild(row);
      var delElem = document.getElementById(`${i}`);
      delElem.addEventListener("click", deleteButton);
      var editElem = document.getElementById(`e${i}`);
      editElem.addEventListener("click", editButton);
      //addEventListeners();
    }
  }
}

function renderNewRow(newList) {
  const row = document.createElement("tr");
  let id = JSON.parse(document.cookie.length);

  row.innerHTML = `
            <td>${newList.qty}<td>
            <td>${newList.name}<td>
            <td>${newList.units}<td>
            <td>${newList.completed}<td>
            <td><button href="#" class="btn btn-primary btn-sm edit" id=e${id}>Edit</button><td>
            <td><a href="#" class="btn btn-danger btn-sm delete" id=${id}>X</a><td>
        `;

  list.appendChild(row);
  var delElem = document.getElementById(`${id}`);
  delElem.addEventListener("click", deleteButton);
  var editElem = document.getElementById(`e${id}`);
  editElem.addEventListener("click", editButton);
  //addEventListeners();
}

function addEventListeners() {
  var delElem = document.getElementById(`${i}`);
  delElem.addEventListener("click", deleteButton);
  var editElem = document.getElementById(`e${i}`);
  editElem.addEventListener("click", editButton);
}

/* ------ RESTORE -------*/

function restoreFields() {
  document.querySelector("#quantity").value = "";
  document.querySelector("#name").value = "";
  document.querySelector("#unit").value = "";
}

/* ---- COOKIE FUNCTIONS ---- */

function cookieRow(listItem) {
  var myList = loadCookie();
  myList.push(listItem);
  updateCookie(myList);
}

function updateCookie(myList) {
  const stringList = JSON.stringify(myList);
  document.cookie = stringList;
}

/* ------- Button Functions --------- */

function submitButton(e) {
  e.preventDefault();
  qty = qtyElem.value;
  name = nameElem.value;
  unit = unitElem.value;
  completed = false;
  const newList = new List(qty, name, unit, completed);
  renderNewRow(newList);
  cookieRow(newList);
  restoreFields();
  location.reload();
}

function deleteButton(e) {
  if (e.target.classList.contains("delete")) {
    e.target.parentElement.parentElement.remove();
  }
  let idx = e.target.id;
  var myList = loadCookie();
  myList.splice(idx, 1);
  updateCookie(myList);
}

function editButton(e) {
  var id = e.target.id;
  var idx = parseInt(id.slice(1));
  var myList = loadCookie();
  console.log("EDIT LIST:", myList);
  if (myList[idx].completed === false) {
    myList[idx].completed = true;
  } else if (myList[idx].completed === true) {
    myList[idx].completed = false;
  }
  updateCookie(myList);
  location.reload();
}

document.getElementById("list-form").addEventListener("submit", submitButton);

class List {
  constructor(qty, name, units, completed) {
    this.qty = qty;
    this.name = name;
    this.units = units;
    this.completed = completed;
  }
}
