class Intro{
    config(options){
        this.nextText=options.nextText || 'Next';
        this.prevText=options.prevText || 'Previous';
        this.skipText=options.skipText || 'Skip';
        this.finishText=options.finishText || 'Finish';

        this.intros = options.intros || [];
    }

    start(introIndex = 1){
        introIndex = introIndex-1 > this.intros.length-1 ? 0 : introIndex-1;
        const intro = this.intros[introIndex];
        const appendedDOM = intro.element;
        this.createIntro(intro, appendedDOM, introIndex);
    }

    createIntro(intro, appendedDOM, itemIndex){
        if(!document.querySelector('.intro-box')){
            //Created Intro Box
            const introBoxDOM = document.createElement('div');
            introBoxDOM.classList.add('intro-box');
            introBoxDOM.classList.add(intro.position || 'top');
        
            //Intro Text Element
            const introTextDOM = document.createElement('div');
            introTextDOM.classList.add('intro-text');
            introTextDOM.innerHTML = intro.text || 'Text not found!';

            //Intro Pageing
            const introPageDOM = document.createElement('div');
            introPageDOM.classList.add('intro-list');
            const introPageText = document.createTextNode(`${(itemIndex+1)}/${this.intros.length}`);
            introPageDOM.appendChild(introPageText);
        
            //Intro Buttons Container
            const introButtonsContainerDOM = document.createElement('div');
            introButtonsContainerDOM.classList.add('intro-buttons-container');
                //Skip Button
                if(itemIndex!=this.intros.length-1){
                    const skipButtonDOM = document.createElement('button');
                    skipButtonDOM.classList.add('intro-button');
                    skipButtonDOM.classList.add('skip-button');
                    skipButtonDOM.innerHTML = this.skipText;
                    skipButtonDOM.setAttribute('title', skipButtonDOM.textContent);
                    introButtonsContainerDOM.appendChild(skipButtonDOM);
                    skipButtonDOM.addEventListener('click', ()=>{
                        introBoxDOM.remove();
                        this.setScroll(0);
                    });
                }

                //Previous Button
                if(itemIndex>0 && this.intros.length>1){
                    const prevButtonDOM = document.createElement('button');
                    prevButtonDOM.classList.add('intro-button');
                    prevButtonDOM.classList.add('prev-button');
                    // if(itemIndex<=0){
                    //     prevButtonDOM.setAttribute('disabled', 'disabled');
                    // }
                    prevButtonDOM.innerHTML = this.prevText;
                    prevButtonDOM.setAttribute('title', prevButtonDOM.textContent);
                    introButtonsContainerDOM.appendChild(prevButtonDOM);

                    prevButtonDOM.addEventListener('click', ()=>{
                        document.querySelector('.intro-box').remove();
                        const index = --itemIndex;
                        this.createIntro(this.intros[index], this.intros[index].element, index);
                    });
                }
    
                //Next Button
                if(itemIndex!=this.intros.length-1 && this.intros.length>1){
                    const nextButtonDOM = document.createElement('button');
                    nextButtonDOM.classList.add('intro-button');
                    nextButtonDOM.classList.add('next-button');
                    nextButtonDOM.innerHTML = this.nextText;
                    nextButtonDOM.setAttribute('title', nextButtonDOM.textContent);
                    introButtonsContainerDOM.appendChild(nextButtonDOM);

                    nextButtonDOM.addEventListener('click', ()=>{
                        document.querySelector('.intro-box').remove();
                        const index = ++itemIndex;
                        this.createIntro(this.intros[index], this.intros[index].element, index);
                    });
                }else{
                    const finishButtonDOM = document.createElement('button');
                    finishButtonDOM.classList.add('intro-button');
                    finishButtonDOM.classList.add('finish-button');
                    finishButtonDOM.innerHTML = this.finishText;
                    finishButtonDOM.setAttribute('title', finishButtonDOM.textContent);
                    introButtonsContainerDOM.appendChild(finishButtonDOM);

                    finishButtonDOM.addEventListener('click', ()=>{
                        introBoxDOM.remove();
                        this.setScroll(0);
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
            document.querySelector('.intro-box').remove();
        }
    }

    setScroll(value){
        let stepValue = Math.floor(value);
        window.scrollTo(0, stepValue);
    }
}