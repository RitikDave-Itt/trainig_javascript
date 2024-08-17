class set<T>{
    private table:T[] = [];

    insert(data:T):boolean{
        try{
            if(!this.table.includes(data)){
                this.table.push(data);
                return true;
            }
            else{
                return false;
            }
          
        }
        catch(error){
            console.log(error);
            return false;

        };
        


    }

    check(data:T):boolean{
        return this.table.includes(data);
    }

    delete(data:T):void{
       this.table.splice(this.table.indexOf(data),1);
    }

    values():T[]{
        return this.table;

    }


}


let table = new set<number>();

table.insert(4);
console.log(table.check(4));

console.log(table.values());
table.delete(4);
console.log(table.values());

console.log(table.check(4));




