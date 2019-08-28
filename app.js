var myList = [];

window.onload = function() {
  console.log(document.cookie);
  if (document.cookie) {
    //   const row = document.createElement("tr");
    const list = document.querySelector("#item-list");
    var theString = JSON.parse(document.cookie);
    //console.log("T he String: ", theString);
    for (i = 0; i < theString.length; i++) {
      myList.push(theString[i]);
      //console.log("The String: ", theString);
    }
    for (i = 0; i < myList.length; i++) {
      const row = document.createElement("tr");

      row.innerHTML = `
                  <td>${myList[i].qty}<td>
                  <td>${myList[i].name}<td>
                  <td>${myList[i].units}<td>
                  <td>${(myList[i].completed = false)}<td>
                  <td><a href="#" class="btn btn-primary btn-sm edit" >Edit</a><td>
                  <td><a href="#" class="btn btn-danger btn-sm delete" id=${i}>X</a><td>
              `;
      list.appendChild(row);
    }
    //console.log("MyList Here:", myList);
  }
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
    //console.log("shopping", shoppinglist);

    //shoppinglist.forEach(item => userInt.addItemToList(item));
  }

  static addItemToList(item) {
    //console.log(item);
    const list = document.querySelector("#item-list");

    const row = document.createElement("tr");

    row.innerHTML = `
            <td>${item.qty}<td>
            <td>${item.name}<td>
            <td>${item.units}<td>
            <td>${(item.completed = false)}<td>
            <td><a href="#" class="btn btn-primary btn-sm edit" id="edit">Edit</a><td>
            <td><a href="#" class="btn btn-danger btn-sm delete" id="">X</a><td>
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
  const qty = document.querySelector("#quantity").value;
  const name = document.querySelector("#name").value;
  const unit = document.querySelector("#unit").value;

  //Create List
  const list = new List(qty, name, unit, completed);
  userInt.addItemToList(list);
  userInt.restoreFields();
  myList.push(list);
  const stringList = JSON.stringify(myList);
  document.cookie = stringList;
});

// Delete Event
document.querySelector("#item-list").addEventListener("click", e => {
  console.log("MyList before anything deleted: ", myList);
  let idx = e.target.id;
  myList.splice(idx, 1);
  console.log("THE INDEX", idx);
  var jsonList = JSON.stringify(myList);
  document.cookie = jsonList;
  userInt.deleteItem(e.target);
});

document.querySelector("#item-list").addEventListener("click", e => {
  userInt.editItem(e.target);
});
