let arr = [1,2,-1,4,-5,4,6,-3];


function removeNum(numbers,callback){
    let ans =[]
    numbers.forEach(x => {
        if(!callback(x)){
            ans.push(x);


        }        
    });

    return ans;
}

function isNeg(number){
    return number<0;
}

let pos = removeNum(arr,(x)=>{return x<0});

console.log(pos);