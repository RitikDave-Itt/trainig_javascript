class queue<T> {
  private table: T[] = [];

  isempty(): boolean {
    return this.table.length ? false : true;
  }

  enqueue(data: T): void {
    this.table.unshift(data);
  }

  dequeue(): T | undefined {
    return this.isempty() ? undefined : this.table.pop();
  }

  values(): T[] {
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

class pQueue<T> {
  private table: [T, number][] = [];

  isempty(): boolean {
    return this.table.length ? false : true;
  }

  enqueue(data: T, priority: number): void {
    if (this.isempty()) {
      this.table.push([data, priority]);
    } else {
      for (let i = 0; i < this.table.length; i++) {
        if (priority < this.table[i][1]) {
          this.table.splice(i, 0, [data, priority]);
          return;
        }
      }
      this.table.push([data, priority]);
    }
  }

  dequeue():T|undefined{
    return (this.table.pop())?.[0]??undefined;
  }

  values(): T[] {
    return this.table.map(value=> value[0]);
  }

}

let q =  new pQueue();

q.enqueue(3,1);
q.enqueue(4,3);

console.log(q.values());
q.enqueue(5,0);
console.log(q.values());

console.log(q.dequeue());



