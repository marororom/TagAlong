var addHighlightToTag = function(tag){

    if(tag.classList.contains('apple-tag')){
        tag.classList.remove(('apple-tag'));
        tag.classList.add('apple-tag-highlight');
    }else if(tag.classList.contains('bird-tag')){
        tag.classList.remove(('bird-tag'));
        tag.classList.add('bird-tag-highlight');
    }else if(tag.classList.contains('car-tag')){
        tag.classList.remove(('car-tag'));
        tag.classList.add('car-tag-highlight');
    }else if(tag.classList.contains('cat-tag')){
        tag.classList.remove(('cat-tag'));
        tag.classList.add('cat-tag-highlight');
    }else if(tag.classList.contains('person-tag')){
        tag.classList.remove(('person-tag'));
        tag.classList.add('person-tag-highlight');
    }else if(tag.classList.contains('sun-tag')){
        tag.classList.remove(('sun-tag'));
        tag.classList.add('sun-tag-highlight');
    }
};

var removeHighlightFromTag = function(tag){

    if(tag.classList.contains('apple-tag-highlight')){
        tag.classList.remove(('apple-tag-highlight'));
        tag.classList.add('apple-tag');
    }else if(tag.classList.contains('bird-tag-highlight')){
        tag.classList.remove(('bird-tag-highlight'));
        tag.classList.add('bird-tag');
    }else if(tag.classList.contains('car-tag-highlight')){
        tag.classList.remove(('car-tag-highlight'));
        tag.classList.add('car-tag');
    }else if(tag.classList.contains('cat-tag-highlight')){
        tag.classList.remove(('cat-tag-highlight'));
        tag.classList.add('cat-tag');
    }else if(tag.classList.contains('person-tag-highlight')){
        tag.classList.remove(('person-tag-highlight'));
        tag.classList.add('person-tag');
    }else if(tag.classList.contains('sun-tag-highlight')){
        tag.classList.remove(('sun-tag-highlight'));
        tag.classList.add('sun-tag');
    }
};

var appendTag = function(dropzone, tag){
    jQuery(dropzone).append(jQuery(tag));
};

var removePositionOfTag = function(tag){
    jQuery(tag).removeAttr('style');
    jQuery(tag).removeAttr('data-x');
    jQuery(tag).removeAttr('data-y');
};
var removeTagDropClasses = function(tag){
    tag.classList.remove('tag-drop-one');
    tag.classList.remove('tag-drop-two');
    tag.classList.remove('tag-drop-three');
    tag.classList.remove('tag-drop-four');
};

var goToGameEndScreen = function(){
    location.href = 'http://tgnzne.axshare.com/tagalongend.html';
};

// target elements with the "draggable" class
interact('.draggable')
    .draggable({
        // allow dragging of multple elements at the same time
        max: Infinity,

        onstart: function(event){
            var target = event.target;
            target.classList.remove('hover');
            addHighlightToTag(target);
        },
        // call this function on every dragmove event
        onmove: function (event) {
            var target = event.target,
            // keep the dragged position in the data-x/data-y attributes
                x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
                y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

            // translate the element
            target.style.webkitTransform =
                target.style.transform =
                    'translate(' + x + 'px, ' + y + 'px)';

            // update the posiion attributes
            target.setAttribute('data-x', x);
            target.setAttribute('data-y', y);
        },
        // call this function on every dragend event
        onend: function (event) {
            var target = event.target;
            var textEl = target.querySelector('p');

            textEl && (textEl.textContent =
                'moved a distance of '
                + (Math.sqrt(event.dx * event.dx +
                event.dy * event.dy)|0) + 'px');

            removeHighlightFromTag(target);
        }
    })
    // enable inertial throwing
    .inertia(true)
    // keep the element within the area of it's parent
    /*.restrict({
        drag: "parent",
        endOnly: true,
        elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
    })*/;

// allow more than one interaction at a time
interact.maxInteractions(Infinity);

// enable draggables to be dropped into this
interact('.dropzone').dropzone({
    // only accept elements matching this CSS selector
    accept: jQuery( '.draggable' ),
    // Require a 75% element overlap for a drop to be possible
    overlap: 0.75,

    // listen for drop related events:

    ondropactivate: function (event) {
        // add active dropzone feedback
        event.target.classList.add('drop-active');
    },
    ondragenter: function (event) {
        var draggableElement = event.relatedTarget,
            dropzoneElement = event.target;

        // feedback the possibility of a drop
        removeTagDropClasses(draggableElement);
        dropzoneElement.classList.add('drop-target');
    },
    ondragleave: function (event) {
        var draggableElement = event.relatedTarget,
            dropzoneElement = event.target;
        // remove the drop feedback style
        dropzoneElement.classList.remove('drop-target');

    },
    ondrop: function (event) {
        var draggableElement = event.relatedTarget,
            dropzoneElement = event.target;

        //draggableElement.textContent = 'Dropped';
        if(jQuery(event.target).attr('id') === 'footer_container'){
            if(jQuery(draggableElement).find('hover').length === 0){
                removePositionOfTag(draggableElement);
                draggableElement.classList.add('hover');
            }
        }
        else
        {
            var numberOfTags = jQuery(dropzoneElement).find('.drag-drop').length;
            if(numberOfTags === 0){
                appendTag(dropzoneElement, draggableElement);
                removePositionOfTag(draggableElement);
                draggableElement.classList.add('tag-drop-one');
            }else if(numberOfTags === 1){
                appendTag(dropzoneElement, draggableElement);
                removePositionOfTag(draggableElement);
                draggableElement.classList.add('tag-drop-two');
            }else if(numberOfTags === 2){
                appendTag(dropzoneElement, draggableElement);
                removePositionOfTag(draggableElement);
                draggableElement.classList.add('tag-drop-three');
            }else if(numberOfTags === 3){
                appendTag(dropzoneElement, draggableElement);
                removePositionOfTag(draggableElement);
                draggableElement.classList.add('tag-drop-four');
            }else if(numberOfTags === 4){
                appendTag(dropzoneElement, draggableElement);
                removePositionOfTag(draggableElement);
                draggableElement.classList.add('tag-drop-one');
            }else if(numberOfTags === 5){
                appendTag(dropzoneElement, draggableElement);
                removePositionOfTag(draggableElement);
                draggableElement.classList.add('tag-drop-two');
            }
        }
        /*Bugfix*/
        var footerTags = jQuery('#footer_container').find('.hover');
        for(i = 0; i < footerTags.length; i++){
            var tag = footerTags[i];
            jQuery(tag).removeClass('hover');
            jQuery(tag).removeAttr('style');
            jQuery(tag).removeAttr('data-x');
            jQuery(tag).removeAttr('data-y');
            jQuery(tag).addClass('hover');
        }

        var footerTags = jQuery('#footer_container').find('.drag-drop');
        if(footerTags.length === 0){
            setTimeout(goToGameEndScreen(), 2000);
        }
    },
    ondropdeactivate: function (event) {
        // remove active dropzone feedback
        event.target.classList.remove('drop-active');
        event.target.classList.remove('drop-target');
    }
});