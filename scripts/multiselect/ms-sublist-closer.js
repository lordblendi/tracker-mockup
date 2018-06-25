function closeAllOtherSublists(toggle) {

  const itemBox__row = toggle.closest('.itemBox__rowInner');

  if(!toggle.hasClass('JS_toggle--InclExcl')) {
    closeInclExclOptions(itemBox__row);
  }
  if(!toggle.hasClass('JS_toggle--color')) {
    closeColorOptions(itemBox__row);
  }
  if(!toggle.hasClass('JS_toggle--calendar')) {
    closeCalendarOptions(itemBox__row);
  }
  if(!toggle.hasClass('JS_toggle--columnpickerOptions')) {
    closeColumnpickerOptions(itemBox__row);
  }
}

// close incl-exlToggle if open
// used by Toggle
function closeInclExclOptions(itemBox__row) {
  const activeTrigger = $(itemBox__row).find('.itemBox__cell--active .JS_toggle--InclExcl');

  // if there is an active color trigger in this bodyRow
  if(activeTrigger.length > 0) {
    toggleInclExclSelector($(activeTrigger));
  }
}

// close colorToggle if open
// used by incl-exlToggle
function closeColorOptions(itemBox__row) {
  const activeTrigger = $(itemBox__row).find('.itemBox__cell--active .JS_toggle--color');

  // if there is an active color trigger in this bodyRow
  if(activeTrigger.length > 0) {
    toggleColorSelector($(activeTrigger));
  }
}

// close calendar if open
function closeCalendarOptions(itemBox__row) {
  const activeTrigger = $(itemBox__row).find('.itemBox__cell--active .JS_toggle--calendar');

  // if there is an active color trigger in this bodyRow
  if(activeTrigger.length > 0) {
    toggleCalendarSelector($(activeTrigger));
  }
}

// close columnpicker options if open
function closeColumnpickerOptions(itemBox__row) {
  const activeTrigger = $(itemBox__row).find('.itemBox__cell--active .JS_toggle--optionsColumnpicker');

  // if there is an active color trigger in this bodyRow
  if(activeTrigger.length > 0) {
    toggleCalendarSelector($(activeTrigger));
  }
}
