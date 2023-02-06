let pg1 = [
    {"element":document.getElementById("rg1"),"score":0,flag:false,parentBg:document.getElementById("rg1").parentElement.style.backgroundColor},
    {"element":document.getElementById("rg2"),"score":0,flag:false,parentBg:document.getElementById("rg2").parentElement.style.backgroundColor},
    {"element":document.getElementById("rg3"),"score":0,flag:false,parentBg:document.getElementById("rg3").parentElement.style.backgroundColor},
    {"element":document.getElementById("rg4"),"score":0,flag:false,parentBg:document.getElementById("rg4").parentElement.style.backgroundColor}
];


let pg2 = [
    {"element":document.getElementById("bg1"),"score":0,flag:false,parentBg:document.getElementById("bg1").parentElement.style.backgroundColor},
    {"element":document.getElementById("bg2"),"score":0,flag:false,parentBg:document.getElementById("bg2").parentElement.style.backgroundColor},
    {"element":document.getElementById("bg3"),"score":0,flag:false,parentBg:document.getElementById("bg3").parentElement.style.backgroundColor},
    {"element":document.getElementById("bg4"),"score":0,flag:false,parentBg:document.getElementById("bg4").parentElement.style.backgroundColor}
];

let rgPath = {0:"rh1",1:"r15",2:"r12",3:"r9",4:"r6",5:"r3",6:"g1",7:"g4",8:"g7",9:"g10",10:"g13",
              11:"g16",12:"g17",13:"g18",14:"g15",15:"g12",16:"g9",17:"g6",18:"g3",19:"b1",20:"b4",
              21:"b7",22:"b10",23:"b13",24:"b16",25:"b17",26:"b18",27:"b15",28:"b12",29:"b9",30:"b6",
              31:"b3",32:"y1",33:"y4",34:"y7",35:"y10",36:"y13",37:"y16",38:"y17",39:"y18",40:"y15",
              41:"y12",42:"y9",43:"y6",44:"y3",45:"r1",46:"r4",47:"r7",48:"r10",49:"r13",50:"r16",
              51:"r17",52:"r14",53:"r11",54:"r8",55:"r5",56:"r2"};

let bgPath = {0:"bh1",1:"b15",2:"b12",3:"b9",4:"b6",5:"b3",6:"y1",7:"y4",8:"y7",9:"y10",10:"y13",
              11:"y16",12:"y17",13:"y18",14:"y15",15:"y12",16:"y9",17:"y6",18:"y3",19:"r1",20:"r4",
              21:"r7",22:"r10",23:"r13",24:"r16",25:"r17",26:"r18",27:"r15",28:"r12",29:"r9",30:"r6",
              31:"r3",32:"g1",33:"g4",34:"g7",35:"g10",36:"g13",37:"g16",38:"g17",39:"g18",40:"g15",
              41:"g12",42:"g9",43:"g6",44:"g3",45:"b1",46:"b4",47:"b7",48:"b10",49:"b13",50:"b16",
              51:"b17",52:"b14",53:"b11",54:"b8",55:"b5",56:"b2"};


let p1 = true;
let pg1_ranNum = -1;
let pg1_liveCount = 0;
let pg1_SixCount = 0;
let pg1_Home = false;
let pg1_Exit = false;
let pg1_Kill = false;
let pg1_nxt_turn = false
let pg1_Exit_sum = 0;

let p2=false;
let pg2_ranNum = -1;
let pg2_liveCount = 0;
let pg2_SixCount = 0;
let pg2_Home = false;
let pg2_Exit = false;
let pg2_Kill = false;
let pg2_nxt_turn = false;
let pg2_Exit_sum = 0;

// For First Turn
function startGame()
{
    if (p1 == true){
        console.log("p1 == true")
        p1Check();
    }
    else{
        p2Check();
    }
}

// Player 1 Btn
function play1Btn(){
    pg1_ranNum = getRandNum(); // 6
    document.getElementById("playBtn1").disabled = true;
    document.getElementById("s1").innerText = pg1_ranNum+"";
    if(pg1_ranNum == 6){
        pg1_SixCount = pg1_SixCount + 1;
        if(pg1_SixCount >3){
            console.log("pg1_SixCount is Greater Than 3")
            p2Check();
        }
        else{
            pg1_nxt_turn = true;
            liveGoti1();  
        }
    }
    else{
        pg1_SixCount = 0;
        pg1_nxt_turn = false;
        liveGoti1();  
    }   
}

