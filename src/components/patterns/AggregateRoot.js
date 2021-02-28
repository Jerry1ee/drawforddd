/*聚合根
* 聚合根应该包含一个聚合跟的名称，用来标识某一个聚合根
* 聚合跟需要包含聚合根的ID以及聚合根的名称，聚合根的名称不应该为空
* 聚合根需要与实体1对1连接，聚合跟可以与值对象1对多进行连接
* */

export function AggregateRoot(id,aggregateRootName){
    this.id=id;
    this.aggregateRootName=aggregateRootName;
    //用于判别
    this.type='AggregateRootName';
    this.in=[];
    this.out=[];
    //用于输出该组件属性的错误信息
    this.attributeValidation=function(){
        var validationResult=new Array();
        if(aggregateRootName=='AggregateRootName')
            validationResult.push("请输入聚合跟的名称！")
        return validationResult;
    }
}