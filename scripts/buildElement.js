function buildElement(tagName, options) {
    var element = document.createElement(tagName);
    if(options) {
        for(var o in options) {
            element[o] = options[o];
        }
    }
    return element;
}
