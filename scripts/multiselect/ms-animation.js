function animateNewItem(item, callback) {
  $.Velocity.animate(item, 'slideDown', {
    display: 'flex',
    duration: 250
  }).then(callback);
}

function animateToBeRemovedItem(item, callback) {
  $.Velocity.animate(item, 'slideUp', {
    duration: 250
  }).then(callback);
}

function fadeMultiselect(multiselect) {
  $(multiselect).toggleClass('animate--fadein animate--fadeout');
}
