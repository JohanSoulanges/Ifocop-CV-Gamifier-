'usestrict';
// Canvas setup
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// width et height doivent etre les mêmes que dans le CSS
// passer with et height on inner/outer width et height pour quelle prenne toujours la même place 
// même si on reduit ou agrandie la vue

canvas.width = window.innerWidth - 50;
canvas.height = window.innerHeight - 120;

window.addEventListener('resize',resizeCheck, false)
function resizeCheck(e) {
    console.log(e);
    console.log(e.currentTarget.innerWidth);
    console.log(e.currentTarget.innerHeight);
    canvas.width = e.currentTarget.innerWidth - 50
    canvas.height = e.currentTarget.innerHeight - 120;
    player.y = canvas.height - 90;
    size = true;
}


console.log("width",canvas.width);
console.log("height",canvas.height);
console.log(window);



let cv = false;
let size = false;
let start = false;
let pause = false;
let inJump = false;
let score = 0;
let gameFrame = 0;
let e = 0;

const sound = {};
sound.background = new Audio();
sound.background.src = "./asset/Song/BackgroundSong.ogg"
sound.bomb = new Audio();
sound.bomb.src = "./asset/Song/Bomb.wav"
sound.coins = new Audio();
sound.coins.src = "./asset/Song/Coins.ogg"

const image = {};
image.player = new Image();
image.player.src = "./asset/Player.png";
image.bombe = new Image();
image.bombe.src = "./asset/Bomb.png";
image.bonus = new Image();
image.bonus.src = "./asset/Bonus.png";

//Parallax Background
const background = []
background[0] = new Image();
background[0].src = "./asset/parallax/parallax01.png";
background[1] = new Image();
background[1].src = "./asset/parallax/parallax02.png";
const parallax = []
parallax[0] = new Image();
parallax[0].src = "./asset/parallax/parallax03.png";
parallax[1] = new Image();
parallax[1].src = "./asset/parallax/parallax04.png";
parallax[2] = new Image();
parallax[2].src = "./asset/parallax/parallax05.png";

let h = 0;
let m = canvas.width;

function draw0(){
    ctx.beginPath();
    ctx.moveTo(5,0);
    ctx.lineTo(5, canvas.height);
    ctx.fillStyle = 'red'
    ctx.moveTo(canvas.width - 5,0);
    ctx.lineTo(canvas.width - 5, canvas.height);
    ctx.fillStyle = 'blue';
    ctx.stroke();
}

//cette fonction fait apparaitre les deux images background fixe et fait defiler les trois images parallax indentique a la suite pour l'effet parallax.
function drawBack(){
    ctx.drawImage(background[0], 0, 0, canvas.width,canvas.height);
    ctx.drawImage(background[1], 0, 0, canvas.width,canvas.height);    
    for (let i = 0; i < parallax.length; i++) {
            ctx.drawImage(parallax[i], h, 0, canvas.width*2,canvas.height)
            h-=0.5;      
            if(h <= -canvas.width){
                h = 0
            }
    }
    
}

//Key Interaction
//cette fonction permet d'intéragir avec les touches du clavier

window.addEventListener('keydown',keyDownHandler,false); 
function keyDownHandler(e){  
    if(e.key == "Right" || e.key == "ArrowRight") {
        player.pressRight = true;
    }
    if(e.key == "Left" || e.key == "ArrowLeft") {
        player.pressLeft = true;
    }
    if(e.key == "Up" || e.key == "ArrowUp") {
        player.pressUp = true;
        console.log('Up2'+player.pressUp) 
    }
    if(e.key == "Down " || e.key == "ArrowDown") {
        player.pressDown = true;  
    }
    if(e.key === "p" || e.key === "P") {
        console.log(pause);
        if (pause === false) {
            pause = true;
        } else {
            pause = false
        }
        gamePause()
    }
};

