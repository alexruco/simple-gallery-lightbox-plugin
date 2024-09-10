document.addEventListener('DOMContentLoaded', function() {
    var galleries = document.querySelectorAll('.gallery');
    
    galleries.forEach(function(gallery) {
        gallery.addEventListener('click', function(event) {
            var target = event.target;
            if (target.tagName === 'IMG') {
                let src = target.getAttribute('src');
                showLightbox(src);
            }
        });
    });

    function showLightbox(imageSrc) {
        var lightbox = document.createElement('div');
        var lightboxImg = document.createElement('img');
        var closeBtn = document.createElement('span');

        // Lightbox styles
        lightbox.style.position = 'fixed';
        lightbox.style.top = '0';
        lightbox.style.left = '0';
        lightbox.style.width = '100%';
        lightbox.style.height = '100%';
        lightbox.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        lightbox.style.display = 'flex';
        lightbox.style.alignItems = 'center';
        lightbox.style.justifyContent = 'center';
        lightbox.style.zIndex = '1000';

        lightboxImg.src = imageSrc;
        lightboxImg.style.maxWidth = '95%';
        lightboxImg.style.maxHeight = '95%';

        closeBtn.textContent = '×';
        closeBtn.style.position = 'absolute';
        closeBtn.style.top = '20px';
        closeBtn.style.right = '30px';
        closeBtn.style.color = 'white';
        closeBtn.style.fontSize = '40px';
        closeBtn.style.cursor = 'pointer';

        lightbox.appendChild(closeBtn);
        lightbox.appendChild(lightboxImg);
        document.body.appendChild(lightbox);

        closeBtn.addEventListener('click', function() {
            document.body.removeChild(lightbox);
        });

        lightbox.addEventListener('click', function(e) {
            if (e.target !== lightboxImg) {
                document.body.removeChild(lightbox);
            }
        });
    }
});
