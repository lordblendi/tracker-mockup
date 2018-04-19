// toggle multiselet popup
// calculates the position of the popup
// depending on where is the toggle for it
$('.MULTISELECT__POPUP').on('click', function() {
  const toggle = $(this);
  // outerWidth (including padding, border, and optionally margin -> true parameter)
  // innerWidth (including padding but not border)
  // width (not including anything)
  var width = toggle.outerWidth(true);
  var height = toggle.outerHeight(true);

  // corners of toggle
  var top = toggle.offset().top;
  var left = toggle.position().left;
  var right = left + width;
  var bottom = top + height;

  // position of toggle, which side of the screen
  const windowWidth = $(window).width();
  var isOnLeft = Math.round(windowWidth/2) >= Math.round(toggle.offset().left);
  const isOnRight = Math.round(windowWidth/2) < Math.round(toggle.offset().left);

  if(width < 300) {
    width = 300;
  }
  // top for popup is under the toggle
  var newTop = (Math.round(top) + Math.round(height)) + 'px';
  var newLeft = right - width + "px";

  if($(this).hasClass('selector') ) {
    newTop = (Math.round(top) - 50) + 'px';
  }
  else if ($(this).hasClass('JS_breadcrumbPopup') ) {
    newTop = (Math.round(top) - 6) + 'px';

    var selector = $(this).closest('.selector');
    width = selector.outerWidth(true);
    height = selector.outerHeight(true);

    top = selector.offset().top;
    left = selector.offset().left;

    if(left < 0) {
      left = 0;
    }

    right = left + width;
    bottom = top + height;
    if(width < 300) {
      width = 300;
    }
    newLeft = right - width + "px";
  }

  // check if it would fit on the screen or not, even if the toggle is on the is on the right
  if ((right + width) < windowWidth) {
    isOnLeft = true;
  }

  // toggle is left
  // left side of the popup is left side of toggle
  if (isOnLeft) {
    $('' + $(this).attr('data-popid')).css({
      'z-index': '99999999',
      'pointer-events': 'auto',
      'opacity': '1',
      'top': newTop,
      'left': left,
      'width': width
    });
  }
  // toggle is right, right side of the popup is right side of toggle
  else {
    $('' + $(this).attr('data-popid')).css({
      'z-index': '99999999',
      'pointer-events': 'auto',
      'opacity': '1',
      'top': newTop,
      'right': right,
      'left': newLeft,
      'width': width
    });
  }

  // show overlay
  $(".app__overlay").css({
    'pointer-events': 'auto',
    'opacity': '1'
  });
});

// onclick action on overlay to close popups
$('.app__overlay').on('click', function() {
  if($(this).closest('.app.app-navigator--visible, .app.user-menu--visible').length === 0){
    closeOverlay();
  }
});

// close overlay and popups
function closeOverlay(){
  $(".app__overlay").css({
    'pointer-events': '',
    'opacity': ''
  });

  $('.multiSelector--popup').css({
    'z-index': '0',
    'pointer-events': 'none',
    'opacity': '0',
  });
}
