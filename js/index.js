window.addEventListener('DOMContentLoaded',function(){

    //1.비주얼 
    //https://joshua-dev-story.blogspot.com/2020/11/javascript-css-scroll-animation.html
    $('.like img').offsetTop;
    console.log($('.like img').eq(1).offset().top);

    //2.show up
    const header = document.querySelector('header');
    const showImg = document.querySelectorAll('.show');
    let locaStart, locaEnd; 
    let start,end;
    
    //3. Youtube
    const elYoutube = document.querySelector('.adver iframe');
    const elYtimg = document.querySelector('.adver img');

    //4. slide
    const elSlide = document.querySelector('.slide');
    const elSlideImg = document.querySelectorAll('.slide img');
    const elPreNext = document.querySelectorAll('.prenext');
    const elPageNum = document.querySelector('.album p');
    let tagList='';

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

    //3. Youtube

    elYtimg.addEventListener('click',function(e){
        e.preventDefault();
        elYtimg.style = 'z-index:-1';
        elYoutube.src = "https://www.youtube.com/embed/0FbFBs8hS30?autoplay=1&controls=1&autohide=0&rel=0&wmode=transparent&showinfo=0&playsinline=1&allowScriptAccess=always&enablejsapi=1&origin=https%3A%2F%2Fwww.apieu.com&widgetid=1";

    });

    console.log(elYtimg.offsetHeight);

    // function onPlayerStateChange(event) {
    //     if (event.data == 0) {
    //       elYoutube.src = '';
    //       elYtimg.style = 'z-index:1';
    //     }
    //   }

    //4. slide

    function init(){
        
        fetch('js/slide.json')
        .then( res => res.json() )
        .then( data=>callback(data) );

        console.log('성공');
        function callback(data){
            console.log('성공');
        }
        
        // function callback(data){
        //     console.log('성공');
        //     data.slide.forEach(function(v,k){

        //         tagList +=`<img src="${v.src}" alt="${v.alt}">`;

        //     }); //slide foreach end

        //     elSlide.innerHTML = tagList;

        // } //callback end
    } //init end

    window.onload = init;

    let last = elSlideImg.length -1;
    let slideNum = elSlideImg[last].dataset.slide;

    for(let i=0; i <elPreNext.length; i++){
            elPreNext[i].addEventListener('click',function(e){
                e.preventDefault();
                
                slideInOut(i);
                elPageNum.textContent= `${elSlideImg.length-last}/${elSlideImg.length}`;
                
            }); //click end
    }
    


    function slideInOut(a){

        if(a == 0){ //pre

            
            last = last +1;
            if(last > elSlideImg.length -1){last = 0;}

            if(slideNum%2 != 0 ){ // 맨뒤(html에서 첫번째)에 있는 사진 숫자가 홀수
                elSlideImg.forEach(function(v,k){v.className = '';});
                elSlideImg[last].className = 'odd_in';
            }else{
                elSlideImg.forEach(function(v,k){v.className = '';});
                elSlideImg[last].className = 'even_in';
            }
            // elSlideImg[last].remove();
            // elSlide.append(elSlideImg[last]);
            return;

        }else if(a==1){ //next
            last = last -1;
            if(last < 0){last = elSlideImg.length -1;}
            
            if(slideNum%2 != 0 ){ // 맨앞(html에서 마지막)에 있는 사진 번호가 홀수
                elSlideImg.forEach(function(v,k){v.className = '';});
                elSlideImg[last].className = 'odd_out';
            }else{
                elSlideImg.forEach(function(v,k){v.className = '';});
                elSlideImg[last].className = 'even_out';
            }
            // elSlideImg[last].remove();
            // elSlide.prepend(elSlideImg[last]);
            
            return;
        }
    } 


























}); //finish