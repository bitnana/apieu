$(function(){

    $('header').load('inc.html header > div',toggle);
    $('.roll_top').load('inc.html .roll_top > a',top);
    $('footer').load('inc.html footer > div');

    function toggle(){//header toggle

        //1. 헤더 하위메뉴 호출
        const elHeader = document.querySelector('header');
        const mainMenu = document.querySelectorAll('nav p');
        let subMenu;
        let conSub = document.querySelectorAll('.sub');
        
        //2. language
        const elLang = document.querySelector('.select');

        //3. search 
        const elSearch = document.querySelector('.search');
        const srchImg = document.querySelectorAll('.search img');
        const conSrch = document.querySelector('.con_srch');
        const recentLi = document.querySelectorAll('.recent_srch li');
        const allDele = document.querySelector('.recent_srch span');
        const bestSrch = document.querySelector('.best_srch ul');
        const body = document.querySelector('body');

        let tagList='';

        //4. 버거메뉴
        const elTri = document.querySelector('.trigger');
        const triSpan = document.querySelectorAll('.trigger span');
        const triMenu = document.querySelector('.tri_menu');
            //m1023
        const elTriMenu = document.querySelectorAll('.tri_menu p');
        const elLogo = document.querySelector('h2 img');
        const srchIcon = document.querySelector('.search img:nth-of-type(1)');
        const triSubMenu = document.querySelectorAll('.tri_menu ul');

        //5. roll top
        const rollTop = document.querySelector('.roll_top');
        var beforePosition = document.documentElement.scrollTop;

        //반응형
        let m1023 = window.matchMedia("screen and (max-width: 1023px)");

        
        // 1. 헤더 하위메뉴 호출

        for(let i=0; i<mainMenu.length; i++){
            mainMenu[i].addEventListener('mouseenter',function(){
                elHeader.classList.add('active');
            }); 
        }
        elHeader.addEventListener('mouseleave',function(){
            headerBg(500);
            if(m1023.matches){elHeader.classList.remove('active');}
        });

        conSub.forEach((sub)=>{
            sub.addEventListener('mouseenter',function(){
                this.classList.add('hover');
                elHeader.classList.add('active');
            });
            sub.addEventListener('mouseleave',function(){
                this.classList.remove('hover');
                headerBg(500);
            });
        });




        //2. langeuage
        elLang.addEventListener('click',function(e){
            e.preventDefault();
            if(elLang.children[1].classList.contains('none')){
                lang(`up`);
            }else{
                lang('down');
            }
        }); //새로고침하고 하면 처음한번은 클릭이 안되는데 왜그런걸까요????????????????????

        //3. search 토글버튼
        elSearch.addEventListener('click',function(e){
            e.preventDefault();
            srchToggle();   // 써치이미지 바꾸기, 바디active consrch.none
            searchHeader();  //헤더 배경바꾸기
        });



        //3. search 최근검색어 리스트 삭제  
        for(let i=0; i<recentLi.length; i++){
            recentLi[i].children[1].addEventListener('click',function(){
                recentLi[i].style.display = 'none';
            });
        }

        //3. search 최근검색어 전체삭제
        allDele.addEventListener('click',function(){
            for(let i=0; i<recentLi.length; i++){
                recentLi[i].style.display = 'none';
            }
        });  //(밑이랑 겹치는 함수가 있어서 중복)???????????????????

        //3. search 인기검색어
        function init(){
            fetch('js/best_srch.json')
            .then( res=> res.json() )
            .then( data=>callback(data) );

            function callback(data){
                
                data.best_srch.forEach(function(v,k){
                    
                    tagList +=
                                `<li>
                                <span>${v.number}</span>
                                <a href="#">${v.title}</a>
                                </li>`;

                }); 

                bestSrch.innerHTML = tagList;

            }//callback end

        }//init end

        window.onload = init;


        //4.버거메뉴 
        elTri.addEventListener('click',function(e){
            e.preventDefault();
            for(let i=0; i<triSpan.length; i++){
                triSpan[i].classList.toggle('active');
                if(m1023.matches){mTriggerHeader(i);}
                                    //모바일 트리거 헤더 변화
            }
            triMenu.classList.toggle('none');
            body.classList.toggle('active');
            
        });


        for(let i=0; i<elTriMenu.length; i++){
            triSubMenu[i].parentElement.addEventListener('click', function(){
                triSubMenu[i].classList.toggle('active');
                if(triSubMenu[i].classList.contains('active') ){
                    this.children[0].classList.add('on');
                }else{
                    this.children[0].classList.remove('on');
                }
            });
        }






        //5. roll top 생성 (scroll up & down)
        window.addEventListener('scroll',function(){

            var afterPosition = document.documentElement.scrollTop;


            // console.log(beforePosition, afterPosition);
            if(window.scrollY > 0){
                elHeader.style.background = '#fff';
                rollTop.classList.remove('none');
                if(m1023.matches){
                    if(afterPosition < beforePosition ){  //scroll up
                        elHeader.style.display = 'none';
                    }else{
                        elHeader.style.display = 'block';
                    }
                }
            }else{
                elHeader.style.background = 'transparent';
                rollTop.classList.add('none');
                if(m1023.matches){
                    elHeader.style.display = 'block';
                }

            }
            beforePosition= afterPosition;

        });

        //5. roll top 기능
        rollTop.addEventListener('click',function(e){
            e.preventDefault();
            window.scrollTo({top:0,behavior:'smooth'});
        });            


        

        
        //1. 헤더 하위메뉴 호출 함수
        function headerBg(a){  //header active(bg white);
            setTimeout(function(){elHeader.classList.remove('active');},a);
        }        

        //2. language 함수
        function lang(a){
            elLang.children[0].style.backgroundImage = `url('img/index/arrow_${a}.png')`;
            elLang.children[1].classList.toggle('none') ;
        }

        //3. search  토글 버튼
        function searchHeader(){
            if( srchImg[0].classList.contains('disapr') ){
                elHeader.style.background = '#fff';
            }else{
                elHeader.style.background = 'none';
            }
        }
        function srchToggle(){
            srchImg[0].classList.toggle('disapr');
            srchImg[1].classList.toggle('disapr');
            body.classList.toggle('active');
            conSrch.classList.toggle('none');
        }

        //4.버거메뉴
        function mTriggerHeader(a){
            if( triSpan[0].classList.contains('active') ){
                triSpan[a].style.background = '#ecbab6';
                elLogo.src = './img/index/logo_pink.png'
                srchIcon.src = './img/index/ico_search_pink.png'
                elLang.children[1].style.display  =  'flex'
                elHeader.style.background = '#6d635f';
                
            }else{
                triSpan[a].style.background = '#61544f';
                elLogo.src = 'img/index/logo.png'
                srchIcon.src = './img/index/ico_search.png'
                elLang.children[1].style.display  =  'none'
                elHeader.style.background = 'transparent';
            }
        }

        
        
    }

    function top(){  //top btn

        
    }


});

//참고용 forEach  사용법 
// conSub.forEach((sub)=>{
//     sub.classList.remove('active');
// });
// conSub[this.dataset.num].classList.add('active')