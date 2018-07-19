---
---

// SIMPLE SINGLESELECT
// in our case modal-1
$('.toolbox-selector--singleselect .JS_filterable').on('click', function(){
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

  const selectorField = $('.JS_has-popup[data-popid="#modal-1"]');
  $(selectorField).find('.JS_singleSelect--label').html(newLabel);
  $(selectorField).find('.JS_singleSelect--prefix').css('background-color', newColor);
  closeOverlay();

  // set filter to empty, as we selected stuff
  var modal = $(row).closest(".modal");
  modal.find('.JS_modal__filterInput').val("").keyup();
}
