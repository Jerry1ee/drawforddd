export function DomainEvent(type, id, name){
    this.type = type;
    this.id = id;
    this.name = name;
    this.in = [];
    this.out = [];
}

// const oclResult = OclEngine.create()
//     .addOclExpression(`
//      -- 领域服务不能有其他构造型
//      context DomainEvent inv:
//          self.base_Class.extension_Entity = null and
//          self.base_Class.extension_ValueObject = null and
//          self.base_Class.extension_DomainService = null and
//          self.base_Class.extension_AggregateRoot = null and
//          self.base_Class.extension_Repository = null and
//          self.base_Class.extension_DomainEvent = null
//      -- 领域服务必须记录被触发时间
//      context DomainEvent inv:
//          self.occurTime->notEmpty()
//      -- 领域事件必须拥有事件发送方作为输入
//      context DomainEvent inv:
//          self.in->notEmpty()
//      -- 领域事件必须拥有唯一标识来跟其他对象进行区分
//      context DomainEvent inv:
//          self.identity->notEmpty()
//   `)
//     .evaluate(new Person());