---
---

// COLOR OPTIONS SELECTION
$('.JS_itemBox--colors .itemBoxTable__bodyRow').on('click', function() {
  const colorItemBodyRow = $(this);
  selectNewColor(colorItemBodyRow);
});

// function to set a new color
// gets old color, replaces in the bodyRow
// the changes it everywhere for the same text tags
//      plus in their might be open color palette
// then close the pallette
function selectNewColor(colorItemBodyRow) {
  // get new color
  const color = colorItemBodyRow.find('.JS_itemBoxTable__bodyCellInner--color i').attr('data-color');
  // find the text of the item
  const itemBox = colorItemBodyRow.closest('.JS_itemBox--colors');
  const bodyRow = $(itemBox).prevAll('ul.itemBoxTable__bodyRow.JS_filterableCell:first');
  const tagText = bodyRow.find('.JS_itemBoxTable__bodyCellInner--text').html().trim();

  // find all tags with the same text
  const multiSelector = bodyRow.closest('.multiSelector');
  const possibleTags = multiSelector.find('.JS_itemBoxTable__bodyCellInner--text');
  var filteredTags = [];

  $.each(possibleTags, function(index, tag){
    if($(tag).html().trim() === tagText) {
      filteredTags.push(tag);
    }
  });

  // change color for all other tags, that have the same textOfActionItem
  $.each(filteredTags, function(index, tag){
    const tagBodyRow = $(tag).closest('.itemBoxTable__bodyRow');
    tagBodyRow.find('.JS_colorselector-trigger i').css('color', color).attr('data-color', color);

    // reset color tick of their color selection (in case it's open)
    const possibleChildren = tagBodyRow.next('.JS_itemBox--colors');
    $(possibleChildren).find('.JS_showSelected').remove();
    const selectedColor = possibleChildren.find(`.JS_itemBoxTable__bodyCellInner--color i[data-color='${color}']`);
    const selectedColorBodyRow = $(selectedColor).closest('.itemBoxTable__bodyRow');
    selectedColorBodyRow.append(`{% include javascript/colorSelected.html %}`);


  });

  // remove active cell from bodyRow as we are closing the selector
  $(bodyRow).find('.itemBoxTable__bodyCell--active').removeClass('itemBoxTable__bodyCell--active');

  // close color options
  $.Velocity.animate(itemBox, 'slideUp').then(function() {
    $(itemBox).addClass('JS_itemBoxTable__bodyRow--closed');
  });
}


// COLOR OPTIONS EXPAND-COLLAPSE
$('.JS_itemBoxTable__bodyCellInner--colortoggle').on('click', function() {
  const colorToggle = $(this);
  toggleColorSelector(colorToggle);
});

// open color color pallette
// set a tick for the selected color
// toggle active class depending on expanding/collapsing
function toggleColorSelector(colorToggle) {
  // if there is a color box, expand/collapse it
  const itemBoxTable__bodyRow = colorToggle.closest('.itemBoxTable__bodyRow');
  const possibleChildren = itemBoxTable__bodyRow.nextAll('.JS_itemBox--colors:first');

  const actualColor = colorToggle.find('i').attr('data-color');


  // remove other selection shower
  $(possibleChildren).find('.JS_showSelected').remove();

  // add selection to new color (can be changed by other tags)
  // only if opening
  const selectedColor = possibleChildren.find(`.JS_itemBoxTable__bodyCellInner--color i[data-color='${actualColor}']`);
  const selectedColorBodyRow = $(selectedColor).closest('.itemBoxTable__bodyRow');
  selectedColorBodyRow.append(`{% include javascript/colorSelected.html %}`);

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
const colorOptions = $(".JS_multiSelector__box--selectionChildren, .JS_multiSelector__box--optionsChildren, .JS_itemBox--suggestions").find('.itemBox--children.JS_itemBox--colors');
const colorBodyRow = $(colorOptions).find('.itemBoxTable__bodyRow');

$.Velocity.animate(colorOptions, 'slideUp').then(function() {
  $(colorOptions).addClass('JS_itemBoxTable__bodyRow--closed');
});


// MULTISELECT - RESET COLOR TOGGLES
function resetColorToggle(item) {
  // expand/collapse for new selected item
  $(item).find('.JS_itemBoxTable__bodyCellInner--colortoggle').on('click', function() {
    const colorToggle = $(this);
    toggleColorSelector(colorToggle);
  });

  // set colorselector hidden
  const possibleColorChildren = $(item).next('.JS_itemBox--colors');
  possibleColorChildren.css('display', 'none').addClass('JS_itemBoxTable__bodyRow--closed');
  $(item).addClass('JS_itemBoxTable__bodyRow--closed');

  // color setting action
  $(possibleColorChildren).find('.itemBoxTable__bodyRow').on('click', function() {
    const colorItemBodyRow = $(this);
    selectNewColor(colorItemBodyRow);
  });

}
