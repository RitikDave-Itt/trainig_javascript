
{
class node<T> {
    data: T;
    left: node<T> | null = null;
    right: node<T> | null = null;

    constructor(data: T) {
        this.data = data;
    }
}

class bst<T>{
    root:node<T>|null = null;

    insert(data:T):void{

        if(!this.root){
            this.root = new node(data);
        }
        else
            {
                let newnode = new node(data);
                this.insertNode(this.root,newnode);
            }
        


    }

    private insertNode(node:node<T>,newnode:node<T>):void{
        if(newnode.data<node.data){
            if(node.left==null){
                node.left = newnode;
            }
            else{
                this.insertNode(node.left,newnode);
            }
        }

        else{
            if(node.right==null){
                node.right = newnode;
            }
            else{
                this.insertNode(node.right,newnode);
            }

        }

    }

    // delete(data:T):void{

    //     this.root = this.deleteNode(this.root,data);
        
    // }

    // private deleteNode(node:node<T>|null,data:T):node<T>|null{
    //     if(node==null){

    //     }
        
    // }

    inorder(){
        let inorderArray:T[] = [];
        function inorderutil(node:node<T>|null){

            if(!node){
                return;
            }
            inorderutil(node.left);

            inorderArray.push(node.data);

            inorderutil(node.right);


        }
        inorderutil(this.root);
        return inorderArray;
    }
    preorder(){
        let preorderArray:T[] = [];
        function preorderutil(node:node<T>|null){

            if(!node){
                return;
            }
            preorderArray.push(node.data);

            preorderutil(node.left);


            preorderutil(node.right);


        }
        preorderutil(this.root);
        return preorderArray;
    }
    postorder(){
        let postorderArray:T[] = [];
        function postorderutil(node:node<T>|null){

            if(!node){
                return;
            }
            postorderutil(node.left);

            
            postorderutil(node.right);
            postorderArray.push(node.data);


        }

        postorderutil(this.root);

        return  postorderArray;
    }


    delete(data :T){
        function deleteUtils(node:node<T>|null,data:T):node<T>|null{
            if(!node){
                return node;
            }

            if(data<node.data){
                node.left = deleteUtils(node.left,data);
            }

            else if(data>node.data){
                node.right = deleteUtils(node.right,data);
            }

            else{
                if(!node.left&& !node.right){
                    return null;


                }

                else if(!node.left){
                    return node.right;
                }

                else if(!node.right){
                    return node.left;
                }
                let succ = getSuccessor(node);
                if (succ) {
                    node.data = succ.data;
                    node.right = deleteUtils(node.right, succ.data);
                }

                }
                return node;

            

        }

        const getSuccessor = (curr: node<T> | null): node<T> | null => {
            curr = curr!.right;
            while (curr !== null && curr.left !== null) {
                curr = curr.left;
            }
            return curr;
        };

        this.root = deleteUtils(this.root,data);
        
        
    }

    height():number{
        function getHeight(node:node<T>|null):number{
            if(!node){
                return 0;

            }

            return Math.max(getHeight(node.left),getHeight(node.right))+1;



        }

        return getHeight(this.root);
    }

    
    




}

let tree  = new bst();


tree.insert(3);
tree.insert(1);
tree.insert(2);
tree.insert(4);

tree.delete(4)
console.log(tree.height());



console.log(tree.preorder());

}



