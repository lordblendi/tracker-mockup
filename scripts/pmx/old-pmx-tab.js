$('.old-tab-selector').on('click', function(){
  const newTabSelector = $(this);
  // if this is not selected yet
  if(!newTabSelector.hasClass('selected')) {
    const newTabName = newTabSelector.attr('tab-name');
    const oldTabSelector = $('.old-tab-selector.selected');
    const oldTabName = oldTabSelector.attr('tab-name');

    oldTabSelector.removeClass('selected');
    newTabSelector.addClass('selected');

    $(`.tab-content[tab-name="${oldTabName}"]`).css('display', 'none');
    $(`.tab-content[tab-name="${newTabName}"]`).css('display', 'block');
  }
});
