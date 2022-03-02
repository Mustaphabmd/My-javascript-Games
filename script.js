let parentBox = document.querySelector(".container");
let firstPlayer = document.querySelector(".first-player");
let secendPlayer = document.querySelector(".secend-player");
let state = document.querySelector(".state");
let Alls = parentBox.children;
let Xscore = document.querySelector(".resualt-squareX");
let Oscore = document.querySelector(".resualt-squareO");
let matched = 0;
let scoreX = 0;
let scoreO = 0;

// hand tuen of playing
function HandlesTurns(){
    let count = 0;

    for( let i = 0 ; i < parentBox.children.length; i++ ){
        parentBox.children[i].addEventListener("click" , ()=>{

            if( parentBox.children[i].textContent == "" ){
                count++;  matched++; 
                if( count == 2 ) {count = 0;}

               // check for who has the turn to play
                Check_Who_Is_Playing(count , i); 
                
                //for the logic
                Win_TheGame(i);
            } 
        });
    }
}

//check of who is playing now
function Check_Who_Is_Playing(count , i){

    const Print_X = ()=>{
        if( parentBox.children[i].textContent === ""){
            parentBox.children[i].textContent = "X";
            parentBox.children[i].style.color = "lightskyblue";
            secendPlayer.classList.add("Mymove")
            firstPlayer.classList.remove("Mymove")    
        }
    } 
    , Print_O = ()=>{
        if( parentBox.children[i].textContent === "")
            firstPlayer.classList.remove("Mymove")
            parentBox.children[i].textContent = "O";
            parentBox.children[i].style.color = "rgb(107, 238, 168)";
            firstPlayer.classList.add("Mymove")
            secendPlayer.classList.remove("Mymove")
            Check_for_Endgame();
    } 

    // statement procces
    count <= 0 ? Print_X() : Print_O();
}


// check if all blacks is full 
function Check_for_Endgame(i){
    if( matched >= 9 ){
        setTimeout(()=>{
            firstPlayer.classList.remove("Mymove");
            state.style.display = "block";
            document.querySelector(".all").style.filter = "blur(10px)"; 
            state.children[0].innerHTML += Display_message("Nobody has Win" , "Play Again")
        } , 2000 )
    }
}


// logical part 
function Win_TheGame(){

        if(  Find(0) === Find(1) && Find(1) === Find(2) && Find(0) != '' ){ Win_handeler(0 , 1 , 2); }
        if(  Find(0) === Find(3) && Find(3) === Find(6) && Find(3) != '' ){ Win_handeler(0 , 3 , 6);}
        if(  Find(6) === Find(7) && Find(7) === Find(8) && Find(8) != '' ){ Win_handeler(6 , 7 , 8);}
    
        if(  Find(2) === Find(5) && Find(5) === Find(8) && Find(8) != '' ){ Win_handeler(2 , 5 , 8);}
        if(  Find(0) === Find(4) && Find(4) === Find(8) && Find(8) != '' ){ Win_handeler(0 , 4 , 8);}
        if(  Find(2) === Find(4) && Find(4) === Find(6) && Find(6) != '' ){ Win_handeler(2 , 4 , 6);}
        if(  Find(3) === Find(4) && Find(4) === Find(5) && Find(5) != '' ){ Win_handeler(3 , 4 , 5 );}
        if(  Find(1) === Find(4) && Find(4) === Find(7) && Find(7) != '' ){ Win_handeler(3 , 4 , 5 );}

    }



// mark the winer and hanles things while winnging
function Win_handeler( first , secend , third ){
    const add = (N)=>{ 
        parentBox.children[N].classList.add("win_blocks");

        // this is for when makdown the win block we need to remove theme after celebration 
        setTimeout(  ()=>{
            parentBox.children[N].classList.remove("win_blocks");
        } , 2000)
       
    }
    add(first);
    add(secend);
    add(third);
    Score_increase( Find(first) , Find(secend)  , Find(third) );
    handle_wins();

    // setTimeout( clean , 1000);
}


// function for clean the game board
function clean(){
    for( let i = 0; i < parentBox.childElementCount; i++){
        parentBox.children[i].textContent = "";
    }
}

// function used to display a massege on the screen 
function Display_message(Message , Btn_Message , resul1 , result2 ){
    if( Btn_Message == null  ){
        return `
        <h2> ${Message} </h2>
        <div class="resualt"> (x) <span id='X'> ${resul1 } </span>  - 
        <span id='O'> ${ result2 } </span> (o)</div>
       ` }
    else{
        return `
        <h2> ${Message} </h2>
        <p>(Such a Looser) </p>
       <button class="button"> ${Btn_Message} </button>`    
    }
}


// hand win add score 
function handle_wins(){
    state.style.display = "block";
    state.children[0].innerHTML = Display_message("You Win the game" , null , scoreX , scoreO )

    // settimeout / display none 
    setTimeout( ()=>{
        clean();
        state.style.display = "none";
        matched = 0;
    } , 2000)
}


// function to increase the score of the winer since he've win the game
function Score_increase(b1 , b2 , b3){
    if( b1 , b2 , b3 === "O" ){
        scoreO++;
        Print_Score(scoreX , scoreO)
    }else{
        scoreX++;
        Print_Score(scoreX , scoreO)
    }
} 

//small function that look for innertext of giving elemenets
function Find(index){
    return Alls[index].textContent;
}

// Print score of the wonner 
function Print_Score(scoreX , ScoreO){
    Xscore.textContent = scoreX;
    Oscore.textContent = ScoreO;
}


HandlesTurns();

