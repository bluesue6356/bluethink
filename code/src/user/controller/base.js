'use strict';

export default class extends think.controller.base {
  /**
   * some base method in here
   */
   __before()
   {
   	//检测登陆情况
   	let uid=this.cookie('uid');
   	if(!uid)
   	{   
   		this.fail(1001,"没有登陆或登陆超时");
   	}
   }

}