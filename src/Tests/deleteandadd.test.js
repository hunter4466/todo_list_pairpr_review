import LinkedList from '../Assets/Javascript/linkedList.js';

test('Item is correctly added to linked list',()=>{
    let newLinkList = new LinkedList();
    newLinkList.add(5)
    newLinkList.add(3)
    newLinkList.add(2)
    let tempArray = newLinkList.returnArray()
    expect(tempArray[0]).toBe(2)
    expect(tempArray[1]).toBe(3)
    expect(tempArray[2]).toBe(5)
})