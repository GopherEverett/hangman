var wordList = ['dog', 'cat', 'badger', 'dude', 'lorem', 'bottle'];
var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
    'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
    't', 'u', 'v', 'w', 'x', 'y', 'z'];
var wordInPlay;
var score = 0;
var guessLet;
var guessGood = 0;
var badCounter = 0;
var guessBad = 0;
var buttons = function () {
    $('.buttons').append('<ul id="buttons"></ul>')  //Create buttons for alphabet
    for (var i = 0; i < alphabet.length; i++) {
        $('#buttons').append(`<li>${alphabet[i]}</li>`)
    }
    $('#buttons').on('click', 'li', function (event) {
        event.preventDefault()
        guessLet = $(this).text()
        $('.hidden div').each(function () {
            if ($(this).text() === guessLet) {      //Checking for a match
                $(this).css('color', 'red')         //changes color to unhide
                guessGood++
                if (guessGood === wordInPlay.length) {
                    winFunc()
                }
            } else {
                guessBad++
                if (guessBad === wordInPlay.length) {
                    badCounter++
                    guessBad = 0
                    if (badCounter > 5) {
                        loseFunc()
                    }
                }
                
            }
        })
        $(this).remove()
    })
}
var chooseWord = function () {
    let randomWordInd = Math.floor(Math.random() * wordList.length)
    wordInPlay = wordList[randomWordInd]
    wordList.splice(randomWordInd, 1)
    let arr = wordInPlay.split("")
    for (var i = 0; i < arr.length; i++) {
        $('.hidden').append(`<div>${arr[i]}</div>`)
    }
};
var winFunc = function () {
    $('h1').text("YOU WIN!")
    score += 100
    $('.score').append(`<div>${score}</div>`)
};
var loseFunc = function () {
    $('h1').text("LOSER!")
    score -= 100
    $('.score').append(`<div>${score}</div>`)
}
$('#start').on('click', function () {
    buttons()
    chooseWord()
    $(this).remove()
})
