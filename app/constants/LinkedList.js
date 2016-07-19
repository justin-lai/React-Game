var DoublyLinkedList = function() {
  var list = {};
  list.head = null;
  list.tail = null;

  list.addToTail = function(value) {
    //save the previous tail
    var previousTail = list.tail;

    //set the new tail to the value added
    list.tail = new dLLNode(value);

    //if there is a previous tail, set the pointer of the previous tail to the new tail, 
    //make the new tail's previous pointer reference the old tail
    if (previousTail) {
      previousTail.next = list.tail;
      list.tail.previous = previousTail;
    }

    //in the case that this is the first item, set the head equal to the tail as well
    if (list.head === null) {
      list.head = list.tail;
    }
  };

  list.addToHead = function(value) {

    //save the previous head
    var previousHead = list.head;

    //set the new head to the value added
    list.head = new dLLNode(value);

    //if there is a previous head, set the previous property of the previous head to the new head
    //set the next value of the new head to the previous head
    if (previousHead) {
      previousHead.previous = list.head;
      list.head.next = previousHead;
    }
    //in the case that this is the first item, set the tail equal to the head as well
    if (list.tail === null) {
      list.tail = list.head;
    }

  };

  list.removeHead = function() {
    //save the head for later access in the return
    var previousHead = list.head;

    //if the node after the head exists, set that as the new head
    if (list.head.next) {
      list.head = list.head.next;
      list.head.previous = null;
    }

    return previousHead.value;
  };

  list.removeTail = function() {
    var previousTail = list.tail;

    //if the node before the tail exists, set that as the new tail
    if (list.tail.previous) {
      list.tail = previousTail.previous;
      list.tail.next = null;
    }

    return previousTail.value;

  };
  
  list.contains = function(target, node) {
    //once the tail is reached, the next node is null so end the recursion and return false
    if (node === null) {
      return false;
    }

    //initializes node to check as the head if one is not given
    node = node || list.head;

    //check if the current node equals target; otherwise recursively check the next node
    if (node.value[0] === target[0] && node.value[1] === target[1]) {
      return true;
    } else {
      return list.contains(target, node.next);
    }
  };



  return list;
};

var dLLNode = function(value) {
  var node = {};

  node.value = value;
  node.next = null;
  node.previous = null;

  return node;
};

export default DoublyLinkedList;