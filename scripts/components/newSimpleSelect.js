//////
// MULTI SELECT ONCLICK
//////
//
// SIMPLE
// $('.MULTISELECT__POPUP[data-popid="#multiSelector-1"]')
$('#multiSelector-1 .itemBoxTable__bodyRow').on('click', function(){
  const row = $(this);
  const newLabel = row.find('.js_itemBoxTable__bodyCell--text .itemBoxTable__bodyCellInner').html();

  const selectorField = $('.MULTISELECT__POPUP[data-popid="#multiSelector-1"]');
  const selectorLabelField = $(selectorField).find('.js_pmx-selector__blockPart--label');
  $(selectorLabelField).html(newLabel);

  $(".overlay").css("display", 'none');
  $('#multiSelector-1, #multiSelector-2, #multiSelector-3, #multiSelector-tagpicker').css({
    'z-index': '0',
    'pointer-events': 'none',
    'opacity': '0',
  });
})
