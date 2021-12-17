function init(){
    console.log("in init function");
    var canvas=document.getElementById('mycanvas');
    W=H=canvas.width=canvas.height=1000;
    pen=canvas.getContext("2d");
    cs=67;

    // create a image object for the food;
    food_img=new Image();
    food_img.src="../asset/apple.png";
    trophy=new Image();
    trophy.src="../asset/trophy.png";
    Food=getRandomFood();
    game_over=false;
    score=0;

    // create json object 
    snake={
        init_len:5,
        color:"blue",
        cells:[],
        direction:"right",

        createSnake:function(){
            for(var i=this.init_len;i>0;i--){
                this.cells.push({x:i,y:0});
            }
        },
        drawSnake:function(){
            for(var i=0;i<this.cells.length;i++){
                pen.fillStyle=this.color;
                pen.fillRect(this.cells[i].x*cs,this.cells[i].y*cs,cs-2,cs-2);
            }
        },
        updateSnake:function(){
            console.log("updating snake");
            // update snake a/c to its direction give by keyboard

            // snake has eaten food increase the length of the snake and create random food coordinate

            var headX=this.cells[0].x;
            var headY=this.cells[0].y;
            if(headX==Food.x && headY==Food.y){
                console.log("food eaten by snake ");
                Food=getRandomFood();
                score++;
            }
            else{
                this.cells.pop();
            }
            var nextX,nextY;
            if(this.direction=="left"){
                nextX=headX-1;
                nextY=headY;
            }
            else if(this.direction=="right"){
                nextX=headX+1;
                nextY=headY;
            }
            else if(this.direction=="up"){
                nextX=headX;
                nextY=headY-1;
            }
            else if(this.direction=="down"){
                nextX=headX;
                nextY=headY+1;

            }

            
            this.cells.unshift({x:nextX,y:nextY});
            //write a logic to prevent the snake going out of the board 
            var last_x=Math.round(W/cs);
            var last_y=Math.round(H/cs);

            if(this.cells[0].x<0||this.cells[0].y<0||this.cells[0].x>last_x||this.cells[0].y>last_y){
                game_over = true;
            }
        }

    };
    snake.createSnake();
    //add a event listener on the document object 

    function keyPressed(e){
        // conditional statement

        if(e.key=="ArrowRight"){
            snake.direction="right";
        }
        else if(e.key=="ArrowLeft"){
            snake.direction="left";
        }
        else if(e.key=="ArrowUp"){
            snake.direction="up";
        }
        else if(e.key=="ArrowDown"){
            snake.direction="down";
        }
        console.log("keyPressed",e.key);
    }

    document.addEventListener('keydown',keyPressed);


}
function draw(){
    //erases old snake n
   
    pen.clearRect(0,0,W,H);
    snake.drawSnake();
    pen.fillStyle=Food.color;
    
    pen.drawImage(food_img,Food.x*cs,Food.y*cs,cs,cs);
    pen.drawImage(trophy,20,20,cs,cs);
    pen.fillStyle="black";
    pen.font="20px Roboto"
    pen.fillText(score,50,50);
}
function update(){
    //console.log("in update functiom");
snake.updateSnake();

}
function getRandomFood(){
    var foodx=Math.round(Math.random()*(W-cs)/cs);
    var foody=Math.round(Math.random()*(H-cs)/cs);

    var food={
        x:foodx,
        y:foody,
       color:"red" ,

    }
    return food;
}
function gameloop(){
   // console.log("in game looop");
   if(game_over==true){
       clearInterval(f);
       alert("game over");
       return;
   }
    draw();
    update();

}
init();
var f=setInterval(gameloop,100);