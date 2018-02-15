// COLOR OPTIONS SELECTION
$('.js_itemBox--colors .itemBoxTable__bodyRow').on('click', function() {
  const color = $(this).find('.js_itemBoxTable__bodyCellInner--color i').attr('data-color');
  const itemBox = $(this).closest('.js_itemBox--colors');
  const bodyRow = $(itemBox).prev();

  bodyRow.find('.js_colorselector-trigger i').css('color', color).attr('data-color', color);

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



// INITIAL - collapse all color options
const colorOptions = $(".js_multiSelector__box--selectionChildren, .js_multiSelector__box--optionsChildren").find('.itemBox--children.js_itemBox--colors');
const colorBodyRow = $(colorOptions).find('.itemBoxTable__bodyRow');

$.Velocity.animate(colorOptions, 'slideUp').then(function() {
  $(colorBodyRow).addClass('js_itemBoxTable__bodyRow--closed');
  $(colorOptions).addClass('js_itemBoxTable__bodyRow--closed');
});


// MULTISELECT - RESET COLOR TOGGLES
function resetColorToggle(item) {
  // expand/collapse for new selected item
  $(item).find('.js_itemBoxTable__bodyCellInner--colortoggle').on('click', function() {
    // if there is a color box, expand/collapse it
    const itemBoxTable__bodyRow = $(this).closest('.itemBoxTable__bodyRow');
    const possibleChildren = itemBoxTable__bodyRow.next('.js_itemBox--colors');
    if(possibleChildren.length > 0) {
      expandCloseRow(itemBoxTable__bodyRow, undefined, possibleChildren);
    }
  });

  const possibleColorChildren = $(item).next('.js_itemBox--colors');
  possibleColorChildren.css('display', 'none').addClass('js_itemBoxTable__bodyRow--closed');
  $(item).addClass('js_itemBoxTable__bodyRow--closed');

  $(possibleColorChildren).find('.itemBoxTable__bodyRow').on('click', function() {
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

}
