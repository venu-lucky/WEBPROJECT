// console.log("Hello from inside");
const input = document.getElementById("inputText");
const display = document.getElementById("display");
const displayDone = document.getElementById("display-done");
const button = document.getElementById("addButton");
const deleteAll = document.getElementById("delete-icon");

// Create and Remove list item
function createItem() {
  let listItem = document.createElement("li");
  listItem.className = "create";
  listItem.appendChild(document.createTextNode(input.value));
  listItem.innerHTML = `<span>${listItem.textContent}</span>`;
  display.appendChild(listItem);
  input.value = "";

  let editButton = document.createElement("button");
  editButton.innerText = "edit";
  editButton.className = "edit";
  editButton.addEventListener("click", (e) => {
    /**
     * <li class="create"><span>foo</span><button class="edit">edit</button><input type="button" value="X" id="removeButton"></li>
     */
    if (editButton.innerText === "edit") {
      // 1. Create input
      let editInput = document.createElement("input");
      editInput.setAttribute("type", "text");
      editInput.setAttribute("id", "editInput");
      // 2. Get the text input from span tag
      let editItem = e.currentTarget.parentElement.querySelector("span");
      // 3. Set the text value on input
      editInput.setAttribute("value", `${editItem.textContent}`);
      // 4. Replace
      editItem.replaceWith(editInput);
      editButton.innerText = "complete";
    } else {
      // 1. Create span
      let spanTag = document.createElement("span");
      spanTag.setAttribute("class", "spn");
      // 2. get the text input from input
      let spanText = e.currentTarget.parentElement.querySelector("input");
      // console.log(spanText); => "value"
      // 3. Set the text value on span
      spanTag.textContent = spanText.value;
      // 4. Replace
      spanText.replaceWith(spanTag);
      /**
       * <li class="create"><input type="text" value="foo" id="editInput"><button class="edit">complete</button><input type="button" value="X" id="removeButton"></li>
       */
      editButton.innerText = "edit";
    }
  });

  let removeTask = document.createElement("input");
  removeTask.setAttribute("type", "button");
  removeTask.setAttribute("value", "X");
  removeTask.setAttribute("id", "removeButton");
  removeTask.addEventListener("click", (e) => {
    listItem.parentNode.removeChild(listItem);
  });
  listItem.appendChild(editButton);
  listItem.appendChild(removeTask);
  listItem.addEventListener("dblclick", (e) => {
    displayDone.appendChild(listItem);
    listItem.style.backgroundColor = "#54e346";
    listItem.style.textDecoration = "line-through";
    editButton.style.display = "none";
  });
}

const addAfterClick = () => {
  if (input.value.length > 0) {
    createItem();
  } else {
    alert("Write something mate!");
  }
};

//List item can be added with "Enter" as well
const addWithEnter = (event) => {
  if (event.keyCode === 13) {
    addAfterClick();
  }
};

// Remove all with user approve
const removeAll = (event) => {
  const answer = prompt(`Type "Delete All" If you are that sure!`);
  if (answer === "Delete All") {
    display.innerHTML = "";
    displayDone.innerHTML = "";
  } else {
    alert("Try One More Time");
  }
};

button.addEventListener("click", addAfterClick);
input.addEventListener("keyup", addWithEnter);
deleteAll.addEventListener("click", removeAll);
