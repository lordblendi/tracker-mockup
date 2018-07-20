// close overlay and popups
function closeOverlay(){
  $(".toolbox-overlay").removeClass('toolbox-overlay--visible toolbox-overlay--error toolbox-overlay--text toolbox-overlay--tooltip');

  $('.toolbox-modal').removeClass('toolbox-modal--visible animate-popup animate-fadein');
}


function openOverlay(text, error, tooltip) {
  $(".toolbox-overlay").addClass('toolbox-overlay--visible');
  if (text) {
    $(".toolbox-overlay").addClass('toolbox-overlay--text');
  }
  if (error) {
    $(".toolbox-overlay").addClass('toolbox-overlay--error');
  }
  if (tooltip) {
    $(".toolbox-overlay").addClass('toolbox-overlay--tooltip');
  }
}
