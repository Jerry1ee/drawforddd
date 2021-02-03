/*工厂
*工厂中包含工厂组件id、工厂名称以及工厂所创建的实例的名称
*其中工厂名称以及工厂所创建的实例名称需要检验不能为空
* 工厂应该与所创建的实例相连接，工厂应该与实体（或聚合跟）是1对1的关系（但是应该不是硬性要求）
* */

export function Factory(id,factoryName,instanceName){
    this.id=id;
    this.factoryName=factoryName;
    this.instanceName=instanceName;
    //用于判别
    this.type='Factory';
    this.inCell=[];
    this.outCell=[];
    //用于输出该组件属性的错误信息
    this.attributeValidation=function(){
        var validationResult=new Array();
        if(factoryName=='FactoryName')
            validationResult.push("请给输入工厂的名称！")
        if(instanceName=='+objectName:name(String)')
            validationResult.push("请输入工厂中实例的名称！")
        return validationResult;
    }
}