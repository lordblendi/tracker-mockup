function closeAllOtherSublists(toggle) {

  const toolbox-table__row = toggle.closest('.toolbox-table__rowInner');

  if(!toggle.hasClass('JS_toggle--InclExcl')) {
    closeInclExclOptions(toolbox-table__row);
  }
  if(!toggle.hasClass('JS_toggle--color')) {
    closeColorOptions(toolbox-table__row);
  }
  if(!toggle.hasClass('JS_toggle--calendar')) {
    closeCalendarOptions(toolbox-table__row);
  }
  if(!toggle.hasClass('JS_toggle--columnpickerOptions')) {
    closeColumnpickerOptions(toolbox-table__row);
  }
}

// close incl-exlToggle if open
// used by Toggle
function closeInclExclOptions(toolbox-table__row) {
  const activeTrigger = $(toolbox-table__row).find('.toolbox-table__cell--active .JS_toggle--InclExcl');

  // if there is an active color trigger in this bodyRow
  if(activeTrigger.length > 0) {
    toggleInclExclSelector($(activeTrigger));
  }
}

// close colorToggle if open
// used by incl-exlToggle
function closeColorOptions(toolbox-table__row) {
  const activeTrigger = $(toolbox-table__row).find('.toolbox-table__cell--active .JS_toggle--color');

  // if there is an active color trigger in this bodyRow
  if(activeTrigger.length > 0) {
    toggleColorSelector($(activeTrigger));
  }
}

// close calendar if open
function closeCalendarOptions(toolbox-table__row) {
  const activeTrigger = $(toolbox-table__row).find('.toolbox-table__cell--active .JS_toggle--calendar');

  // if there is an active color trigger in this bodyRow
  if(activeTrigger.length > 0) {
    toggleCalendarSelector($(activeTrigger));
  }
}

// close columnpicker options if open
function closeColumnpickerOptions(toolbox-table__row) {
  const activeTrigger = $(toolbox-table__row).find('.toolbox-table__cell--active .JS_toggle--optionsColumnpicker');

  // if there is an active color trigger in this bodyRow
  if(activeTrigger.length > 0) {
    toggleCalendarSelector($(activeTrigger));
  }
}
