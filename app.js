const myList = [];

window.onload = function() {
  //   const row = document.createElement("tr");
  const list = document.querySelector("#item-list");
  var theString = JSON.parse(document.cookie);
  console.log("T he String: ", theString);
  for (i = 0; i < theString.length; i++) {
    myList.push(theString[i]);
    console.log("The String: ", theString);
  }
  for (i = 0; i < myList.length; i++) {
    const row = document.createElement("tr");

    row.innerHTML = `
            <td>${myList[i].qty}<td>
            <td>${myList[i].name}<td>
            <td>${myList[i].units}<td>
            <td>${(myList[i].completed = false)}<td>
            <td><a href="#" class="btn btn-primary btn-sm edit" >Edit</a><td>
            <td><a href="#" class="btn btn-danger btn-sm delete" id=d${i}>X</a><td>
        `;
    list.appendChild(row);
  }
  console.log("MyList Here:", myList);
};

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
    const storedList = myList;
    const shoppinglist = storedList;
    console.log("shopping", shoppinglist);
    shoppinglist.forEach(function(item) {
      console.log("foreach: ", item);
    });
    //shoppinglist.forEach(item => userInt.addItemToList(item));
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
            <td><a href="#" class="btn btn-danger btn-sm delete" id=d${i}>X</a><td>
        `;
    list.appendChild(row);
    row.lastElementChild.addEventListener("click", function() {
      console.log("please");
    });
  }

  //   static deleteItem(elem) {
  //     if (elem.classList.contains("delete")) {
  //       elem.parentElement.parentElement.remove();
  //     }
  //   }

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

class Store {
  static getList() {
    let list;
    if (document.cookie === undefined) {
      list = [];
    } else {
      list = JSON.parse(document.cookie);
    }
  }

  static addList() {
    let list = [];
  }

  static removeList() {}
}

//Events: Display List
document.addEventListener(
  "DOMContentLoaded",
  userInt.displayList,
  userInt.getCookie
);
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

// document.querySelectorAll("#item-list").addEventListener("click", e => {
//   userInt.deleteItem(e.target);
// });

for (i = 0; i < myList.length; i++) {
  document.getElementById(`d${i}`).addEventListener("click", function() {
    console.log("this better fucking work");
  });
}

document.querySelector("#item-list").addEventListener("click", e => {
  userInt.editItem(e.target);
});
