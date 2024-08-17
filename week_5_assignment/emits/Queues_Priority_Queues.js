"use strict";
class queue {
    constructor() {
        this.table = [];
    }
    isempty() {
        return this.table.length ? false : true;
    }
    enqueue(data) {
        this.table.unshift(data);
    }
    dequeue() {
        return this.isempty() ? undefined : this.table.pop();
    }
    values() {
        return this.table;
    }
}
// let q = new queue<number>;
// q.enqueue(4);
// console.log(q.values());
// q.enqueue(43);
// console.log(q.values());
// q.enqueue(23);
// console.log(q.values());
// q.dequeue();
// console.log(q.values());
class pQueue {
    constructor() {
        this.table = [];
    }
    isempty() {
        return this.table.length ? false : true;
    }
    enqueue(data, priority) {
        if (this.isempty()) {
            this.table.push([data, priority]);
        }
        else {
            for (let i = 0; i < this.table.length; i++) {
                if (priority < this.table[i][1]) {
                    this.table.splice(i, 0, [data, priority]);
                    return;
                }
            }
            this.table.push([data, priority]);
        }
    }
    dequeue() {
        var _a, _b;
        return (_b = (_a = (this.table.pop())) === null || _a === void 0 ? void 0 : _a[0]) !== null && _b !== void 0 ? _b : undefined;
    }
    values() {
        return this.table.map(value => value[0]);
    }
}
let q = new pQueue();
q.enqueue(3, 1);
q.enqueue(4, 3);
console.log(q.values());
q.enqueue(5, 0);
console.log(q.values());
console.log(q.dequeue());
