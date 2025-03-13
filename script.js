let gameSeq=[];
let userSeq=[];
let h3=document.querySelector("h3");
let colors=["yellow","red","blue","green"];

let started=false;
let level=0;
let currentLevel=document.querySelector(".current-level");
let colorBox=document.querySelector(".btn");

document.addEventListener("keypress",function(){
    if(started==false) {
        // console.log("start");
        started=true;
     }
     h3.innerText="";
     levelUp();
});

let startBtn= document.querySelector("#start-btn");
startBtn.addEventListener("click",function(){
    if(started==false) {
    // console.log("start");
    started=true;
    }
    h3.innerText="";
    levelUp();
});

function flash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash")
    },250);
};

function levelUp(){
    
    userSeq=[];
    level++;
    // console.dir(currentLevel);
    currentLevel.innerText=level;

    //random btn
    let randomIdex= Math.floor(Math.random() * 4);
    let randomColor = colors[randomIdex];
    gameSeq.push(randomColor);
    console.log(gameSeq);
    // let randomBtn= document.querySelector(`.${randomColor}`);
    // flash(randomBtn);

    gameSeq.forEach((color, index) => {
        setTimeout(() => {
            let btn = document.querySelector(`.${color}`);
            flash(btn);
        }, index * 1000)});
};

function checkAns(idx){
    // console.log(level);
    // let idx=level-1;
    if(gameSeq[idx]==userSeq[idx]) {
        if(userSeq.length==gameSeq.length){
            setTimeout(levelUp,1000);
        }
    }else{
        h3.innerText="Game Over !! press any key";
        reset();
    }
};

function btnPress(){

    if (!started) return; //ignore if not started

    // console.log(this);
    let btn=this;
    flash(btn);

    let userColor= btn.getAttribute("id");
    // console.log(userColor);
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

let AllBtns=document.querySelectorAll(".btn");
for(btn of AllBtns){
    btn.addEventListener("click",btnPress);
}

function reset(){
    document.body.style.backgroundColor = "red"; // Flash red on Game Over
    setTimeout(() => {
        document.body.style.backgroundColor = ""; // Reset to normal
    }, 500);
    started=false;
    gameSeq=[];
    userSeq=[];
    h3.innerHTML=`Game Over !! your score was <b> ${level} <b> <br/>press any key  to Restart`;
    level=0;
}