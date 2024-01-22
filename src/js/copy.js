"use strict"

let arrayWords = ['зеленый','материк','человек','индостриальный','специалист']


let popUp = document.querySelector('.pop-up');
let buttonRestart = document.querySelector('.restart');
let numberGuesses = document.querySelector('.text');

let alphabet = document.querySelector('.alphabet');
let gallowsBlock = document.querySelectorAll('.gallows_block');
let input = document.querySelector('.input');




function current(){
    return arrayWords[Math.floor(Math.random()*arrayWords.length)];
}
let currentError = 0;
let WordsCurrent = current();
let copyCurrent = WordsCurrent.split('');
let text = [];
let letterActive = [];

Start(copyCurrent,text,currentError)

function Start(copyCurrent,text,currentError){    
        
    textHiding(text,copyCurrent);

    input.innerHTML = text.join(' ');
    
    
    
    alphabet.addEventListener('click',(e)=>{
        console.log(text)
        let letter = e.target.textContent;
        
        

        console.log(copyCurrent.join(''),"  ", text.join('')," ",copyCurrent.length);
        

        if(copyCurrent.includes(letter)){
                    console.log(letter, 'bukva');  
            text.splice(copyCurrent.indexOf(letter),1,letter);
            copyCurrent.splice(copyCurrent.indexOf(letter),1,' ');
                    console.log(copyCurrent);
                    console.log(text);
            if(letter   != copyCurrent.find((item)=>item == letter)){ /////// ищет в отредактируемом массиве дубликаты
                e.target.classList.add('active');
                letterActive.push(e.target);
                console.log(letterActive)
            }
            input.innerHTML = text.join(' ');
                if(WordsCurrent == text.join('')){
                    console.log(WordsCurrent,"  ", text.join(''));
                };
            

        }else if( e.target.classList == 'alphabet'){
            console.log("done")
        }else{
            if(currentError < 5){
                gallowsBlock[currentError].style.display = "block";
                currentError++;
            }else{
                gallowsBlock[0].style.display = "none";
                currentError = 0;
                setTimeout(()=>{
                    popUp.classList.add('active');
                },1500);
                
            }
        
        }
    });
    return;
}


buttonRestart.addEventListener('click',(e)=>{
    
    popUp.classList.remove('active');

    restartBlock(letterActive,gallowsBlock);
    resetGame()

});
    



function textHiding(text,copyCurrent){
    copyCurrent.forEach((item)=>{
        item = '_';
        text.push(item);
    })
}

function gameWin(currentWords,input){
    if(currentWords.join('') == input.join('')){
        console.log(currentWords.join(''),"  ", input.join(''));
    };
};

function restartBlock(letters,imageBlock){
    letters.forEach((item)=>{
        item.classList.remove('active');
    });
    imageBlock.forEach((item)=>{
        item.style.display = 'none';
    })
};


function resetGame(){
    copyCurrent = arrayWords[Math.floor(Math.random()*arrayWords.length)].split('');
    text = [];
    textHiding(text,copyCurrent)
    input.innerHTML = text.join(' ');
    letterActive = [];
};