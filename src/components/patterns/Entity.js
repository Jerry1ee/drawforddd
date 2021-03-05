
export function Entity(type, id, name, identity) {
    this.type = type;
    this.id = id;
    this.name = name;
    this.identity = identity;
    this.in = [];
    this.out = [];
}

// const oclResult = OclEngine.create()
//     .addOclExpression(`
//      -- 实体的唯一标识不能为空
//      context Entity inv:
//          self.identity->notEmpty()
//   `)
//     .evaluate(new Person());

