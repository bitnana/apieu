window.addEventListener('DOMContentLoaded',function(){

    //1.비주얼 
    //https://joshua-dev-story.blogspot.com/2020/11/javascript-css-scroll-animation.html
    
    //2.show up
    const header = document.querySelector('header');
    const showImg = document.querySelectorAll('.show, .first_txt span');
    let locaStart, locaEnd; 
    let start,end;
    
 console.log(window.innerWidth);
    //2. show up
    window.addEventListener('scroll',function(){

        locaStart = this.scrollY + this.innerHeight; 
        locaEnd = this.pageYOffset + 100; //????????????????? 
        
        showup(locaStart,locaEnd);

    });

    //2.show up
    function showup(a,b){
        for(let i=0; i<showImg.length;i++){

            start = showImg[i].offsetTop + (showImg[i].offsetHeight/5);
            end = showImg[i].offsetTop + (showImg[i].offsetHeight/5)*4;
            
            if(a >= start ){
                showImg[i].classList.remove('showdown');
                showImg[i].classList.add('showup');
            }
    
            if(b >= end){
                showImg[i].classList.remove('showup');
                showImg[i].classList.add('showdown');
            }else{
                showImg[i].classList.remove('showdown');
                showImg[i].classList.add('showup');
            }

            if(a < start){
                showImg[i].classList.remove('showup');
                showImg[i].classList.add('showdown');
            }
        }

    }
























}); //finish