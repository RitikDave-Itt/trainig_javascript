"use strict";
class set {
    constructor() {
        this.table = [];
    }
    insert(data) {
        try {
            if (!this.table.includes(data)) {
                this.table.push(data);
                return true;
            }
            else {
                return false;
            }
        }
        catch (error) {
            console.log(error);
            return false;
        }
        ;
    }
    check(data) {
        return this.table.includes(data);
    }
    delete(data) {
        this.table.splice(this.table.indexOf(data), 1);
    }
    values() {
        return this.table;
    }
}
let table = new set();
table.insert(4);
console.log(table.check(4));
console.log(table.values());
table.delete(4);
console.log(table.values());
console.log(table.check(4));
