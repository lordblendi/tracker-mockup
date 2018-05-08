// set sortable in multiselect options
$('.multiSelector').each(function() {
  reinitSortable($(this));
})


// reinitiate reorder functionality
function reinitSortable(multiSelector) {
  var options = {};
  var sortableSelector = "";
  if ($(multiSelector).hasClass('JS_multiSelector--withFilter')) {
    sortableSelector = ".itemBoxBody--sortableInclude, .itemBoxBody--sortableExclude";
    options = {
      handle: '.JS_itemBox__cell--draggable',
      placeholder: 'itemBox__row itemBox__row--item',
      connectWith: ".itemBoxBody--sortableConnected"
    };
  } else {
    sortableSelector = ".JS_sortable";
    options = {
      handle: '.JS_itemBox__cell--draggable',
      placeholder: 'itemBox__row itemBox__row--item'
    };
  }

  if ($(multiSelector).hasClass('JS_multiSelector--resetFunctionality')) {
    options['stop'] = function(event, ui) {
      const sortedItem = $(ui.item);
      const multiSelector = sortedItem.closest('.multiSelector');
      showResetToDefault(multiSelector);
    };
  }
  $(multiSelector).find(sortableSelector).sortable(options);
}
