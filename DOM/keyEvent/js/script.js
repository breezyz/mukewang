var datas = ['Phone5','Ipad','三星笔记本','佳能相机','惠普打印机','谢谢参与','50元充值卡','1000元超市购物券'],
    timer = null,
    falg = 0;
len = datas.length;

window.onload = function () {
    var play = document.getElementById('play'),
        stop= document.getElementById('stop');

    play.onclick = playFun;                // 开始抽奖
    stop.onclick = stopFun;

    document.onkeyup = function (e) {              // 键盘事件按下松开触发事件 keyCode=13是enter键
        e = e || window.event;
        if(e.keyCode == 13){
            if(falg == 0){   //第一，三.....次按enter
                playFun();
                falg = 1;
            } else {         //第二, 四....次按enter
                stopFun();
                falg = 0;
            }
        }
    }
}

function playFun() {
    var title = document.getElementById('title'),
        play = document.getElementById('play');
    clearInterval(timer);   //因为加快的点击play，它会越来越快，因为上一个运动还没有完成，开的定时器就多了，所以一开始要clearInterval
    timer = setInterval(function () {
        var index = Math.floor(Math.random() * len);  //一共8个索引为0-7 Math.random()生成0-1之间的随机数
        title.innerHTML = datas[index];
    }, 50);
    play.style.background = '#999';
}
function stopFun() {
    play = document.getElementById('play');
    clearInterval(timer);
    play.style.background = '#036';
}
//event对象的keyCode属性用于得到键盘对应键的键码值
//keyDown键盘任意键，如不放的话会重复触发此事件
//keyPress键盘上字符键，如不放的话会重复触发此事件
//keyUp释放键盘上的键