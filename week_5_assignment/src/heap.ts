{
class node<T>{
    data:T;

    left:node<T>|null = null;
    right:node<T>|null = null;

    constructor(data:T){
        this.data = data;

    }
}
class MinHeap<T> {
    data: T[] = [];
    currentIndex: number = 0;

    insert(data: T) {
        this.data[this.currentIndex] = data;
        let i = this.currentIndex;

        
        while (i > 0 && this.data[i] < this.data[Math.floor((i - 1) / 2)]) {
            let parentIndex = Math.floor((i - 1) / 2);
            let temp = this.data[i];
            this.data[i] = this.data[parentIndex];
            this.data[parentIndex] = temp;

            i = parentIndex; 
        }

        this.currentIndex++; 
    }

    showData():T[]{
        return this.data;
    }


    
}
let mh = new MinHeap();

mh.insert(5);
mh.insert(6);
mh.insert(2);

mh.insert(1);


console.log(mh.showData());
}