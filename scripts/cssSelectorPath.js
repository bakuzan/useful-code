function buildSelectorPath(el) {
  var path = [],
	  endNodeName = el.nodeName.toLowerCase();
  while (
    (el.nodeName.toLowerCase() != 'html') && 
    (el = el.parentNode) &&
    path.unshift(el.nodeName.toLowerCase() + 
      (el.id ? '#' + el.id : '') + 
      (el.className ? '.' + el.className.replace(/\s+/g, ".") : ''))
  );
  return `${path.join(" > ")} > ${endNodeName}`;
}