requirejs(["./common"], function (e) {
    requirejs(["app/main1"])
}), define("../page1", function () {
}), define("app/controller/c1", ["./Base"], function (e) {
    var t = new e("Controller 1");
    return t
}), define("app/model/m1", ["./Base"], function (e) {
    var t = new e("This is the data for Page 1");
    return t
}), define("app/main1", ["require", "jquery", "./lib", "./controller/c1", "./model/m1"], function (e) {
    var t = e("jquery"), n = e("./lib"), r = e("./controller/c1"), i = e("./model/m1");
    r.setModel(i), t(function () {
        r.render(n.getBody())
    })
});