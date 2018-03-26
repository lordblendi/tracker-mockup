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
  const itemBoxTable__bodyRow = toggle.closest('.itemBoxTable__bodyRow');
  const possibleChildren = itemBoxTable__bodyRow.nextAll('.JS_itemBox--calendar:first');

  // only toggle, if they actually exists;
  if(possibleChildren.length > 0) {
  // TODO when we need to show what is selected

  const bodyCell = toggle.closest('.itemBoxTable__bodyCell');
  if (bodyCell.hasClass('itemBoxTable__bodyCell--active')) {
    bodyCell.removeClass('itemBoxTable__bodyCell--active');
  }
  else {
    bodyCell.addClass('itemBoxTable__bodyCell--active');
  }

    expandCloseRow(itemBoxTable__bodyRow, undefined, possibleChildren);
  }
}
