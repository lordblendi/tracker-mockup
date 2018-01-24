$('.old-pmx-multiselect-trigger').click(function(){
  $('.old-multiselect-popup').toggleClass('old-multiselect-popup--hidden');
});


$('.old-multiselect-popup .old-multiselect-tabs ul li').click(function(){
  var li = $(this);
  if(!li.hasClass('selected')) {
    var ul = li.closest('ul');
    var tabSelector = $(ul).find('.tab-selector');
    tabSelector.toggleClass('selected');

    var newpickercontent = $(ul).closest('.newpickercontent');
    var oldMultiselectTab = $(newpickercontent).find('.old-multiselect-tab');
    oldMultiselectTab.toggleClass('old-multiselect-tab--hidden');
  }
});
