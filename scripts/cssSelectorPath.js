function buildSelectorPath(el) {
  var path = [];
  while (
    (el.nodeName.toLowerCase() != 'html') && 
    path.unshift(el.nodeName.toLowerCase() + 
      (el.id ? '#' + el.id : '') + 
      (el.className ? '.' + el.className.replace(/\s+/g, ".") : '')) &&
	(el = el.parentNode)
  );
  return path.join(' > ');
}