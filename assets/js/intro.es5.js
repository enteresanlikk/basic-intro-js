'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var activeIntro = 1;

var classes = {
    box: 'intro-box',
    text: 'intro-text',
    list: 'intro-list',
    buttonsContainer: 'intro-buttons-container',
    button: 'intro-button',
    buttons: {
        skip: 'skip-button',
        next: 'next-button',
        prev: 'prev-button',
        finish: 'finish-button'
    }
};

var Intro = function () {
    function Intro() {
        _classCallCheck(this, Intro);
    }

    Intro.prototype.config = function config(options) {
        this.nextText = options.nextText || 'Next';
        this.prevText = options.prevText || 'Previous';
        this.skipText = options.skipText || 'Skip';
        this.finishText = options.finishText || 'Finish';

        this.intros = options.intros || [];

        this.keyboardControl();
    };

    Intro.prototype.start = function start() {
        var introIndex = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

        introIndex = introIndex - 1 > this.intros.length - 1 ? 0 : introIndex - 1;
        activeIntro = introIndex + 1;
        var intro = this.intros[introIndex];
        var appendedDOM = intro.element;
        this.createIntro(intro, appendedDOM, introIndex);
    };

    Intro.prototype.createIntro = function createIntro(intro, appendedDOM, itemIndex) {
        var _this = this;

        if (!document.querySelector('.' + classes.box)) {
            //Created Intro Box
            var introBoxDOM = document.createElement('div');
            introBoxDOM.classList.add(classes.box);
            introBoxDOM.classList.add(intro.position || 'top');

            //Intro Text Element
            var introTextDOM = document.createElement('div');
            introTextDOM.classList.add(classes.text);
            introTextDOM.innerHTML = intro.text || 'Text not found!';

            //Intro Pageing
            var introPageDOM = document.createElement('div');
            introPageDOM.classList.add(classes.list);
            var introPageText = document.createTextNode(itemIndex + 1 + '/' + this.intros.length);
            introPageDOM.appendChild(introPageText);

            //Intro Buttons Container
            var introButtonsContainerDOM = document.createElement('div');
            introButtonsContainerDOM.classList.add(classes.buttonsContainer);
            //Skip Button
            if (itemIndex != this.intros.length - 1) {
                var skipButtonDOM = document.createElement('button');
                skipButtonDOM.classList.add(classes.button);
                skipButtonDOM.classList.add(classes.buttons.skip);
                skipButtonDOM.innerHTML = this.skipText;
                skipButtonDOM.setAttribute('title', skipButtonDOM.textContent);
                introButtonsContainerDOM.appendChild(skipButtonDOM);
                skipButtonDOM.addEventListener('click', function () {
                    _this.removeIntro();
                });
            }

            //Previous Button
            if (itemIndex > 0 && this.intros.length > 1) {
                var prevButtonDOM = document.createElement('button');
                prevButtonDOM.classList.add(classes.button);
                prevButtonDOM.classList.add(classes.buttons.prev);
                prevButtonDOM.innerHTML = this.prevText;
                prevButtonDOM.setAttribute('title', prevButtonDOM.textContent);
                introButtonsContainerDOM.appendChild(prevButtonDOM);

                prevButtonDOM.addEventListener('click', function () {
                    _this.removeIntroBox();
                    var index = --itemIndex;
                    activeIntro = itemIndex + 1;
                    _this.createIntro(_this.intros[index], _this.intros[index].element, index);
                });
            }

            //Next Button
            if (itemIndex != this.intros.length - 1 && this.intros.length > 1) {
                var nextButtonDOM = document.createElement('button');
                nextButtonDOM.classList.add(classes.button);
                nextButtonDOM.classList.add(classes.buttons.next);
                nextButtonDOM.innerHTML = this.nextText;
                nextButtonDOM.setAttribute('title', nextButtonDOM.textContent);
                introButtonsContainerDOM.appendChild(nextButtonDOM);

                nextButtonDOM.addEventListener('click', function () {
                    _this.removeIntroBox();
                    var index = ++itemIndex;
                    activeIntro = itemIndex + 1;
                    _this.createIntro(_this.intros[index], _this.intros[index].element, index);
                });
            } else {
                var finishButtonDOM = document.createElement('button');
                finishButtonDOM.classList.add(classes.button);
                finishButtonDOM.classList.add(classes.buttons.finish);
                finishButtonDOM.innerHTML = this.finishText;
                finishButtonDOM.setAttribute('title', finishButtonDOM.textContent);
                introButtonsContainerDOM.appendChild(finishButtonDOM);

                finishButtonDOM.addEventListener('click', function () {
                    _this.removeIntro();
                });
            }

            introBoxDOM.appendChild(introTextDOM);
            introBoxDOM.appendChild(introPageDOM);
            introBoxDOM.appendChild(introButtonsContainerDOM);

            var appendedElem = document.querySelectorAll(appendedDOM)[0];
            appendedElem.appendChild(introBoxDOM);

            var position = appendedElem.getBoundingClientRect();
            this.setScroll(position.top);
        } else {
            this.removeIntroBox();
        }
    };

    Intro.prototype.removeIntroBox = function removeIntroBox() {
        document.querySelector('.' + classes.box).parentNode.removeChild(document.querySelector('.' + classes.box));
    };

    Intro.prototype.removeIntro = function removeIntro() {
        this.removeIntroBox();
        this.setScroll(0);
    };

    Intro.prototype.setScroll = function setScroll(value) {
        var stepValue = Math.floor(value);
        window.scrollTo(0, stepValue);
    };

    Intro.prototype.keyboardControl = function keyboardControl() {
        var self = this;
        document.addEventListener('keyup', function (e) {
            if (!document.querySelector('.' + classes.box)) return false;
            var x = event.which || event.keyCode;
            if (x == 27) {
                // 27 is the ESC key
                self.removeIntro();
            }

            if (x == 39) {
                // 39 is the Right key
                self.intros.length <= activeIntro ? activeIntro = self.intros.length : ++activeIntro;

                if (self.intros.length >= activeIntro) {
                    self.removeIntro();
                    self.start(activeIntro);
                }
            }

            if (x == 37) {
                // 37 is the Left key
                activeIntro <= 1 ? activeIntro = 1 : --activeIntro;
                if (activeIntro > 0) {
                    self.removeIntro();
                    self.start(activeIntro);
                }
            }
        });
    };

    return Intro;
}();