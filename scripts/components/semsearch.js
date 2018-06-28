$('.JS_toggle-semsearch').click(function() {
  const toggle = $(this);
  var width = Math.round(toggle.outerWidth(true));
  var top = Math.round(toggle.offset().top);
  var left = Math.round(toggle.offset().left);
  var right = left + width;

  var popup = $('.JS_semsearch');
  popupWidth = $(popup).width();
  newLeft = right - popupWidth;

  $(popup).css({
    left: newLeft,
    top: top
  });
  $(popup).addClass('multiSelector--visible');
  // show overlay
  openOverlay(true, false, false);
});
