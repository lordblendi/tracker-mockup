function animateNewItem(item) {
  $.Velocity.animate(item, 'slideDown');
}
function animateToBeRemovedItem(item, callback) {
  $.Velocity.animate(item, 'slideUp').then(callback);
}
