// set sortable in multiselect options
$('.modal').each(function() {
  reinitSortable($(this));
})


// reinitiate reorder functionality
function reinitSortable(modal) {
  var options = {};
  var sortableSelector = "";
  if ($(modal).hasClass('JS_modal--withFilter')) {
    sortableSelector = ".toolbox-tableBody--sortableInclude, .toolbox-tableBody--sortableExclude";
    options = {
      handle: '.JS_toolbox-table__cell--draggable',
      placeholder: 'toolbox-table__rowInner toolbox-table__row--item',
      connectWith: ".toolbox-tableBody--sortableConnected"
    };
  } else {
    sortableSelector = ".JS_sortable";
    options = {
      handle: '.JS_toolbox-table__cell--draggable',
      placeholder: 'toolbox-table__row toolbox-table__row--placeholder'
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