function liveGoti1(){
    pg1_liveCount=0;
    pg1.forEach(function (element){
        if ((element["score"] == 0 && pg1_ranNum == 6)) {
            element["element"].parentElement.style.backgroundColor= "#66D3FA";// "rgb(166, 166, 200)";
            element.flag = true;
            pg1_liveCount = pg1_liveCount + 1;
          } else if (element["score"]>0 && element["score"]+pg1_ranNum <= 57) {
            element["element"].parentElement.style.backgroundColor= "#66D3FA";
            element.flag = true;
            pg1_liveCount = pg1_liveCount + 1;
          }
    });
    if(pg1_liveCount == 0){
        p2Check();
    }
}


// PG1 Listeners

pg1[0].element.addEventListener("click", function() {
    if(pg1[0].flag == true)
    {
        parent = document.getElementById(rgPath[pg1[0].score]).childNodes;
        pID = rgPath[pg1[0].score];
        removeLiveGoti("r1")
        if (pg1[0].score == 0)
        {
            pg1[0].score = 1;
            pg1_Home = true;
            box = document.getElementById(rgPath[pg1[0].score]).childNodes;
            placeGoti(pg1[0],rgPath[pg1[0].score])
            console.log("Goti Placed");
            setOKill(box,rgPath[pg1[0].score]);
        }
        else{
            console.log("Scored more than 1")
            pg1[0].score = pg1[0].score + pg1_ranNum;
            if(pg1[0].score == 57){
                pg1_Exit = true;
                pg1_Exit_sum = pg1_Exit_sum + 1;
                document.getElementById("redIdExit").appendChild(pg1[0].element);
            }
            else{
                box = document.getElementById(rgPath[pg1[0].score]).childNodes;
                placeGoti(pg1[0],rgPath[pg1[0].score])
                console.log("Goti Placed");
                setOKill(box,rgPath[pg1[0].score]);
            }
            setParentBox(parent,pID)
        }
        nextTurnPg1();
    }
});

pg1[1].element.addEventListener("click", function() {
    if(pg1[1].flag == true)
    {
        parent = document.getElementById(rgPath[pg1[1].score]).childNodes;
        pID = rgPath[pg1[1].score];
        removeLiveGoti("r2")
        if (pg1[1].score == 0)
        {
            pg1[1].score = 1;
            pg1_Home = true;
            box = document.getElementById(rgPath[pg1[1].score]).childNodes;
            placeGoti(pg1[1],rgPath[pg1[1].score])
            console.log("Goti Placed");
            setOKill(box,rgPath[pg1[1].score]);
        }
        else{
            pg1[1].score = pg1[1].score + pg1_ranNum;
            if(pg1[1].score == 57){
                pg1_Exit = true;
                pg1_Exit_sum = pg1_Exit_sum + 1;
                document.getElementById("redIdExit").appendChild(pg1[1].element);
            }
            else{
                box = document.getElementById(rgPath[pg1[1].score]).childNodes;
                placeGoti(pg1[1],rgPath[pg1[1].score])
                console.log("Goti Placed");
                setOKill(box,rgPath[pg1[1].score]);
            }
            setParentBox(parent,pID);
        }
        nextTurnPg1();
    }
});

pg1[2].element.addEventListener("click", function() {
    if(pg1[2].flag == true)
    {
        parent = document.getElementById(rgPath[pg1[2].score]).childNodes;
        pID = rgPath[pg1[2].score];
        removeLiveGoti("r3")
        if (pg1[2].score == 0)
        {
            pg1[2].score = 1;
            pg1_Home = true;
            box = document.getElementById(rgPath[pg1[2].score]).childNodes;
            placeGoti(pg1[2],rgPath[pg1[2].score])
            console.log("Goti Placed");
            setOKill(box,rgPath[pg1[2].score]);
        }
        else{
            pg1[2].score = pg1[2].score + pg1_ranNum;
            if(pg1[2].score == 57){
                pg1_Exit = true;
                pg1_Exit_sum = pg1_Exit_sum + 1;
                document.getElementById("redIdExit").appendChild(pg1[2].element);
            }
            else{
                box = document.getElementById(rgPath[pg1[2].score]).childNodes
                placeGoti(pg1[2],rgPath[pg1[2].score])
                console.log("Goti Placed");
                setOKill(box,rgPath[pg1[2].score]);
            }
            setParentBox(parent,pID);
        }
        nextTurnPg1();
    }
});

