var wordList = ['gentrify', 'squid', 'synth', 'bespoke', 'banjo', 'selvage', 'mustache', 'keytar', 'organic'];
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
    $('#buttons').on('click', 'li', function (event) { //event listener on letters
        event.preventDefault()
        guessLet = $(this).text()
        guessBad = 0;
        $('.hidden div').each(function () {
            if ($(this).text() === guessLet) {      //Checking for a match
                $(this).css('color', '#05a8b7')         //changes color to unhide
                guessGood++
                if (guessGood === wordInPlay.length) {  //checks match to word to call win function
                    winFunc()
                }
            } else {
                guessBad++                                  //keeps count of incorrect guesses
                if (guessBad === wordInPlay.length) {
                    badCounter++
                    $('.center img').attr('src',`./images/hangman(${badCounter}).png`)
                    if (badCounter > 7) {                  //eight incorrect calls lose function
                        loseFunc()
                    }
                }

            }
        })
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
    score += 100
    $('.score div').replaceWith(`<div>${score}</div>`)
    $('.buttons ul').remove()
    $('h1').addClass('animated heartBeat')
    guessGood = 0;
    badCounter = 0;
    guessBad = 0;
    playAgain()
};
var loseFunc = function () {   //same as win function but displays loser and deprecates score
    $('h1').text("LOSER!")
    $('h1').addClass('animated bounceInDown')
    score -= 100
    $('.score div').replaceWith(`<div>${score}</div>`)
    $('.buttons ul').remove()
    $('.hidden div').css('color', 'black')
    guessGood = 0;
    badCounter = 0;
    guessBad = 0;
    playAgain()
}
$('#start div').on('click', function () {   //start button created with listener and calls two starting functions
    buttons()
    chooseWord()
    $(this).remove()

})
var playAgain = function () {                       // creates replay button with listener
    $('#start').append('<div>PLay Again</div>')
    $('#start div').on('click', function () {
        $('h1').text("HIPSTER HANGMAN")
        // $('.buttons ul').remove()
        $('.hidden div').remove()
        buttons()                                   //calls starting functions again
        chooseWord()
        $(this).remove()
    })
}
$('.reset').on('click', function () {
    location.reload()
})
// drinking vinegar deep v squid keffiyeh selvage master cleanse keytar mustache whatever meh 8-bit wayfarers DIY iPhone banjo typewriter post-ironic bespoke synth narwhal selfies Bushwick aesthetic viral authentic fingerstache blog sartorial bicycle rights Vice gentrify before they sold out +1 dreamcatcher put a bird on it hashtag next level biodiesel Shoreditch organic cliche Odd Future XOXO skateboard pug PBR salvia Portland gluten-free kale chips forage kogi flexitarian Wes Anderson Austin flannel trust fund polaroid ugh vegan you probably haven't heard of them chambray messenger bag tote bag heirloom fanny pack YOLO twee Echo Park Thundercats mumblecore High Life quinoa tofu cred art party church-key raw denim swag leggings Tumblr roof party brunch Truffaut retro stumptown 90's Pitchfork Schlitz sriracha Kickstarter umami seitan tousled Banksy try-hard VHS fixie four loko pop-up bitters pickled ethical Tonx food truck lomo PBR&B photo booth hella disrupt kitsch 3 wolf moon Blue Bottle semiotics plaid yr cornhole pork belly readymade crucifix cray fashion axe occupy fap distillery hoodie Marfa vinyl ennui paleo Carles scenester chia locavore jean shorts Brooklyn small batch craft beer meggings lo-fi butcher artisan actually literally farm-to-table sustainable Cosby sweater street art Williamsburg single-origin coffee Intelligentsia shabby chic beard direct trade  Pinterest tattooed chillwave slow-carb cardigan gastropub mixtape McSweeney's Godard asymmetrical irony Etsy letterpress mlkshk banh mi wolf Neutra normcore pour-over American Apparel freegan Helvetica