// set sortable in multiselect options
$('.modal').each(function() {
  reinitSortable($(this));
})


// reinitiate reorder functionality
function reinitSortable(modal) {
  var options = {};
  var sortableSelector = "";
  if ($(modal).hasClass('JS_modal--withFilter')) {
    sortableSelector = ".itemBoxBody--sortableInclude, .itemBoxBody--sortableExclude";
    options = {
      handle: '.JS_itemBox__cell--draggable',
      placeholder: 'itemBox__rowInner itemBox__row--item',
      connectWith: ".itemBoxBody--sortableConnected"
    };
  } else {
    sortableSelector = ".JS_sortable";
    options = {
      handle: '.JS_itemBox__cell--draggable',
      placeholder: 'itemBox__row itemBox__row--placeholder'
    };
  }

  if ($(modal).hasClass('JS_modal--resetFunctionality')) {
    options['stop'] = function(event, ui) {
      const sortedItem = $(ui.item);
      const modal = sortedItem.closest('.modal');
      showResetToDefault(modal);
    };
  }
  $(modal).find(sortableSelector).sortable(options);
}
