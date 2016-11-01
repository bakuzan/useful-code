function _arrayBufferToBase64(buffer) {
    var binary = '',
        bytes = new Uint8Array(buffer);
    for (var i = 0, length = bytes.byteLength; i < length; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}
