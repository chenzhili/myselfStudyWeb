function greeter(person) {
    return person;
}
document.body.innerHTML = greeter("hello world");
function age(user) {
    console.log(user);
}
age({ age: 1, name: "age" });
var Student = (function () {
    function Student(first, middle, last) {
        this.first = first;
        this.middle = middle;
        this.last = last;
        this.fullName = first + "" + middle + last;
    }
    return Student;
}());
var stu = new Student("this", "is", "cat");
console.log(stu);
var name = "tom";
var sentence = "this.a guys and " + name;
console.log(sentence);
var arr = ["a", 1, 2];
