"use strict"

/////////////////////// сделать выбор темы для слов.
///////////////////////  реализовать начальное меню.
/////////////////////// изменить задний фон.

let arrayWords = ['зелёный','материк','человек','индастриальный','специалист','книга','тумбочка','картина','светильник','гантель','лопата','дежурный']


let popUp = document.querySelector('.pop-up');
let buttonRestart = document.querySelector('.restart');
let numberGuesses = document.querySelector('.number');
let blockGuesses = document.querySelector('.guessed-words')

let alphabet = document.querySelector('.alphabet');
let gallowsBlock = document.querySelectorAll('.gallows_block');
let input = document.querySelector('.input');




function current(){
    return arrayWords[Math.floor(Math.random()*arrayWords.length)];
}

let guessed = 0;   // кол-во отгадданых
let currentError = 0; // кол-во ошибок
let WordsCurrent = current();
let copyCurrent = WordsCurrent.split('');
let text = [];
let letterActive = [];



Start(copyCurrent,text,currentError)

function Start(copyCurrent,text,currentError){    
        
    textHiding(text,copyCurrent);

    input.innerHTML = text.join(' ');
    
    
    
    alphabet.addEventListener('click',(e)=>{
        console.log(arrayWords)
        console.log(text)
        let letter = e.target.textContent;
        
        

        console.log(copyCurrent.join(''),"  ", text.join('')," ",copyCurrent.length);
        

        if(copyCurrent.includes(letter)){
                    console.log(letter, 'bukva');  
            text.splice(copyCurrent.indexOf(letter),1,letter);
            copyCurrent.splice(copyCurrent.indexOf(letter),1,letter.toUpperCase()); 
                    console.log(copyCurrent);
                    console.log(text);
            if(letter   != copyCurrent.find((item)=>item == letter)){ /////// ищет в отредактируемом массиве дубликаты
                e.target.classList.add('active');
                letterActive.push(e.target);
                console.log(letterActive)
            }
            input.innerHTML = text.join(' ');
                if(copyCurrent.join('') == text.join('').toUpperCase()){
                    
                    guessed++
                    blockGuesses.innerHTML = guessed;

                    
                    console.log(copyCurrent.join(''),"  ", text.join(''));


                    arrayWords = arrayWords.filter((item)=>item != copyCurrent.join('').toLowerCase()); /// удаляет из массива угадданные слова

                    //////////////////////////////
                    copyCurrent = arrayWords[Math.floor(Math.random()*arrayWords.length)].split('');
                    text = [];
                    textHiding(text,copyCurrent)
                    input.innerHTML = text.join(' ');

                    
                    
                    /////////////////////////
                    letterActive.forEach((item)=>{
                        item.classList.remove('active');
                    });
                    letterActive = [];

                    
                }
            

        }else if( e.target.classList == 'alphabet'){
            console.log("done")
        }else{
            if(currentError < 5){
                gallowsBlock[currentError].style.display = "block";
                currentError++;
            }else{
                gallowsBlock[0].style.display = "none";
                currentError = 0;
                alphabet.style.cssText = "pointer-events: none";
                setTimeout(()=>{
                    popUp.classList.add('active');
                    text = [];
                    textHiding(text,copyCurrent)
                    input.innerHTML = text.join(' ');
                },1500);
                numberGuesses.innerHTML = guessed;
                ////////
                copyCurrent = arrayWords[Math.floor(Math.random()*arrayWords.length)].split('');
                
                
                
                
                
            }
        
        }
    });
    return;
}


buttonRestart.addEventListener('click',(e)=>{
    currentError = 0;
    guessed = 0;
    blockGuesses.innerHTML = guessed;
    popUp.classList.remove('active');
    alphabet.style.cssText = "pointer-events: auto";
    restartBlock(letterActive,gallowsBlock);
    letterActive = [];

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


