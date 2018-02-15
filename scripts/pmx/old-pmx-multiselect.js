$('.js_old-pmx-multiselect-trigger').click(function() {
  $('.old-multiselect-popup').toggleClass('old-multiselect-popup--hidden');
});


$('.old-multiselect-popup .old-multiselect-tabs ul li').click(function() {
  var li = $(this);
  if (!li.hasClass('selected')) {
    var ul = li.closest('ul');
    var tabSelector = $(ul).find('.tab-selector');
    tabSelector.toggleClass('selected');

    var newpickercontent = $(ul).closest('.newpickercontent');
    var oldMultiselectTab = $(newpickercontent).find('.old-multiselect-tab');
    oldMultiselectTab.toggleClass('old-multiselect-tab--hidden');
  }
});

$('.js_new-multiselect-trigger').click(function() {
  var trigger = $(this);
  const height = trigger.outerHeight();
  const width = trigger.outerWidth();
  const top = trigger.offset().top;
  const left = trigger.offset().left;

  const multiselectId = trigger.attr('data-multiselect');
  const multiselectWidth = $(multiselectId).outerWidth();

  const newWidth = left + width - multiselectWidth;
  const newHeight = top + height;
  $(multiselectId).css('left', newWidth);
  $(multiselectId).css('top', newHeight);
  $(multiselectId).toggleClass('multiSelector--visible');
});

// multiSelector--visible
