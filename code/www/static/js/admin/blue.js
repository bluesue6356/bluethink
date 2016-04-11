/* 
blue_UI js 陈相文 546003877;
本UI依托jquery;  
与后端约定返回json必选项为s,msg,url;
2015.4.17;
*/
$(document).ready(function (e) {
  user_auto(); //用户自定义执行
  blue.init(); //初始函数
});

var blue = {};
//初始化函数
blue.init = function () {
  $(document).unbind(); //解绑所有
  blue.add_ajax(); //ajax加载页面
  //blue.my_select();//重写select
  blue.my_radio(); //重写单选
  blue.menu(); //左侧菜单
  blue.mytitle(); //自定义标题
  //laydate.skin('molv');//日历控件的皮肤初始化，使用墨绿皮肤 
  //blue.upload_preview(); //上传图片并预览
  blue.ueditor(); //ueditor编辑器
};
//ajax提交表单
blue.ajax_tform = function (obj, callbak) {
  var data = $(obj).serialize();
  var url = $(obj).attr('action');
  callbak = callbak || function (d) {
    d = eval('(' + d + ')');
    if (d.s == 0) {
      if (d.msg != '' && d.url == '') {
        blue.alert(d.msg, d.s)
      };
      if (data.url != '') {
        blue.alert(d.msg, d.s, d.url);
      };
    } else {
      if (d.msg != '' && d.url == '') {
        blue.alert(d.msg, d.s)
      };
      if (d.url != '') {
        blue.alert(d.msg, d.s, d.url);
      };
    };
  };
  $.post(url, data, callbak);
  return false;
};
//ajax加载页面  to-url
blue.add_ajax = function () 
{
  $(document).unbind('click'); //解除绑定，防止重复绑定
  $(document).on('click', '*[data-ajax]', function (event) {
    //请求url
    var url = $(this).attr('href');
    //通用回调
    var callbak = function (d) {
      blue.myreturn(d);
      blue.init();
    };
    //load
    if ($(this).attr('data-ajax') == 'load')
     {
      var box = $(this).attr('data-box') || '#mainbox';
      $('*').unbind(); //解绑所有事件防止内存泄露
      $(box).html('<p style="padding:10px; font-size:13px; color:#666; text-align:center"><img src="/static/img/loading.gif"></p>');
      if (box == '#mainbox') {
        document.location.hash = url;
        $('body').data('box', 1);
      } else {
        document.location.hash = '';
        $('body').data('box', 0);
      };
      $.get(url,{box:box},callbak);
    };
    if ($(this).attr('data-ajax') == 'mark') {
      var size = {
        width: '500px',
        height: '250px',
        marginLeft: '-250px',
        marginTop: '-125px'
      };
      var h = $(this).attr('data-h');
      var w = $(this).attr('data-w');
      if (w) {
        size.width = w;
        size.marginLeft = '-' + parseInt(w) / 2 + 'px';
      };
      if (h) {
        size.height = h;
        size.marginTop = '-' + parseInt(h) / 2 + 'px';
      };
      blue.load_mark(url, function () {
        blue.init();
      }, size);
    };
    if ($(this).attr('data-ajax') == 'todo') {
      callbak = function (d) {
        if (d.s == 0) {
          blue.alert(d.msg, d.s);
          var box = d.box || '#mainbox';
          var type = d.type || 'load';
          console.log(box);
          if (type == 'mark') {
            blue.load_mark(url, function () {
              blue.init();
            }, {
              width: '600px',
              height: '300px',
              marginLeft: '-300px'
            });
          };
          $(box).empty().load(d.url, function () {
            blue.init();
          });
          //if(d.msg!=''&&d.url==''){blue.alert(d.msg,d.s)};
          //if(d.url!=''){
          //	blue.alert(d.msg,d.s,d.url);
          //	};
        } else {
          if (d.msg != '' && d.url == '') {
            blue.alert(d.msg, d.s)
          };
          if (d.url != '') {
            blue.alert(d.msg, d.s, d.url);
          };
        };
      };
      if ($(this).attr('data-confirm')) {
        blue.confirm($(this).attr('data-confirm'), function () {
          $.get(url, callbak, 'json');
        });
      } else {
        $.get(url, callbak, 'json');
      };
    };
    if ($(this).attr('data-ajax') == 'newboxload') {
      if ($('#t_theme_box')) {
        $('#t_theme_box').remove();
      };
      $.get(url, function (d) {
        var box = '#add_publicroad';
        if (box == '#add_publicroad') {
          d = '<div id="add_publicroad"><div class="main-content">' + d + '</div></div>';
        } else {
          d = '<div id="' + box.replace('#', '').replace('.', '') + '">' + d + '</div>';
        };
        $('body').append(d);
        $('#m').css('position', 'absolute').css('left', '0').css('top', '0');
        $(box).animate({
          right: '0'
        }, 'slow');
        $('#m').animate({
          left: '-150%'
        }, 'slow', function () {
          callbak();
        });
        $(box).find('.close').click(function () {
          $(box).animate({
            right: '-100%'
          }, 'slow');
          $('#m').animate({
            left: '0px'
          }, 'slow', function () {
            $('#m').css('position', '').css('left', '').css('top', '');
            $(box).remove();
          });
        });

      });
    };
    return false;
  });
};
//关闭newboxload
blue.newboxloadclose = function () {
  $('#add_publicroad').animate({
    right: '-100%'
  }, 'slow');
  $('#m').animate({
    left: '0px'
  }, 'slow', function () {
    $('#m').css('position', '').css('left', '').css('top', '');
    $('#add_publicroad').remove();
  });
};
//提示窗
blue.alert = function (e, f, url, type) {
  type = type || 'load';
  if (!document.getElementById('alert_box')) {
    $('body').append('<div id="alert_box"></div>')
  };
  $('#alert_box').text(e);
  $('#alert_box').css('margin-top', '-' + ($('#alert_box').height() / 2 + 25) + 'px');
  $('#alert_box').css('background', 'rgba(0,0,0,.6)');
  if (f == 0) {
    $('#alert_box').css('background', 'rgba(90,185,0,.6)');
  }
  if (f == 1) {
    $('#alert_box').css('background', 'rgba(185,0,0,.6)');
  }
  $('#alert_box').animate({
    top: '50%'
  });
  $('#alert_box').click(function () {
    $('#alert_box').animate({
      top: '-100%'
    }, function () {
      $('#alert_box').remove();
      if (url) {
        //document.location=url;
        $('#mainbox').load(url, function () {
          blue.init();
        });
      }
    });
  });
  setTimeout(function () {
    $('#alert_box').animate({
      top: '-100%'
    }, function () {
      $('#alert_box').remove();
      if (url) {
        if (type == 'load') {
          $('#mainbox').load(url, function () {
            blue.init();
          });
        } else {
          document.location = url;
        }
      }
    });
  }, 2000);
};
//选择提示框
blue.confirm = function (msg, callBack) {
  if (!document.getElementById('confirm_box')) {
    $('body').append('<div id="confirm_box"><div></div><p><button class="btn01">确认</button><button class="btn02"</p>取消</button></div>');
  };
  var toback = false;
  $('#confirm_box div').text(msg);
  $('#confirm_box').css('margin-top', '-' + ($('#alert_box').height() / 2 + 25) + 'px');
  $('#confirm_box').css('background', 'rgba(0,0,0,.6)');
  //if(f==0){$('#alert_box').css('background','rgba(90,185,0,.6)');};
  //if(f==1){$('#alert_box').css('background','rgba(185,0,0,.6)');};
  $('#confirm_box').animate({
    top: '50%'
  });
  $('#confirm_box button').click(function () {
    $('#confirm_box').animate({
      top: '-100%'
    }, function () {
      $('#confirm_box').remove();
    });
  });
  $('#confirm_box .btn01').click(function () {
    callBack()
  });
  $('#confirm_box .btn01').click(function () {
    toback = false;
  });
  return toback;
};
//载入web的遮罩层
blue.load_mark = function (url, bfunction, boxinfo) {
  if (!document.getElementById("load_mark_box")) {
    $("body").append('<div id="load_mark"></div><div id="load_mark_box"><p style="text-align:center; font-size:0.8em; color:#666; padding:25px;">载入中...</p></div>')
  };
  if (boxinfo) {
    $('#load_mark_box').css(boxinfo);
  };
  $("#load_mark").show();
  $("#load_mark_box").show();
  if (url) {
    $("#load_mark_box").load(url, function () {
      var t = '50%';
      $("#load_mark_box").animate({
        top: t
      }, function () {
        if (bfunction) bfunction();
      });

    });
  };
  $("#load_mark").click(function () {
    blue.load_mark_hide();
  });
};
//关闭web的遮罩层
blue.load_mark_hide = function () {
  $("#load_mark_box").animate({
      top: "-100%"
    },
    function () {
      $("#load_mark_box").remove();
      $("#load_mark").remove();
    });
};
//重写select
blue.my_select = function () {
  $('select').each(function () {
    var that = $(this);
    if (that.parent('.my-select').length != 0) {
      that.parent('div').find('p').html(that.find('option:selected').html());
      var odata = that.find('option');
      pdata = '';
      for (i = 0; i < odata.size(); i++) {
        pdata = pdata + '<li>' + odata.eq(i).text() + '</li>';
      };
      that.parent('div').find('ul').html(pdata);

    };
    if (that.parent('.my-select').length == 0) {
      var select_wrap = $('<div class="my-select"></div>');
      var $arrow = $('<i></i>');
      var $ul = $('<ul></ul>');
      var $li = '';
      that.wrap(select_wrap);
      var select_val = [];
      var i = 0;
      var len = that.find('option').length;
      for (i; i < len; i++) {
        select_val.push(that.find('option').eq(i).text());
        $li += ('<li>' + that.find('option').eq(i).text() + '</li>');
      };
      var $p = $('<p>' + select_val[0] + '</p>');
      that.parent('.my-select').append($p);
      that.parent('.my-select').append($arrow);
      that.parent('.my-select').append($ul);
      that.parent('.my-select').find('ul').append($li);
    } else {
      $('.my-select').off('click');
    };
    that.find('option').each(function () {
      if ($(this).attr('selected') == 'selected') {
        var now_select_txt = $(this).text();
        that.parent('.my-select').find('p').text(now_select_txt);
      };
    });
  });
  $('.my-select').on('click', function (event) {
    var _this = $(this);
    var ulList = _this.find('ul');
    var ul_li = ulList.find('li');
    var p_txt = _this.find('p')
    event.stopPropagation();
    ulList.slideToggle(100);
    if ($(this).css('zIndex') == 888) {
      $(this).css('zIndex', 999);
    } else {
      $(this).css('zIndex', 888);
    };
    ul_li.on('click', function () {
      var index = $(this).index();
      p_txt.text($(this).text());
      _this.find('option').removeAttr('selected').eq(index).prop('selected', 'selected');
      _this.find('select').trigger("change");
    });

  });
  $(document).on('click', function () {
    $('.my-select').find('ul').slideUp(100);
  });
};
//重写单选
blue.my_radio = function () {
  $('input[type="radio"]').each(function () {
    var that = $(this);
    var radio_name = that.attr('name');
    var radio_wrap = that.parent('.my-radio');
    if (radio_wrap.length == 0) {
      that.wrap('<div class="my-radio"></div>');
      radio_wrap = that.parent('.my-radio');
      radio_wrap.append('<i></i>');
    };
    if (that.prop('checked') == true) {
      $('input:radio[name=' + radio_name + ']').prop('checked', false).parent('.my-radio').removeClass('radio-on');
      that.prop('checked', true);
      radio_wrap.addClass('radio-on');
    };
    radio_wrap.parent('label').on('click', function () {
      if (that.prop('checked') == false) {
        var _this = radio_wrap;
        $('input:radio[name=' + radio_name + ']').prop('checked', false).parent('.my-radio').removeClass('radio-on');
        _this.addClass('radio-on').find('input[type="radio"]').prop('checked', true);
      }
    });
  });
};
//重写多选
blue.my_check = function () {
  $('input[type="checkbox"]').each(function () {
    var that = $(this);
    var check_name = that.attr('name');
    var check_wrap = that.parent('.my-check')
    if (check_wrap.length == 0) {
      that.wrap('<div class="my-check"></div>');
      check_wrap = that.parent('.my-check');
      check_wrap.append('<i></i>');
    };
    if (that.prop('checked') == true) {
      check_wrap.addClass('check-on');
    };
    check_wrap.on('click', function () {
      if (that.prop('checked') == false) {
        $(this).addClass('check-on');
        that.prop('checked', true);
      } else {
        $(this).removeClass('check-on');
        that.prop('checked', false);
      };
    });
  });
};
//多级联动
blue.selectld = function () {
  var next = $(e).attr('data-next');
  next = next.split(',');
  for (i = 0; i < next.length; i++) {
    $('#' + next[i]).hide('fast');
  };
  $.post($(e).attr('data-url'), {
    id: $(e).val()
  }, function (d) {
    if (data.statusCode == 0) {
      $('#' + next[0]).show('fast');
      $('#' + next[0]).find('select').html(d.data);
    } else {
      blue.alert(d.msg, d.s);
    };
  }, 'json');
};
//左侧菜单
blue.menu = function () {
  $('#sidebar dt').click(function () {
    var index = $('#sidebar dt').index(this);
    if ($(this).attr('class') == 'cur' && index != 0) return false;
    $('#sidebar dt').removeClass('cur');
    $(this).addClass('cur');
    if ($(this).parent('dl').has('dd')) {
      $('#sidebar dd').slideUp('slow');
      $(this).siblings('#sidebar dd').slideDown('slow');
    };
  });
};
//关闭打开左侧菜单
blue.full = function (e) {
  if ($(e).data('s') == 0) {
    $(e).find('i').removeClass('fa-compress').addClass('fa-expand');
    $('.mainbox').animate({
      marginLeft: '200px',
      marginRight: '0px'
    });
    $('#sidebar').animate({
      marginLeft: '0px'
    }, function () {
      $(e).data('s', 1);
      $(e).data('title', '点击关闭左侧菜单');
    });
  } else {
    $(e).find('i').removeClass('fa-expand').addClass('fa-compress');
    $('.mainbox').animate({
      marginLeft: 0,
      marginRight: 0
    });
    $('#sidebar').animate({
      marginLeft: '-200px'
    }, function () {
      $(e).data('s', 0);
      $(e).data('title', '点击打开左侧菜单');
    });
  };
};
//标题
blue.mytitle = function () {
  if (document.getElementById('title_info')) {
    $('#title_info').remove();
  };
  //显示title
  $('*[data-title]').hover(function () {
    $('#title_info').stop(true);
    var title = '<div id="title_info"><label></label><p>' + $(this).data('title') + '</p></div>';
    if (!document.getElementById('title_info')) {
      $('body').append(title);
    } else {
      $('#title_info p').text($(this).data('title'));
    };
    var w = Number($(this).width()) / 2;
    var l = Number($(this).offset().left) + (w - 65) + 'px';
    var t = Number($(this).offset().top) + Number($(this).height()) + 15 + 'px';
    $('#title_info').css({
      top: t
    }).animate({
      'opacity': 0.9
    });
    $('#title_info').css({
      left: l
    });
  }, function () {
    if (document.getElementById('title_info')) {
      $('#title_info').animate({
        opacity: 0
      }, function () {
        $('#title_info').remove();
      });
    };
  });
};
//载入初始url
blue.load_url = function (s_url) {
  var url = document.URL;
  url = url.split('#');
  var lurl = s_url;
  if (url.length == 2) {
    lurl = url[1];
  };
  $('body').data('box') == 0
  if (lurl != '') {
    $('#mainbox').html('<p style="padding:10px; font-size:13px; color:#666; text-align:center"><img src="/Public/img/admin/load.gif"></p>');
    $('#mainbox').load(lurl, function () {
      blue.init();

    });
  };
  if (lurl == '' && $('body').data('box') != 0) {
    $('#mainbox').html('<p style="padding:10px; font-size:13px; color:#666; text-align:center"><img src="/Public/img/admin/load.gif"></p>');
    $('#mainbox').load(s_url, function () {
      blue.init();
    });
  };
};
//图片上传预览
blue.upload_preview = function () {
  var pic_box = $('.upload-wrap');
  var up_action = pic_box.prev('input').attr('data-action');
  var up_form = '<form id="up-form" action="' + up_action + '" method="post" target="uploadframe" enctype="multipart/form-data" style="display:none"><input type="file" name="file" class="upload-input" /><input type="submit" /><iframe id="uploadframe" name="uploadframe"></iframe></form>'
  pic_box.each(function () {
    if ($(this).find('.show-upload-pic').length == 0) {
      $(this).append('<div class="show-upload-pic"></div>')
    }
  });
  /*如果有上传框并且页面中没有隐藏上传form,就生成一个*/
  if (pic_box.length > 0 && $('#up-form').length == 0) {
    $('body').append(up_form);
  }
  pic_box.unbind();
  pic_box.click(function () {
    $('#up-form').attr('no', $('body .upload-wrap').index(this));
    var now_action = $(this).prev('input').attr('data-action')
    $('#up-form').attr('action', now_action);

    $('.upload-input').click();
    $('.upload-input').change(function () {
      $('#up-form').submit();
      hqimgurl();
    })
  })

  function hqimgurl() {
    if (window.parent.frames["uploadframe"].document.body.innerHTML == '') {
      setTimeout(function () {
        hqimgurl();
      }, 200);
    } else {
      var d = eval('(' + window.parent.frames["uploadframe"].document.body.innerText + ')');
      if (d.s == 0) {
        $('.upload-wrap:eq(' + $('#up-form').attr('no') + ')').find('.show-upload-pic').empty();
        $('.upload-wrap:eq(' + $('#up-form').attr('no') + ')').find('.show-upload-pic').prepend('<img src="' + d.data + '" >');
        $('.upload-wrap:eq(' + $('#up-form').attr('no') + ')').prev('input').eq(0).val(d.data);
        if(d.name){
        	var name=d.name.replace('./Uploads/','').replace('.jpg','').replace('.JPG','');
        	$('input[name=xinghao]').val(name);
        	name=$('input[name=title]').val()+'-'+name;
        	$('input[name=title]').val(name);
        }
        $('.upload-wrap:eq(' + $('#up-form').attr('no') + ')').prev('input').eq(0).blur();
        window.parent.frames["uploadframe"].document.body.innerHTML = '';
      } else {
        alert(d.msg, d.s);
      }

    }
  }
};
//编辑器初始化ueditor
blue.ueditor = function () {
  ueditor_config();
  uedetor_init();
  var ue = [];
  var text = [];
  var name = [];
  var data = [];
  $('.my_editor').hide();
  for (i = 0; i < $('.my_editor').size(); i++) {
    text[i] = $('.my_editor:eq(' + i + ')').text();
    name[i] = $('.my_editor:eq(' + i + ')').attr('name');
    data[i] = '<scr' + 'ipt id="' + name[i] + '" type="text/plain" style="width:800px;height:500px;">' + text[i] + '<' + '/sc' + 'ript><div style="clear:both"></div>';
    if ($('.my_editor:eq(' + i + ')').parent('div').html().indexOf('<div style="clear:both"></div>') == -1) {
      $('.my_editor:eq(' + i + ')').parent('div').append(data[i]);
    };
    ue[i] = UE.getEditor(name[i]);
    ue[i].no = i;
    ue[i].addListener('blur', function (i) {
      var arr = [];
      arr.push(this.getContent());
      $('.my_editor:eq(' + this.no + ')').text(arr.join("\n"));
    });
    ue[i].addListener('focus', function () {});
  };
};

