---
---

$('.JS_resetToDefault').on('click', function() {
  resetToDefault($(this));
});

function resetToDefault(resetToDefaultRow) {
  const modal = resetToDefaultRow.closest('.toolbox-modal');
  const replaceFile = $(resetToDefaultRow).attr('reset-file');

  var newContentString = '';

  // if the replace file is columnpicker, use that html
  if (replaceFile === 'columnpicker') {
    newContentString = `{% include popups/toolbox-modal-columnpicker.html %}`;
  }

  // only replace it if the newContentString is not empty
  if (newContentString.length > 0) {
    var selectedBlockClass = '.JS_selectionChildren';

    const newContent = $.parseHTML(newContentString);
    const newContentSelectedChildren = $(newContent).find(selectedBlockClass);
    var selectedTitleToggle = $(modal).find('.JS_selectionTitle .JS_toggle');

    // see if the selected block is even there or not. If not, add it
    var selection = modal.find(selectedBlockClass);
    if(selection === null || selection === undefined || selection.length === 0) {
      addSelectedBlock(modal, selectedBlockClass);
      selection = modal.find(selectedBlockClass);
      selectedTitleToggle = $(modal).find('.JS_selectionTitle .JS_toggle');
      selectedTitleToggle.on('click', function() {
        const toolboxTable__row = $(this).closest('.toolbox-table__rowInner');
        expandCloseRow(toolboxTable__row);
      });
    }

    // collapse SelectedChildren
    // replace selectedChildren with default options
    // expand selectedChildren
    // hide reset-to-default row
    selectedTitleToggle.click();
    setTimeout(function() {
      $(modal).find('.JS_selectionChildren').html($(newContentSelectedChildren).html());
      reset();
      resetFilterActions();
      selectedTitleToggle.click();
      hideResetToDefault(modal);
    }, 300);
  }
}

function showResetToDefault(modal) {
  const suggestion = $(modal).find('.JS_toolbox-table--resetSuggestion');
  if (suggestion.css("display") !== 'flex') {
    $.Velocity.animate(suggestion, 'slideDown', {
      duration: 125,
      delay: 250,
      display: 'flex'
    });
  }
}
function hideResetToDefault(modal) {
  const suggestion = $(modal).find('.JS_toolbox-table--resetSuggestion');
  if (suggestion.css("display") === 'flex') {
    $.Velocity.animate(suggestion, 'slideUp', {
      duration: 125,
      delay: 250
    });
  }
}
