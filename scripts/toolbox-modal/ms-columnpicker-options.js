---
---

// columnpicker OPTIONS EXPAND-COLLAPSE
$('.JS_toggle--columnpickerOptions').on('click', function() {
  const toggle = $(this);
  closeAllOtherSublists(toggle);
  toggleColumnpickerOptions(toggle);
});

// open options
function toggleColumnpickerOptions(toggle) {
  // if there is a color box, expand/collapse it
  const toolboxTable__row = toggle.closest('.toolbox-table__rowInner');
  const possibleChildren = toolboxTable__row.nextAll('.JS_toolbox-table--columnpickerOptions:first');

  // only toggle, if they actually exists;
  if (possibleChildren.length > 0) {

    const bodyCell = toggle.closest('.toolbox-table__cell');
    if (bodyCell.hasClass('toolbox-table__cell--active')) {
      bodyCell.removeClass('toolbox-table__cell--active');
    } else {
      bodyCell.addClass('toolbox-table__cell--active');
    }

    expandCloseRow(toolboxTable__row, undefined, possibleChildren);
  }
}


$('.JS_toolbox-table--columnpickerOptions .JS_toolbox-selectorItem').on('click', function() {
  handleColumnPickerOptionChange($(this));
});

function handleColumnPickerOptionChange(selector) {
  const toolboxTable = $(selector).closest('.JS_toolbox-table--columnpickerOptions');

  const enabledOptions = $(toolboxTable).find('.JS_columnPickerOption--enabled.JS_toolbox-selectorItem--active');

  var columnPickerToggleContent = `{% include javascript/ms-columnpickerOption--disabled.html%}`;

  if (enabledOptions.length > 0) {
    columnPickerToggleContent = `{% include javascript/ms-columnpickerOption--enabled.html%}`;
  }

  const bodyRow = $(toolboxTable).prevAll('ul.toolbox-table__rowInner.JS_filterableCell:first');
  const toggle = $(bodyRow).find('.JS_toggle--columnpickerOptions');
  toggle.html(columnPickerToggleContent);

  // show reset to default
  const modal = $(bodyRow).closest('.toolbox-modal');
  showResetToDefault(modal);
}
