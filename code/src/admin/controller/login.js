'use strict';

export default class extends think.controller.base {
  /**
   * 登录页
   *cxw:546003877
   */
  *indexAction()
  {
  	
    if(this.isGet())
    {   
        //站点信息
        let WebInfo=this.config("bluecmf");
        this.assign("WebInfo",WebInfo);
        if(this.get('a')==='out')
        {
            yield this.session();
        }
    	return this.display();
    }
    if(this.isPost())
    {
    	let model = this.model("admin_user");
    	let pwd=this.post('pwd');

    	let user = yield model.where
    	(
    	{
    		name:this.post('name'),
    		pwd:think.md5(pwd),
    		s:0,
    	}
    	).find();
    	if(think.isEmpty(user))
    	{   
            this.fail('用户名不存在密码错误或用户被禁用');
    	}else
    	{
            let affectedRows = yield model.where
            (
                {
                    name: this.post('name'),
                    pwd:think.md5(this.post('pwd')),
                }
            ).update
            (
                {
                    lasttime: Date.now(),
                    lastip:this.ip(),
                }
            );
            yield this.session("uid", user.id);
            yield this.session("name", user.name);
            yield this.session("lasttime", user.lasttime);
            yield this.session("lastip", user.lastip);
            
            this.success('登录成功');
    		
    	}
    }
  }
}