// toggle multiselet popup
// calculates the position of the popup
// depending on where is the toggle for it
$('.MULTISELECT__POPUP').on('click', function() {
  const toggle = $(this);
  // outerWidth (including padding, border, and optionally margin -> true parameter)
  // innerWidth (including padding but not border)
  // width (not including anything)
  const width = toggle.outerWidth(true);
  const height = toggle.outerHeight(true);

  // corners of toggle
  const top = toggle.offset().top;
  const left = toggle.offset().left;
  const right = left + width;
  const bottom = top + height;

  // position of toggle, which side of the screen
  const windowWidth = $(window).width();
  const isOnLeft = Math.round(windowWidth/2) >= Math.round(left);
  const isOnRight = Math.round(windowWidth/2) < Math.round(left);

  // top for popup is under the toggle
  var newTop = (Math.round(top) + Math.round(height)) + 'px';
  if($(this).hasClass('pmx-selector')) {
    newTop = (Math.round(top) - 50) + 'px';
  }

  // toggle is left
  // left side of the popup is left side of toggle
  if (isOnLeft) {
    $('' + $(this).attr('data-popid')).css({
      'z-index': '99999999',
      'pointer-events': 'auto',
      'opacity': '1',
      'top': newTop,
      'left': 0
    });
  }
  // toggle is right, right side of the popup is right side of toggle
  else {
    $('' + $(this).attr('data-popid')).css({
      'z-index': '99999999',
      'pointer-events': 'auto',
      'opacity': '1',
      'top': newTop,
      'right': 0
    });
  }

  // show overlay
  $(".overlay").css("display", 'block');
});

// onclick action on overlay to close popups
$('.overlay').on('click', function() {
  closeOverlay();
});

// close overlay and popups
function closeOverlay(){
  $(".overlay").css("display", 'none');

  $('.multiSelector--popup').css({
    'z-index': '0',
    'pointer-events': 'none',
    'opacity': '0',
  });
}
