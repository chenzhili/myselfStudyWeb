var arr1 = [1, 2, 3];
var Student = (function () {
    function Student(first, second, last) {
        this.first = first;
        this.second = second;
        this.last = last;
        this.className = first + "," + second + ',' + last;
    }
    return Student;
}());
var student = new Student("t", "o", "m");
function ff(name) {
    console.log(name.first, name.last);
}
ff(student);
var Color;
(function (Color) {
    Color[Color["red"] = 2] = "red";
    Color[Color["green"] = 3] = "green";
    Color[Color["black"] = 7] = "black";
})(Color || (Color = {}));
;
var color = Color.red;
console.log(color);
var anything;
anything = false;
var aa;
var bb;
aa = "";
bb = "a";
var arr = [1, 2, true];
arr[1] = "tom";
console.log(arr);
function infiniteLoop() {
    while (true) {
    }
}
function foo() {
    // okay to capture 'a'
    return a;
}
// 不能在'a'被声明前调用'foo'
// 运行时应该抛出错误
foo();
var a;
