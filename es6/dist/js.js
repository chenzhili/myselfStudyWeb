"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var dir = document.querySelector(".div");
var btn = document.querySelector("button");
var a = 1;

/*构造函数*/
var f = function f() {
    console.log(1 + 1);
};
btn.onclick = function () {
    dir.innerHTML = "<p>" + a + "</p>";
    carry.says(60);
    guruda.call("sdfd");
    console.log(Boolean(d == 1));
    console.log(Boolean(b == 2));
    console.log(Boolean(c == 3));
    console.log(obj);
    fun("", [true, 12]);
    f.apply(undefined, [0].concat([1, 2]));
};

var Name = function () {
    function Name() {
        _classCallCheck(this, Name);

        this.name = "tom";
    }

    _createClass(Name, [{
        key: "says",
        value: function says(age) {
            console.log(this.name + "\u5E74\u9F84\u4E3A" + age + "\u5C81\u5417");
        }
    }]);

    return Name;
}();

var carry = new Name();

var NameAo = function (_Name) {
    _inherits(NameAo, _Name);

    function NameAo() {
        _classCallCheck(this, NameAo);

        var _this = _possibleConstructorReturn(this, (NameAo.__proto__ || Object.getPrototypeOf(NameAo)).call(this));

        _this.name = "curry";
        return _this;
    }

    _createClass(NameAo, [{
        key: "call",
        value: function call(_call) {
            this.says(_call);
        }
    }]);

    return NameAo;
}(Name);

var guruda = new NameAo();

/*解构*/
var d = 1,
    b = 2,
    c = 3;

var cat = "tom";
var dog = "lili";
var obj = { cat: cat, dog: dog };
function fun(x) {
    for (var _len = arguments.length, y = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        y[_key - 1] = arguments[_key];
    }

    console.log(y.length);
    console.log(y);
}
function f(x, y) {
    console.log(x);
    console.log(y);
    console.log(x + y);
    console.log(String(y));
}
//# sourceMappingURL=js.js.map