Array.prototype.random && console.warn('Overreding existing function');
Array.prototype.random = function random() {
    return this[(Math.random() * this.length)|0];
}
