import htmlBuilder from './Assets/Javascript/modules.js';
import LinkedList from './Assets/Javascript/linkedList.js';
import storageAvailable from './Assets/Javascript/dataHandler.js';
import './style.css';
import dragIcon from './Assets/Images/dragicon.png';
import refreshicon from './Assets/Images/refreshicon.png';
import eraseicon from './Assets/Images/eraseicon.png';
import {
  dragStart, dragEnd, dragOver, dragDrop,
} from './Assets/Javascript/dragHandler.js';
import { deleteItem, removeSelected } from './Assets/Javascript/updateHandler.js';

const toDoList = document.getElementById('to_do_list');
const refreshIconImg = document.getElementById('refreshIcon');
refreshIconImg.src = refreshicon;
const newTaskInput = document.getElementById('newTaskInput');
const taskList = new LinkedList();
export default function build(linkList) {
  const removalItems = document.querySelectorAll('.taskItem');
  removalItems.forEach((elem) => {
    elem.remove(0);
  });
  const objArray = [];

  const localInfo = JSON.parse(localStorage.getItem('toDoList'));
  linkList.head = localInfo;
  const itemsArray = taskList.returnFromIndex();
  for (let i = 0; i < itemsArray.length; i += 1) {
    const newTaskObj = document.createElement('li');
    const newTaskObj2 = document.createElement('div');
    const checkBox = document.createElement('input');
    const taskText = document.createElement('input');
    const taskCompleted = document.createElement('input');
    const taskEraseIcon = document.createElement('img');
    const taskDragIcon = document.createElement('img');
    objArray.push([toDoList, newTaskObj, 'taskItem', null, `taskItem_${i}`]);
    objArray.push([newTaskObj, checkBox, 'taskCheckBox']);
    objArray.push([newTaskObj, taskText, 'taskText']);
    objArray.push([newTaskObj, taskCompleted, 'taskCompleted']);
    objArray.push([newTaskObj, taskEraseIcon, 'eraseIcon']);
    objArray.push([newTaskObj, taskDragIcon, 'dragIcon']);
    if (itemsArray[i].completed === true) {
      checkBox.checked = true;
    }
    checkBox.setAttribute('type', 'checkbox');
    taskText.setAttribute('type', 'text');
    taskCompleted.setAttribute('type', 'hidden');
    taskCompleted.setAttribute('value', itemsArray[i].completed);
    newTaskObj2.setAttribute('draggable', 'true');
    taskText.setAttribute('value', itemsArray[i].description);
    taskDragIcon.setAttribute('src', dragIcon);
    taskEraseIcon.setAttribute('src', eraseicon);

    checkBox.addEventListener('change', () => {
      if (checkBox.checked) {
        taskList.changeState(itemsArray[i].index, true);
        if (storageAvailable) {
          localStorage.setItem('toDoList', JSON.stringify(taskList.head));
        }
      } else {
        taskList.changeState(itemsArray[i].index, false);
        if (storageAvailable) {
          localStorage.setItem('toDoList', JSON.stringify(taskList.head));
        }
      }
    });
    taskEraseIcon.addEventListener('click', () => {
      deleteItem(taskList, itemsArray[i].index - 1);
      taskList.indexify();
      if (storageAvailable) {
        localStorage.setItem('toDoList', JSON.stringify(taskList.head));
      }
      build(taskList);
    });

    taskText.addEventListener('input', (ev) => {
      ev.preventDefault();
      const htmlTasks = document.querySelectorAll('.taskText');
      const htmlCompleted = document.querySelectorAll('.taskCompleted');
      const htmlObjects = [];
      for (let i = 0; i < htmlTasks.length; i += 1) {
        htmlObjects.push({
          description: htmlTasks[htmlTasks.length - (i + 1)].value,
          completed: htmlCompleted[htmlTasks.length - (i + 1)].value,
          index: htmlTasks.length - i,
        });
      }
      const tempList = new LinkedList();
      for (let i = 0; i < htmlObjects.length; i += 1) {
        tempList.add({
          description: htmlObjects[i].description,
          completed: htmlObjects[i].completed,
          index: htmlObjects[i].index,
        });
      }
      if (storageAvailable) {
        localStorage.setItem('toDoList', JSON.stringify(tempList.head));
      }
    });
    newTaskObj.addEventListener('dragstart', dragStart);
    newTaskObj.addEventListener('dragend', dragEnd);
    newTaskObj.addEventListener('dragover', dragOver);
    newTaskObj.addEventListener('drop', (e) => {
      dragDrop(e);
      const htmlTasks = document.querySelectorAll('.taskText');
      const htmlCompleted = document.querySelectorAll('.taskCompleted');
      const htmlObjects = [];
      for (let i = 0; i < htmlTasks.length; i += 1) {
        htmlObjects.push({
          description: htmlTasks[htmlTasks.length - (i + 1)].value,
          completed: htmlCompleted[htmlTasks.length - (i + 1)].value,
          index: htmlTasks.length - i,
        });
      }
      const tempList = new LinkedList();
      for (let i = 0; i < htmlObjects.length; i += 1) {
        tempList.add({
          description: htmlObjects[i].description,
          completed: htmlObjects[i].completed,
          index: htmlObjects[i].index,
        });
      }
      if (storageAvailable) {
        localStorage.setItem('toDoList', JSON.stringify(tempList.head));
      }
      build(taskList);
    });
  }
  htmlBuilder(objArray);
}
if (localStorage.getItem('toDoList')) {
  taskList.head = JSON.parse(localStorage.getItem('toDoList'));
  build(taskList);
}
newTaskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    taskList.add({ description: newTaskInput.value, completed: false, index: null });
    taskList.indexify();
    if (storageAvailable) {
      localStorage.setItem('toDoList', JSON.stringify(taskList.head));
    }

    build(taskList);
    newTaskInput.value = '';
  }
});

const clearButton = document.getElementById('clearButton');
clearButton.addEventListener('click', (e) => {
  e.preventDefault();
  const toClearArray = taskList.returnSelected();
  removeSelected(taskList, toClearArray);
  taskList.indexify();
  if (storageAvailable) {
    localStorage.setItem('toDoList', JSON.stringify(taskList.head));
  }
  build(taskList);
});
window.onstorage = () => {
  build(taskList);
};