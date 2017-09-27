var eventUtil={
         	// 添加句柄
         	addHandler : function(element,type,handler){  //element=哪个元素 type=事件类型 handler=函数
               if (element.addEventListener) {
                 element.addEventListener(type,handler,false);
               }else if (element.attachEvent){
                 element.attachEvent('on'+type,handler);
               }else{
                 element['on'+type]=handler;
               }
         	},                                       //eventUtil.addHandler(btn3, 'click', showMes);

         	// 删除句柄
         	removeHandler : function(element,type,handler){
               if (element.removeEventListener){
                 element.removeEventListener(type,handler,false);
               }else if (element.detachEvent){
                 element.detachEvent('on'+type,handler);
               }else{
                 element['on'+type]=null;
               }
         	},

            getEvent : function(event){  //使用这个方法取得event对象
            return event ? event : window.event;
            },

            getType : function(event){   //返回事件类型
            return event.type;
            }

            getElement : function(event){  //返回事件目标
            return event.target || event.srcElement;
            },

            preventDefault : function(event){  //阻止事件的默认行为
                if(event.preventDefault){
                    event.preventDefault();
                }else{
                    event.returnValue = false;
                }
            },

            stopPropagation:function(event){  //阻止事件同冒泡
               if(event.stopPropagation){
                    event.stopPropagation();
               }else{
                    event.cancelBubble=true;
               }
            },

    //DOM通过relatedTarget属性提供了相关信息.只对mouseover和mpuseout才包含值
    //IE8及之前不支持它,
         getRelatedTarget: function (event) {
             if (event.relatedTarget){
                 return event.relatedTarget;
             }
             else if (event.toElement){  //mouseout事件触发时,IE的是toElement
                 return event.toElement;
             }
             else if (event.fromElement){  //mouseover事件触发时,IE的是fromElement
                 return event.fromElement;
             }
             else {
                 return null;
             }
         },

            getButton : function (event) {  // //获取mousedown或mouseup按下或释放的按钮是鼠标中的哪一个
                if(document.implementation.hasFeature("MouseEvents", "2.0")){
                    return event.button;
                }
                else {
                    switch(event.button){  //将IE模型下的button属性映射为DOM模型下的button属性
                        case 0;
                        case 1;
                        case 3;
                        case 5;
                        case 7;
                            return 0;  //按下的是鼠标主按钮（一般是左键）
                        case 2;
                        case 6;
                            return 2;  //按下的是中间的鼠标按钮
                        case 4
                            return 1;  //鼠标次按钮（一般是右键）
                    }
                }
            },

            getWheelDelta: function (event) { ////获取表示鼠标滚轮滚动方向的数值
                if (event.wheelDelta){
                    return (client.engine.opera && client.engine.opera < 9.5 ? -event.wheelDelta : event.wheelDelta);
                }
                else {
                    return -event.detial * 40   //fierfox
                }
            },

            getCharCode: function (event) {  //字符编码，charCode属性只发生在keypress中
                if(typeof event.charCode == "number"){
                    return event.charCode;
                }
                else {
                    return event.keyCode;
                }
            },


  }