/**
 * Created by Administrator on 2015/10/26.
 */
window.onload=function(){
    waterfall('main','box');
    var dataInt={"data":[{"src":'1.jpg'},{"src":'2.jpg'},{"src":'3.jpg'}]};
    window.onscroll=function(){
        if(checkScrollSlide){
            //数据块渲染
            //数据块读取，将图片加入网页中
            console.log('loading');
            var oParent=document.getElementById('main');
            var len=dataInt.data.length;
            console.log("len:"+len);
            for(var i=0;i<dataInt.data.length;i++){
                console.log('loading:img');
                //将图片塞到pic 的div 先塞到box的div
                var oBox=document.createElement('div');
                oBox.className='box';
                oParent.appendChild(oBox);
                var pic=document.createElement('div');
                pic.className='pic';
                oBox.appendChild(pic);
                var oImg=document.createElement('img');
                oImg.src="images/"+dataInt.data[i].src;
                pic.appendChild(oImg);
            }
            waterfall('main','box');
        }
    }
};
function waterfall(parent,box){
    var oParent=document.getElementById(parent);
    var oBox=getByClass(oParent,box);
    var oBoxw=oBox[0].offsetWidth;
    //获取列数
    var cols=Math.floor(document.activeElement.clientWidth/oBoxw);
    console.log(cols);
    //设置main的宽
    oParent.style.cssText='width:'+oBoxw*cols+'px;margin:0 auto;'
    //实现图片排序问题
    var hArr=[];
    for(var i=0;i<oBox.length;i++){
        if(i<cols){
            hArr.push(oBox[i].offsetHeight);//遍历oBox，并将oBox的高存入hArr数组
        }
        else{
            var minH=Math.min.apply(null,hArr);//对hArr数组求最小值
            var index=getMinhIndex(hArr,minH);
            //console.log(index);
            oBox[i].style.position='absolute';
            oBox[i].style.top=minH+'px';
            oBox[i].style.left=oBoxw*index+'px';
            hArr[index]+=oBox[i].offsetHeight;//关键，需要对数组重新进行修改，加进去的图片相当于高度增加
        }
    }
    console.log(hArr);
}
function getByClass(parent, clsName){
    var boxArr=new Array();
        var oElements=parent.getElementsByTagName('*');
    for(var i=0;i<oElements.length;i++){
        if(oElements[i].className==clsName){
            boxArr.push(oElements[i]);
        }
    }
    return boxArr;
}
function getMinhIndex(arr,val){
    for(var i in arr){
        if(arr[i]==val){
            return i;
        }
    }
}

function checkScrollSlide(){
    var oParent=document.getElementById('main');
    var oBox=getByClass(oParent,'box');
    var lastBoxH=oBoxs[oBox.length-1].offsetTop+Math.floor(oBox[oBox.length-1].offsetHeight/2);
    var scrollTop=document.body.scrollTop||document.documentElement.scrollTop;
    console.log(scrollTop);
    var height=document.body.clientHeight||document.documentElement.clientHeight;
    return (lastBoxH < scrollTop+height) ? true:false;
}
