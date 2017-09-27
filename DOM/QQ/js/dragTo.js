function getClass(clsName, parent) {
    var oParent = parent ? document.getElementById(parent) : document;
    var eles = [],
        i = 0,
        elements = oParent.getElementsByTagName('*'),
        l = elements.length;
    for( ; i < l; i++){
        if(elements[i].className == clsName){
            eles.push(elements[i]);
        }
    }
    return eles;
}

window.onload = drag;

function drag() {
    var oTitle = getClass('login_logo_webqq', 'loginPanel')[0];        // 在标题区按下后，可拖曳改变位置
    oTitle.onmousedown = fnDown;

    var oClose = document.getElementById('ui_boxyClose');              // 关闭按钮
    oClose.onclick = function () {
        document.getElementById('loginPanel').style.display='none';
    }

    var loginState = document.getElementById('loginState'),              // 切换状态
        stateList = document.getElementById('loginStatePanel'),
        lis = stateList.getElementsByTagName('li'),
        stateTxt = document.getElementById('login2qq_state_txt'),
        loginStateShow = document.getElementById('loginStateShow')
    loginState.onclick = function (e) {
        e = e || window.event;
        if(e.stopPropagation){
            e.stopPropagation();
        } else {
            e.cancelBubble = true;
        }
        stateList.style.display = 'block';
    }

    for(var i = 0; i < lis.length; i++){     // 鼠标滑过、离开和点击状态列表时
        lis[i].onmouseover = function () {
            this.style.background = '#567';
        }
        lis[i].onmouseout = function () {
            this.style.background = '#fff';
        }
        lis[i].onclick = function (e) {
            e = e || window.event;
            if(e.stopPropagation){
                e.stopPropagation();
            } else {
                e.cancelBubble = true;
            }
            var id = this.id;
            stateList.style.display = 'none';
            stateTxt.innerHTML = getByClass('stateSelect_text',id)[0].innerHTML;
            loginStateShow.className = '';
            loginStateShow.className = 'login-state-show ' + id;

        }
    }

    document.onclick = function (e) {     //在页面任何位置上点击状态栏都会消失
        e = e || window.event;
        if(e.stopPropagation){
            e.stopPropagation();
        }
        stateList.style.display='none';
    }
}

function fnDown(e) {                       //drag时， 在标题区按下后
    e = e || window.event;
    var oDarg = document.getElementById('loginPanel'),
        ow = oDarg.offsetLeft,
        oh = oDarg.offsetTop,
        ew = e.clientX,
        eh = e.clientY,
        disX = ew - ow,                            //disX = 鼠标按下时的距离到qq面板左边的距离是一个固定值
        disY = eh - oh;

    document.onmousemove = function (e) {           //页面上移动,改变qq面板的位置
        e = e || window.event;
        fnMove(e, disX, disY);
    }
    document.onmouseup = function () {               //释放鼠标
        document.onmousemove = null;
        document.onmouseup = null;
    }
}

function fnMove(e, posX, posY) {                         //drag时， 在标题区按下后， 位置变化
    var oDrag=document.getElementById('loginPanel'),
        l = e.clientX - posX,                             //些时的e的位置已变， 得到的是一个qq面板的position值
        t = e.clientY - posY,
        winW = document.body.clientWidth || document.documentElement.clientWidth,
        winH = document.body.clientHeight || document.documentElement.clientHeight,
        maxW = winW - oDrag.offsetWidth - 10,              //关闭按钮占了些位置
        maxH = winH - oDrag.offsetHeight;
    console.log( winH);
    if( l < 0 ){
        l = 0;
    } else if(l > maxW) {
        l = maxW;
    }
    if (t < 0){
        t = 10;
    } else if(t > maxH){
        t = maxH
    }
    oDrag.style.left = l + 'px';
    oDrag.style.top = t + 'px';
}
