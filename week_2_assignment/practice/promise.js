let promiseOne = new Promise((resolve,reject)=>{
    let x = 0;

    if(x==0){
        resolve({"username":"ritik","password":"intimetec"});
        
    }
    else{
        reject("Error")
    }
})
set
promiseOne.then((user)=>{
    return user.username;
    

})
.then((username)=>{
    console.log(username);
}).catch((error)=>{
    console.log(error);

}).finally(()=>{
    console.log("finally called");
    console.log("=".repeat(100));
})


const promiseTwo = new Promise((resolve,reject)=>{
    let data = 0;

    if(!data){
        
        resolve({"username":"wowRitik","password":"wowpassword"});

    }
    else{
        reject("data not found");
    }
})

promiseTwo.then((user)=>{
    console.log(user);
    return user.username;
    
}).then((username)=>{
    console.log(username);
}).catch((error)=>{
    console.log(error);
}).finally(()=>{
    console.log("finally called in promiseTwo");
    console.log("=".repeat(100));
})