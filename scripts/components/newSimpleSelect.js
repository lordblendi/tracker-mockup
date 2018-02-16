// SIMPLE MULTISELECT
// in our case multiSelector-1
$('#multiSelector-1 .itemBoxTable__bodyRow').on('click', function(){
  const row = $(this);
  selectNewSingleItem(row);
})

// after click on new value
// replace value in the selectorField
// and close overlay
function selectNewSingleItem(row) {
  const newLabel = row.find('.js_itemBoxTable__bodyCell--text .itemBoxTable__bodyCellInner').html();

  const selectorField = $('.MULTISELECT__POPUP[data-popid="#multiSelector-1"]');
  const selectorLabelField = $(selectorField).find('.js_pmx-selector__blockPart--label');
  $(selectorLabelField).html(newLabel);

  closeOverlay();

  // set filter to empty, as we selected stuff
  var multiSelector = $(row).closest(".multiSelector");
  multiSelector.find('.js_multiSelector__filterInput').val("").keyup();
}
