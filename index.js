
let mob=0;
let clicked=1;
let once=0;
let highest=0;
let em="";
let nam="";
let plexist=0;

let meo=window.matchMedia("(max-width: 750px)").matches;
if(meo){
    $("h1").text("Tap to start!!!");
    mob=1;
}
let tiles=[".green",".red",".yellow",".blue"];
let start=0;

document.querySelector(".play").addEventListener('click',function(){

    if($(".detin")[0].value != '' && $(".detin")[1].value != '' ){
        let m=$(".detin")[1].value.slice(-10);
        if(m=="@gmail.com"){
        em=$(".detin")[1].value;
        nam=$(".detin")[0].value;
        document.querySelector(".init").style.display='none';
        clicked=0;
        start=1;
        for(let i=0;i<email.length;i++){
            if(em==email[i]){
                highest=score[i];
                $(".high").text("Highest level : "+highest);
                plexist=1;
                break;
            }
        }
        if(plexist==0){
            $.ajax({
                url:'includes/send.inc.php',
                type:'POST',
                data:{
                    name: nam,email:em
                }
            });
            }
        }
        else{
             $(".play").after("<p class='empty'>Invalid Email ID!!</p>");
            setTimeout(function(){$(".empty").remove()},2000);
        }
    }
    else{
        $(".play").after("<p class='empty'>Above fields are Empty!!</p>");
        setTimeout(function(){$(".empty").remove()},2000);
    }
})
let tobe=[];
let level=1;
let i=-1;

if(mob==1){
    $("body").on("click",function(){
    if(start!=0 && clicked==0 && once != 0){
        let ran=Math.floor(Math.random()*4);
        i=-1;
        let clr=$(tiles[ran]).css("background-color");
        tobe.push(tiles[ran].slice(1,tiles[ran].length));
        $(tiles[ran]).animate({backgroundColor:"black"},"fast");
        $(tiles[ran]).animate({backgroundColor:clr},"fast");
        $("h1").text("Level 1");
        let audio=new Audio(tiles[ran].slice(1,tiles[ran].length)+".mp3");
        audio.play();
        start=0;
        clicked=1;}
        else if(clicked==0){
            once=1;
        }
});
}
$("body").on("keypress",function(){
    if(start!=0){
        let ran=Math.floor(Math.random()*4);
        i=-1;
        let clr=$(tiles[ran]).css("background-color");
        tobe.push(tiles[ran].slice(1,tiles[ran].length));
        $(tiles[ran]).animate({backgroundColor:"black"},"fast");
        $(tiles[ran]).animate({backgroundColor:clr},"fast");
        $("h1").text("Level 1");
        let audio=new Audio(tiles[ran].slice(1,tiles[ran].length)+".mp3");
        audio.play();
        start=0;}
});
$(".tile").on("click",function(){
    i++;
    if(start==0){
        
        let el="."+this.classList[1];
        $(el).css("box-shadow","0px 0px 20px white");
        setTimeout(function(){$(el).css("box-shadow","")},100);
        let audio=new Audio((this.classList[1])+".mp3");
        audio.play();
        if(i<tobe.length-1){
            if(tobe[i]!=this.classList[1]){
                start=1;
                if(meo){
                    
                    $("h1").text("Failed!!! tap to start again");
                }
                else{
                    $("h1").text("Failed!!! press A key to start again");
                }
                
                $("body").css("background-color","red");
                setTimeout(function(){$("body").css("background-color","rgb(5, 51, 82)");},300);
                let audio=new Audio("wrong.mp3");
                audio.play();
                
                if(level>highest){
                    highest=level;
                    $("h2").text("Highest level : "+highest);
                    update();
                    
                }
                i=-1;
                tobe=[];
                level=1;
                setTimeout(function(){clicked=0;},100);
            }
        }
        else if(i==tobe.length-1){
            if(tobe[i]==this.classList[1]){
                level++;
                
                let ran=Math.floor(Math.random()*4);
                let clr=$(tiles[ran]).css("background-color");
                tobe.push(tiles[ran].slice(1,tiles[ran].length));
                setTimeout(function(){$(tiles[ran]).animate({backgroundColor:"black"},"fast");
                $(tiles[ran]).animate({backgroundColor:clr},"fast");
                let audio=new Audio(tiles[ran].slice(1,tiles[ran].length)+".mp3");
                audio.play();
                $("h1").text("Level "+level);
                
                i=-1;},700);
                
            }
            else{
                start=1;
                
                if(meo){

                    $("h1").text("Failed!!! tap to start again");
                }
                else{
                    $("h1").text("Failed!!! press A key to start again");
                }
                
                $("body").css("background-color","red");
                setTimeout(function(){$("body").css("background-color","rgb(5, 51, 82)");},300);
                let audio=new Audio("wrong.mp3");
                audio.play();
               
                if(level>highest){
                    highest=level;
                    $("h2").text("Highest level : "+highest);
                    update();
                }
                i=-1;
                tobe=[];
                level=1;
                setTimeout(function(){clicked=0;},100);
            }
        }
        }
    }
);
function update(){
     $.ajax({
            url:'includes/update.inc.php',
            type:'POST',
            data:{
                name: nam,email:em,highscore:highest
            }
        });
}