window.addEventListener('keyup',keyUpHandler,false);            
function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        player.pressRight = false;
    }
    if(e.key == "Left" || e.key == "ArrowLeft") {
        player.pressLeft = false;
    }
    if(e.key == "Down " || e.key == "ArrowDown") {
        player.pressDown = 'up'; 
    }
};
//Player
//cette fonction contructeur crée un player avec des propriètés definie et avec des
// méthodes qui lui sont propres pour allégé l'espace mémoire
class Player {
    constructor(){
        this.width = 90;
        this.height= 90;
        this.x = canvas.width/2 ;
        this.y = canvas.height- this.height ;
        this.angle = 0;
        this.spriteWidth = 45;
        this.spriteHeight = 45;
        this.speed = 10;
        this.jump = 15;
        this.down = 40;
        this.pressLeft = false;
        this.pressRight = false;
        this.pressUp = false;
        this.pressDown = false;
        this.life = 5;
        this.position = [{
            frameX : 18,
            frameY : 307,},
            {frameX: 70,
            frameY : 307,},
            {frameX: 122,
            frameY : 307,},
            {frameX: 174,
            frameY : 307,},
            {frameX: 226,
            frameY : 307,},
            {frameX: 278,
            frameY : 307,},
            {frameX: 335,
            frameY : 307,},
            {frameX: 388,
            frameY : 307,},
            {frameX: 440,
            frameY : 307,},
            {frameX: 492,
            frameY : 307,},
            {frameX: 545,
            frameY : 307,}]
            //cette proprièté est un strit different quand il ce baisse
        this.positionDown = [{
                frameX : 18,
                frameY : 380,},
                {frameX: 70,
                frameY :385,},
                {frameX: 130,
                frameY : 385,},
                {frameX: 180,
                frameY : 385,},
                {frameX: 230,
                frameY : 385,},
                {frameX: 285,
                frameY : 380,},
                {frameX: 335,
                frameY : 385,},
                {frameX: 390,
                frameY : 385,},
                {frameX: 445,
                frameY : 385,},
                {frameX: 498,
                frameY : 385,},
                {frameX: 548,
                frameY : 385,}]
    };
    
