// target elements with the "draggable" class
interact('.draggable')
    .draggable({
        // allow dragging of multple elements at the same time
        max: Infinity,

        onstart: function(event){
            var target = event.target;

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
    accept: jQuery( ".draggable" ),
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

        var numberOfTags = jQuery(event.target).find(".drag-drop").length;
        if(numberOfTags ===0){
            appendTag(dropzoneElement, draggableElement);
            removePositionOfTag(draggableElement);
            draggableElement.classList.add('tag-drop-one');
        }else if(numberOfTags === 1){
            appendTag(dropzoneElement, draggableElement);
            removePositionOfTag(draggableElement);
            draggableElement.classList.add('tag-drop-two');
        }else if(numberOfTags ===2){
            appendTag(dropzoneElement, draggableElement);
            removePositionOfTag(draggableElement);
            draggableElement.classList.add('tag-drop-three');
        }else{
            appendTag(dropzoneElement, draggableElement);
            removePositionOfTag(draggableElement);
            draggableElement.classList.add('tag-drop-four');
        }
    },
    ondropdeactivate: function (event) {
        // remove active dropzone feedback
        event.target.classList.remove('drop-active');
        event.target.classList.remove('drop-target');
    }
});

var addHighlightToTag = function(tag){

    if(tag.classList.contains('apple')){
        tag.classList.remove(('apple'));
        tag.classList.add('apple-highlight');
    }else if(tag.classList.contains('bird')){
        tag.classList.remove(('bird'));
        tag.classList.add('bird-highlight');
    }else if(tag.classList.contains('car')){
        tag.classList.remove(('car'));
        tag.classList.add('car-highlight');
    }else if(tag.classList.contains('cat')){
        tag.classList.remove(('cat'));
        tag.classList.add('cat-highlight');
    }else if(tag.classList.contains('person')){
        tag.classList.remove(('person'));
        tag.classList.add('person-highlight');
    }else if(tag.classList.contains('sun')){
        tag.classList.remove(('sun'));
        tag.classList.add('sun-highlight');
    }
};

var removeHighlightFromTag = function(tag){


    if(tag.classList.contains('apple-highlight')){
        tag.classList.remove(('apple-highlight'));
        tag.classList.add('apple');
    }else if(tag.classList.contains('bird-highlight')){
        tag.classList.remove(('bird-highlight'));
        tag.classList.add('bird');
    }else if(tag.classList.contains('car-highlight')){
        tag.classList.remove(('car-highlight'));
        tag.classList.add('car');
    }else if(tag.classList.contains('cat-highlight')){
        tag.classList.remove(('cat-highlight'));
        tag.classList.add('cat');
    }else if(tag.classList.contains('person-highlight')){
        tag.classList.remove(('person-highlight'));
        tag.classList.add('person');
    }else if(tag.classList.contains('sun-highlight')){
        tag.classList.remove(('sun-highlight'));
        tag.classList.add('sun');
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
