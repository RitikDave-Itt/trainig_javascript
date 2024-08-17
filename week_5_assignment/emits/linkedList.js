"use strict";
{
    class node {
        constructor(data) {
            this.next = null;
            this.data = data;
        }
    }
    class linkedList {
        constructor() {
            this.head = null;
        }
        insert(data) {
            let newnode = new node(data);
            if (!this.head) {
                this.head = newnode;
            }
            else {
                let temp = this.head;
                while (temp.next) {
                    temp = temp.next;
                }
                temp.next = newnode;
            }
        }
        delete(index) {
            let temp = 0;
            let currentNode = this.head;
            let prev = null;
            if (index == 0 && this.head) {
                this.head = this.head.next;
            }
            while (temp < index && currentNode) {
                prev = currentNode;
                currentNode = currentNode.next;
            }
            if (currentNode && prev) {
                prev.next = currentNode.next;
            }
        }
        elements() {
            let arr = [];
            let currentNode = this.head;
            while (currentNode) {
                arr.push(currentNode.data);
                currentNode = currentNode.next;
            }
            return arr;
        }
    }
    let list = new linkedList();
    list.insert(4);
    list.insert(5);
    list.delete(0);
    list.delete(1);
    console.log(list.elements());
}
