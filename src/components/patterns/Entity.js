
export function Entity(type, id, name, identity) {
    this.type = type;
    this.id = id;
    this.name = name;
    this.identity = identity;
    this.in = [];
    this.out = [];
}

