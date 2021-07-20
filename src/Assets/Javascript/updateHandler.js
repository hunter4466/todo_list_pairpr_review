export function deleteItem(linkList, index) {
  linkList.remove(index);
}

export function removeSelected(linkedList, array) {
  for (let i = 0; i < array.length; i += 1) {
    linkedList.remove((array[array.length - (i + 1)]) - 1);
  }
}