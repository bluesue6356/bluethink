'use strict';

export default class extends think.controller.base {
  /**
   * index action
   * @return {Promise} []
   */
  indexAction(){
  	let userinfo=this.cookie();
  	this.assign("userinfo",userinfo);
    return this.display();
  }
  
}