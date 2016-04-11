'use strict';

export default class extends think.controller.base {
  /**
   * 登录页
   *cxw:546003877
   */
  *indexAction()
  {
  	
    if(this.isGet())
    {   if(this.get('a')==='out')
        {
            this.cookie('uid',null);
            this.cookie('name',null);
            this.cookie('lasttime',null);
            this.cookie('lastip',null);
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
        console.log(user);
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
            this.cookie('uid',user.id);
            this.cookie('name',user.name);
            this.cookie('lasttime',user.lasttime);
            this.cookie('lastip',user.lastip);
            this.success('登录成功');
    		
    	}
    }
  }
}