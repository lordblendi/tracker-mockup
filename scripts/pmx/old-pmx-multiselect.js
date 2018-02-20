$('.JS_old-pmx-multiselect-trigger').click(function() {
  var oldpopup = $('.old-multiselect-popup');
  // if hidden, show it and add overlay
  if(oldpopup.hasClass('old-multiselect-popup--hidden')) {
    oldpopup.removeClass('old-multiselect-popup--hidden');
    $(".overlay").css("display", 'block');
  }
  // if not hidden, hide it, close overlay
  else {
    oldpopup.addClass('old-multiselect-popup--hidden');
    closeOverlay();
  }
});

//
// $('.old-multiselect-popup .old-multiselect-tabs ul li').click(function() {
//   var li = $(this);
//   if (!li.hasClass('selected')) {
//     var ul = li.closest('ul');
//     var tabSelector = $(ul).find('.tab-selector');
//     tabSelector.toggleClass('selected');
//
//     var newpickercontent = $(ul).closest('.newpickercontent');
//     var oldMultiselectTab = $(newpickercontent).find('.old-multiselect-tab');
//     oldMultiselectTab.toggleClass('old-multiselect-tab--hidden');
//   }
// });

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
  $(".overlay").css("display", 'block');
});

// multiSelector--visible

// onclick action on overlay to close popups
$('.overlay').on('click', function() {
  $('.multiSelector--popup.multiSelector--visible').removeClass('multiSelector--visible');

  $('.old-multiselect-popup').addClass('old-multiselect-popup--hidden');
});
