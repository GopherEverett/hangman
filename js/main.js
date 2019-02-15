var wordList = ['dog', 'cat','badger', 'dude','lorem', 'bottle'];
var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
        'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
        't', 'u', 'v', 'w', 'x', 'y', 'z'];
var wordInPlay;
var score = 0;
var guessLet;
var guessList = [];
var guessBad = 0;
var buttons = function(){
    $('.buttons').append('<ul id="buttons"></ul>')
    for (var i = 0; i < alphabet.length; i++) {
    $('#buttons').append(`<li>${alphabet[i]}</li>`)
    } 
    $('#buttons').on('click', 'li', function(event){
        event.preventDefault()
        guessLet = $(this).text()
        
        $('.hidden div').each( function() {         //Checking for a match
            if ($(this).text() === guessLet) {
                $(this).css('color', 'red')         //changes color to unhide
                console.log("match!")
                guessList.push(guessLet)
                // console.log(guessList)
                if (guessList.length === wordInPlay.length) {
                    $('h1').text("YOU WIN!")
                    score +=100
                    $('.score').append(`<div>${score}</div>`)
                }
            } else {
                guessBad++
                console.log(guessBad)
            }
            
            
        })
        $(this).remove()
        
    })
};
var  chooseWord = function(){
    let randomWordInd = Math.floor(Math.random()*wordList.length)
    wordInPlay = wordList[randomWordInd]
    wordList.splice(randomWordInd, 1)
     let arr = wordInPlay.split("")
    for (var i = 0; i < arr.length; i++) {
        $('.hidden').append(`<div>${arr[i]}</div>`)
        }      
     
}
$('#start').on('click', function() {
    buttons()
    chooseWord()
});
