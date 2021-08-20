window.addEventListener('DOMContentLoaded',function(){

                                 

                                
    //1.비주얼 
    //https://joshua-dev-story.blogspot.com/2020/11/javascript-css-scroll-animation.html
    const elIndi = document.querySelectorAll('.indi span');
    const visuScreen = document.querySelector('.visual');
    const visuBox = document.querySelector('.visu_box');

    console.log(visuScreen.offsetWidth, 'visuscreen offsetwidfth'); 
    let visuScrnWid = visuScreen.offsetWidth;
    let x=0;

    //2.show up 
    const header = document.querySelector('header');
    let showImg = document.querySelectorAll('.show');
    const elLikeAward = document.querySelectorAll('.award, .like');
    
    //2. show up우선 기본적으로 해보기
    const imgSpan = document.querySelectorAll('.first_txt span');
    console.log(imgSpan);
    let papaHei,paHei,spanHei, totalHei,papa;
        // console.log(imgSpan[1].parentElement.parentElement.parentElement.parentElement.offsetTop);
        // console.log(imgSpan[1].parentElement.offsetTop);
        // console.log(imgSpan[1].offsetTop);
    let locaStart, locaEnd; 
    let start,end;
    
    //4. slide
    const elSlide = document.querySelector('.slide');
    const elSlideImg = document.querySelectorAll('.slide img');
    const elPreNext = document.querySelectorAll('.prenext');
    const elPageNum = document.querySelector('.album p');
    // const elYoutube = document.querySelector('#player1');
    const elYtimg = document.querySelector('.adver img');
    let tagList='';
    let numFront = elSlideImg.length-1 ;
    let numBack = 0;
    let slideNum; //odd inout even inout 클래스 주기위한 dataset.slide 값
    let whatNum;
    


    //1.비주얼 모바일
    for(let i=0; i<elIndi.length; i++){
        elIndi[i].addEventListener('click',function(){
            bgNone();  //indigator 배경색 없애기
            elIndi[i].style.background = '#6d635f';
            x = -(visuScrnWid*i);
            visuBox.style.transform =` translate(${x}px,0)`;
        }); // click end
    }

    //2. show up
    window.addEventListener('scroll',function(){

        locaStart = this.scrollY + this.innerHeight; 
        locaEnd = this.pageYOffset + 100; //????????????????? 
        
        showup(locaStart,locaEnd);

    });

    //2. show up span
    window.addEventListener('scroll',function(){

        for(let i=0; i<imgSpan.length;i++){

            spanHei = imgSpan[i].offsetTop;
            paHei = imgSpan[i].parentElement.offsetTop;
            papaHei = imgSpan[i].parentElement.parentElement.parentElement.parentElement.offsetTop;
            totalHei = spanHei + paHei + papaHei;  //y좌표
            papa = imgSpan[i].parentElement.parentElement.parentElement.parentElement;


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
    for(let i=0; i<elLikeAward.length; i++){}
     
    //4. 슬라이드
    for(let i=0; i <elPreNext.length; i++){
        elPreNext[i].addEventListener('click',function(e){
            e.preventDefault();
            slideInOut(i);
                        
        }); //click end
    } //prenext for end               
 
    

    //1.비주얼 모바일 함수

    function bgNone(){  //배경색 없애기
        elIndi.forEach(function(v,k){
            v.style.background = 'none';
        });
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

    //4. slide 함수
    function slideInOut(a){

        if(a == 0){ //pre

            slideNum = elSlideImg[numBack].dataset.slide;
            
            if(slideNum%2 != 0 ){ // 맨뒤(html에서 첫번째)에 있는 사진 숫자가 홀수
                elSlideImg.forEach(function(v,k){v.className = '';});
                elSlideImg[numBack].className = 'odd_in';
                preChange();
            }else{
                elSlideImg.forEach(function(v,k){v.className = '';});
                elSlideImg[numBack].className = 'even_in';
                preChange();
            }
            
            // return;

        }else if(a==1){ //next
            
            slideNum = elSlideImg[numFront].dataset.slide;
            if(slideNum%2 != 0 ){ // 맨앞(html에서 마지막)에 있는 사진 번호가 홀수
                elSlideImg.forEach(function(v,k){v.className = '';});
                elSlideImg[numFront].className = 'odd_out';
                setTimeout(function(){
                    elSlideImg[numFront].classList.remove('odd_out');
                    nextChange();                   
                },500);
                
            }else{
                elSlideImg.forEach(function(v,k){v.className = '';});
                elSlideImg[numFront].className = 'even_out';
                setTimeout(function(){
                    elSlideImg[numFront].classList.remove('even_out');
                    nextChange();                   
                },500);
                
            }


            // return;
        }
    } 

    function preChange(){  //list 바꾸고 맨앞 맨뒤이미지 번호 바꾸기
        elSlide.append(elSlideImg[numBack]);
        numFront = numBack;
        numBack = numBack +1;
        if(numBack > elSlideImg.length -1){numBack = 0;numFront = elSlideImg.length -1; }
        elPageNum.textContent= `${elSlideImg.length-numFront}/${elSlideImg.length}`;

    }

    function nextChange(){
        elSlide.insertBefore(elSlideImg[numFront],elSlide.firstChild);
        numBack = numFront;
        numFront = numFront-1;
        if(numFront < 0){numFront = elSlideImg.length -1; numBack=0;}
        elPageNum.textContent= `${elSlideImg.length-numFront}/${elSlideImg.length}`; 
    }

        

    // 3. youtube
    elYtimg.addEventListener('click',function(e){
        e.preventDefault();
        elYtimg.style = 'z-index:-1';
        player.playVideo();
        player1.style = 'display:block';
    });

}); //finish


var elYtimg = document.querySelector('.adver img');
console.log(elYtimg);
//3. Youtube api 
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubeIframeAPIReady(){
   player = new YT.Player('player1', {
        height: '780',
        width: '440',
        videoId: '0FbFBs8hS30',
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    // event.target.playVideo();
  }
//안되는구나 ㅜㅠㅜㅜ
var done = false;
function onPlayerStateChange(){
    if(player.getPlayerState()==0){
        player1.style='display:none'; //왜지????왜안되지????
    } 
    
}

function stopVideo() {
 player.stopVideo();
}
