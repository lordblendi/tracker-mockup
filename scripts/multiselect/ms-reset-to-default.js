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
    $(multiSelector).html($(newContent).html());
    reset();
  }
}

function showResetToDefault(multiSelector){
  const suggestion = $(multiSelector).find('.JS_itemBox--resetSuggestion');
  if(suggestion.css("display") !== 'block') {
    $.Velocity.animate(suggestion, 'slideDown');
  }
}
