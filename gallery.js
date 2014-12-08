// target elements with the "draggable" class
interact('.draggable')
    .draggable({
        // allow dragging of multple elements at the same time
        max: Infinity,

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
            var textEl = event.target.querySelector('p');

            textEl && (textEl.textContent =
                'moved a distance of '
                + (Math.sqrt(event.dx * event.dx +
                event.dy * event.dy)|0) + 'px');
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
        dropzoneElement.classList.add('drop-target');
        draggableElement.classList.add('can-drop');
        removeTagDropClasses(draggableElement);
        draggableElement.textContent = 'Dragged in';
    },
    ondragleave: function (event) {
        var draggableElement = event.relatedTarget,
            dropzoneElement = event.target;
        // remove the drop feedback style
        dropzoneElement.classList.remove('drop-target');
        draggableElement.classList.remove('can-drop');
        removeTagDropClasses(draggableElement);

        draggableElement.textContent = 'Dragged out';
    },
    ondrop: function (event) {
        var draggableElement = event.relatedTarget,
            dropzoneElement = event.target;

        draggableElement.textContent = 'Dropped';

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
