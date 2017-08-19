var img = document.querySelectorAll('a');
var lightbox = document.getElementById('lightbox');
var content = document.getElementById('content');
img.forEach(function(el) {
    console.log(el);
    if (el.className === 'trigger') {
        el.addEventListener('click', function(event) {
        event.preventDefault();
        console.log(this);
        var image_href = this.getAttribute('href');
        var image = document.createElement('img');
        var link = document.createElement('a');
        link.href = '#';
        link.innerHTML = 'Click to close';
        link.style.color = '#fff';
        image.src = image_href;
        link.appendChild(image);
        content.appendChild(link);
        lightbox.style.display = 'block';
        link.addEventListener('click', function(event) {
            lightbox.style.display = 'none';
            content.removeChild(link);
        });
    });
    }

});