    //cette fonction defini les mouvement du player
    update(){ 
        if (canvas.height <= 540 && canvas.width <= 960) {
            this.height = 60;
            this.width = 60;
        }
        if(this.pressRight && pause === false){
            console.log(this.x);
            this.x += this.speed;
            this. speed = 10;
            if(this.x >= canvas.width - 90){
                this.speed = 0
            }
        }
        if(this.pressLeft && pause === false){
            console.log(this.x);
            this.x -= this.speed;
            this. speed = 10;
            if(this.x <= 0 ){
                this.speed = 0
            }
        }
        if(this.pressUp && pause === false){
            this.y += -this.jump;
            inJump = true;
            console.log("this y", this.y);
            console.log("ici 3");
             if(this.y < 0){
                 console.log("ici 2");
                this.jump = - this.jump;
             }
             if(this.y == canvas.height - this.width ){
                 console.log("ici 1");
                this.pressUp = false;
                this.jump = -this.jump;
                inJump = false;
             };
        }
        if(this.pressDown && inJump === false && pause === false){
            this.y +=  this.down;
            this.height= 70;
            this.position = this.positionDown
            if(this.y >= 410){
                this.down = 0;
            }
        }
        if(this.pressDown == 'up' && inJump === false && pause === false){
            console.log('ok2')
            this.down = 40;
            this.y +=  -this.down;
            this.height = 90;
            this.pressDown = false;
            //cette propièté permet au un strit de basse de reaparaitre
            this.position = [{
                frameX : 18,
                frameY : 307,},
                {frameX: 70,
                frameY : 307,},
                {frameX: 122,
                frameY : 307,},
                {frameX: 174,
                frameY : 307,},
                {frameX: 226,
                frameY : 307,},
                {frameX: 278,
                frameY : 307,},
                {frameX: 335,
                frameY : 307,},
                {frameX: 388,
                frameY : 307,},
                {frameX: 440,
                frameY : 307,},
                {frameX: 492,
                frameY : 307,},
                {frameX: 545,
                frameY : 307,}]
        }
    }
    //cette fonction desine la hit-box 
    draw(){
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fill();
        ctx.closePath();
        ctx.fillRect(this.x, this.y, this.radius, 10);        
    }
    //cette fonction dessine le strit du player
    drawPlayer(img, sX, sY, sW, sH, dX, dY, dW, dH){
        ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH)
    }
    
}
const player = new Player();
//Ennemi
const ennemiArray = [];
//cette fonction fait apparaitre les ennemis dans une certaine position
// et de fasons random()
function zone(){
    let resultat = canvas.height* Math.random();
    if(resultat < canvas.height - 100 && resultat > 100 ){
        return resultat
    }else {
        resultat = canvas.height* Math.random() ;
    }
}
//cette fonction contructeur crée un ennemi avec des propriètés definie et avec des
// méthodes qui lui sont propres pour allégé l'espace mémoire
class Ennemi{
    constructor(){
        this.x = canvas.width;
        this.y = zone();
        this.width = 50;
        this.height = 50;
        this.spriteWidth = 125;
        this.spriteHeight = 130;
        this.speed = 4;
        this.touch = false;
        this.status = 1;
        this.position = [
            {frameX :30,
                frameY :55,},
            {frameX :205,
                frameY :55,},
            {frameX :395,
                frameY :40,},
            {frameX :580,
                frameY :40,},
            {frameX :780,
                frameY :40,},
            {frameX :990,
                frameY :40,},
            {frameX :1175,
                frameY :40,},
            {frameX :1360,
                frameY :50,}];
    }
    //cette methode fait parcourir l'ennemi de droite a gauche
    update(){
        this.x -= this.speed;
        if (canvas.height <= 540 && canvas.width <= 960) {
            this.height = 40;
            this.width = 40;
        }
    }
    //cette fonction desine la hit-box 
    draw(){
        ctx.fillStyle = 'blue';
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fill();
        ctx.closePath();
    }
    //cette fonction dessine le strit de l'ennemi
    drawEnnemi(img, sX, sY, sW, sH, dX, dY, dW, dH){
       ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH)
    }
}
function handleEnnemi(){
    //cette ligne dit que toute les 60 frame un bombe peux apparaitre
    //grace push
    if (gameFrame % 60 == 0 && pause ===false){
        ennemiArray.push(new Ennemi());
    }
    // execute divers méthode ennemiArray
    if (pause === false) {
        for(let i = 0; i < ennemiArray.length; i++){
            ennemiArray[i].update();
            //cette fonction desine la hit-box de l'ennemi
            //ennemiArray[i].draw();
            ennemiArray[i].drawEnnemi(image.bombe, ennemiArray[i].position[e].frameX, ennemiArray[i].position[e].frameY, ennemiArray[i].spriteHeight, ennemiArray[i].spriteWidth, ennemiArray[i].x, ennemiArray[i].y, ennemiArray[i].height, ennemiArray[i].width);
        } 
    }
    // si la bombe sort de l'ecran elle est effacé de Array avec la fonction splice
    for(let i = 0; i < ennemiArray.length; i++){
        if ( ennemiArray[i].x < -50 &&  ennemiArray[i].status == 1  ){
            ennemiArray.splice(i, 1);
        }
        // collision avec le player
        if (ennemiArray[i].x <= player.x + player.width && player.x <= ennemiArray[i].x + ennemiArray[i].width && ennemiArray[i].y < player.y + player.height && player.y <= ennemiArray[i].y + ennemiArray[i].height){
            if(!ennemiArray[i].touch){
            sound.bomb.play();
            player.life -= 1;
            ennemiArray.touch = true;
            ennemiArray[i].status = 0;
            ennemiArray.splice(i, 1);
            }
        }        
    }
}
//Take
const takeArray = [];
//cette fonction fait apparaitre les ennemis dans une certaine position
// et de fasons random()
function zoneTake(){
    let resultat = canvas.height* Math.random();
    if( resultat < canvas.height - 100 && resultat > 200 ){
        return resultat
    } else {
        resultat = canvas.height* Math.random();
    }
}
//cette fonction contructeur crée un take(piece) avec des propriètés definie et avec des
// méthodes qui lui sont propres pour allégé l'espace mémoire
class Take{
    constructor(){
        this.x = canvas.width;
        this.y = zoneTake() ;
        this.width = 35;
        this.height = 35;
        this.spriteWidth = 65;
        this.spriteHeight = 65;
        this.speed = 3;
        this.status = 1;
        this.touch = false;
    }
    //cette methode fait parcourir l'ennemi de droite a gauche
    update(){
        this.x -= this.speed;
        if (canvas.height <= 540 && canvas.width <= 960) {
            this.height = 30;
            this.width = 30;
        }
    }
    //cette fonction desine la hit-box 
    draw(){
        ctx.fillStyle = 'green';
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fill();
        ctx.closePath();
    }
    //cette fonction dessine le strit du take 
    drawBonus(){
        ctx.drawImage(image.bonus, 16, 36,  this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height)
    }
}
function handleTake(){
    //cette ligne dit que toute les 60 frame un take peux apparaitre
    //grace push
    if (gameFrame % 150 == 0 && pause ===false){
        takeArray.push(new Take());
    }
    // execute divers méthode takeArray
    if (pause === false) {
        for(let i = 0; i < takeArray.length; i++){
            takeArray[i].update();
            //cette fonction desine la hit-box 
            //takeArray[i].draw();
            takeArray[i].drawBonus();
        } 
    }
     // si le take sort de l'ecran elle est effacé de Array avec la fonction splice
    for(let i = 0; i < takeArray.length; i++){
        if ( takeArray[i].x < -50 && takeArray.status == 1 ){
            takeArray.splice(i, 1);
        }
        // collision avec le player
        if (takeArray[i].x <= player.x + player.width &&  player.x <= takeArray[i].x + takeArray[i].width && takeArray[i].y <= player.y + player.height && player.y <= takeArray[i].y + takeArray[i].height){
            if(!takeArray[i].touch){
            sound.coins.play();
            takeArray.status = 0;
            takeArray[i].touch = true;
            takeArray.splice(i, 1);
            score += 100
            }
        }
    }
}

