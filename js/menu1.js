window.addEventListener('DOMContentLoaded',function(){

    //1. 오른쪽만 스크롤
    const elLeft = document.querySelector('.left');
    const elRight = document.querySelector('.right');
    const elMain = document.querySelector('main');
    const elFoot = document.querySelector('footer');
    // let rightHei = elRight.scrollHeight; ??????문서높이가 안잡혀서 우선 2700으로
    var body = document.body,
        html = document.documentElement;

    var height = Math.max( body.scrollHeight, body.offsetHeight, 
                html.clientHeight, html.scrollHeight, html.offsetHeight );

    console.log(height);  //????????얘도 이상함
    console.log(window.innerHeight);  //이것도 갑이 이상항
    console.log(elFoot.offsetHeight); //???????????푸터 높이 안구해짐

    window.addEventListener('scroll', function(){
        
        //스크롤 내려갈때
        //현재창의 높이+스크롤이 움직인만큼 <= 오른쪽div Height
        if(this.innerHeight + this.scrollY <= 2700){
            elLeft.style = `position:fixed; top:0; left:0`;
        }else{
            elLeft.style = `display:static;`
            elMain.style = `align-items:flex-end;`
        }

        //스크롤 올라갈때
        // if( this.scrollY <= 전체document높이-footer높이-elLeft높이 ){
        //     elLeft.style = `position:fixed; top:0; left:0`;
        // }

    }); // scroll end


    //2. all insta youtube 정렬
    const elSort = document.querySelectorAll('.select img'); //insta youtube all 
    const elList = document.querySelector('.select ul');  //하위메뉴
    const elSelector = document.querySelector('.select p');  //하위메뉴나오게하는버튼
    const elLeftBox =  document.querySelectorAll('.left > div'); //왼쪽 콘텐츠
    let sortNum, classNum,alt,num, imgClass;

    function vod(){

        fetch('js/insta_youtube.json')
        .then(res=> res.json() )
        .then( data => callback(data)  ); 

        function callback(data){

            for(let j=0; j<elSort.length; j++){
                elSort[j].addEventListener('click',function(e){
                    e.preventDefault();
                    alt = elSort[j].alt;
                    
                    data[alt].forEach(function(v,k){

                        num = k+1;
                        classNum = `.img${num}`;
                        imgClass = document.querySelector(classNum);
                        console.log(imgClass);
                        imgClass.src = v.src;
                        imgClass.alt = v.name;


                    }); //data foreach end

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

    console.log(elSort);
    for(let i=0; i<elSort.length; i++){
        
        elSort[i].addEventListener('click',function(){

            if(elList.classList.contains('block')){

                elLeftBox.forEach(function(v,k){
                    v.classList.remove('block');
                }); //foreach end

                sortNum = elSort[i].dataset.num;
                elLeftBox[sortNum].classList.add('block');
            }
            elList.classList.remove('block');
        }); //click end
    }

        
    



}); //finish


