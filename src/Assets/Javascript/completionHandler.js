export default function clearSelected(linkList, array) {
  for (let i = 0; i < array.length; i += 1) {
    linkList.remove(array[i]);
  }
}