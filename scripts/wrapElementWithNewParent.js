function wrapElementWithNewParent(newParent, child) {
	child.parentNode.replaceChild(newParent, child);
	newParent.appendChild(child);
}
