// close overlay and popups
function closeOverlay(){
  $(".overlay-body").removeClass('overlay-body--visible overlay-body--error overlay-body--text overlay-body--tooltip');

  $('.multiSelector').removeClass('multiSelector--visible animate-popup animate-fadein');
}


function openOverlay(text, error, tooltip) {
  $(".overlay-body").addClass('overlay-body--visible');
  if (text) {
    $(".overlay-body").addClass('overlay-body--text');
  }
  if (error) {
    $(".overlay-body").addClass('overlay-body--error');
  }
  if (tooltip) {
    $(".overlay-body").addClass('overlay-body--tooltip');
  }
}
