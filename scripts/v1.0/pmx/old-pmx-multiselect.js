$('.old-pmx-multiselect-trigger').click(function() {
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

$('.new-multiselect-trigger').click(function() {
  var trigger = $(this);
  const height = trigger.outerHeight();
  const width = trigger.outerWidth();
  const top = trigger.offset().top;
  const left = trigger.offset().left;
  const multiselectWidth = $('#multiSelector-2').outerWidth();

  const newWidth = left + width - multiselectWidth;
  const newHeight = top + height;
  $('#multiSelector-2').css('left', newWidth);
  $('#multiSelector-2').css('top', newHeight);
  $('#multiSelector-2').toggleClass('multiSelector--visible');
});

// multiSelector--visible