pg1[3].element.addEventListener("click", function() {
    if(pg1[3].flag == true)
    {
        parent = document.getElementById(rgPath[pg1[3].score]).childNodes;
        pID = rgPath[pg1[3].score];
        removeLiveGoti("r4")
        if (pg1[3].score == 0)
        {
            pg1[3].score = 1;
            pg1_Home = true;
            box = document.getElementById(rgPath[pg1[3].score]).childNodes;
            placeGoti(pg1[3],rgPath[pg1[3].score])
            console.log("Goti Placed");
            setOKill(box,rgPath[pg1[3].score]);
        }
        else{
            pg1[3].score = pg1[3].score + pg1_ranNum;
            if(pg1[3].score == 57){
                pg1_Exit = true;
                pg1_Exit_sum = pg1_Exit_sum + 1;
                document.getElementById("redIdExit").appendChild(pg1[3].element);
            }
            else{
                box = document.getElementById(rgPath[pg1[3].score]).childNodes;
                placeGoti(pg1[3],rgPath[pg1[3].score])
                console.log("Goti Placed");
                setOKill(box,rgPath[pg1[3].score]);
            }
            setParentBox(parent,pID);
        }
        nextTurnPg1();
    }
});  


function nextTurnPg1(){
    if(pg1_Exit_sum == 4)
    {
        let msg = document.getElementById("p1Name").innerText + " Wins The Game";
        alert(msg);
        playAgain();
    }
    console.log("(pg1_Exit == ",pg1_Exit," || pg1_Kill == ",pg1_Kill,")")
    if (pg1_ranNum != 6){
        if((pg1_Exit == true || pg1_Kill == true)){
            pg1_nxt_turn = true;
        }
        else{
            pg1_nxt_turn = false;
        }
    }
    pg1_Exit=false;
    pg1_Kill=false;
    pg1_Home=false;
    if(pg1_nxt_turn == true){
        document.getElementById("playBtn1").disabled = false;
        console.log("disabled = false")
    }
    else{
        console.log("p2Check")
        p2Check();
    }
}

//  PG2 Listeners

// Player 2 Btn
function play2Btn(){
    pg2_ranNum = getRandNum(); // 6
    document.getElementById("playBtn2").disabled = true;
    document.getElementById("s2").innerText = pg2_ranNum+"";
    if(pg2_ranNum == 6){
        pg2_SixCount = pg2_SixCount + 1;
        if(pg2_SixCount >3){
            console.log("pg2_SixCount is Greater Than 3")
            p1Check();
        }
        else{
            pg2_nxt_turn = true;
            liveGoti2();  
        }
    }
    else{
        pg2_SixCount = 0;
        liveGoti2();  
    }   
}

function liveGoti2(){
    pg2_liveCount=0;
    pg2.forEach(function (element){
        if ((element["score"] == 0 && pg2_ranNum == 6)) {
            element["element"].parentElement.style.backgroundColor= "#66D3FA";
            element.flag = true;
            pg2_liveCount = pg2_liveCount + 1;
          } else if (element["score"]>0 && element["score"] + pg2_ranNum <= 57) {
            element["element"].parentElement.style.backgroundColor= "#66D3FA";
            element.flag = true;
            pg2_liveCount = pg2_liveCount + 1;
          }
    });
    if(pg2_liveCount == 0){
        p1Check();
    }
}

pg2[0].element.addEventListener("click", function() {
    if(pg2[0].flag == true)
    {
        parent = document.getElementById(bgPath[pg2[0].score]).childNodes;
        pID = bgPath[pg2[0].score];
        removeLiveGoti("b1")
        if (pg2[0].score == 0)
        {
            pg2[0].score = 1;
            pg2_Home = true;
            box = document.getElementById(bgPath[pg2[0].score]).childNodes;
            placeGoti(pg2[0],bgPath[pg2[0].score])
            console.log("Goti Placed");
            setOKill(box,bgPath[pg2[0].score]);
        }
        else{
            pg2[0].score = pg2[0].score + pg2_ranNum;
            if(pg2[0].score == 57){
                pg2_Exit = true;
                pg2_Exit_sum = pg2_Exit_sum + 1;
                document.getElementById("blueIdExit").appendChild(pg2[0].element);
            }
            else{
                box = document.getElementById(bgPath[pg2[0].score]).childNodes;
                placeGoti(pg2[0],bgPath[pg2[0].score])
                console.log("Goti Placed");
                setOKill(box,bgPath[pg2[0].score]);
            }
            setParentBox(parent,pID);
        }
        nextTurnPg2();
    }
});

