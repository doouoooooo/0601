
let points = [[0, 0],[1.25, -1.25],[1.25, 1.25],[2.5, 2.5],[3.75, 1.25],[2.5, 1.25],[2.5, -1.25],[1.25, -2.5],[0, -1.25],[-1.25, -2.5],[-2.5, -1.25],[-3.75, -2.5],[-3.75, -1.25], [-2.5, 0],[-1.25, -1.25],[0, 0]]
var fill_colors ="bee9e8-62b6cb-1b4965-cae9ff-5fa8d3".split("-").map(a=>"#"+a)
var line_colors="231942-5e548e-9f86c0-be95c4-e0b1cb".split("-").map(a=>"#"+a)

var ball //目前要處理的物件，暫時放在ball變數內
var balls=[] //把產生的"所有"的物件

var bullet //目前要處理的物件，暫時放在ball變數內
var bullets=[] //把產生的"所有"的物件

var monster //目前要處理的物件，暫時放在ball變數內
var monsters=[] //把產生的"所有"的物件

var shipP

var score=0

function setup() {
  createCanvas(windowWidth, windowHeight);
  shipP= createVector(width/2,height/2)
  for(var i=0;i<20;i=i+1){ //i=0,1,2,3,4,.....,8,9
    ball=new Obj({}) //產生一個Obj class元件
    balls.push(ball) //把ball的物件放入到balls陣列內 
 }
  for(var i=0;i<20;i=i+1){ //i=0,1,2,3,4,.....,8,9
   monster=new Monster({}) //產生一個Obj class元件
   monsters.push(monster) //把ball的物件放入到balls陣列內 
 }
}
function draw() {
background(220);
// for(var j=0;j<balls.length;j=j+1){
//   ball=balls[j]
//   ball.draw()
//   ball.update()
//}
if (monsters.length === 0 && balls.length === 0) { // 如果 monsters 和 balls 陣列的長度都為 0，則結束遊戲
  textSize(50)
  text("Game Over!", width/2 - 150, height/2) // 顯示遊戲結束的訊息
  return // 結束 draw() 函式
}
//gun
 if(keyIsPressed){
 if(key=="ArrowLeft" || key=="a"){
   shipP.x = shipP.x -5
 }
 if(key=="ArrowRight" || key=="d"){
   shipP.x = shipP.x +5
 }
 if(key=="ArrowUp" || key=="w"){
   shipP.y = shipP.y -5  
 }
 if(key=="ArrowDown" || key=="s"){
   shipP.y = shipP.y +5
 } }

//蛇的顯示
for(let ball of balls) //只要是陣列的方式，都可以利用此方式處理
{
 ball.draw()
 ball.update()
 for(let bullet of bullets){
  if(ball.isBallInRanger(bullet.p.x,bullet.p.y))
  {
    balls.splice(balls.indexOf(ball),1)
    bullets.splice(bullets.indexOf(bullet),1)
    score = score - 1
    // elephant_sound.play()
    
  }
 }
}
//飛彈的顯示
for(let bullet of bullets) //只要是陣列的方式，都可以利用此方式處理
{
   bullet.draw()
   bullet.update()
 }

//怪物的顯示
 for(let monster of monsters) {  //只要是陣列的方式，都可以利用此方式處理
  if(monster.dead == true && monster.timenum>4){
  monsters.splice(monsters.indexOf(monster),1)
 }
    monster.draw()
    monster.update()
    for(let bullet of bullets){
      if(monster.isBallInRanger(bullet.p.x,bullet.p.y))
      {
        score = score + 1
        // monsters.splice(monsters.indexOf(monster),1)
        monster.dead = true
        bullets.splice(bullets.indexOf(bullet),1)
        
        
        
      }
     }
   }
  

 textSize(50)
 text(score,50,50) //在座標為(50,50)上，顯示score分數內容
 push() //重新規劃原點(0,0)
 let dx = mouseX - width/2
 let dy = mouseY - height/2
 let angle = atan2(dy,dx)

 translate(shipP.x,shipP.y) 
 fill("#e36414")
 noStroke()
 rotate(angle)

 fill(100);
 stroke(0);
 strokeWeight(2);
 rect(50, 150, 200, 50);
 rect(100, 125, 100, 25);
 // 繪製槍管
 stroke(100);
 strokeWeight(10);
 line(250, 175, 300, 175);
 
 // 繪製槍口
 stroke(255, 0, 0);
 strokeWeight(20);
 point(305, 175);
//  ellipse(0,0,50)
 pop() //恢復原本設定，原點(0,0)在視窗的左上角

}

function mousePressed(){

  // //+++++++++++產生一個物件
  //   ball=new Obj({
  //    p:{x:mouseX,y:mouseY}
  //   }) //在滑鼠按下的地方，產生一個Obj class元件
  //    balls.push(ball) //把ball的物件放入到balls陣列內 (丟到倉庫)
  // //+++++++++++++++++++++++++++++++

  // //在物件上按下滑鼠，物件消失不見，分數加一分
  //  for(let ball of balls){ //檢查每一個物件
  //    if(ball.isBallInRanger(mouseX,mouseY)){
  //      balls.splice(balls.indexOf(ball),1) //從倉庫balls取出被滑鼠按到的物件編數(balls.indexOf(ball))，只取一個
  //      score=score+1
  //    }
  //  }
  bullet = new Bullet({})
  bullets.push(bullet)
  // bullet_sound.play()
}

function keyPressed(){
  if(key==" "){ //放下空白建，發射飛彈
    bullet = new Bullet({})
    bullets.push(bullet)
    bullet_sound.play()
  
}
}


