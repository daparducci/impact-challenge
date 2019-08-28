var myList = [];

window.onload = function() {
  console.log(document.cookie);
  if (document.cookie) {
    const list = document.querySelector("#item-list");
    var theString = JSON.parse(document.cookie);

    for (i = 0; i < theString.length; i++) {
      myList.push(theString[i]);
    }
    for (i = 0; i < myList.length; i++) {
      const row = document.createElement("tr");

      row.innerHTML = `
                  <td>${myList[i].qty}<td>
                  <td>${myList[i].name}<td>
                  <td>${myList[i].units}<td>
                  <td>${myList[i].completed}<td>
                  <td><button href="#" class="btn btn-primary btn-sm edit" id=e${i}>Edit</button><td>
                  <td><a href="#" class="btn btn-danger btn-sm delete" id=${i}>X</a><td>
              `;
      list.appendChild(row);
      var delElem = document.getElementById(`${i}`);
      delElem.addEventListener("click", function(e) {
        userInt.deleteItem(e.target);
        let idx = e.target.id;
        myList.splice(idx, 1);
        console.log("THE INDEX", idx);
        var jsonList = JSON.stringify(myList);
        document.cookie = jsonList;
        console.log("EVENT FINALLY");
      });
    }
  }
};

class List {
  constructor(qty, name, units, completed, actions) {
    this.qty = qty;
    this.name = name;
    this.units = units;
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
            <td>${(item.completed = false)}<td>
            <td><button href="#" class="btn btn-primary btn-sm edit" id="">Edit</button><td>
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

document.querySelector("#item-list").addEventListener("click", e => {
  userInt.editItem(e.target);
  let idx = e.target.id.substring(1);

  if (myList[idx].completed === false) {
    myList[idx].completed = true;
  } else if (myList[idx].completed === true) {
    myList[idx].completed = false;
  }

  var jsonList = JSON.stringify(myList);
  document.cookie = jsonList;
});
