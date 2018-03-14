// SIMPLE MULTISELECT
// in our case multiSelector-1
$('#multiSelector-1 .itemBoxTable__bodyRow.JS_filterableCell').on('click', function(){
  const row = $(this);
  selectNewSingleItem(row);
})

// after click on new value
// replace value in the selectorField
// and close overlay
function selectNewSingleItem(row) {
  // if there is a filter input field, exit the function as we should not close the popup on entering the input field
  if(row.find('.JS_multiSelector__filterInput').length > 0) {
    return;
  }
  const newLabel = row.find('.JS_itemBoxTable__bodyCell--text .itemBoxTable__bodyCellInner').html();

  const selectorField = $('.MULTISELECT__POPUP[data-popid="#multiSelector-1"]');
  const selectorLabelField = $(selectorField).find('.JS_pmx-selector__blockPart--label');
  $(selectorLabelField).html(newLabel);
  closeOverlay();

  // set filter to empty, as we selected stuff
  var multiSelector = $(row).closest(".multiSelector");
  multiSelector.find('.JS_multiSelector__filterInput').val("").keyup();
}
