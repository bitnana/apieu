window.addEventListener('DOMContentLoaded',function(){

    //1. 오른쪽만 스크롤
    const elLeft = document.querySelector('.left');
    const elRight = document.querySelector('.right');
    const elMain = document.querySelector('main');
    // let rightHei = elRight.scrollHeight; ??????문서높이가 안잡혀서 우선 2700으로
    console.log(window.innerHeight);

    window.addEventListener('scroll', function(){

        //현재창의 높이+스크롤이 움직인만큼이 오른쪽div보다 같거나 작으면 왼쪽 fixed
        if(this.innerHeight + this.scrollY <= 2700){
            elLeft.style = `position:fixed; top:0; left:0`;
        }else{
            elLeft.style = `display:static;`
            elMain.style = `align-items:flex-end;`
        }


    }); // scroll end


    //2. all insta youtube 정렬
    // function init(){

    //     fetch('js/insta_youtube.json')
    //     .then(res=> res.json() )
    //     .then( data => callback(data)  ); 

    //     function callback(data){

    //             console.log('success');
                
    //     }

    // }//init end
    // window.onload = init;

    const elSort = document.querySelectorAll('.select img'); //insta youtube all 
    const elList = document.querySelector('.select ul');  //하위메뉴
    const elSelector = document.querySelector('.select p');  //하위메뉴나오게하는버튼
    const elLeftBox =  document.querySelectorAll('.left > div'); //왼쪽 콘텐츠
    //여기서 포인트는 elSelector가 열려있어야 All 버튼을 클릭할수있어야한다.
    //하위메뉴 보려고 클릭했는데 all이 잡히면 불편할 수 있기 때문에

    let sortNum;
    elSelector.addEventListener('click',function(e){
        e.preventDefault;
        elList.classList.toggle('block');
    });

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


