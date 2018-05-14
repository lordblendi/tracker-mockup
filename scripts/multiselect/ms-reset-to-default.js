---
---

$('.JS_resetToDefault').on('click', function() {
  resetToDefault($(this));
});

function resetToDefault(resetToDefaultRow) {
  const multiSelector = resetToDefaultRow.closest('.multiSelector');
  const replaceFile = $(resetToDefaultRow).attr('reset-file');

  var newContentString = '';

  // if the replace file is columnpicker, use that html
  if (replaceFile === 'columnpicker') {
    newContentString = `{% include popups/multiSelector-columnpicker.html %}`;
  }

  // only replace it if the newContentString is not empty
  if (newContentString.length > 0) {
    var selectedBlockClass = '.JS_selectionChildren';

    const newContent = $.parseHTML(newContentString);
    const newContentSelectedChildren = $(newContent).find(selectedBlockClass);
    var selectedTitleToggle = $(multiSelector).find('.JS_selectionTitle .JS_toggle');

    // see if the selected block is even there or not. If not, add it
    var selection = multiSelector.find(selectedBlockClass);
    if(selection === null || selection === undefined || selection.length === 0) {
      addSelectedBlock(multiSelector, selectedBlockClass);
      selection = multiSelector.find(selectedBlockClass);
      selectedTitleToggle = $(multiSelector).find('.JS_selectionTitle .JS_toggle');
      selectedTitleToggle.on('click', function() {
        const itemBox__row = $(this).closest('.itemBox__row');
        expandCloseRow(itemBox__row);
      });
    }

    // collapse SelectedChildren
    // replace selectedChildren with default options
    // expand selectedChildren
    // hide reset-to-default row
    selectedTitleToggle.click();
    setTimeout(function() {
      $(multiSelector).find('.JS_selectionChildren').html($(newContentSelectedChildren).html());
      reset();
      resetFilterActions();
      selectedTitleToggle.click();
      hideResetToDefault(multiSelector);
    }, 300);
  }
}

function showResetToDefault(multiSelector) {
  const suggestion = $(multiSelector).find('.JS_itemBox--resetSuggestion');
  if (suggestion.css("display") !== 'block') {
    $.Velocity.animate(suggestion, 'slideDown', {
      duration: 125,
      delay: 250
    });
  }
}
function hideResetToDefault(multiSelector) {
  const suggestion = $(multiSelector).find('.JS_itemBox--resetSuggestion');
  if (suggestion.css("display") === 'block') {
    $.Velocity.animate(suggestion, 'slideUp', {
      duration: 125,
      delay: 250
    });
  }
}
