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
  const itemBox__row = toggle.closest('.itemBox__row');
  const possibleChildren = itemBox__row.nextAll('.JS_itemBox--calendar:first');

  // only toggle, if they actually exists;
  if(possibleChildren.length > 0) {
  // TODO when we need to show what is selected

  const bodyCell = toggle.closest('.itemBox__cell');
  if (bodyCell.hasClass('itemBox__cell--active')) {
    bodyCell.removeClass('itemBox__cell--active');
  }
  else {
    bodyCell.addClass('itemBox__cell--active');
  }

    expandCloseRow(itemBox__row, undefined, possibleChildren);
  }
}
