
/*资源库
* 资源库，包含id，资源库名称，资源库中所包含的实体或聚合跟的名称，以及资源库所能添加的行为
* 其中id为系统自行添加，资源库名称以及实例名称需要判断是否为空，所添加的行为不需要进行判断
* 资源库应该与相应的实例进行连线
* */
export function Repository(id,repositoryName,instanceName,addAction){
    this.id=id;
    this.name=repositoryName;
    this.instanceName=instanceName;
    this.addAction=addAction;
    this.in=[];
    this.out=[];
    //用于判别
    this.type='Repository';
    //用于输出该组件的错误信息
    this.attributeValidation=function(){
        var validationResult=new Array();
        if(repositoryName=='RepositoryName')
            validationResult.push("请输入资源库名称！")
        if(instanceName=='+aggregate : name（String）')
            validationResult.push("请输入资源库中包含实例的名称！")
        return validationResult;
    }
}


// const oclResult = OclEngine.create()
//     .addOclExpression(`
//      -- 资源库不能有其他构造型
//      context Repository inv:
//          self.base_Class.extension_Entity = null and
//          self.base_Class.extension_ValueObject = null and
//          self.base_Class.extension_DomainEvent = null and
//          self.base_Class.extension_AggregateRoot = null and
//          self.base_Class.extension_DomainService = null and
//          self.base_Class.extension_DomainEvent = null
//      -- 只为实体或聚合根提供资源库，out为资源库连接的对象数组
//      context Repository inv:
//          self.out->notEmpty() and
//          (self.out->exists(object | object.type = 'AggregateRoot') or
//          self.out->exists(object | object.type = 'Entity'))
//      -- 资源库只定义方法，且至少定义一个方法
//      context Repository inv:
//          self.operation->notEmpty()
//   `)
//     .evaluate(new Person());