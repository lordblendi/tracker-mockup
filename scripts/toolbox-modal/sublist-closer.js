function closeAllOtherSublists(toggle) {

  const toolboxTable__row = toggle.closest('.toolbox-table__rowInner');

  if(!toggle.hasClass('JS_toggle--InclExcl')) {
    closeInclExclOptions(toolboxTable__row);
  }
  if(!toggle.hasClass('JS_toggle--color')) {
    closeColorOptions(toolboxTable__row);
  }
  if(!toggle.hasClass('JS_toggle--calendar')) {
    closeCalendarOptions(toolboxTable__row);
  }
  if(!toggle.hasClass('JS_toggle--columnpickerOptions')) {
    closeColumnpickerOptions(toolboxTable__row);
  }
}

// close incl-exlToggle if open
// used by Toggle
function closeInclExclOptions(toolboxTable__row) {
  const activeTrigger = $(toolboxTable__row).find('.toolbox-table__cell--active .JS_toggle--InclExcl');

  // if there is an active color trigger in this bodyRow
  if(activeTrigger.length > 0) {
    toggleInclExclSelector($(activeTrigger));
  }
}

// close colorToggle if open
// used by incl-exlToggle
function closeColorOptions(toolboxTable__row) {
  const activeTrigger = $(toolboxTable__row).find('.toolbox-table__cell--active .JS_toggle--color');

  // if there is an active color trigger in this bodyRow
  if(activeTrigger.length > 0) {
    toggleColorSelector($(activeTrigger));
  }
}

// close calendar if open
function closeCalendarOptions(toolboxTable__row) {
  const activeTrigger = $(toolboxTable__row).find('.toolbox-table__cell--active .JS_toggle--calendar');

  // if there is an active color trigger in this bodyRow
  if(activeTrigger.length > 0) {
    toggleCalendarSelector($(activeTrigger));
  }
}

// close columnpicker options if open
function closeColumnpickerOptions(toolboxTable__row) {
  const activeTrigger = $(toolboxTable__row).find('.toolbox-table__cell--active .JS_toggle--optionsColumnpicker');

  // if there is an active color trigger in this bodyRow
  if(activeTrigger.length > 0) {
    toggleCalendarSelector($(activeTrigger));
  }
}
