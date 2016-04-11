/**
 * this file will be loaded before server started
 * you can define global functions used in controllers, models, templates
 */

/**
 * use global.xxx to define global functions
 * 
 * global.fn1 = function(){
 *     
 * }
 */
 global.bluecmf = {
   /**
   *@path view下对应的模板路径,传入this返回当前模板目录对应的模板
   **/
 	tpl:function(path)
	   {  
	   	  var path=path;
	   	  if(typeof path ==="object")path=path.http.module+'/'+path.http.controller+'_'+path.http.action+'.html';; 
	      var tplpath=think.ROOT_PATH+'/view/'+path;
	      var rf=require("fs");  
	      var data=rf.readFileSync(tplpath,"utf-8"); 
	      console.log(think.controller.base);
	      return data;
	   },
	/**
    *创建表单
    **/
 	build_form:function(d)
	 	{
           let form='<form  class="form-validate form-horizontal" action="'+d.action||''+'" onSubmit="return blue.ajax_tform(this,function(d){blue.addreturn(d)});"  method="post" enctype="multipart/form-data">';
           if(d.item){
           	for(let i=0;i<d.item.length;i++){
           		let item=d.item[i];
                //input类型
                if(item.type==='input'){
                   let val=item.val?'<%='+item.val+'%>':'';
                   form=form+'<div class="input-group"><label class="label-txt">'+item.title+'</label><div class="label-content"><input name="'+item.name+'" type="text" readonly value="'+val+'" class="label-input" placeholder="'+item.tip+'" /></div></div>';
                }
                //通用html
                if(item.type==='html'){
                   let val=item.val||'';
                   form=form+val;
                }
                //textarea
                if(item.type==='textarea'){
                   let val=item.val?'<%='+item.val+'%>':'';
                   form=form+'<div class="input-group"><label class="label-txt">'+item.title+'</label><div class="label-content"><textarea placeholder="'+item.tip+'" rows="3" style="width:100%;" name="'+item.name+'">'+val+'</textarea></div></div>';
                }
                //ueditor
                if(item.type==='ueditor'){
                   let val=item.val?'<%='+item.val+'%>':'';
                   form=form+'<div class="input-group"><label class="label-txt">'+item.title+'</label><div class="label-content"><textarea placeholder="'+item.tip+'" rows="3" class="my_editor" style="width:100%;" name="'+item.name+'">'+val+'</textarea></div></div>';
                }

           	}
           }
           form=form+'<div class="form-actions"><input type="hidden" name="id" value="<{$list.id}>"><p><a class="btn02 btn">取消</a><button class="btn01 btn" type="submit">'+d.submit||'确定'+'</button></p></div></form>'
           return form;
	 	},
 }
