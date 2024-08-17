{class node<T>{
    data:T;
    next:node<T>|null =null;

    constructor(data:T){
        this.data = data;
    }


}

class linkedList<T>{
    head :node<T>| null = null;

    insert(data:T){
        let newnode = new node<T>(data);

        if(!this.head){
            this.head = newnode;
        }
        else{
            let temp  = this.head;
            while(temp.next){
                temp = temp.next;
            }
            temp.next = newnode;
        }

    }

    delete(index:number){
        let temp = 0;
        let currentNode= this.head
        let prev:node<T>|null= null;
        if(index==0 && this.head){
            this.head = this.head.next;
        }

        while(temp<index&& currentNode){
            prev = currentNode;
            currentNode = currentNode.next;


        }
        if(currentNode&&prev){
            prev.next = currentNode.next;

        }

    }

    elements():T[]{
        let arr:T[] = [];
        let currentNode = this.head;
        while(currentNode){
            arr.push(currentNode.data);

            currentNode = currentNode.next

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