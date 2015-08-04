
/**
 * Created by durui on 2015/8/3.
 */


var Tween = {
    linear: function (t, b, c, d){  //匀速
        return c*t/d + b;
    },
    easeIn: function(t, b, c, d){  //加速曲线
        return c*(t/=d)*t + b;
    },
    easeOut: function(t, b, c, d){  //减速曲线
        return -c *(t/=d)*(t-2) + b;
    },
    easeBoth: function(t, b, c, d){  //加速减速曲线
        if ((t/=d/2) < 1) {
            return c/2*t*t + b;
        }
        return -c/2 * ((--t)*(t-2) - 1) + b;
    },
    easeInStrong: function(t, b, c, d){  //加加速曲线
        return c*(t/=d)*t*t*t + b;
    },
    easeOutStrong: function(t, b, c, d){  //减减速曲线
        return -c * ((t=t/d-1)*t*t*t - 1) + b;
    },
    easeBothStrong: function(t, b, c, d){  //加加速减减速曲线
        if ((t/=d/2) < 1) {
            return c/2*t*t*t*t + b;
        }
        return -c/2 * ((t-=2)*t*t*t - 2) + b;
    },
    elasticIn: function(t, b, c, d, a, p){  //正弦衰减曲线（弹动渐入）
        if (t === 0) {
            return b;
        }
        if ( (t /= d) == 1 ) {
            return b+c;
        }
        if (!p) {
            p=d*0.3;
        }
        if (!a || a < Math.abs(c)) {
            a = c;
            var s = p/4;
        } else {
            var s = p/(2*Math.PI) * Math.asin (c/a);
        }
        return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
    },
    elasticOut: function(t, b, c, d, a, p){    //正弦增强曲线（弹动渐出）
        if (t === 0) {
            return b;
        }
        if ( (t /= d) == 1 ) {
            return b+c;
        }
        if (!p) {
            p=d*0.3;
        }
        if (!a || a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else {
            var s = p/(2*Math.PI) * Math.asin (c/a);
        }
        return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
    },
    elasticBoth: function(t, b, c, d, a, p){
        if (t === 0) {
            return b;
        }
        if ( (t /= d/2) == 2 ) {
            return b+c;
        }
        if (!p) {
            p = d*(0.3*1.5);
        }
        if ( !a || a < Math.abs(c) ) {
            a = c;
            var s = p/4;
        }
        else {
            var s = p/(2*Math.PI) * Math.asin (c/a);
        }
        if (t < 1) {
            return - 0.5*(a*Math.pow(2,10*(t-=1)) *
                Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
        }
        return a*Math.pow(2,-10*(t-=1)) *
            Math.sin( (t*d-s)*(2*Math.PI)/p )*0.5 + c + b;
    },
    backIn: function(t, b, c, d, s){     //回退加速（回退渐入）
        if (typeof s == 'undefined') {
            s = 1.70158;
        }
        return c*(t/=d)*t*((s+1)*t - s) + b;
    },
    backOut: function(t, b, c, d, s){
        if (typeof s == 'undefined') {
            s = 3.70158;  //回缩的距离
        }
        return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
    },
    backBoth: function(t, b, c, d, s){
        if (typeof s == 'undefined') {
            s = 1.70158;
        }
        if ((t /= d/2 ) < 1) {
            return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
        }
        return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
    },
    bounceIn: function(t, b, c, d){    //弹球减振（弹球渐出）
        return c - Tween['bounceOut'](d-t, 0, c, d) + b;
    },
    bounceOut: function(t, b, c, d){
        if ((t/=d) < (1/2.75)) {
            return c*(7.5625*t*t) + b;
        } else if (t < (2/2.75)) {
            return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
        } else if (t < (2.5/2.75)) {
            return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
        }
        return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;
    },
    bounceBoth: function(t, b, c, d){
        if (t < d/2) {
            return Tween['bounceIn'](t*2, 0, c, d) * 0.5 + b;
        }
        return Tween['bounceOut'](t*2-d, 0, c, d) * 0.5 + c*0.5 + b;
    }
};




function now(){
    return (new Date()).getTime();
}


function Dancer(str){
    this.points={}
    this.pathinfo=[]
    this.path=[]
    this.svg=document.getElementById("svg")
    this.svg_ns=  'http://www.w3.org/2000/svg';
    this.config={
        stroke:"red",
        fill:"transparent",
        hello:"world"
    }

}
Dancer.prototype.addControlPoints=function(obj){
    this.points[obj.name]=obj.arr
}
Dancer.prototype.addControlPath=function(str,json){
    this.pathinfo.push(str)
    var p=document.createElementNS(this.svg_ns,'path')
    this.attr(p,json)
    this.path.push(p)
    this.svg.appendChild(p)
}

Dancer.prototype.stroke=function(){
    this.data=[]
    var This=this
    for(var i= 0;i<this.pathinfo.length;i++){
        var str=this.pathinfo[i]
        for(var key in this.points){
            var re=new RegExp('\\b'+key+'\\b','g')
            str=str.replace(re,function($0){
                return This.points[$0][0]+","+This.points[$0][1]
            })
        }
        this.data.push(str)
    }
    for(var i=0;i<this.path.length;i++){
        this.path[i].setAttribute("d",this.data[i])
    }
}
Dancer.prototype.deg=function(){
    for(var i= 0,g=document.getElementsByTagName("g");i< g.length;i++){
        var key=g[i].getElementsByTagName("text")[0].innerHTML
        var obj=this.points[key]
        attr(g[i],{
            transform:"translate("+obj[0]+","+obj[1]+")",
        })
    }

}
Dancer.test={
    points:function(){
        for(var key in this.points) {
            var g = document.createElementNS(this.svg_ns, 'g')
            attr(g, {
                transform: "translate(" + this.points[key][0] + "," + this.points[key][1] + ")",
                stroke: "red",
                fill: "white"
            })
            var circle = document.createElementNS(this.svg_ns, 'circle')
            attr(circle, {
                cx: 0,
                cy: 0,
                r: 8
            })
            g.appendChild(circle)
            var text = document.createElementNS(this.svg_ns, 'text')
            attr(text, {
                x: 0,
                y: 0,
                dx: 8,
                dy: -8
            })
            text.innerHTML = key
            g.appendChild(text)
            this.svg.appendChild(g)
        }
    },
    text:function(){
        var This=this
        var text=document.createElementNS(this.svg_ns,'text')
        attr(text,{
            stroke:"red",fill:"white",
            x:20,y:20,
            width:100,height:50
        })
        text.innerHTML="text"
        document.onmousemove=function(e){
            var left= e.clientX-This.svg.offsetLeft
            var top= e.clientY-This.svg.offsetTop
            attr(text,{
                x: left,
                y: top,
                dx:8,
                dy:8
            })
            text.innerHTML= left+","+ top
        }
        this.svg.appendChild(text)
    },
    create:function(){
        var div=document.createElement("div")
        div.setAttribute('id','test')

        div.innerHTML='\
                    <button id="reset" title="click and go to the first page">goStart</button><button id="append" title="click and go to the last page">goEnd</button><br>\ \
                  <button id="gonext" title="click and go to the last page">goNext</button><button id="golast" title="click and go to the last page">goLast</button><br>\
                  <button id="show" title="show you all page">Show</button><button id="save" title="save the current page and go to the next">Save</button><br>\
            <button id="out" title="click and output the dance arguments">out</button><textarea placeholder="dance arguments" id="danceVal"></textarea>\
            </div>'
        document.body.appendChild(div)
        div.style.width="230px"
        div.style.position="absolute"
        div.style.left=0
        div.style.top=0
        var style={
            height:"40px",
            width:"100px",
            verticalAlign:"middle"
        }
        for(var i= 0,ele=div.getElementsByTagName("*");i<ele.length;i++){
            for(var key in style){
                ele[i].style[key]=style[key]
            }
        }

        this.svg.onselectstart=function(){return false;}
    },
    curPage:function(){
        var This=this
        for(var i= 0,g=this.svg.getElementsByTagName('g');i< g.length;i++){
            g[i].index=i
            g[i].onmousedown=function(e){
                var t=this.getElementsByTagName("text")[0].innerHTML
                for(var i= 0,l=document.getElementsByTagName('line');i< l.length;i++){
                    if(l[i].hasAttribute("tag") && l[i].getAttribute("tag")==t){
                        This.svg.removeChild(l[i])
                        console.log(i)
                        break
                    }
                }
                var start=This.points[t]
                var l=document.createElementNS(This.svg_ns,'line')
                attr(l,{
                    x1:start[0],
                    y1:start[1],
                    x2:start[0],
                    y2:start[1],
                    stroke:"black",
                    tag:t
                })
                This.svg.appendChild(l)
                document.addEventListener("mousemove",move,false)
                document.addEventListener("mouseup",up,false)

                var x,y
                function move(e){
                    x= e.pageX,y= e.pageY
                    attr(l,{
                        x2:x,
                        y2:y
                    })
                }
                function up(e){
                    This.current[t]=[x,y]
                    document.removeEventListener("mousemove",move,false)
                    document.removeEventListener("mouseup",up,false)
                }
            }
        }
    },
    save:function(){
        var This=this
        var info={}
        for(var key in This.points){
            info[key]=This.points[key]
        }
        this.stack.push(info)
        document.getElementById("save").onclick=function() {
            var info={}
            for(var key in This.points){
                if(This.current[key]){
                    info[key]=This.current[key]
                }else{
                    info[key]=This.points[key]
                }
            }

            This.stack[++This.index]=info
            This.dance([This.current])
            var line = This.svg.getElementsByTagName("line")
            var len = This.svg.getElementsByTagName("line").length
            for (var i = 0; i < len; i++) {
                This.svg.removeChild(line[0])
            }
            This.pages[This.index-1]=This.current
            This.current={}
        }
    },

    backStart:function(){
        var This=this
        document.getElementById("reset").onclick=function(){
            var str=JSON.stringify(This.stack[0])
            This.points=JSON.parse(str)
            This.index=0
            This.stroke()
            This.deg()
        }
    },
    goEnd:function(){
        var This=this
        this.index=this.stack.length-1
        document.getElementById('append').onclick=function(){
            var str=JSON.stringify(This.stack[This.stack.length-1])
            This.points=JSON.parse(str)
            This.index=This.stack.length-1
            This.stroke()
            This.deg()
        }
    },
    show:function(){
        var This=this
        document.getElementById('show').onclick=function(){
            This.danceinfo=JSON.parse(JSON.stringify(This.pages))
            This.dance(This.danceinfo)
            This.index=This.stack.length-1
        }
    },
    golast:function(){
        var This=this
        document.getElementById("golast").onclick=function(){
            This.index=This.index-1
            if(This.index<0){
                This.index=0
            }
            var str=JSON.stringify(This.stack[ This.index])
            This.points=JSON.parse(str)
            This.stroke()
            This.deg()
        }
    },
    gonext:function(){
        var This=this
        document.getElementById("gonext").onclick=function(){
            This.index=This.index+1
            if(This.index>=This.stack.length){
                This.index=This.stack.length-1
            }
            var str=JSON.stringify(This.stack[ This.index])
            This.points=JSON.parse(str)
            This.stroke()
            This.deg()
        }
    },
    out:function(){
        var This=this
        document.getElementById("out").onclick=function(){
            document.getElementById("danceVal").value=JSON.stringify(This.pages)

        }
    }
}
Dancer.prototype.debugger=function(){
    var This=this
    this.debugs=true

    this.current={}      //当前帧对象
    this.pages=[]     //所有帧对象
    this.stack=[]
    this.index=0
    Dancer.test.points.call(This)   //让支点可见
    Dancer.test.text.call(This)   //让鼠标滑动时有数据
    Dancer.test.create.call(This) //创建调试按钮
    Dancer.test.curPage.call(This) //点击支点时弹出辅助线
    Dancer.test.save.call(This)
    Dancer.test.backStart.call(This)
    Dancer.test.goEnd.call(This)
    Dancer.test.golast.call(This)
    Dancer.test.gonext.call(This)
    Dancer.test.show.call(This)
    Dancer.test.out.call(This)
}




function attr(obj,json){
    for(var key in json){
        obj.setAttribute(key,json[key])
    }
}
Dancer.prototype.dance=function(json){
    startMove.call(this,json)
}
Dancer.prototype.attr=function(p,json){
    for(var key in json){
        this.config[key]=json[key]
    }
    for(var key in this.config){
        p.setAttribute(key,this.config[key])
    }
}
function ControlPoints(name,arr){
    this.name=name
    this.arr=arr
}
function startMove(json){
    var This=this,info=json.shift();
    if(info.constructor==Array){
        var to=info[0],times=info[1] || 500,fx=info[2] || "linear"
    }else{
        var to=info,times=500,fx="linear"
    }

    var from={}
    for(var key in to){
        from[key]=this.points[key]
    }
    var startTime=now()
    clearInterval(this.timer)
    this.timer=setInterval(function(){
        var changeTime=now();
        var t=times-Math.max(0,startTime-changeTime+times);
        for(var key in to){
            var a=Tween[fx](t,from[key][0],to[key][0]-from[key][0],times)
            var b=Tween[fx](t,from[key][1],to[key][1]-from[key][1],times)
            This.points[key]=[a,b]
            This.stroke()
        }
        if(This.debugs){
            This.deg()
        }
        if(t==times){
            clearInterval(This.timer)
            if(json.length){
                This.dance(json)
            }

        }
    },20)
}

