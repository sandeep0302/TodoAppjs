// todo-list.js
let todoList = JSON.parse(localStorage.getItem('todoList')) || [
  { name: 'make dinner', dueDate: '2024-01-06' },
  { name: 'wash dishes', dueDate: '2024-01-06' }
];

let isEditing = false;
let currentEditIndex = null;

renderTodoList();

function saveTodoList() {
  localStorage.setItem('todoList', JSON.stringify(todoList));
}

function renderTodoList() {
  let todoListHTML = '';

  todoList.forEach((todoObject, index) => {
      const { name, dueDate } = todoObject;
      const html = `
          <div>${name}</div>
          <div>${dueDate}</div>
          <button class="edit-todo-button js-edit-todo-button">Edit</button>
          <button class="delete-todo-button js-delete-todo-button">Delete</button>
      `;
      todoListHTML += html;
  });

  document.querySelector('.js-todo-list').innerHTML = todoListHTML;

  document.querySelectorAll('.js-delete-todo-button').forEach((deleteButton, index) => {
      deleteButton.addEventListener('click', () => {
          todoList.splice(index, 1);
          saveTodoList();
          renderTodoList();
      });
  });

  document.querySelectorAll('.js-edit-todo-button').forEach((editButton, index) => {
      editButton.addEventListener('click', () => {
          editTodo(index);
      });
  });
}

document.querySelector('.js-add-todo-button').addEventListener('click', () => {
  if (isEditing) {
      saveEdit();
  } else {
      addTodo();
  }
});

function addTodo() {
  const inputElement = document.querySelector('.js-name-input');
  const name = inputElement.value;

  const dateInputElement = document.querySelector('.js-due-date-input');
  const dueDate = dateInputElement.value;

  if (name === '' || dueDate === '') {
      alert('Please enter both name and due date.');
      return;
  }

  todoList.push({ name, dueDate });
  saveTodoList();

  inputElement.value = '';
  dateInputElement.value = '';
  renderTodoList();
}

function editTodo(index) {
  const todo = todoList[index];

  const inputElement = document.querySelector('.js-name-input');
  inputElement.value = todo.name;

  const dateInputElement = document.querySelector('.js-due-date-input');
  dateInputElement.value = todo.dueDate;

  const addButton = document.querySelector('.js-add-todo-button');
  addButton.textContent = 'Save';

  isEditing = true;
  currentEditIndex = index;
}

function saveEdit() {
  const inputElement = document.querySelector('.js-name-input');
  const name = inputElement.value;

  const dateInputElement = document.querySelector('.js-due-date-input');
  const dueDate = dateInputElement.value;

  if (name === '' || dueDate === '') {
      alert('Please enter both name and due date.');
      return;
  }

  todoList[currentEditIndex] = { name, dueDate };
  saveTodoList();

  const addButton = document.querySelector('.js-add-todo-button');
  addButton.textContent = 'Add';
  addButton.removeEventListener('click', saveEdit);
  addButton.addEventListener('click', addTodo);

  inputElement.value = '';
  dateInputElement.value = '';
  isEditing = false;
  currentEditIndex = null;
  renderTodoList();
}

