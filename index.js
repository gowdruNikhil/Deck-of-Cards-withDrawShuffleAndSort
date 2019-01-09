var suits = ["hearts", "diams", "clubs", "spades"];
var ranks = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"];

var deck = [];

$(init);

function init() {
    makeDeck();

    $("#drawbtn").click(function () {

        var myCard = drawCard();

        if (myCard) {
            makeCard(myCard.suit, myCard.rank);
        } else {
            alert("no more cards in the deck");
        }

    });

}

function makeDeck() {

    deck = [];
    //for each type of suit
    for (var i = 0; i < suits.length; i++) {
        //and for each rank
        for (var j = 0; j < ranks.length; j++) {

            //make a card
            var card = {};
            card.suit = suits[i];
            card.rank = ranks[j];

            deck.push(card);

        }
    }
    console.log(deck.length);

    console.log("MADE A NEW DECK OF ", deck.length, " CARDS");
    console.log(deck);
}

function drawCard() {

    var card;

    if (deck.length > 0) {

        var randIndex = Math.floor(Math.random() * deck.length);
        card = deck.splice(randIndex, 1)[0];
    }

    return card;
}

function makeCard(suit, rank) {
    var card = $(".card.template").clone();

    card.removeClass("template");

    card.find(".rank").html(rank);
    card.find(".suit").html("&" + suit + ";");

    if (suit === "clubs" || suit === "spades") {
        //alert("hi");
        card.attr('id', rank);
    }

    if (suit === "hearts" || suit === "diams") {
        card.addClass("red");
        card.attr('id', rank);
    }

    $("#viewCards").append(card);

}

$("#shufflebtn").click(function () {

    var section = document.querySelector('section');
    for (var i = section.children.length; i >= 0; i--) {
        section.appendChild(section.children[Math.random() * i | 0]);
    }
})


$("#sortbtn").click(function () {
    // var list = document.querySelector('section');

    // var items = list.childNodes;


    // var itemsArr = [];
    // for (var i in items) {
    //     if (items[i].nodeType == 1) { // get rid of the whitespace text nodes
    //         itemsArr.push(items[i]);
    //     }
    // }

    // itemsArr.sort(function (a, b) {
    //     return a.innerHTML == b.innerHTML
    //         ? 0
    //         : (a.innerHTML > b.innerHTML ? 1 : -1);
    // });

    // for (i = 0; i < itemsArr.length; ++i) {
    //     list.appendChild(itemsArr[i]);
    // }

    var $sorted_items,
        getSorted = function (selector, attrName) {
            return $(
                $(selector).toArray().sort(function (a, b) {
                    var aVal = parseInt(a.getAttribute(attrName)),
                        bVal = parseInt(b.getAttribute(attrName));
                    return aVal - bVal;
                })
            );
        };

    $sorted_items = getSorted('#viewCards .card', 'id').clone();

    $('#viewCards').html($sorted_items);
})  
