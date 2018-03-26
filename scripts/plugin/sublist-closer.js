function closeAllOtherSublists(toggle) {

  const itemBoxTable__bodyRow = toggle.closest('.itemBoxTable__bodyRow');

  if(!toggle.hasClass('JS_toggle--InclExcl')) {
    closeInclExclOptions(itemBoxTable__bodyRow);
  }
  if(!toggle.hasClass('JS_toggle--color')) {
    closeColorOptions(itemBoxTable__bodyRow);
  }
  if(!toggle.hasClass('JS_toggle--calendar')) {
    closeCalendarOptions(itemBoxTable__bodyRow);
  }
}

// close incl-exlToggle if open
// used by Toggle
function closeInclExclOptions(itemBoxTable__bodyRow) {
  const activeTrigger = $(itemBoxTable__bodyRow).find('.itemBoxTable__bodyCell--active .JS_toggle--InclExcl');

  // if there is an active color trigger in this bodyRow
  if(activeTrigger.length > 0) {
    toggleInclExclSelector($(activeTrigger));
  }
}

// close colorToggle if open
// used by incl-exlToggle
function closeColorOptions(itemBoxTable__bodyRow) {
  const activeTrigger = $(itemBoxTable__bodyRow).find('.itemBoxTable__bodyCell--active .JS_toggle--color');

  // if there is an active color trigger in this bodyRow
  if(activeTrigger.length > 0) {
    toggleColorSelector($(activeTrigger));
  }
}

// close calendar if open
function closeCalendarOptions(itemBoxTable__bodyRow) {
  const activeTrigger = $(itemBoxTable__bodyRow).find('.itemBoxTable__bodyCell--active .JS_toggle--calendar');

  // if there is an active color trigger in this bodyRow
  if(activeTrigger.length > 0) {
    toggleCalendarSelector($(activeTrigger));
  }
}
