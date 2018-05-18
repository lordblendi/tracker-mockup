// action for triggering old-multiselect-popup in /pmx
$('.JS_old-multiselect-trigger').click(function() {
  var oldpopup = $('.old-multiselect-popup');
  // if hidden, show it and add overlay
  if(oldpopup.hasClass('old-multiselect-popup--hidden')) {
    oldpopup.removeClass('old-multiselect-popup--hidden');
    $(".overlay, .overlay-body").css("display", 'block');
  }
  // if not hidden, hide it, close overlay
  else {
    oldpopup.addClass('old-multiselect-popup--hidden');
    closeOverlay();
  }
});

// action for triggering new-multiselect-popup and column-picker in /pmx
// calculate where should it be
// and get the correct ID in the attribute data-multiselect
$('.JS_new-multiselect-trigger').click(function() {
  var trigger = $(this);
  const height = trigger.outerHeight();
  const width = trigger.outerWidth();
  const top = trigger.offset().top;
  const left = trigger.offset().left;

  const multiselectId = trigger.attr('data-multiselect');
  const multiselectWidth = $(multiselectId).outerWidth();

  const newWidth = left + width - multiselectWidth;
  const newHeight = top + height;
  $(multiselectId).css({
    'z-index': '99999999',
    'pointer-events': 'auto',
    'opacity': '1',
    'top': newHeight,
    'left': newWidth,
  });
  $(multiselectId).toggleClass('multiSelector--visible');
  // show overlay
  $(".overlay-body").css({
    'pointer-events': 'auto',
    'opacity': '1'
  });
});

// onclick action on overlay to close popups
// - column-picker
// - old-multiselect
// - new-multiselect
$('.overlay-body').on('click', function() {
  $(".overlay-body").css({
    'pointer-events': '',
    'opacity': ''
  });
  $('.multiSelector--popup.multiSelector--visible').removeClass('multiSelector--visible');

  $('.old-multiselect-popup').addClass('old-multiselect-popup--hidden');
});
