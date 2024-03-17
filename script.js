const itemInput = document.querySelector('#item-input');
const itemForm = document.querySelector('#item-form');
const itemFilter = document.querySelector('#filter-input');
const itemList = document.querySelector('.item-list');
const clearBtn = document.querySelector('.btn-clear-items');
const addItemBtn = document.querySelector('.btn-add-item');

let isEditMode = false;

// Creates and adds item to list
const addItem = (e) => {
  e.preventDefault();

  const itemValue = itemInput.value;

  // Validate item input
  if (itemValue === '') {
    alert('Please enter an item');
    return;
  }

  if (isEditMode === true) {
    const item = itemList.querySelector('.edit-mode');

    removeItemFromLocalStorage(item.textContent);
    item.classList.remove('edit-mode');
    item.remove();
    isEditMode = false;
  }

  if (checkIfItemExists(itemValue)) {
    alert('Item already exists')
    return;
  }

  addItemToDOM(itemValue);

  // Add item to Local Storage
  addItemsToLocalStorage(itemValue);

  checkUI();

  itemInput.value = '';
};

const checkIfItemExists = (item) => {
  const items = getItemsFromLocalStorage();
  return items.includes(item);
};

const addItemToDOM = (item) => {
  const li = document.createElement('li');
  li.classList = 'items';
  li.appendChild(document.createTextNode(item));

  const button = createRemoveButton('btn-remove-item');
  li.appendChild(button);

  const icon = createIcon('fa-solid fa-xmark');
  button.appendChild(icon);

  // Add item to the DOM
  itemList.appendChild(li);
};

// Adds the inputted item to local storage
const addItemsToLocalStorage = (item) => {
  let itemsFromStorage = getItemsFromLocalStorage();

  itemsFromStorage.push(item);

  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
};

const getItemsFromLocalStorage = () => {
  let itemsFromStorage;

  if (localStorage.getItem('items') === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem('items'));
  }

  return itemsFromStorage;
};

const displayItemsFromLocalStorage = () => {
  const itemsFromStorage = getItemsFromLocalStorage();

  itemsFromStorage.forEach((item) => addItemToDOM(item));

  checkUI();
};

const removeItemFromLocalStorage = (item) => {
  let itemsFromStorage = getItemsFromLocalStorage();

  itemsFromStorage = itemsFromStorage.filter((i) => i !== item);

  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
};

// Creates remove button for item lists
const createRemoveButton = (classes) => {
  const button = document.createElement('button');
  button.classList = classes;
  return button;
};

// Creates X icon for remove button
const createIcon = (classes) => {
  const icon = document.createElement('i');
  icon.classList = classes;
  return icon;
};

const onItemClick = (e) => {
  if (e.target.parentElement.classList.contains('btn-remove-item')) {
    removeItem(e.target.parentElement.parentElement);
  }

  if (e.target.classList.contains('items')) {
    editItem(e.target);
  }
};

const editItem = (item) => {
  isEditMode = true;

  itemList.querySelectorAll('li').forEach((item) => {
    item.style.color = '#000000';
  });

  item.classList.add('edit-mode');

  itemInput.value = item.textContent;

  addItemBtn.innerHTML = '<i class="fa-solid fa-pen"></i> Update Item';
  addItemBtn.style.backgroundColor = '#228B22';
};

// Remove item from item list
const removeItem = (item) => {
  item.remove();

  removeItemFromLocalStorage(item.textContent);

  checkUI();
};

// Clear all items from item list
const clearAllItems = () => {
  while (itemList.firstChild) {
    itemList.firstChild.remove();
  }

  localStorage.removeItem('items');

  checkUI();
};

const checkUI = () => {
  itemInput.value = '';

  const items = itemList.querySelectorAll('li');

  if (items.length === 0) {
    itemFilter.style.display = 'none';
    clearBtn.style.display = 'none';
  } else {
    itemFilter.style.display = 'block';
    clearBtn.style.display = 'block';
  }
  addItemBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
  addItemBtn.style.backgroundColor = '#333';

  isEditMode = false;
};

const filterItems = () => {
  const items = itemList.querySelectorAll('li');
  const filterText = itemFilter.value.toLowerCase().trim();

  items.forEach((item) => {
    const itemText = item.firstChild.textContent.toLowerCase().trim();

    if (itemText.indexOf(filterText) !== -1) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
};

const init = () => {
  // Event Listeners
  itemForm.addEventListener('submit', addItem);
  itemList.addEventListener('click', onItemClick);
  clearBtn.addEventListener('click', clearAllItems);
  itemFilter.addEventListener('input', filterItems);
  document.addEventListener('DOMContentLoaded', displayItemsFromLocalStorage);

  checkUI();
};

init();
