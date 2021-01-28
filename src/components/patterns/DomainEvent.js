export function DomainEvent(type, id, name){
    this.type = type;
    this.id = id;
    this.name = name;
    this.in = [];
    this.out = [];
}