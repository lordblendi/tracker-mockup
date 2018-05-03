// CALENDAR OPTIONS EXPAND-COLLAPSE
$('.JS_toggle--columnpickerOptions').on('click', function() {
  const toggle = $(this);
  closeAllOtherSublists(toggle);
  toggleColumnpickerOptions(toggle);
});

// open calendar
// set a tick for the selected option
// toggle active class depending on expanding/collapsing
function toggleColumnpickerOptions(toggle) {
  // if there is a color box, expand/collapse it
  const itemBox__row = toggle.closest('.itemBox__row');
  const possibleChildren = itemBox__row.nextAll('.JS_itemBox--columnpickerOptions:first');

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


$('.JS_itemBox--columnpickerOptions JS_selector').on('click', function(){

});
