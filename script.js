const itemInput = document.querySelector('#item-input');
const addItemBtn = document.querySelector('.btn-add-item');
const filterInput = document.querySelector('#filter-input');
const itemList = document.querySelector('.item-list');
const clearBtn = document.querySelector('.btn-clear-items');

// Creates and adds item to list
const addItem = (e) => {
  e.preventDefault();

  const itemValue = itemInput.value;

  // Validate item input
  if (itemValue === '') {
    alert('Please enter an item');
    return;
  }

  const li = document.createElement('li');
  li.classList = 'items';
  li.appendChild(document.createTextNode(itemValue));

  const button = createRemoveButton('btn-remove-item');
  li.appendChild(button);

  const icon = createIcon('fa-solid fa-xmark');
  button.appendChild(icon);

  itemList.appendChild(li);

  itemInput.value = '';
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

// Event Listeners
addItemBtn.addEventListener('click', addItem);
