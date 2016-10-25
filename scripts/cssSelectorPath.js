function buildSelectorPath(el) {
  var path = [],
	  nodeName = el.nodeName.toLowerCase();
  while (
    (nodeName != 'html') && 
    (el = el.parentNode) &&
    path.unshift(el.nodeName.toLowerCase() + 
      (el.id ? '#' + el.id : '') + 
      (el.className ? '.' + el.className.replace(/\s+/g, ".") : ''))
  );
  return `${path.join(" > ")} > ${nodeName}`;
}