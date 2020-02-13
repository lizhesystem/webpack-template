import _ from 'loadsh'
console.log('1');

class Class {
    constructor(name){
        this.name = name
    }
    add(){
        console.log(`name: ${this.name}`)
    }
}

let c = new Class('lz');
c.add();

console.log(_.join([1,2,3]),'xxx');
