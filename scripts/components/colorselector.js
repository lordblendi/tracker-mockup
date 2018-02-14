// COLOR OPTIONS SELECTION
$('.js_itemBox--colors .itemBoxTable__bodyRow').on('click', function() {
  const color = $(this).find('.js_itemBoxTable__bodyCellInner--color i').attr('data-color');
  const itemBox = $(this).closest('.js_itemBox--colors');
  const bodyRow = $(itemBox).prev();

  bodyRow.find('.js_colorselector-trigger i').css('color', color);

  $('.itemBoxTable__bodyCell--active').each(function() {
    $(this).removeClass('itemBoxTable__bodyCell--active');
  });


  $.Velocity.animate(itemBox, 'slideUp').then(function() {
    $(colorBodyRow).addClass('js_itemBoxTable__bodyRow--closed');
    $(itemBox).addClass('js_itemBoxTable__bodyRow--closed');
  });
});


// COLOR OPTIONS EXPAND-COLLAPSE
$('.js_itemBoxTable__bodyCellInner--colortoggle').on('click', function() {
  // if there is a color box, expand/collapse it
  const itemBoxTable__bodyRow = $(this).closest('.itemBoxTable__bodyRow');
  const possibleChildren = itemBoxTable__bodyRow.next('.js_itemBox--colors')
  if(possibleChildren.length > 0) {
    expandCloseRow(itemBoxTable__bodyRow, undefined, possibleChildren);
  }
});
