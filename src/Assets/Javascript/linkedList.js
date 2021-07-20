function NewNode(value, nextNode = null) {
  this.value = value;
  this.nextNode = nextNode;
}

export default class LinkedList {
  add(number) {
    if (this.head) {
      const newItem = new NewNode(number, this.head);
      this.head = newItem;
    } else {
      const newItem = new NewNode(number);
      this.head = newItem;
    }
  }

  pop() {
    if (this.head) {
      if (this.head) {
        const itemValue = this.head;
        this.head = this.head.nextNode;
        return itemValue.value;
      }
      const itemValue = this.head;
      this.head = null;
      return itemValue.value;
    }
    return false;
  }

  replaceIndex(one, two) {
    const first = one - 1;
    const second = two - 1;
    if (!this.head) {
      return [];
    }
    const allArray = [];
    let currentNode = this.head;
    allArray.push(currentNode.value);
    while (currentNode.nextNode) {
      currentNode = currentNode.nextNode;
      allArray.push(currentNode.value);
    }
    const newArray = [];
    for (let i = 0; i < allArray.length; i += 1) {
      if (i === first) {
        newArray.push(allArray[second]);
      } else if (i === second) {
        newArray.push(allArray[first]);
      } else {
        newArray.push(allArray[i]);
      }
    }

    let newLinkedList = new NewNode(newArray[newArray.length - 1]);
    newLinkedList.value.index = 5;
    for (let i = 1; i < newArray.length; i += 1) {
      const newItem = new NewNode(newArray[newArray.length - (i + 1)], newLinkedList);
      newItem.value.index = newArray.length - (i);
      newLinkedList = newItem;
    }
    this.head = newLinkedList;
    return true;
  }

  indexify() {
    if (!this.head) {
      return false;
    }
    let currentNode = this.head;
    let count = 1;
    currentNode.value.index = count;
    while (currentNode.nextNode) {
      count += 1;
      currentNode = currentNode.nextNode;
      currentNode.value.index = count;
    }
    return true;
  }

  returnArray() {
    if (!this.head) {
      return [];
    }
    const allArray = [];
    let currentNode = this.head;
    allArray.push(currentNode.value);
    while (currentNode.nextNode) {
      currentNode = currentNode.nextNode;
      allArray.push(currentNode.value);
    }
    return allArray;
  }

  returnFromIndex() {
    if (!this.head) {
      return [];
    }
    const allArray = [];
    let currentNode = this.head;
    allArray.push(currentNode.value);
    while (currentNode.nextNode) {
      currentNode = currentNode.nextNode;
      allArray.push(currentNode.value);
    }
    const newArray = [];
    let stage = 0;
    for (let i = 0; i < allArray.length; i += 1) {
      while (allArray[i].index === stage + 1) {
        newArray.push(allArray[stage]);
        stage += 1;
      }
    }
    return newArray;
  }

  changeState(value, bool) {
    if (this.head) {
      let element = this.head;
      if (element.value.index === value) {
        element.value.completed = bool;
      }
      while (element.nextNode) {
        element = element.nextNode;
        if (element.value.index === value) {
          element.value.completed = bool;
        }
      }
      return true;
    }
    return false;
  }

  returnSelected() {
    if (this.head) {
      let tempNode = this.head;
      const indexArray = [];
      if (tempNode.value.completed === true) {
        indexArray.push(tempNode.value.index);
      }
      while (tempNode.nextNode) {
        tempNode = tempNode.nextNode;
        if (tempNode.value.completed === true) {
          indexArray.push(tempNode.value.index);
        }
      }
      return indexArray;
    }
    return false;
  }

  length() {
    if (this.head) {
      let activeNode = this.head;
      let count = 1;
      while (activeNode.nextNode) {
        count += 1;
        activeNode = activeNode.nextNode;
      }
      return count;
    }
    return 0;
  }

  remove(index = null) {
    if (this.head) {
      let valArray = [];
      let activeValue = this.head;
      valArray.push(activeValue.value);
      while (activeValue.nextNode) {
        activeValue = activeValue.nextNode;
        valArray.push(activeValue.value);
      }
      if (index > valArray.length) {
        return false;
      }
      const newArray = [];
      for (let i = 0; i < valArray.length; i += 1) {
        if (i !== index) {
          newArray.push(valArray[i]);
        }
      }
      const returnValue = valArray[index];
      valArray = newArray.reverse();
      if (newArray.length !== 0) {
        let onHold = new NewNode(valArray[0]);
        for (let i = 1; i < valArray.length; i += 1) {
          onHold = new NewNode(valArray[i], onHold);
        }
        this.head = onHold;
      } else {
        this.head = null;
      }
      return returnValue;
    }
    return false;
  }
}