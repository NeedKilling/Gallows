"use strict"

/////////////////////// сделать выбор темы для слов.
///////////////////////  реализовать начальное меню.
/////////////////////// изменить задний фон.
//////////////////////// НЕСКОЛЬКО РЕЖИМОВ : НА КАЖДОЕ СЛОВО 5 ОШИБОК;  НА ВСЕ СЛОВА 5 ОШИБОК НО С УПРОЩЕНИЕМ; ЕЩЕ БОЛЕЕ СЛОЖНЫЙ 
//////////////////////////  ПОДСТВЕТКА БУКВ КОТОРЫЕ БЫЛИ ОШИБОЧНЫ
///////////////////////////   СДЕЛАТЬ ДЛЯ РЕЖИМОВ СЕРИЮ УГАДАННЫХ СЛОВ.

let arrayWords = ['зелёный','материк','человек','индустриальный','специалист','книга','тумбочка','картина','светильник','гантель','лопата','дежурный','змееед','хроника','кондитер','самовар','скворечник','фундамент','бумажник','комбинация','леденец','радиатор','магнитофон','писатель','виселица','фильм','театр','объём']

document.addEventListener('DOMContentLoaded',()=>{

    const popUp = document.querySelector('.pop-up');
    const buttonRestart = document.querySelector('.restart');
    const numberGuesses = document.querySelector('.number');
    const blockGuesses = document.querySelector('.guessed-words')

    const alphabet = document.querySelector('.alphabet');
    const gallowsBlock = document.querySelectorAll('.gallows_block');
    const input = document.querySelector('.input');
    const guessedWords = document.querySelector('.guessed-word_text')



function current(){
    return arrayWords[Math.floor(Math.random()*arrayWords.length)];
}

let guessed = 0;   // кол-во отгадданых
let currentError = 0; // кол-во ошибок
let WordsCurrent = current();
let copyCurrent = WordsCurrent.split('');
let text = [];
let letterActive = [];



Start(copyCurrent,text,currentError);

function Start(copyCurrent,text,currentError){  

   textHiding(text,copyCurrent);
   input.innerHTML = text.join(' ');
    
alphabet.addEventListener('click',(e)=>{
        console.log(copyCurrent)
        const letter = e.target.textContent;
      
    if(e.target.classList.contains('letter')){


    if(copyCurrent.includes(letter)){
              
       
        
       function check(letter){
            let j = copyCurrent.join('').split(letter).length-1;
        
            for(let i = 0; i < j; i++){
                text.splice(copyCurrent.indexOf(letter),1,letter);
                copyCurrent.splice(copyCurrent.indexOf(letter),1,letter.toUpperCase()); 
            }
            e.target.innerHTML += '<svg viewBox="0 0 100 100"><path d="M50 10 a 40 40 0 0 1 0 80 a 40 40 0 0 1 0 -80"/></svg>'
            letterActive.push(e.target);
       };
        check(letter);
        input.innerHTML = text.join(' ');


            if(copyCurrent.join('') == text.join('').toUpperCase()){
                guessed++
                blockGuesses.innerHTML = guessed;

                setTimeout(()=>{
                        arrayWords = arrayWords.filter((item)=>item != copyCurrent.join('').toLowerCase()); /// удаляет из массива угадданные слова
                    //////////////////////////////
                    copyCurrent = current().split('');
                    text = [];
                    textHiding(text,copyCurrent)
                    input.innerHTML = text.join(' ');

                    /////////////////////////
                    restartBlock(letterActive,gallowsBlock);
                    letterActive = [];
                    currentError = 0;
                },1000);
                    
            }
    }else{
        if(currentError < 6){
            e.target.innerHTML += '<svg viewBox="0 0 100 100"><path d="M50 10 a 40 40 0 0 1 0 80 a 40 40 0 0 1 0 -80"/></svg>'
            e.target.classList.add('false');
            letterActive.push(e.target);
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
            
            guessedWords.innerHTML = copyCurrent.join('').toLowerCase();
            copyCurrent = current().split('');

            numberGuesses.innerHTML = guessed;
            ////////
            
        }
    
    }
        }
    });

}

buttonRestart.addEventListener('click',(e)=>{
    currentError = 0;
    guessed = 0;
    blockGuesses.innerHTML = guessed;
    popUp.classList.remove('active');
    alphabet.style.cssText = "pointer-events: auto";
    restartBlock(letterActive,gallowsBlock);
    letterActive = [];
    console.log(copyCurrent)

    text = [];
    textHiding(text,copyCurrent)
    input.innerHTML = text.join(' ');

});
    



function textHiding(text,copyCurrent){
    copyCurrent.forEach((item)=>{
        item = '_';
        text.push(item);
    })
}



function restartBlock(letters,imageBlock){
    letters.forEach((item)=>{
        item.classList.remove('false');
        item.removeChild(item.lastChild)
    });
    imageBlock.forEach((item)=>{
        item.style.display = 'none';
    })
};

});



