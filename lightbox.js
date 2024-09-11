document.addEventListener('DOMContentLoaded', function() {
    // Event delegation on all galleries using the class 'gallery'
    var galleries = document.querySelectorAll('.gallery');

    galleries.forEach(function(gallery) {
        var images = gallery.querySelectorAll('img');
        var currentIndex = 0;

        gallery.addEventListener('click', function(event) {
            // Check if the clicked element is an image
            var target = event.target;
            if (target.tagName === 'IMG') {
                currentIndex = Array.prototype.indexOf.call(images, target);
                let srcset = target.getAttribute('srcset');
                let largeImageSrc = srcset ? getLargestImageSrc(srcset) : target.src; // Fallback to src if no srcset
                showLightbox(images, largeImageSrc, currentIndex); // Show lightbox with larger image
            }
        });

        // Function to find the largest image in the srcset
        function getLargestImageSrc(srcset) {
            let srcsetArray = srcset.split(',').map(src => {
                let [url, size] = src.trim().split(' ');
                return { url, size: parseInt(size.replace('w', '')) };
            });

            // Find the largest image by size
            let largestImage = srcsetArray.reduce((prev, current) => {
                return (prev.size > current.size) ? prev : current;
            });

            return largestImage.url;
        }

        function showLightbox(images, imageSrc, index) {
            // Create lightbox elements
            var lightbox = document.createElement('div');
            var lightboxImg = document.createElement('img');
            var closeBtn = document.createElement('span');
            var prevBtn = document.createElement('span');
            var nextBtn = document.createElement('span');

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

            // Enlarge Image styling
            lightboxImg.src = imageSrc;
            lightboxImg.style.maxWidth = '95%';
            lightboxImg.style.maxHeight = '95%';

            // Close button styling
            closeBtn.textContent = '×';
            closeBtn.style.position = 'absolute';
            closeBtn.style.top = '20px';
            closeBtn.style.right = '30px';
            closeBtn.style.color = 'white';
            closeBtn.style.fontSize = '40px';
            closeBtn.style.cursor = 'pointer';

            // Previous button styling
            prevBtn.textContent = '◀';
            prevBtn.style.position = 'absolute';
            prevBtn.style.left = '20px';
            prevBtn.style.color = 'white';
            prevBtn.style.fontSize = '40px';
            prevBtn.style.cursor = 'pointer';

            // Next button styling
            nextBtn.textContent = '▶';
            nextBtn.style.position = 'absolute';
            nextBtn.style.right = '20px';
            nextBtn.style.color = 'white';
            nextBtn.style.fontSize = '40px';
            nextBtn.style.cursor = 'pointer';

            // Append elements to lightbox
            lightbox.appendChild(closeBtn);
            lightbox.appendChild(lightboxImg);
            lightbox.appendChild(prevBtn);
            lightbox.appendChild(nextBtn);
            document.body.appendChild(lightbox);

            // Initial update for arrow visibility
            updateArrowsVisibility(index, images.length, prevBtn, nextBtn);

            // Close lightbox on button click
            closeBtn.addEventListener('click', function() {
                document.body.removeChild(lightbox);
            });

            // Close lightbox when clicking outside the image
            lightbox.addEventListener('click', function(e) {
                if (e.target !== lightboxImg && e.target !== prevBtn && e.target !== nextBtn) {
                    document.body.removeChild(lightbox);
                }
            });

            // Handle previous image navigation
            prevBtn.addEventListener('click', function() {
                if (index > 0) {
                    index--;
                    let newSrcset = images[index].getAttribute('srcset');
                    let newLargeImageSrc = newSrcset ? getLargestImageSrc(newSrcset) : images[index].src;
                    lightboxImg.src = newLargeImageSrc;
                    updateArrowsVisibility(index, images.length, prevBtn, nextBtn);
                }
            });

            // Handle next image navigation
            nextBtn.addEventListener('click', function() {
                if (index < images.length - 1) {
                    index++;
                    let newSrcset = images[index].getAttribute('srcset');
                    let newLargeImageSrc = newSrcset ? getLargestImageSrc(newSrcset) : images[index].src;
                    lightboxImg.src = newLargeImageSrc;
                    updateArrowsVisibility(index, images.length, prevBtn, nextBtn);
                }
            });
        }

        // Function to update visibility of navigation arrows
        function updateArrowsVisibility(index, totalImages, prevBtn, nextBtn) {
            if (index === 0) {
                prevBtn.style.display = 'none'; // Hide "previous" button on the first image
            } else {
                prevBtn.style.display = 'block'; // Show "previous" button
            }

            if (index === totalImages - 1) {
                nextBtn.style.display = 'none'; // Hide "next" button on the last image
            } else {
                nextBtn.style.display = 'block'; // Show "next" button
            }
        }
    });
});