pg2[1].element.addEventListener("click", function() {
    if(pg2[1].flag == true)
    {
        parent = document.getElementById(bgPath[pg2[1].score]).childNodes;
        pID = bgPath[pg2[1].score];
        removeLiveGoti("b2")
        if (pg2[1].score == 0)
        {
            pg2[1].score = 1;
            pg2_Home = true;
            box = document.getElementById(bgPath[pg2[1].score]).childNodes;
            placeGoti(pg2[1],bgPath[pg2[1].score])
            console.log("Goti Placed");
            setOKill(box,bgPath[pg2[1].score]);
        }
        else{
            pg2[1].score = pg2[1].score + pg2_ranNum;
            if(pg2[1].score == 57){
                pg2_Exit = true;
                pg2_Exit_sum = pg2_Exit_sum + 1;
                document.getElementById("blueIdExit").appendChild(pg2[1].element);
            }
            else{
                box = document.getElementById(bgPath[pg2[1].score]).childNodes;
                placeGoti(pg2[1],bgPath[pg2[1].score])
                console.log("Goti Placed");
                setOKill(box,bgPath[pg2[1].score]);
            }
            setParentBox(parent,pID);
        }
        nextTurnPg2();
    }
});

pg2[2].element.addEventListener("click", function() {
    if(pg2[2].flag == true)
    {
        parent = document.getElementById(bgPath[pg2[2].score]).childNodes;
        pID = bgPath[pg2[2].score];
        removeLiveGoti("b3")
        if (pg2[2].score == 0)
        {
            pg2[2].score = 1;
            pg2_Home = true;
            box = document.getElementById(bgPath[pg2[2].score]).childNodes;
            placeGoti(pg2[2],bgPath[pg2[2].score])
            console.log("Goti Placed");
            setOKill(box,bgPath[pg2[2].score]);
        }
        else{
            pg2[2].score = pg2[2].score + pg2_ranNum;
            if(pg2[2].score == 57){
                pg2_Exit = true;
                pg2_Exit_sum = pg2_Exit_sum + 1;
                document.getElementById("blueIdExit").appendChild(pg2[2].element);
            }
            else{
                box = document.getElementById(bgPath[pg2[2].score]).childNodes;
                placeGoti(pg2[2],bgPath[pg2[2].score])
                console.log("Goti Placed");
                setOKill(box,bgPath[pg2[2].score]);
            }
            setParentBox(parent,pID);
        }
        nextTurnPg2();
    }
});

pg2[3].element.addEventListener("click", function() {
    if(pg2[3].flag == true)
    {
        parent = document.getElementById(bgPath[pg2[3].score]).childNodes;
        pID = bgPath[pg2[3].score];
        removeLiveGoti("b4")
        if (pg2[3].score == 0)
        {
            pg2[3].score = 1;
            pg2_Home = true;
            box = document.getElementById(bgPath[pg2[3].score]).childNodes;
            placeGoti(pg2[3],bgPath[pg2[3].score])
            console.log("Goti Placed");
            setOKill(box,bgPath[pg2[3].score]);
        }
        else{
            pg2[3].score = pg2[3].score + pg2_ranNum;
            if(pg2[3].score == 57){
                pg2_Exit = true;
                pg2_Exit_sum = pg2_Exit_sum + 1;
                document.getElementById("blueIdExit").appendChild(pg2[3].element);
            }
            else{
                box = document.getElementById(bgPath[pg2[3].score]).childNodes;
                placeGoti(pg2[3],bgPath[pg2[3].score])
                console.log("Goti Placed");
                setOKill(box,bgPath[pg2[3].score]);
            }
            setParentBox(parent,pID);
        }
        nextTurnPg2();
    }
});

function nextTurnPg2(){
    if(pg2_Exit_sum == 4)
    {
        let msg = document.getElementById("p2Name").innerText + " Wins The Game";
        alert(msg);
        playAgain();
    }
    console.log("(pg2_Exit == ",pg2_Exit," || pg2_Kill == ",pg2_Kill,")")
    if (pg2_ranNum != 6){
        if((pg2_Exit == true || pg2_Kill == true)){
            pg2_nxt_turn = true;
        }
        else{
            pg2_nxt_turn = false;
        }
    }
    pg2_Exit=false;
    pg2_Kill=false;
    pg2_Home=false;
    if(pg2_nxt_turn == true){
        document.getElementById("playBtn2").disabled = false;
        console.log("disabled = false")
    }
    else{
        console.log("p1Check")
        p1Check();
    }
}   

