'usestrict';
//Canvas setup
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
//width et height doivent etre les mêmes que dans le CSS
canvas.width = 800;
canvas.height = 500;

let cv = false;
let start = false;
let score = 0;
let gameFrame = 0;
let e = 0;
ctx.font = '50px Georgia'
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

let h = 0
let m = canvas.width
//cette fonction fait apparaitre les deux images background fixe et fait defiler les trois images parallax indentique a la suite pour l'effet parallax.
function drawBack(){
    ctx.drawImage(background[0], 0, 0, canvas.width,canvas.height);
    ctx.drawImage(background[1], 0, 0, canvas.width,canvas.height);    
    for (let i = 0; i < parallax.length; i++) {
        ctx.drawImage(parallax[i], h, 0, canvas.width,canvas.height)
        h-=0.5;        
        if(h == -canvas.width){
            h = 0
        }
    }
    for (let i = 0; i < parallax.length; i++) {
        ctx.drawImage(parallax[i], m, 0, canvas.width,canvas.height)
        m-=0.5;
        if(m == 0){
            m = canvas.width;
        }
    }
}

//Key Interaction
//cette fonction permet d'intéragir avec les touches du clavier

window.addEventListener('keydown',keyDownHandler,false); 
function keyDownHandler(e){ 
    console.log(e)    
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
        this.x = canvas.width/2 ;
        this.y = 400 ;
        this.width = 90;
        this.height= 90;
        this.angle = 0;
        this.spriteWidth = 45;
        this.spriteHeight = 45;
        this. speed = 10;
        this. jump = 15;
        this. down = 40;
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
        if(this.pressRight){
            this.x += this.speed;
            this. speed = 10;
            if(this.x == 710){
                this.speed = 0
            }
        }
        if(this.pressLeft){
            this.x -= this.speed;
            this. speed = 10;
            if(this.x == 0){
                this.speed = 0
            }
        }
        if(this.pressUp ){
            this.y +=  -this.jump;
             if(this.y < 200){
                this.jump = - this.jump;
             }
             if(this.y == 405 || this.y == 400 ){
                this.pressUp = false;
                this.jump = -this.jump;
             };
        }
        if(this.pressDown){
            this.y +=  this.down;
            this.height= 70;
            this.position = this.positionDown
            if(this.y >= 410){
                this.down = 0;
            }
        }
        if(this.pressDown == 'up'){
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
    if (gameFrame % 60 == 0){
        ennemiArray.push(new Ennemi());
    }
    // execute divers méthode ennemiArray
    for(let i = 0; i < ennemiArray.length; i++){
        ennemiArray[i].update();
        //cette fonction desine la hit-box de l'ennemi
        //ennemiArray[i].draw();
        ennemiArray[i].drawEnnemi(image.bombe, ennemiArray[i].position[e].frameX, ennemiArray[i].position[e].frameY, ennemiArray[i].spriteHeight, ennemiArray[i].spriteWidth, ennemiArray[i].x, ennemiArray[i].y, ennemiArray[i].height, ennemiArray[i].width);
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
    if (gameFrame % 150 == 0){
        takeArray.push(new Take());
    }
    // execute divers méthode takeArray
    for(let i = 0; i < takeArray.length; i++){
        takeArray[i].update();
        //cette fonction desine la hit-box 
        //takeArray[i].draw();
        takeArray[i].drawBonus();
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
            drawBack();
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
            player.drawPlayer(image.player, player.position[i].frameX, player.position[i].frameY, player.spriteHeight, player.spriteWidth, player.x, player.y, player.height, player.width)
            player.update();
            //dessine et mise a jour de la vie et du score
            ctx.fillStyle ='black';
            ctx.fillText('score: ' + score , 10, 50);
            ctx.fillText('vie: ' + player.life , 620, 50)
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
    document.getElementById('cvText').style.display = 'block'
    document.getElementById('cv').style.display = 'block'
    document.getElementById('canvas').style.display = 'block'
    animate()
    document.getElementById('input').style.display = 'none'
})