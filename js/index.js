window.addEventListener('DOMContentLoaded',function(){

                                 

                                
    //1.비주얼 
    //https://joshua-dev-story.blogspot.com/2020/11/javascript-css-scroll-animation.html
    $('.like img').offsetTop;
    console.log($('.like img').eq(1).offset().top);

    //2.show up   (이)
    const header = document.querySelector('header');
    let showImg = document.querySelectorAll('.show');
    const elLikeAward = document.querySelectorAll('.award, .like');

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

    //2. show up우선 기본적으로 해보기
    const imgSpan = document.querySelectorAll('.first_txt span');
    let papaHei,paHei,spanHei, totalHei,papa;
    console.log(imgSpan[1].parentElement.parentElement.parentElement.parentElement.offsetTop);
    console.log(imgSpan[1].parentElement.offsetTop);
    console.log(imgSpan[1].offsetTop);
    
    //2. show up span
    window.addEventListener('scroll',function(){

        for(let i=0; i<imgSpan.length;i++){

            spanHei = imgSpan[i].offsetTop;
            paHei = imgSpan[i].parentElement.offsetTop;
            papaHei = imgSpan[i].parentElement.parentElement.parentElement.parentElement.offsetTop;
            totalHei = spanHei + paHei + papaHei;  //y좌표
            papa = imgSpan[0].parentElement.parentElement.parentElement.parentElement;


            if(window.innerHeight+window.scrollY >= totalHei +100){
                imgSpan[i].classList.add('showup');
            }
            if(papa.classList.contains('showdown')){
                imgSpan[i].classList.remove('showup');
            }   
      
            // if(window.scrollY >= totalHei -200 ){
            //     imgSpan[i].classList.remove('showup');
            //     imgSpan[i].classList.add('showup');
            // }
               


        }


    });
    //2. show up like&award
    for(let i=0; i<elLikeAward.length; i++){

        
    }
     
    //2.show up  함수
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
        onYouTubePlayerAPIReady();
        console.log(player);
    });

    // This code loads the IFrame Player API code asynchronously.
    let tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    let firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);    

    var player;

    function onYouTubePlayerAPIReady() {

        try {
            player = new YT.Player('player', {
                videoId : '0FbFBs8hS30',
                events: {
                    'onReady': onPlayerReady,
                    'onStateChange': onPlayerStateChange
                }
            });
        } catch (e) {}

    }

    function onPlayerReady(event) {
    	//유튜브 플레이어가 다 만들어지면 호출됨
    }

    function onPlayerStateChange(event) {
        if (event.data === 0) {
        	console.log('finish');
        }
    }





    





    //4. slide

    let last = elSlideImg.length-1;
    let slideNum;
    
    for(let i=0; i <elPreNext.length; i++){
        elPreNext[i].addEventListener('click',function(e){
            e.preventDefault();

            slideNum = elSlideImg[last].dataset.slide;
            slideInOut(i);
            
            
                        
        }); //click end
    } //prenext for end               
    
   

    //4. slide 함수
    function slideInOut(a){

        if(a == 0){ //pre
            elSlideImg[last].remove();
            elSlide.prepend(elSlideImg[last]);
            if(slideNum%2 != 0 ){ // 맨뒤(html에서 첫번째)에 있는 사진 숫자가 홀수
                elSlideImg.forEach(function(v,k){v.className = '';});
                elSlideImg[last].className = 'odd_in';
            }else{
                elSlideImg.forEach(function(v,k){v.className = '';});
                elSlideImg[last].className = 'even_in';
            }
            
            // elSlideImg[last].remove();
            // elSlide.prepend(elSlideImg[last]);
            // elSlide.insertBefore(elSlideImg[last],elSlideImg[1]);
            last = last +1;
            if(last > elSlideImg.length -1){last = 0;}
            elPageNum.textContent= `${elSlideImg.length-last}/${elSlideImg.length}`;

            return;

        }else if(a==1){ //next
            
            
            if(slideNum%2 != 0 ){ // 맨앞(html에서 마지막)에 있는 사진 번호가 홀수
                elSlideImg.forEach(function(v,k){v.className = '';});
                elSlideImg[last].className = 'odd_out';
            }else{
                elSlideImg.forEach(function(v,k){v.className = '';});
                elSlideImg[last].className = 'even_out';
            }
            elSlide.insertBefore(elSlideImg[last],null);
            last = last -1;
            if(last < 0){last = elSlideImg.length -1;}
            elPageNum.textContent= `${elSlideImg.length-last}/${elSlideImg.length}`;

            
            return;
        }
    } 


























}); //finish