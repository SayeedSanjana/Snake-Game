

const canvas  = document.getElementById("snake");
const context = canvas.getContext('2d');
let Button1;
let Button2;
let Button3;


//create the unit
const box=32;//32 is the pixel of the small boxes of the image

//create the image of the background

const ground=new Image();//create the object of the image
ground.src="images/ground.png";

//create food Image
const foodImg=new Image();
foodImg.src="images/food.png";


let dead = new Audio();
let eat = new Audio();
let up = new Audio();
let right = new Audio();
let left = new Audio();
let down = new Audio();

dead.src = "audio/dead.mp3";
eat.src = "audio/eat.mp3";
up.src = "audio/up.mp3";
right.src = "audio/right.mp3";
left.src = "audio/left.mp3";
down.src = "audio/down.mp3";

//create Snake
let snake1=[];
let speed=300;
let endGame=false;

snake1[0]= {
	x: (9 * box),
	y: (10 * box)

};
let game;


//create food

let food={//here food will be generated randomly within the ground image
	x:Math.floor(Math.random()*17+1) * box,//1 box in the left of the canvas and 17 box of the whole grounds
	y:Math.floor(Math.random()*15+3) * box,//3 box on the top of the screen and 15 box height of the ground

}

let score=0;
let direction;

document.addEventListener("keydown",snakeMovement);



function snakeMovement(event){
    let key = event.keyCode;
    if( key == 37 && direction != "RIGHT"){
        
        direction = "LEFT";
        left.play();
         
    }else if(key == 38 && direction != "DOWN"){
        direction= "UP";
         up.play();
        
    }else if(key == 39 && direction != "LEFT"){
        direction = "RIGHT";
          right.play();
        
    }else if(key == 40 && direction != "UP"){
        direction= "DOWN";
           down.play();
        
    }
}


// checkk collision function
function collision(head,array){
    for(let i = 0; i < array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
}





function drawEverything(){
	//draw the ground
	context.drawImage(ground,0,0);

	//draw the snake

	for (var i=0;i<snake1.length;i++){
		if (i==0){
			context.fillStyle="green";
		}
		else{
			context.fillStyle="white"
		}
		context.fillRect(snake1[i].x,snake1[i].y,box,box);

		context.strokeStyle="red";
		context.strokeRect(snake1[i].x,snake1[i].y,box,box);
	}

	//draw the food

	context.drawImage(foodImg,food.x,food.y);


	//old head Position

	let snakeX=snake1[0].x;
	let snakeY=snake1[0].y;

	

	//direction
	if( direction == "LEFT") snakeX -= box;
    if( direction == "UP") snakeY -= box;
    if( direction == "RIGHT") snakeX += box;
    if( direction == "DOWN") snakeY += box;


	//If the snake eats the food

	if(snakeX==food.x && snakeY==food.y){
		score++;
		   eat.play();
		food={
			x:Math.floor(Math.random()*17+1) * box,
	        y:Math.floor(Math.random()*15+3) * box,

		}

	}
	else {

	//remove the tail
	snake1.pop()

}
	//create the new head

	let newHead ={
		x:snakeX,
		y:snakeY
	};

	if(snakeX < box || snakeX > 17 * box || snakeY < 3 * box || snakeY > 15 * box ||
     collision(newHead,snake1)){    
        clearInterval(game);
         dead.play();
         endGame=true;
         score=0;

        context.fillStyle="white";
	    context.font="45px Changa one";
	    context.fillText('GAME OVER!!!',5*box,10*box);

	    if(endGame){
	    Button1.style.display="none";
	    Button2.style.display="none";
	    Button3.style.display="none";
}

	    
       
    }
    

	snake1.unshift(newHead);//Adding it to the beginning of an array
    
	//draw the score

	context.fillStyle="white";
	context.font="45px Changa one";
	context.fillText(score,2*box,1.6*box);
}



//Call the drawEVERYTHING FUNCTION AFTER EVERY 100 MS
window.onload=function(){
	//game=setInterval(drawEverything,300);
Button1 = document.getElementById('b1');
Button2 = document.getElementById('b2');
Button3 = document.getElementById('b3');
Button1.addEventListener('click', function(e){
           	game=setInterval(drawEverything,350);  	
           });
Button2.addEventListener('click', function(e){
           	game=setInterval(drawEverything,200);
           });
           		
Button3.addEventListener('click', function(e){
           	game=setInterval(drawEverything,100);
           		
           });
 
}



