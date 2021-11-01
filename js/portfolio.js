
$("document").ready(function(){

    var height=$(window).height(),
        count=0,
        wc=0,
        pos=0;

    var passup=false,
        passdown=false;

    var wwl=$(".wrap .web .web_wrap .mockup li").length-1;

    //BASIC OPTION
    passup=true;
    $(".wrap .web .web_wrap .txt li").eq(0).show();
    $(".wrap .web .web_wrap #link_guide li").eq(0).show();

    if($(window).width() >1280) { wideWindow(); }
    else { smallSize(); }
    //RESIZE EVENT

//모바일버전
function smallSize(){
  $('#selfie').hide();
  $('.mobile_bars').show();
  $('.sub_contact_wrapper').hide();
}
//인터넷 버전
function wideWindow(){
  $('#selfie').show();
  $('.mobile_bars').hide();
  $('.sub_contact_wrapper').show();
}
  $(window).resize(function(){
      height=$(this).height();
      $("html, body").stop().animate({
          scrollTop: height * count
      },1000)
      //햄버거 네비게이션
      if($(window).width() >1280) { wideWindow(); }
      else { smallSize(); }

  })
  //모바일 네비바 클릭 시
  $('.mobile_bars').click(function(){
    $('nav').slideToggle();
  });
  function scrollevent(pos){
    //ASIDE EVENT
    var current=(pos / (height * 5));
    bar_aside.animate(current);
    if(pos!=0){
        $("aside #bar_aside").addClass("op")
        $("aside .arrow").addClass("rotate")
    }else{
        $("aside #bar_aside").removeClass("op")
        $("aside .arrow").removeClass("rotate")
    }

    //NAV HIDE SHOW EVENT

  if(pos>=height){
    if($(window).width() >1280) {
          $("nav").fadeIn(500);
    }
  }else{
          $("nav").fadeOut(500);
  }
  }
    //WHEEL EVENT
    var wheeltime=false;

    //TOUCH SWIPE EVENT
    $("body").swipe({
        swipe: function(event, direction){
            if(direction=="up"||direction=="left"){
                if(count==2){
                    wc++;
                    if(wc>wwl) wc=wwl;

                    //WC OPTION
                    if(wc==0){
                        passup=true;
                    }else{
                        passup=false;
                    }
                    if(wc==wwl){
                        setTimeout(function(){
                            passdown=true;
                        },500)
                    }else{
                        passdown=false;
                    }
                    if(passdown==false) return;
                }
                count++;
                if(count>4) count=4;
            }else if(direction=="down"||direction=="right"){
                if(count==2){
                    wc--;
                    if(wc<0) wc=0;

                    //WC OPTION
                    if(wc==0){
                        setTimeout(function(){
                            passup=true;
                        },1000)
                    }else{
                        passup=false;
                    }
                    if(wc==wwl){
                        passdown=true;
                    }else{
                        passdown=false;
                    }
                    if(passup==false) return;
                }
                count--;
                if(count<0) count=0;
            }

            //wheel count 값에 따른 scrollTop 지정
            $("html, body").stop().animate({
                scrollTop: height * count
            },500)

            //NAV
            $("nav ol li").removeClass("pos").eq(count-1).addClass("pos")
        },
        excludedElements: $(".guide")
    });

    $(window).on("mousewheel DOMMousewheel",function(e){

      //pos값 제어
        var delta=e.originalEvent.wheelDelta;

        if(wheeltime==true){
            return;
        }
        setTimeout(function(){
            wheeltime=false;
        },500)
        wheeltime=true;

        //COUNT ++ --
        if(delta<0){
            count++;
            if(count>5) count=5;
        }else{
            count--;
            if(count<0) count=0;
        }

        //COUNT SCROLL
        $("html, body").stop().animate({
            scrollTop: height * count
        },500)

        //NAV
        $("nav ol li").removeClass("pos").eq(count-1).addClass("pos")
        //scrollEvent 실핸
        pos=height * (count);
        scrollevent(pos);
        //divevent 실행
        if(count==1) {
          typingStart();
          divEvent(1);
        }
        if(count==3) {
          slideLeft();
        }
        if(count==4){
          slideRight();
        }
    })



    //KEY EVENT
    var keytime=false;
    $(window).keydown(function(e){
        //13 : enter
        //27 : esc
        //37 : ←
        //38 : ↑
        //39 : →
        //40 : ↓
        //48~57 : left 0~9
        //96~105 : right 0~9
      if($(window).width() >1280) {
        if(keytime==true){
            return;
        }
        setTimeout(function(){
            keytime=false;
        },500)
        keytime=true;

        //COUNT ++ --
        if(e.keyCode==40||e.keyCode==39){

            count++;
            if(count>5) count=5;
        }
        if(e.keyCode==38||e.keyCode==37){

            count--;
            if(count<0) count=0;
        }

        //wheel count 값에 따른 scrollTop 지정
        $("html, body").stop().animate({
            scrollTop: height * count
        },1000)

        //NAV
        $("nav ol li").removeClass("pos").eq(count-1).addClass("pos")

        //scrollEvent 실핸
        console.log(count);
        pos=height * (count);
        scrollevent(pos);

        //GUIDE CLOSE
        if(e.keyCode==27){
            close_guide();
        }
        if(count==1) divEvent(1);
        if(count==3) {
          slideLeft();
        }
        if(count==4){
          slideRight();
        }
      }
    })

    //로딩화면 꾸미기
    $(document).ready(function() {
      $('body').on('scroll touchmove mousewheel', function(e) {
         e.preventDefault();
         e.stopPropagation();
         return false;
      });
      $('aside').hide();
      setTimeout(function() {
           $('body').off('scroll touchmove mousewheel');
           $(".loading_back").fadeOut();
           $('aside').show();
           /*
           $('div').removeClass('loading_back');*/
       }, 1000);
     });
     
})
