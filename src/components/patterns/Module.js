/*模块
* 类似于java中的包，包含id模块名称以及模块中的实例
* 其中模块名称不能为空
* */

export function Module(id,moduleName,moduleInstance){
    this.id=id;
    this.moduleName=moduleName;
    this.moduleInstance=moduleInstance;
    //用于判别
    this.type='Module';
    this.inCell=[];
    this.outCell=[];
    //用于输出该组件属性的错误信息
    this.attributeValidation=function(){
        var validationResult=new Array();
        if(moduleName=='ModuleName')
            validationResult.push("请输入模块的名称！")
        return validationResult;
    }
}