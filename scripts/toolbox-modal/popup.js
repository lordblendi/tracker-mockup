// toggle multiselet popup
// calculates the position of the popup
// depending on where is the toggle for it
$('.JS_has-popup').on('click', function() {
  handlePopupClick(this);
  if ($(this).hasClass('JS_movePlaceholder')) {
    $(this).addClass('toolbox-field--focus');
  }
})
function handlePopupClick(toggle, popid) {
  toggle = $(toggle);
  if(popid === undefined || popid === null) {
    popid = $(toggle).attr('data-popid');
  }
  // outerWidth (including padding, border, and optionally margin -> true parameter)
  // innerWidth (including padding but not border)
  // width (not including anything)
  var width = Math.round(toggle.outerWidth(true));
  var height = Math.round(toggle.outerHeight(true));

  // corners of toggle
  var top = Math.round(toggle.offset().top);
  var left = Math.round(toggle.offset().left);
  var right = left + width;
  var bottom = top + height;

  // position of toggle, which side of the screen
  const windowWidth = $(window).width();
  var isOnLeft = Math.round(windowWidth/2) >= left;
  const isOnRight = Math.round(windowWidth/2) < left;

  if(width < 300) {
    width = 300;
  }
  // top for popup is under the toggle
  var newTop = bottom + 'px';
  var newLeft = left + "px";

  if($(toggle).hasClass('toolbox-selector') ) {
    newTop = top + 'px';
  }
  else if ($(toggle).hasClass('JS_breadcrumbPopup') ) {
    newTop = (top - 3) + 'px';

    var selector = $(toggle).closest('.toolbox-selector');
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
    $(popid).css({
      'top': newTop,
      'left': left,
      'width': width
    }).addClass('toolbox-modal--visible');
  }
  // toggle is right, right side of the popup is right side of toggle
  else {
    newLeft = right - width + 'px';
    $(popid).css({
      'top': newTop,
      'left': newLeft,
      'width': width
    }).addClass('toolbox-modal--visible');
  }

  if ( toggle.hasClass('JS_has-popup--error') ) {
    $(popid).addClass('animate-popup');
  }

  else if ( toggle.hasClass('JS_share') ) {
    $(popid).addClass('animate-fadein-and-disappear');
  }

  else {
    $(popid).addClass('animate-fadein');
  }

  // show overlay
  openOverlay(false, false, false);
  // add error effect
  if (toggle.hasClass('JS_has-popup--error')) {
    openOverlay(false, true, false);
  }
  // add tooltip effect
  if (toggle.hasClass('JS_has-popup--tooltip')) {
    openOverlay(false, false, true);
  }

}

// onclick action on overlay to close popups
$('.toolbox-overlay').on('click', function() {
  if($(this).closest('.app.app-navigator--visible, .app.user-menu--visible').length === 0){
    closeOverlay();
  }
});
