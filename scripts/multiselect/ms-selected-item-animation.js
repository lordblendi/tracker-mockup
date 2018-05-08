function animateNewItem(item, callback) {
  $.Velocity.animate(item, 'slideDown', {display: 'flex'}).then(callback);
}
function animateToBeRemovedItem(item, callback) {
  $.Velocity.animate(item, 'slideUp').then(callback);
}
