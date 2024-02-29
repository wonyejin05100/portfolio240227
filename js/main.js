$(function () {
    /* =============================================
        // ● 화살표 - 스크롤이 500px도달시 나타남
    ===============================================*/
    $(window).scroll(() => {
        // .scrollTop() - 세로 스크롤된 컨테니너의 위치 반환
        // 500보다 크지 않으면 fadeOut() - 사라짐
        if ($(this).scrollTop() > 500) {
            $(".btn_top").fadeIn(); // 나타남
        } else {
            $(".btn_top").fadeOut(); // 사라짐
        }
    });
    /* =============================================
       // ● 로고와 화살표 버튼 클릭시 최상단 
    ===============================================*/

    $(".logo, .btn_top").click(() => {
        $("html,body").animate({
            scrollTop: 0
        }, 400);
    });
    /* =============================================
        // ● 스크롤 이동시 메뉴와 라인 색변경 
    ===============================================*/

    $(window).scroll(() => {
        const height = $(document).scrollTop();
        $(".header_main>ul>li").removeClass("active");
        if (height <= 1300) { // 0~1300px 사이일때 색나옴
            $(".header_main>ul>li:nth-child(1)").addClass("active");
        } else if (height <= 4500) { // 1301~4500px 사이일때 색나옴
            $(".header_main>ul>li:nth-child(2)").addClass("active");
        } else {
            // 4501px 이상일때 색나옴
            $(".header_main>ul>li:nth-child(3)").addClass("active");
        }
        // 최상단 왔을때 메뉴색 해제 
        if (height === 0) {
            $(".header_main>ul>li").removeClass("active");
        }
    });
    /* =============================================
        // ● 각 메뉴 클릭시 해당 위치로 이동  
    ===============================================*/
    // .slice(0, 3) - 앞 시작 인덱스 (0)->첫요소 / 뒤 - 갯수
    // .slice - 자바스크립트의 배열 메서드 
    // 0, 3 ( 0 부터 시작하여 3개 전까지의 요소만 선택 )
    $(".header_main>ul>li").slice(0, 3).on("click", function () {
        let targetPosition;
        if ($(this).index() === 0) { // 첫번째 li 클릭시
            // top 0에서 80px 내려온 위치를 뜻함 
            targetPosition = $("#skill").position().top - 80;
        } else if ($(this).index() === 1) { // 두번째 li 클릭시
            targetPosition = $("#portfolio").offset().top;
        } else if ($(this).index() === 2) { // 세번째 li 클릭시
            targetPosition = $("#etc").position().top - 40;
        }
        $("html,body").animate({
            scrollTop: targetPosition
        }, 400);
        $(".header_main>ul>li").removeClass("active");
        $(this).addClass("active");
    });

    /* ===============================================================
        // ● 썸네일 5가지 클릭시 배경과 이미지, 화살표 나타나고 사라짐
    =================================================================*/

    // (popupSelector) 매개변수인데, 함수 호출시 해당 요소들 페이드 인,아웃됨
    // 함수호출시 전달되는 값(페이드인아웃)을 받아들이고자 매개변수로 넣어줌
    const fadeInElements = (popupSelector) => $(`.bg,${popupSelector},${popupSelector}>button`).fadeIn();
    const fadeOutElements = (popupSelector) => $(`.bg,${popupSelector},${popupSelector}>button`).fadeOut(() => history.go(0));
    // i가 1~5까지 순회됨의 구조 만듬
    // 각 썸네일 이미지를 클릭했을 때 해당하는 팝업을 나타남
    for (let i = 1; i <= 5; i++) {
        $(`.etc_${i}`).on("click", () => fadeInElements(`.popup${i}`));
    }
    // 마우스 들어왔을때 버튼 나타나고 나갔을때 사라짐
    for (let i = 1; i <= 5; i++) {
        $(`.popup${i}`).mouseenter(() => $(`.popup${i}>button`).fadeIn());
        $(`.popup${i}`).mouseleave(() => $(`.popup${i}>button`).fadeOut());
    }
    // 팝업 클릭시 해당 팝업 사라짐
    for (let i = 1; i <= 5; i++) {
        $(`.popup${i}>.popList>.popImg`).on("click", () => fadeOutElements(`.popup${i}`));
    }
    // 배경클릭시사라짐 
    $(".bg").on("click", () => fadeOutElements(".popup"));


    /* =============================================================== 
        // ● 좌우 화살표 클릭시 슬라이드 이동됨 - 팝업슬라이드 (TweenMax) - 애니메이션 라이브러리
    ================================================================= */
    // 슬라이드 갯수 저장 변수
    let max = 0;

    // 현재 표시된 이미지 갯수 저장 변수
    let current = 0;

    // 슬라이드 컨테이너 저장 변수 
    let container;
    // 실행 중 동적으로 할당될 수 있으므로 초기값 주지 않음

    // current < 0 -> current 변수값이 0보다 작은지 확인
    // prev 함수 정의 - animate 함수 호출하여 이전 방향으로 애니메이션 수행
    let prev = () => (current = current < 0 ? max - 1 : current, animate("prev"));
    // next
    let next = () => (current = current > max - 1 ? 0 : current, animate("next"));
    // 슬라이드 제어 함수 
    // $direction 매개변수 - 방향 나타냄
    function animate($direction) {
        // 애니메이션 방향에 따라 이전 다음으로 변경
        if ($direction === "next") {
            // 다음 요소를 오른쪽으로 800픽셀 이동시키고, 마지막 요소를 첫번째 위치로 이동
            // [1] - 두번째 요소 선택 후 margin-left 800픽셀로 설정
            $(container.children()[1]).css('margin-left', '800px');
            // .append() - 마지막 자식에 새요소나 내용추가
            container.append(container.children()[0]);
            // 컨테이너에 첫번째 자식을 요소의 맨 뒤에 추가
            // 첫번째 요소에 애니메이션 줌
            // 0.8초동안 애니메이션 진행 
            // 애니메이션이 완료될때까지 왼쪽 여백을 0으로 이동
            // ease:Expo.easeOut - 애니메이션 이징 - 부드럽게 시작하고 끝냄
            // - 왼쪽으로 이동시키는 애니메이션 효과
            TweenMax.to(container.children()[0], 0.8, {
                marginLeft: 0,
                ease: Expo.easeOut
            });

        } else if ($direction === "prev") {
            // .prepend() - 첫번째 자식에 새로운 요소 추가
            container.prepend(container.children()[max - 1]);
            $(container.children()[0]).css('margin-left', '800px');
            TweenMax.to(container.children()[0], 0.8, {
                marginLeft: 0,
                ease: Expo.easeOut
            });
        }
    }

    // 이전 버튼 클릭 이벤트 핸들러 
    $('.popup>button.prev').on('click', function () {
        // 재할당시 앞에 let을 붙이지 않음
        container = $(this).parent('.popup').find('.popList');
        max = container.children().length;
        // pop 이미지 개수를 max 변수에 할당
        container.addClass('margin-left', '-800px').prepend(container.children()[max - 1]);
        prev(); // 함수호출
    });
    // 다음 버튼 클릭 이벤트 핸들러 

    $('.popup>button.next').on('click', function () {
        // 재할당시 앞에 let을 붙이지 않음
        container = $(this).parent('.popup').find('.popList');
        max = container.children().length;
        // pop 이미지 개수를 max 변수에 할당
        container.addClass('margin-left', '-800px').append(container.children()[0]);
        next(); // 함수호출
    });
    // .parent() - 부모선택 


    // TweenMax - HTML 요소의 속성을 변경하여 다양한 애니메이션 효과를 줌
    // TweenMax를 사용하면 요소의 위치, 크기, 회전, 투명도 등 다양한 속성을 애니메이션화 해줌

});