function removeLiveGoti(ID)
{
    if(ID.substring(0,1)=="r"){
        pg = pg1;
    }
    else{
        pg = pg2;
    }
    pg.forEach(function (element){
        element["element"].parentElement.style.backgroundColor = element["parentBg"];
        element.flag = false;
    });
}

function getRandNum(){
    return Math.floor(Math.random() * 6) + 1;
}
   

function countChildren(box){
    i=0;
    l=[];
    while(i<box.length){
        if(box[i]["nodeName"].substring(0,5)!="#text"){
            l.push(box[i]);
        }
        i=i+1;
    }
    return l;
}

function setParentBox(box,pID){
    l = countChildren(box); 
    console.log("Parent Childs: ",l)
    console.log("document.getElementById(pID): ",document.getElementById(pID))
    if(l.length==1){
        document.getElementById(pID).innerHTML = "";
        l[0].className = "goti";
        if(l[0].id.substring(0,1) == "r"){
            l[0].classList.add("rg");
        }
        else{
            l[0].classList.add("bg");
        }
        document.getElementById(pID).appendChild(l[0]);
    }
}

function setOKill(box,bID){
    console.log("setOKill\nBox: ",box,"\bBid: ",bID);
    l = countChildren(box);  
    console.log("L: ",l,"\nLength: ",l.length)
    if(l.length == 2){ 
        if((l[0].id.substring(0,1) == l[1].id.substring(0,1)) || (bID.substring(1,3) == "10" || bID.substring(1,3) == "15")){
            console.log("SAME TOO SAME");
            setGoti1(bID,l);
        }
        else{
            console.log("Killllll")
            document.getElementById(bID).innerHTML = "";
            document.getElementById(bID).appendChild(l[1]);
            i = l[0].id.substring(2,3);
            num = parseInt(i)-1;
            console.log("I: ",i,"\nNum: ",num)
            if(l[0].id.substring(0,1) == 'r'){
                home = "rh"+i;
                pg2_Kill=true;
                pg1[num].score = 0;
                document.getElementById(home).appendChild(l[0]);
            }
            else{
                home = "bh"+i;
                pg1_Kill=true;
                pg2[num].score = 0;
                document.getElementById(home).appendChild(l[0]);
            }
        }
    }
    else if(l.length > 2){
        console.log("Gotis more than 2");
        setGoti1(bID,l);
    }
}
function setGoti1(bID,l){
    document.getElementById(bID).innerHTML = "";
    i=0;
    while(i<l.length){
        l[i].className = "goti2";
        if(l[i].id.substring(0,1)=="r"){
            l[i].classList.add("rg");
        }
        else{
            l[i].classList.add("bg");
        }
        l[i].classList.add("rg");
        console.log("l[i]: ",l[i]);
        document.getElementById(bID).appendChild(l[i]);
        i = i + 1;
    }
    
}

function placeGoti(pg,path){
    console.log("placeGoti -> path: ",path," Id: ",pg.element.id)
    document.getElementById(path).appendChild(pg.element);
    pg.parentBg = document.getElementById(path).style.backgroundColor;
    pg.element.className = "goti";
    if(pg.element.id.substring(0,1)=='r'){
        pg.element.classList.add("rg");
    }
    else{
        pg.element.classList.add("bg");
    }
    
}

function p1Check(){
    document.getElementById("playBtn1").disabled = false;
    document.getElementById("playBtn1").style.backgroundColor = "green";
    document.getElementById("playBtn2").disabled = true;
    document.getElementById("playBtn2").style.backgroundColor = "red";
    resetVaues();
}
function p2Check(){
    document.getElementById("playBtn2").disabled = false;
    document.getElementById("playBtn2").style.backgroundColor = "green";
    document.getElementById("playBtn1").disabled = true;
    document.getElementById("playBtn1").style.backgroundColor = "red";
    resetVaues();
}

function resetVaues(){
    pg1_nxt_turn = false;
    pg1_SixCount = 0;
    pg1_Home = false;
    pg1_Exit = false;
    pg1_Kill = false;
    pg1_liveCount = 0;

    pg2_nxt_turn = false;
    pg2_SixCount = 0;
    pg2_Home = false;
    pg2_Exit = false;
    pg2_Kill = false;
    pg2_liveCount = 0;
}

function playAgain(){
    window.location.reload(true);
}
startGame();