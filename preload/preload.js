//图片预加载
(function ($) {

    function PreLoad(imgs, options) {  //imgs=图片数组， options=参数
        this.imgs = (typeof imgs === 'string') ? [imgs] : imgs;  //当只有一张图片时，把它看作数组
        //console.log(this); PreLoad
        this.opts = $.extend({}, PreLoad.defaults, options);
        //当有options时，就用options,没有的话就用默认参数,当options与PreLoad.faults有相同参数时，options会覆盖它
        if(this.opts.order === 'ordered'){
            this._ordered();
        } else {
            this._unordered();
        }
    }

    PreLoad.defaults = {
        order : 'unordered',  //默认无序加载
        each : null,  //每一张图片加载完毕后执行
        all : null //所有图片加载完毕后执行
    };

    PreLoad.prototype._ordered = function () {  //有序加载
        var imgs = this.imgs,
            opts = this.opts,
            count = 0,
            len = imgs.length;
        //console.log(this);  PreLoad {imgs: Array(9), opts: {order: "ordered", each: null, all: null}}}

        load();
        function load() {
            var imgObj = new Image();
            $(imgObj).on('load, error', function () {
                opts.each && opts.each(count);
                if(count >= len){
                    //所有图片加载完成
                    opts.all && opts.all();
                } else {
                    load();
                }
                count++;
            });
            imgObj.src = imgs[count];
        }
    }

    PreLoad.prototype._unordered = function () {  //无序加载
        var imgs = this.imgs,
            opts = this.opts,
            count = 0,
            len = imgs.length;

        $.each(imgs, function (i, src) {  //i=img索引， src=img中的src
            if(typeof src != 'string'){
                return;
            }
            var imgObj = new Image();
            $(imgObj).on('load error',function () {
                opts.each && opts.each(count);  //检查参数是否存在
                if (count >= len - 1){
                    opts.all && opts.all();
                }
                count++;
            });
            imgObj.src = src;
        });
    };

    $.extend({
        preLoad : function (imgs, opts) {
            new PreLoad(imgs, opts);
        }
    });
    
})(jQuery);