//公用的添加后回调函数，用于返回列表页
blue.myreturn = function (d) {
    if (d.s == 0) {
      // blue.alert(d.msg,d.s,d.url,'blank')
      document.location = d.url;
      //$('#mainbox').empty().load(d.url,function(){blue.init();})
    } else {
      blue.alert(d.msg, d.s, d.url);
    }
  }
  //公用的添加后回调函数，用于返回列表页
blue.addreturn = function (d) {
  if (d.s == 0 || d == 0) {
    blue.alert(d.msg, d.s);
    var box = d.box || '#mainbox';
    var type = d.type || 'load';
    if (type == 'mark') {
      blue.load_mark_hide();
    };
    $(box).empty().load(d.url, function () {
      blue.init();
    });
  } else {
    blue.alert(d.msg, d.s);
  };
  return false;
};
//删除回调函数
blue.del_back = function (d) {
  d = blue.backtojson(d);
  my_alert(d.msg, d.s);
  if (d.s == 0) {
    update_public(); //刷新公众号  
    $('#mainbox').load(d.url, function () {
      doAll();
    });
  };
};
//批量删除
blue.del_all = function (e) {
  var fun = $(e).attr('data-function') || 0;
  if ($('.check-this:checked').length == 0) {
    blue.alert('请至少选择一项', 1);
    return false;
  } else {
    blue.confirm('确定删除所选项吗?', function () {
      var $to_be_del = $('.check-this:checked');
      var i = 0;
      var len = $to_be_del.length;
      var id_list = '';
      var url = $(e).attr('data-href');
      for (i; i < len; i++) {
        id_list += $to_be_del.eq(i).attr('data-id') + ','
      };
      id_list = id_list.substring(0, id_list.length - 1);
      console.log(id_list);
      $.post(url, {
        id: id_list
      }, function (d) {
        if (d.s == 0 || d == 0) {
          blue.alert(d.msg, d.s);
          var box = d.box || '#mainbox';
          var type = d.type || 'load';
          if (type == 'mark') {
            blue.load_mark_hide();
          };
          $(box).empty().load(d.url, function () {
            blue.init();
          });
        } else {
          blue.alert(d.msg, d.s);
        };
      });
    });
  };
};

//list


