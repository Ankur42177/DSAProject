var bird={
    x:8,
    y:60,
    color:"green",
    eggs:["one","two","three"],
    fly:function(){
        console.log("bird is flying",this.x,this.y);//this pointing to the current object of the bird and it would 
        //throw error if we write simply x and y
    }
};
console.log(bird);
console.log(bird.fly());
bird.eggs.forEach(function(val,ind){
    console.log(val,ind);
})