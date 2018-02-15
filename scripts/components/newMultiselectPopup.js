// cell icon onclick
$('.MULTISELECT__POPUP').on('click', function() {
  const toggle = $(this);
  const top = toggle.offset().top;
  const left = toggle.offset().left;
  // outerWidth (including padding, border, and optionally margin)
  // innerWidth (including padding but not border)
  // width (not including anything)
  const width = toggle.outerWidth();
  const height = toggle.outerHeight();

  const right = left + width;
  const bottom = top + height;

  const windowWidth = $(window).width();

  const isOnLeft = Math.round(windowWidth/2) >= Math.round(left);
  const isOnRight = Math.round(windowWidth/2) < Math.round(left);

  var newTop = (Math.round(top) + Math.round(height)) + 'px';
  if($(this).hasClass('pmx-selector')) {
    newTop = Math.round(top) + 'px';
  }

  if (isOnLeft) {
    $('' + $(this).attr('data-popid')).css({
      'z-index': '99999999',
      'pointer-events': 'auto',
      'opacity': '1',
      'top': newTop,
      'left': Math.round(left) + 'px',
    });
  }
  else {
    $('' + $(this).attr('data-popid')).css({
      'z-index': '99999999',
      'pointer-events': 'auto',
      'opacity': '1',
      'top': newTop,
      'right': (Math.round($(window).width()) - Math.round(right)) + 'px',
    });
  }

  $(".overlay").css("display", 'block');
});

// close overlay and popups
$('.overlay').on('click', function() {
  $(".overlay").css("display", 'none');

  $('#multiSelector-1, #multiSelector-2, #multiSelector-3, #multiSelector-tagpicker, #new-multiselect').css({
    'z-index': '0',
    'pointer-events': 'none',
    'opacity': '0',
  });
})
