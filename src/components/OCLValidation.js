
const OclEngine = require("@stekoe/ocl.js").OclEngine;
export function OCLValidation(objectModels){
    //创建ocl验证引擎

    /**
     * Entity OCL rule
     */
    const entityOclEngine = `
         -- identity is not empty
        context Entity inv:
            self.identity->notEmpty()
    `;

    const oclEngine = OclEngine.create();

    oclEngine.addOclExpression(entityOclEngine);

    // let result = null;
    objectModels.forEach( function (value){
        // result = oclEngine.evaluate(value);
        // console.log('OCL 验证结果：'+ result)
        console.log('ocl validation')
        console.log(value);
    });
}