'use strict';
let activeIntro = 1;

const classes = {
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

class Intro{
    config(options){
        this.nextText=options.nextText || 'Next';
        this.prevText=options.prevText || 'Previous';
        this.skipText=options.skipText || 'Skip';
        this.finishText=options.finishText || 'Finish';

        this.intros = options.intros || [];

        this.keyboardControl();
    }

    start(introIndex = 1){
        introIndex = introIndex-1 > this.intros.length-1 ? 0 : introIndex-1;
        activeIntro = introIndex+1;
        const intro = this.intros[introIndex];
        const appendedDOM = intro.element;
        this.createIntro(intro, appendedDOM, introIndex);
    }

    createIntro(intro, appendedDOM, itemIndex){
        if(!document.querySelector(`.${classes.box}`)){
            //Created Intro Box
            const introBoxDOM = document.createElement('div');
            introBoxDOM.classList.add(classes.box);
            introBoxDOM.classList.add(intro.position || 'top');
        
            //Intro Text Element
            const introTextDOM = document.createElement('div');
            introTextDOM.classList.add(classes.text);
            introTextDOM.innerHTML = intro.text || 'Text not found!';

            //Intro Pageing
            const introPageDOM = document.createElement('div');
            introPageDOM.classList.add(classes.list);
            const introPageText = document.createTextNode(`${(itemIndex+1)}/${this.intros.length}`);
            introPageDOM.appendChild(introPageText);
        
            //Intro Buttons Container
            const introButtonsContainerDOM = document.createElement('div');
            introButtonsContainerDOM.classList.add(classes.buttonsContainer);
                //Skip Button
                if(itemIndex!=this.intros.length-1){
                    const skipButtonDOM = document.createElement('button');
                    skipButtonDOM.classList.add(classes.button);
                    skipButtonDOM.classList.add(classes.buttons.skip);
                    skipButtonDOM.innerHTML = this.skipText;
                    skipButtonDOM.setAttribute('title', skipButtonDOM.textContent);
                    introButtonsContainerDOM.appendChild(skipButtonDOM);
                    skipButtonDOM.addEventListener('click', ()=>{
                        this.removeIntro();
                    });
                }

                //Previous Button
                if(itemIndex>0 && this.intros.length>1){
                    const prevButtonDOM = document.createElement('button');
                    prevButtonDOM.classList.add(classes.button);
                    prevButtonDOM.classList.add(classes.buttons.prev);
                    prevButtonDOM.innerHTML = this.prevText;
                    prevButtonDOM.setAttribute('title', prevButtonDOM.textContent);
                    introButtonsContainerDOM.appendChild(prevButtonDOM);

                    prevButtonDOM.addEventListener('click', ()=>{
                        this.removeIntroBox();
                        const index = --itemIndex;
                        activeIntro = itemIndex+1;
                        this.createIntro(this.intros[index], this.intros[index].element, index);
                    });
                }
    
                //Next Button
                if(itemIndex!=this.intros.length-1 && this.intros.length>1){
                    const nextButtonDOM = document.createElement('button');
                    nextButtonDOM.classList.add(classes.button);
                    nextButtonDOM.classList.add(classes.buttons.next);
                    nextButtonDOM.innerHTML = this.nextText;
                    nextButtonDOM.setAttribute('title', nextButtonDOM.textContent);
                    introButtonsContainerDOM.appendChild(nextButtonDOM);

                    nextButtonDOM.addEventListener('click', ()=>{
                        this.removeIntroBox();
                        const index = ++itemIndex;
                        activeIntro = itemIndex+1;
                        this.createIntro(this.intros[index], this.intros[index].element, index);
                    });
                }else{
                    const finishButtonDOM = document.createElement('button');
                    finishButtonDOM.classList.add(classes.button);
                    finishButtonDOM.classList.add(classes.buttons.finish);
                    finishButtonDOM.innerHTML = this.finishText;
                    finishButtonDOM.setAttribute('title', finishButtonDOM.textContent);
                    introButtonsContainerDOM.appendChild(finishButtonDOM);

                    finishButtonDOM.addEventListener('click', ()=>{
                        this.removeIntro();
                    });
                }
        
            introBoxDOM.appendChild(introTextDOM);
            introBoxDOM.appendChild(introPageDOM);
            introBoxDOM.appendChild(introButtonsContainerDOM);
        
            const appendedElem = document.querySelectorAll(appendedDOM)[0];
            appendedElem.appendChild(introBoxDOM);

            const position = appendedElem.getBoundingClientRect();
            this.setScroll(position.top);

        }else{
            this.removeIntroBox();
        }
    }

    removeIntroBox(){
        document.querySelector(`.${classes.box}`).parentNode.removeChild(document.querySelector(`.${classes.box}`));
    }

    removeIntro(){
        this.removeIntroBox();
        this.setScroll(0);
    }

    setScroll(value){
        let stepValue = Math.floor(value);
        window.scrollTo(0, stepValue);
    }

    keyboardControl(){
        const self = this;
        document.addEventListener('keyup', function(e) {
            if(!document.querySelector(`.${classes.box}`)) return false;
            var x = event.which || event.keyCode;
            if (x == 27) {  // 27 is the ESC key
                self.removeIntro();
            }

            if (x == 39) {  // 39 is the Right key
                self.intros.length<=activeIntro ? activeIntro=self.intros.length : ++activeIntro;
                
                if(self.intros.length>=activeIntro){
                    self.removeIntro();
                    self.start(activeIntro);
                }
            }

            if (x == 37) {  // 37 is the Left key
                activeIntro<=1 ? activeIntro=1 : --activeIntro;
                if(activeIntro>0){
                    self.removeIntro();
                    self.start(activeIntro);
                }
            }
        });
    }
}