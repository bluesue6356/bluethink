/**
*初始化用户自动执行
*blue:546003877@qq.com
**/
function user_auto(){
  //刷新当前位置
  var durl=document.URL;
      durl=durl.split('#')[1]||'/admin/main';
      if(durl)
      	{
      		$.get
      		(
      			durl,function(d)
      			{
      				blue.myreturn(d);
      				blue.init();
      			}
      		)
      	}
	};
/**
*通用回调方法
*@ d {object} 为回调json数据
*d={errno:错误码，errmsg:错误信息，data:返回数据}
*blue:546003877@qq.com
**/
blue.myreturn=function(d)
{
    if(d.errno===0)
    {   
        var type=d.data.type||"load";
        if(type==="load")
        {
            var box=d.data.box||'#mainbox';
            var html = new EJS({text:d.data.tpl}).render(d.data.d);
            $(box).html(html);
        };
    }
    if(d.errno===1000)
    {
        blue.alert(d.errmsg,1);
    }
    //登陆超时
    if(d.errno===1001)
    {
        blue.load_mark
        (
        	'/admin/login',function()
        	{
        		$("#load_mark").unbind();
        	}
        );

    }
}
/**
*登录成功回调
*@ d {objict}为回调json数据
*d={errno:错误码，errmsg:错误信息，data:返回数据}
*blue:546003877@qq.com
**/
blue.login_ok=function(d)
{
    if(d.errno===0)
    {
       location.reload();
    }
    if(d.errno===1000)
    {
        blue.alert(d.errmsg,1);
    }
}

/*
渲染列表
@d 数组
@tpl 字符串
blue.list(数据，列表名，模板)；
如blue.list({list:[{a:'a',b:'b'},{a:'a',b:'b'}]},'list','{{a}}{{b}}');
author:blue 546003877
*/
blue.list = function (d, tplhtml) {
  var html = '';
  if (typeof d === 'object') $(d).each(function () {
    var _this = this;
    var tplhtmla = tplhtml;
    for (var n in _this) {
      var reg = eval('/\{' + n + '\}/g');
      tplhtmla = tplhtmla.replace(reg, _this[n]);
    };
    html = html + tplhtmla;
  });
  return html;
};

/**
*渲染模板
*@d js对象
*@box 渲染容器范围，默认#mainbox
*author:blue 546003877
**/
blue.full_tpl=function(d,box)
{
    var d=d||{};
    var box=box||"#mainbox";
    $(box).find("*[data-list]").each
        (
            function()
            {
                var dname=$(this).attr("data-list");
                var dobj=d[dname]||[];
                var tpl=$(this).html();
                $(this).html(blue.list(dobj,tpl));                
            }
        );
    var html=$(box).html();
    for (var n in d) 
    {
        if((typeof d[n])==="string")
            {
                var reg = eval('/\{' + n + '\}/g');
                html = html.replace(reg, d[n]);

            };
    };
    $(box).html(html);

}

blue.set_value=function(){
  //select设置默认
	for(i=0;i<$('select').size();i++){
		for(o=0;o<$('select:eq('+i+')').find('option').size();o++){
			if($('select:eq('+i+')').find('option:eq('+o+')').val()==$('select:eq('+i+')').attr('set_value')){
				$('select:eq('+i+')').find('option').removeAttr('selected');
				$('select:eq('+i+')').find('option:eq('+o+')').attr('selected',true);
				$('select:eq('+i+')').parent().find('p').text($('select:eq('+i+')').find('option:eq('+o+')').text());
				};
			};
		};
};
