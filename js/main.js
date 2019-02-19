var wordList = ['gentrify', 'squid', 'synth', 'bespoke', 'banjo', 'selvage', 'mustache', 'keytar', 'organic', 'paleo', 'flannel', 'bicycle', 'wayfarers', 'ironic', 'beard', 'artisinal'];
var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
    'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
    't', 'u', 'v', 'w', 'x', 'y', 'z'];
var wordInPlay;
var scoreOne = 0;
var scoreTwo = 0;
var playCounter = 1;
var guessLet;
var guessGood = 0;
var badCounter = 0;
var guessBad = 0;
var buttons = function () {
    $('.buttons').append('<ul id="buttons"></ul>')  //Create buttons for alphabet
    for (var i = 0; i < alphabet.length; i++) {
        $('#buttons').append(`<li>${alphabet[i]}</li>`)
    }
    $('#buttons').on('click', 'li', function (event) { //event listener on letters
        event.preventDefault()
        $('audio#click')[0].play()
        guessLet = $(this).text()
        guessBad = 0;
        checkFunc()
        $(this).remove()
    })
}
var chooseWord = function () {      //picks word randomly from array of words
    let randomWordInd = Math.floor(Math.random() * wordList.length)
    wordInPlay = wordList[randomWordInd]
    wordList.splice(randomWordInd, 1)
    let arr = wordInPlay.split("")              //splits word into array
    for (var i = 0; i < arr.length; i++) {
        $('.hidden').append(`<div>${arr[i]}</div>`) //adds word to gameboard
    }
};
var winFunc = function () {     //displays winning and resets counters and letters
    $('h1').text("YOU WIN!")
    playCounter++
    if ((playCounter % 2) === 0) {
        scoreOne += 100
        $('.score div').replaceWith(`<div>player one: ${scoreOne}</div>`)
    } else {
        scoreTwo += 100
        $('.score div').replaceWith(`<div>player two: ${scoreTwo}</div>`)
    }
    $('.buttons ul').remove()
    $('h1').addClass('animated heartBeat')
    $('audio#play')[0].pause()
    $('audio#win')[0].play()
    guessGood = 0;
    badCounter = 0;
    guessBad = 0;
    playAgain()
};
var loseFunc = function () {   //same as win function but displays loser and deprecates score
    $('audio#play')[0].pause()
    $('audio#drop')[0].play()
    $('h1').text("LOSER!")
    $('h1').addClass('animated bounceInDown')
    playCounter++
    if ((playCounter % 2) === 0) {
        scoreOne -= 100
        $('.score div').replaceWith(`<div>player one: ${scoreOne}</div>`)
    } else {
        scoreTwo -= 100
        $('.score div').replaceWith(`<div>player two: ${scoreTwo}</div>`)
    }
    $('.buttons ul').remove()
    $('.hidden div').css('color', 'red').addClass("animated flipInY")
    guessGood = 0;
    badCounter = 0;
    guessBad = 0;
    playAgain()
}
$('#start div').on('click', function () {   //start button listener that calls two starting functions
    $('audio#play')[0].play()
    $('.score div').replaceWith(`<div>player one: ${scoreOne}</div>`)
    buttons()
    chooseWord()
    $(this).remove()
})
var playAgain = function () {                       // creates replay button with listener
    $('#start').append('<div>next player</div>')
    $('#start div').on('click', function () {
        $('audio#play')[0].currentTime = 0
        $('audio#play')[0].play()
        $('h1').text("HIPSTER HANGMAN")
        $('.center img').attr('src', `./images/hangman(${badCounter}).png`) //resets image
        $('.hidden div').remove()                   //removes hidden word letters
        if ((playCounter % 2) === 0) {
            $('.score div').replaceWith(`<div>player two: ${scoreTwo}</div>`)
        } else {
            $('.score div').replaceWith(`<div>player one: ${scoreOne}</div>`)
        }
        buttons()                                   //calls starting functions again
        chooseWord()
        $(this).remove()
    })
}
$('.reset').on('click', function () {
    $(this).addClass("animated pulse")
    location.reload()
})
$('#play').on('ended', function () {
    loseFunc()
})
var checkFunc = function () {
    $('.hidden div').each(function () {
        if ($(this).text() === guessLet) {      //Checking for a match
            $(this).css('color', '#05a8b7').addClass("animated flipInX")    //changes color to unhide and animates letter
            guessGood++
            if (guessGood === wordInPlay.length) {  //checks match to word to call win function
                winFunc()
            }
        } else {
            guessBad++                                  //keeps count of incorrect guesses
            if (guessBad === wordInPlay.length) {
                badCounter++
                $('.center img').attr('src', `./images/hangman(${badCounter}).png`)

                if (badCounter > 7) {                  //eight incorrect calls lose function
                    loseFunc()
                }
            }
        }
    })
}