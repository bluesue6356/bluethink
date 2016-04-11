'use strict';

export default class extends think.controller.base {
  /**
   * index action
   * @return {Promise} []
   */
  *indexAction(){
  	let username=yield this.session("name");
  	this.assign("username",username||"未登陆");
  	//站点信息
	let WebInfo=this.config("bluecmf");
	this.assign("WebInfo",WebInfo);
    return this.display();
  }
  
}