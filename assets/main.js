var el = [].slice.call(document.querySelectorAll('p'));

el.forEach(function(value) {
    var children = [].slice.call(value.childNodes);
    children.map(function(child) {
        if (child.tagName == 'IMG') {
            child.parentNode.style.textAlign = 'center';
            child.parentNode.style.marginTop = '40px';
        }
    });
});
