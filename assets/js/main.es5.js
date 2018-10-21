'use strict';

var intro = new Intro();

intro.config({
    nextText: 'İleri <i class="fas fa-chevron-right"></i>',
    prevText: '<i class="fas fa-chevron-left"></i> Geri',
    skipText: 'Introyu Geç',
    finishText: 'Bitir <i class="fas fa-check"></i>',
    intros: [{
        element: '#first',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ac convallis nulla. Morbi ut metus fringilla, suscipit nisi sed, tempus mauris.',
        position: 'bottom'
    }, {
        element: '#second',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ac convallis nulla. Morbi ut metus fringilla, suscipit nisi sed, tempus mauris. Aenean viverra bibendum nunc et tristique. Curabitur quis enim odio. Praesent efficitur, neque sit amet lacinia lacinia, urna urna fermentum velit, id accumsan ligula ex sit amet enim.',
        position: 'left'
    }, {
        element: '#third',
        text: ' Sed vel sodales quam, nec consectetur massa.',
        position: 'right'
    }, {
        element: '#fourth',
        text: 'Aenean viverra bibendum nunc et tristique. Curabitur quis enim odio. Praesent efficitur, neque sit amet lacinia lacinia, urna urna fermentum velit, id accumsan ligula ex sit amet enim. Sed vel sodales quam, nec consectetur massa.',
        position: 'top'
    }]
});

document.querySelector('#intro-start').addEventListener('click', function () {
    intro.start();
});