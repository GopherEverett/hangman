var playWord = ['dog', 'cat']
var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
        'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
        't', 'u', 'v', 'w', 'x', 'y', 'z'];
var buttons = function(){
    $('.buttons').append('<ul id="buttons"></ul>');
    for (var i = 0; i < alphabet.length; i++) {
    $('#buttons').append(`<li>${alphabet[i]}</li>`);
    }
}
