// COLOR OPTIONS SELECTION
$('.js_itemBox--colors .itemBoxTable__bodyRow').on('click', function() {
  const colorItemBodyRow = $(this);
  selectNewColor(colorItemBodyRow);
});

function selectNewColor(colorItemBodyRow) {
  // get new color
  const color = colorItemBodyRow.find('.js_itemBoxTable__bodyCellInner--color i').attr('data-color');
  // find the text of the item
  const itemBox = colorItemBodyRow.closest('.js_itemBox--colors');
  const bodyRow = $(itemBox).prev();
  const tagText = bodyRow.find('.js_itemBoxTable__bodyCellInner--text').html().trim();

  // find all tags with the same text
  const multiSelector = bodyRow.closest('.multiSelector');
  const possibleTags = multiSelector.find('.js_itemBoxTable__bodyCellInner--text');
  var filteredTags = [];

  $.each(possibleTags, function(index, tag){
    if($(tag).html().trim() === tagText) {
      filteredTags.push(tag);
    }
  });

  // change color for all other tags, that have the same textOfActionItem
  $.each(filteredTags, function(index, tag){
    const tagBodyRow = $(tag).closest('.itemBoxTable__bodyRow');
    tagBodyRow.find('.js_colorselector-trigger i').css('color', color).attr('data-color', color);
  });

  // remove active cells
  $('.itemBoxTable__bodyCell--active').removeClass('itemBoxTable__bodyCell--active');

  // close color options
  $.Velocity.animate(itemBox, 'slideUp').then(function() {
    $(itemBox).addClass('js_itemBoxTable__bodyRow--closed');
  });
}


// COLOR OPTIONS EXPAND-COLLAPSE
$('.js_itemBoxTable__bodyCellInner--colortoggle').on('click', function() {
  const colorToggle = $(this);
  toggleColorSelector(colorToggle);
});

function toggleColorSelector(colorToggle) {
  // if there is a color box, expand/collapse it
  const itemBoxTable__bodyRow = colorToggle.closest('.itemBoxTable__bodyRow');
  const possibleChildren = itemBoxTable__bodyRow.next('.js_itemBox--colors');

  const bodyCell = colorToggle.closest('.itemBoxTable__bodyCell');
  if (bodyCell.hasClass('itemBoxTable__bodyCell--active')) {
    bodyCell.removeClass('itemBoxTable__bodyCell--active');
  }
  else {
    bodyCell.addClass('itemBoxTable__bodyCell--active');
  }

  if(possibleChildren.length > 0) {
    expandCloseRow(itemBoxTable__bodyRow, undefined, possibleChildren);
  }
}



// INITIAL - collapse all color options
const colorOptions = $(".js_multiSelector__box--selectionChildren, .js_multiSelector__box--optionsChildren, .js_itemBox--suggestions").find('.itemBox--children.js_itemBox--colors');
const colorBodyRow = $(colorOptions).find('.itemBoxTable__bodyRow');

$.Velocity.animate(colorOptions, 'slideUp').then(function() {
  $(colorOptions).addClass('js_itemBoxTable__bodyRow--closed');
});


// MULTISELECT - RESET COLOR TOGGLES
function resetColorToggle(item) {
  // expand/collapse for new selected item
  $(item).find('.js_itemBoxTable__bodyCellInner--colortoggle').on('click', function() {
    const colorToggle = $(this);
    toggleColorSelector(colorToggle);
  });

  // set colorselector hidden
  const possibleColorChildren = $(item).next('.js_itemBox--colors');
  possibleColorChildren.css('display', 'none').addClass('js_itemBoxTable__bodyRow--closed');
  $(item).addClass('js_itemBoxTable__bodyRow--closed');

  $(possibleColorChildren).find('.itemBoxTable__bodyRow').on('click', function() {
    const colorItemBodyRow = $(this);
    selectNewColor(colorItemBodyRow);
  });

}
