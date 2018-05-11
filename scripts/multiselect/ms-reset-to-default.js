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
    const newContent = $.parseHTML(newContentString);
    const newContentSelectedChildren = $(newContent).find('.JS_selectionChildren');

    const selectedTitleToggle = $(multiSelector).find('.JS_selectionTitle .JS_toggle');
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
      duration: 125
    });
  }
}
function hideResetToDefault(multiSelector) {
  const suggestion = $(multiSelector).find('.JS_itemBox--resetSuggestion');
  if (suggestion.css("display") === 'block') {
    $.Velocity.animate(suggestion, 'slideUp', {
      duration: 125
    });
  }
}
