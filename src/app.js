import index from './css/index.less';
import base from './css/base.less';
import font from './css/fontColor.less';
import {a} from './untils/fn';
import {chunk} from 'lodash-es';
console.log(chunk[1,2,5,6,4,8,9],2);
a();
$("#lpf").css({fontSize:'200px',color:'#f00',fontWeight:'700'});
/*import ('./components/a').then(function(a){
    console.log(a);
});

var flag=false;
setInterval(function(){
    if(flag){
        index.unuse();
    }else{
        index.use();
    }
    flag=!flag;
},2000);*/
var box=document.getElementById('box');
box.innerHTML='<div class="'+base.box+'">sadf</div>';