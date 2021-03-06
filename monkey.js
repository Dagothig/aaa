function patch(object, fun) {
    object[fun.name] && console.warn('Overriding existing function');
    object[fun.name] = fun;
}

patch(Array.prototype, function random() {
    return this[(Math.random() * this.length)|0];
});
