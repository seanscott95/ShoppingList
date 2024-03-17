const itemInput = document.querySelector('#item-input');
const itemForm = document.querySelector('#item-form');
const itemFilter = document.querySelector('#filter-input');
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

  // Add item to the DOM
  itemList.appendChild(li);

  checkUI();

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

// Remove item from item list
const removeItem = (e) => {
  if (e.target.parentElement.classList.contains('btn-remove-item')) {
    e.target.parentElement.parentElement.remove();
  }
  checkUI();
};

// Clear all items from item list
const clearAllItems = () => {
  while (itemList.firstChild) {
    itemList.firstChild.remove();
  }
  checkUI();
};

const checkUI = () => {
  const items = itemList.querySelectorAll('li');

  if (items.length === 0) {
    itemFilter.style.display = 'none';
    clearBtn.style.display = 'none';
  } else {
    itemFilter.style.display = 'block';
    clearBtn.style.display = 'block';
  }
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

// Event Listeners
itemForm.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem);
clearBtn.addEventListener('click', clearAllItems);
itemFilter.addEventListener('input', filterItems);

checkUI();
