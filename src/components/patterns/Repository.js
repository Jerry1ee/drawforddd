
/*资源库
* 资源库，包含id，资源库名称，资源库中所包含的实体或聚合跟的名称，以及资源库所能添加的行为
* 其中id为系统自行添加，资源库名称以及实例名称需要判断是否为空，所添加的行为不需要进行判断
* 资源库应该与相应的实例进行连线
* */
export function Repository(id,repositoryName,instanceName,addAction){
    this.id=id;
    this.repositoryName=repositoryName;
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