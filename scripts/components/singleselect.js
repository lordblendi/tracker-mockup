---
---

// SIMPLE MULTISELECT
// in our case multiSelector-1
$('.selector--singleselect .JS_filterable').on('click', function(){
  const row = $(this);
  selectNewSingleItem(row);
})

// after click on new value
// replace value in the selectorField
// both text and prefix background color
// and close overlay
function selectNewSingleItem(row) {
  // if there is a filter input field, exit the function as we should not close the popup on entering the input field
  if(row.find('.JS_filterInput').length > 0) {
    return;
  }
  const newLabel = row.find('.JS_text').html().trim();
  const newColor = row.find('.JS_color--prefix').css('background-color');

  // remove old selected
  const optionsChildren = row.closest('.JS_optionsChildren');
  $(optionsChildren).find('.JS_showSelected').remove();
  // add selected to new one
  $(row).append(`{% include javascript/itemSelected.html %}`);

  const selectorField = $('.JS_has-popup[data-popid="#multiSelector-1"]');
  $(selectorField).find('.JS_singleSelect--label').html(newLabel);
  $(selectorField).find('.JS_singleSelect--prefix').css('background-color', newColor);
  closeOverlay();

  // set filter to empty, as we selected stuff
  var multiSelector = $(row).closest(".multiSelector");
  multiSelector.find('.JS_multiSelector__filterInput').val("").keyup();
}