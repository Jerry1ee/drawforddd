export function DomainService(type, id, name){
    this.type = type;
    this.id = id;
    this.name = name;
    this.in = [];
    this.out = [];
}

// const oclResult = OclEngine.create()
//     .addOclExpression(`
//      -- 领域服务不能有其他构造型
//      context DomainService inv:
//          self.base_Class.extension_Entity = null and
//          self.base_Class.extension_ValueObject = null and
//          self.base_Class.extension_DomainEvent = null and
//          self.base_Class.extension_AggregateRoot = null and
//          self.base_Class.extension_Repository = null and
//          self.base_Class.extension_DomainEvent = null
//      -- 领域服务必须拥有输入值
//      context DomainService inv:
//          self.in->notEmpty()
//      -- 领域服务必须拥有输出值
//      context DomainService inv:
//          self.out->notEmpty()
//   `)
//     .evaluate(new Person());