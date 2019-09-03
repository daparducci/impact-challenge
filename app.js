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
    addEventListeners();
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
  addEventListeners();
}

function addEventListeners() {
  var delElem = document.getElementById(`${i}`);
  delElem.addEventListener("click", deleteButton);
  var editElem = document.getElementById(`e${i}`);
  editElem.addEventListener("click", editButton);
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
  console.log("Submit Button");
  e.preventDefault();
  qty = qtyElem.value;
  name = nameElem.value;
  unit = unitElem.value;
  completed = false;
  const newList = new List(qty, name, unit, completed);
  console.log(newList);
  renderNewRow(newList);
  cookieRow(newList);
  userInt.restoreFields();
}

function deleteButton(e) {
  if (e.target.classList.contains("delete")) {
    e.target.parentElement.parentElement.remove();
  }
  let idx = e.target.id;
  var myList = loadCookie();
  myList.splice(idx, 1);
  console.log("THE INDEX", idx);
  updateCookie(myList);
  console.log("EVENT FINALLY");
}

function editButton(e) {
  var id = e.target.id;
  var idx = parseInt(id.slice(1));
  var myList = loadCookie();
  if (myList[idx].completed === false) {
    myList[idx].completed = true;
  } else if (myList[idx].completed === true) {
    myList[idx].completed = false;
  }
  updateCookie(myList);
  document
    .getElementById(id)
    .parentElement.getElementsByClassName(
      "completed"
    ).innerHTML = `${myList[idx].completed}`;
}

document.getElementById("list-form").addEventListener("submit", submitButton);

//Create List

//userInt.addItemToList(list);

// myList.push(list);
// const stringList = JSON.stringify(myList);
// document.cookie = stringList;

class List {
  constructor(qty, name, units, completed) {
    this.qty = qty;
    this.name = name;
    this.units = units;
    this.completed = completed;
  }
}

class userInt {
  static displayList() {
    const storedList = myList;
    const shoppinglist = storedList;
  }

  static addItemToList(item) {
    const list = document.querySelector("#item-list");
    const row = document.createElement("tr");

    row.innerHTML = `
            <td>${item.qty}<td>
            <td>${item.name}<td>
            <td>${item.units}<td>
            <td>${item.completed}<td>
            <td><button href="#" class="btn btn-primary btn-sm edit" id="">Edit</button><td>
            <td><a href="#" class="btn btn-danger btn-sm delete" id="">X</a><td>
        `;

    list.appendChild(row);
  }

  // static deleteItem(elem) {
  //   if (elem.classList.contains("delete")) {
  //     elem.parentElement.parentElement.remove();
  //   }
  // }

  // static editItem(elem) {
  //   if (elem.classList.contains("edit")) {
  //     console.log("editing");
  //   }
  // }

  static restoreFields() {
    document.querySelector("#quantity").value = "";
    document.querySelector("#name").value = "";
    document.querySelector("#unit").value = "";
  }
}

//Store Class

// class Store {
//   static getList() {
//     let list;
//     if (document.cookie === undefined) {
//       list = [];
//     } else {
//       list = JSON.parse(document.cookie);
//     }
//   }

//   static addList() {
//     let list = [];
//   }

//   static removeList() {}
// }

//Events: Display List
// document.addEventListener(
//   "DOMContentLoaded",
//   userInt.displayList,
//   userInt.getCookie
// );
//Event: Add A List Item
// document.getElementById("list-form").addEventListener("submit", e => {
//   e.preventDefault();
//    qty = qtyElem.value;
//    name = nameElem.value;
//    unit = unitElem.value;

//Create List
//   const list = new List(qty, name, unit, completed);
//   userInt.addItemToList(list);
//   userInt.restoreFields();
//   myList.push(list);
//   const stringList = JSON.stringify(myList);
//   document.cookie = stringList;
// });

// document.querySelector("#item-list").addEventListener("click", e => {
//   userInt.editItem(e.target);
//   let idx = e.target.id.substring(1);
//   if (myList[idx].completed === false) {
//     myList[idx].completed = true;
//   } else if (myList[idx].completed === true) {
//     myList[idx].completed = false;
//   }
//   var jsonList = JSON.stringify(myList);
//   document.cookie = jsonList;
// });
