// const submitElem = document.getElementById("submit");
// const shoppingList = [];
// submitElem.addEventListener("click", function() {
//   console.log("Clicked");
//   const list = document.querySelector("#item-list");
//   const row = document.createElement("tr");
//   const quantity = document.getElementById("quantity").value;
//   const name = document.getElementById("name").value;
//   const unit = document.getElementById("unit").value;
//   row.innerHTML = `
//     <td>${quantity}</td>
//     <td>${name}</td>
//     <td>${unit}</td>
//     <td>No</td>
//     <td><button class="btn btn-primary btn-sm edit">Edit</button></td>
//   `;
//   list.appendChild(row);
//   shoppingList.push[]
// });

//Book Class : Represents a book

const myList = [];

console.log(JSON.stringify(myList));

class List {
  constructor(qty, name, units, completed, actions) {
    this.qty = qty;
    this.name = name;
    this.units = units;
  }
}

//UI Class: Handles UI Tasks

class userInt {
  static displayList() {
    const storedList = [
      {
        qty: 5,
        name: "apples",
        units: "each",
        completed: "No"
      }
    ];
    const shoppinglist = storedList;

    shoppinglist.forEach(item => userInt.addItemToList(item));
  }

  static addItemToList(item) {
    console.log(item);
    const list = document.querySelector("#item-list");

    const row = document.createElement("tr");

    row.innerHTML = `
            <td>${item.qty}<td>
            <td>${item.name}<td>
            <td>${item.units}<td>
            <td>${(item.completed = false)}<td>
            <td><a href="#" class="btn btn-primary btn-sm edit" id="edit">Edit</a><td>
            <td><a href="#" class="btn btn-danger btn-sm delete">X</a><td>
        `;
    list.appendChild(row);
  }

  static deleteItem(elem) {
    if (elem.classList.contains("delete")) {
      elem.parentElement.parentElement.remove();
    }
  }

  static editItem(elem) {
    if (elem.classList.contains("edit")) {
      console.log("editing");
    }
  }

  static restoreFields() {
    document.querySelector("#quantity").value = "";
    document.querySelector("#name").value = "";
    document.querySelector("#unit").value = "";
  }
}

//Store Class

// class Store {
//     static getList() {
//         let list;
//         if()
//     }

//     static addList() {
//         let list = [];
//     }

//     static removeList() {

//     }
// }

//Events: Display List
document.addEventListener("DOMContentLoaded", userInt.displayList);
//Event: Add A List Item
document.getElementById("list-form").addEventListener("submit", e => {
  e.preventDefault();
  console.log("yep");
  const qty = document.querySelector("#quantity").value;
  const name = document.querySelector("#name").value;
  const unit = document.querySelector("#unit").value;

  //Create List
  const list = new List(qty, name, unit, completed);
  userInt.addItemToList(list);
  userInt.restoreFields();
  console.log("the list:", list);
  myList.push(list);
  console.log("my list: ", myList);
  const stringList = JSON.stringify(myList);
  document.cookie = stringList;
  console.log("cookie:", document.cookie);
});
// Event: Remove Item

document.querySelector("#item-list").addEventListener("click", e => {
  userInt.deleteItem(e.target);
});

document.querySelector("#item-list").addEventListener("click", e => {
  userInt.editItem(e.target);
});
