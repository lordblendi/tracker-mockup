---
---

$('.JS_resetToDefault').on('click', function() {
  resetToDefault($(this));
});

function resetToDefault(resetToDefaultRow) {
  const multiSelector = resetToDefaultRow.closest('.multiSelector');
  const replaceFile = $(resetToDefaultRow).attr('reset-file');

  if (replaceFile === 'columnpicker') {
    const newContentString = `{% include popups/multiSelector-columnpicker.html %}`;
    const newContent = $.parseHTML(newContentString.replace('id="multiSelector-columnpicker"', ''));
    $(multiSelector).html($(newContent).html());
    reset();
  }
}
