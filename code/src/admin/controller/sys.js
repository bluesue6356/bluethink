'use strict';

import Base from './base.js';

export default class extends Base {
  /**
   * 系统配置
   */
  configAction(){
    if(this.isGet()){
      let data={};
      let WebInfo=this.config("bluecmf");console.log(typeof WebInfo);
      data.tpl=bluecmf.build_form(
      {
        action:'/admin/sys/config',
        submit:'确定',
        item:[
          {type:'input',name:'PRODUCT_NAME',title:"网站名称",val:'PRODUCT_NAME',tip:'请输入网站名称'},
          {type:'input',name:'PRODUCT_LOGO',title:"网站logo",val:'PRODUCT_LOGO',tip:'请输入网站logo'},
          {type:'input',name:'COMPANY_NAME',title:"公司名称",val:'COMPANY_NAME',tip:'请输入关公司名称'},
          {type:'textarea',name:'PRODUCT_INFO',val:'PRODUCT_INFO',title:"网站简介",tip:'请输入'},
          {type:'textarea',name:'COMPANY_INFO',val:'COMPANY_INFO',title:"公司简介",tip:'请输入'},
          {type:'textarea',name:'PRODUCT_KEYWORD',val:'PRODUCT_KEYWORD',title:"SEO关键字",tip:'请输入'},
        ],
      });
      data.d=WebInfo;
      data.type=null;
      this.success(data);
    }

  	
  }
}