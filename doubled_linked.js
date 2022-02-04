function Node(data) {
  this.data = data;
  this.next = null;
  this.prev = null;
}

function List() {
  /* thoes should not be displayed  */
  //pointers
  let head = null;
  let tail = null;
  // length
  let size = 0;
  // temporary storage
  let buffer;

  /******************* first & last nodes  ********************/
  this.firstNode = function () {
    return head;
  };
  this.lastNode = function () {
    return tail;
  };

  /******************* push  ********************/
  this.listPush = function (...n) {
    n.forEach(cur => {
      size += 1;
      const node = new Node(cur);
      if (head === null) {
        head = node;
        tail = node;
        buffer = node;
      } else {
        if (size === 2) {
          buffer.next = node;
          node.prev = buffer;
          tail = node;
        } else {
          buffer = tail;
          buffer.next = node;
          node.prev = buffer;
          tail = node;
        }
      }
    });
    return size;
  };

  /******************* pop  ********************/
  this.listPop = function () {
    if (size === 0) return undefined;
    buffer = tail;
    tail = tail.prev;
    tail.next = null;
    size--;
    return buffer; // or buffer.data
  };

  /******************* shift  ********************/
  this.listShift = function () {
    if (size === 0) return undefined;
    buffer = head;
    head = head.next;
    size--;
    return buffer; // or buffer.data;
  };

  /******************* unshift  ********************/
  this.listUnshift = function (...n) {
    n.reverse().forEach(cur => {
      size += 1;
      const node = new Node(cur);
      if (head === null) {
        head = node;
        tail = node;
        buffer = node;
      } else {
        if (size === 2) {
          buffer.prev = node;
          node.next = buffer;
          head = node;
        } else {
          buffer = head;
          buffer.prev = node;
          node.next = buffer;
          head = node;
        }
      }
    });
    return size;
  };

  /******************* delete  ********************/
  this.delete = function (val) {
    buffer = head;
    if (buffer.data === val) {
      buffer = head;
      head = buffer.next;
      buffer.next.prev = null;
    } else {
      while (buffer) {
        if (buffer.data === val) {
          if (!buffer.next) {
            buffer.prev.next = null;
            tail = buffer.prev;
          } else {
            buffer.prev.next = buffer.next;
            buffer.next.prev = buffer.prev;
          }
          size--;
          return true;
        }
        buffer = buffer.next;
      }
      return false;
    }
    size--;
    return true; // or buffer.data
  };

  /******************* count by size ********************/
  this.count = function () {
    return size;
  };

  /******************* count by loop ********************/
  this.count2 = function () {
    let first = this.firstNode();
    let listLength = 0;
    while (first) {
      listLength++;
      first = first.next;
    }
    return listLength;
  };
}

///////////////////////////////
const list = new List();
list.listPush(11, 22, 33);
list.count(); //3
const n1 = list.listShift(); // Node {data: 11, next: Node, prev: null}
const n2 = n1.next; //Node {data: 22, next: Node, prev: Node}
console.log(list);
console.log(n1, n2);
