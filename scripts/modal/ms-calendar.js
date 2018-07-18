// CALENDAR OPTIONS EXPAND-COLLAPSE
$('.JS_toggle--calendar').on('click', function() {
  const toggle = $(this);
  closeAllOtherSublists(toggle);
  toggleCalendarSelector(toggle);
});

// open calendar
// set a tick for the selected option
// toggle active class depending on expanding/collapsing
function toggleCalendarSelector(toggle) {
  // if there is a color box, expand/collapse it
  const toolbox-table__row = toggle.closest('.toolbox-table__rowInner');
  const possibleChildren = toolbox-table__row.nextAll('.JS_toolbox-table--calendar:first');

  // only toggle, if they actually exists;
  if(possibleChildren.length > 0) {
  // TODO when we need to show what is selected

  const bodyCell = toggle.closest('.toolbox-table__cell');
  if (bodyCell.hasClass('toolbox-table__cell--active')) {
    bodyCell.removeClass('toolbox-table__cell--active');
  }
  else {
    bodyCell.addClass('toolbox-table__cell--active');
  }

    expandCloseRow(toolbox-table__row, undefined, possibleChildren);
  }
}