// Pause
function gamePause() {
    if(pause === true ) {
        console.log("pausse check");
        player.speed = 0;
        player.jump = 0;
        ennemiArray.forEach(Ennemi => {
            Ennemi.speed = 0;
        }); 
        takeArray.forEach(take => {
            take.speed = 0;
        });
        
        // faire apparaitre l'animation de pause
        // style ecran gris transparent avec pause ecrit au milieu
        // n'oublie pas j'ajouter un tutorial pour faire comprendre 
        // a l'utilisateur tout le fonctionnalité.
    } else {
        console.log("pausse done");
        player.speed = 10;
        player.jump = 15;
        ennemiArray.forEach(Ennemi => {
            Ennemi.speed = 4;
        });
        takeArray.forEach( take => {
            take.speed = 3;
        });
    }
}


//Animation Loop
let timestamp = 0;
let timestampPrecedent;
let timestampEcoulé;
let i = 0;

function animate(timestamp){
    if(player.life > 0) {
            // joue le son en background
            sound.background.play();
            //efface le canvas pour chaque nouvelle image
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawBack()
            handleEnnemi();
            handleTake();
            // condition qui permet d'avoir un animation fluide avec requestAnimationFrame
            // PS merci Sami pour les 50 explications a force c'est rentré 
            if(timestampPrecedent){ 
                if(timestampEcoulé > 200){
                    timestampEcoulé = timestamp - timestampPrecedent;
                    i++
                    if(i >= player.position.length){
                        i = 0;
                    }
                    e++
                    if (e >= ennemiArray[0].position.length ){
                        e = 0
                    }

                } else {
                    timestampEcoulé += timestamp - timestampPrecedent;
                }
            }else{
                timestampEcoulé = 0;
            }
            timestampPrecedent = timestamp;
            //cette fonction desine la hit-box du player
            //player.draw();
            //cette fonction desine le player
            player.update();
            player.drawPlayer(image.player, player.position[i].frameX, player.position[i].frameY, player.spriteHeight, player.spriteWidth, player.x, player.y, player.height, player.width)
            //dessine et mise a jour de la vie et du score
            ctx.font = '50px Georgia'
            ctx.fillStyle ='black';
            ctx.fillText('score: ' + score , 10, 50, 100);
            ctx.fillText('vie: ' + player.life , canvas.width - 125, 50, 100)
            if (pause === true) {
                const pauseStyle = ctx.createLinearGradient(0,0,canvas.width,canvas.height)
                // don't work like a want
                pauseStyle.addColorStop(0 , "#D9D2D1")
                pauseStyle.addColorStop(0.5, "#fff")
                //
                ctx.fillStyle = pauseStyle;
                ctx.fillText(" PAUSE ", 250, 250)    
            }
            gameFrame++
            requestAnimationFrame(animate);
            if(player.life == 0){
                //Game Over
                sound.background.pause();
                ctx.fillText('YOU DIED' , 250, 250) 
            }
            if(score == 1000 && cv == false){
                // fait apparaitre le CV si on obtient 1000 points
                cv = true
                window.open("./asset/IFOCOP Développeur Full Stack CV.pdf")
            }
        }

   
}
// fonction pour start le jeu
document.getElementById('input').addEventListener('click',function(){
    document.getElementById('start').style.display = 'none'
    document.getElementById('cvText').style.display = 'none'
    document.getElementById('cv').style.display = 'none'
    document.getElementById('canvas').style.display = 'block'
    animate()
    document.getElementById('input').style.display = 'none'
})