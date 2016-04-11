'use strict';

import Base from './base.js';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  indexAction(){
  	let data={};
  	data.tpl=bluecmf.tpl(this);
  	data.d=
  	{
  		title:"标题",
  		name:"陈相文",
  		list:
  			[
  				{
  					url:"/admin",
  					ico:'<i class="fa fa-camera-retro fa-3x"></i>',
  					name:"系统管理"
  				},
  				{
  					url:"/admin",
  					ico:"<i class=\"fa fa-camera-retro fa-3x\"></i>",
  					name:"系统管理"
  				}
  			]
  	};
  	data.type=null;
  	this.success(data);
  }
}