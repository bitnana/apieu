window.addEventListener('load',function(){

    //1. 오른쪽만 스크롤
    const elLeft = document.querySelector('.left');
    const elRight = document.querySelector('.right');
    const elMain = document.querySelector('main');
    const elImg = document.querySelectorAll('img');
    const elFooter = document.querySelector('footer');
    // let rightHei = elRight.scrollHeight; ??????문서높이가 안잡혀서 우선 2700으로
    var body = document.body,
        html = document.documentElement;

    let height, elRightHeight;

    //2. all insta youtube 정렬
    const elSort = document.querySelectorAll('.select img'); //insta youtube all 
    const elList = document.querySelector('.con1_rt .select ul');  //하위메뉴
    const elSelector = document.querySelector('.con1_rt .select p');  //하위메뉴나오게하는버튼
    const elLeftBox =  document.querySelectorAll('.left > div'); //왼쪽 콘텐츠
    let sortNum, classImg, classBox,alt,num, imgClass,boxClass;
    localStorage.sort = 'all';

    //반응형
    let m1023 = window.matchMedia("screen and (max-width: 1023px)");


    //1. 오른쪽만 스크롤
    elImg.forEach(function(im,k){
        im.onload = function(){
            // console.log(k)
            // console.log(elRight.offsetHeight, 'right offsetheight');  //????????얘도 이상함
            // console.log(window.innerHeight, 'window innerheight');  //이것도 갑이 이상항
            elRightHeight = elRight.offsetHeight;
            height = Math.max( body.scrollHeight, body.offsetHeight, 
                html.clientHeight, html.scrollHeight, html.offsetHeight );
        }        
    });
    window.addEventListener('scroll', function(){
        console.log(this.scrollY);
        //스크롤 내려갈때
        //현재창의 높이+스크롤이 움직인만큼 <= 오른쪽div Height
        if(this.innerHeight + this.scrollY <= elRightHeight){
            elLeft.style = `position:fixed; top:0; left:0`;
            
        }else{
            elLeft.style = `display:flex;`
            elMain.style = `align-items:flex-end;`
        }

        // 스크롤 올라갈때
        if( this.scrollY <= height-elFooter.offsetHeight-elLeft.offsetHeight ){
            elLeft.style = `position:fixed; top:0; left:0`;
        }

        if(m1023.matches){elLeft.style.position = 'relative';}

        

    }); // scroll end


    
    //2. all insta  youtube 정렬
    function vod(){

        fetch('js/insta_youtube.json')
        .then(res=> res.json() )
        .then( data => callback(data)  ); 

        function callback(data){

            //default all
            data.all.forEach(function(v,k){
                num = k+1;
                classNum = `.img${num}`;
                imgClass = document.querySelector(classNum);
                imgClass.src = v.src;
                imgClass.alt = v.name;

            }); //data foreach end

            for(let j=0; j<elSort.length; j++){
                elSort[j].addEventListener('click',function(e){
                    e.preventDefault();
                    
                    data[localStorage.sort].forEach(function(v,k){

                        num = k+1;
                        classImg = `.img${num}`;
                        classBox = `.img${num}_box`;
                        imgClass = document.querySelector(classImg);
                        boxClass = document.querySelector(classBox);
                        imgClass.src = '';
                        imgClass.alt = '';
                        boxClass.classList.add('none');
                    }); //data foreach end

                    alt = elSort[j].alt;
                    
                    data[alt].forEach(function(v,k){

                        num = k+1;
                        classImg = `.img${num}`;
                        classBox = `.img${num}_box`;
                        imgClass = document.querySelector(classImg);
                        boxClass = document.querySelector(classBox);
                        boxClass.classList.remove('none');
                        imgClass.src = v.src;
                        imgClass.alt = v.name;


                    }); //data foreach end

                    
                    localStorage.sort = alt;

                });//click end

            } // click for end

        }// callback end
        

    }//init end
    vod();

    // 2-1 select

    elSelector.addEventListener('click',function(e){
        e.preventDefault;
        if(!elList.classList.contains('block')){
            elList.classList.add('block');
        }else if(elList.classList.contains('block')){
            elList.classList.remove('block');
        }
        
    });

    for(let i=0; i<elSort.length; i++){
        
        elSort[i].addEventListener('click',function(){
            snsChange(i);
        }); //click end
    }
    //2. all insta youtube 정렬 함수
    function snsChange(a){
        if(elList.classList.contains('block')){

            elLeftBox.forEach(function(v,k){
                v.classList.remove('block');
            }); //foreach end

            sortNum = elSort[a].dataset.num;
            elLeftBox[sortNum].classList.add('block');
        }
        elList.classList.remove('block');
    }
    



}); //finish


