---
---

// COLOR OPTIONS SELECTION
$('.JS_itemBox--colors .itemBox__row').on('click', function() {
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
  const color = colorItemBodyRow.find('.JS_itemBox__cellInner--color .JS_Color').attr('data-color');
  // find the text of the item
  const itemBox = colorItemBodyRow.closest('.JS_itemBox--colors');
  const bodyRow = $(itemBox).prevAll('ul.itemBox__row.JS_filterableCell:first:not(".JS_createNewTag")');
  const tagText = bodyRow.find('.JS_text').html().trim();

  // find all tags with the same text
  const multiSelector = bodyRow.closest('.multiSelector');
  const possibleTags = multiSelector.find('.JS_text');
  var filteredTags = [];

  $.each(possibleTags, function(index, tag){
    if($(tag).html().trim() === tagText) {
      filteredTags.push(tag);
    }
  });

  // change color for all other tags, that have the same textOfActionItem
  $.each(filteredTags, function(index, tag){
    const tagBodyRow = $(tag).closest('.itemBox__row');
    const colorItem = tagBodyRow.find('.JS_toggle--color .JS_Color');
    if($(colorItem).hasClass('JS_Color--prefix')) {
      colorItem.css('background-color', color).attr('data-color', color);
    }
    else {
      colorItem.css('color', color).attr('data-color', color);
    }

    // reset color tick of their color selection (in case it's open)
    const possibleChildren = tagBodyRow.next('.JS_itemBox--colors');
    $(possibleChildren).find('.JS_showSelected').remove();
    const selectedColor = possibleChildren.find(`.JS_itemBox__cellInner--color .JS_Color[data-color='${color}']`);
    const selectedColorBodyRow = $(selectedColor).closest('.itemBox__row');
    selectedColorBodyRow.append(`{% include javascript/itemSelected.html %}`);


  });

  // remove active cell from bodyRow as we are closing the selector
  $(bodyRow).find('.itemBox__cell--active').removeClass('itemBox__cell--active');

  // close color options
  $.Velocity.animate(itemBox, 'slideUp').then(function() {
    $(itemBox).addClass('JS_children-closed');
  });
}


// COLOR OPTIONS EXPAND-COLLAPSE
$('.JS_toggle--color').on('click', function() {
  const colorToggle = $(this);
  closeAllOtherSublists(colorToggle);
  toggleColorSelector(colorToggle);
});

// open color pallette
// set a tick for the selected color
// toggle active class depending on expanding/collapsing
function toggleColorSelector(colorToggle) {
  // if there is a color box, expand/collapse it
  const itemBox__row = colorToggle.closest('.itemBox__row');
  const possibleChildren = itemBox__row.nextAll('.JS_itemBox--colors:first');

  // only do the action, if the colorChildren exists
  if(possibleChildren.length > 0) {
    const actualColor = colorToggle.find('.JS_Color').attr('data-color');

    // remove other selection shower
    $(possibleChildren).find('.JS_showSelected').remove();

    // add selection to new color (can be changed by other tags)
    // only if opening
    const selectedColor = possibleChildren.find(`.JS_itemBox__cellInner--color .JS_Color[data-color='${actualColor}']`);
    const selectedColorBodyRow = $(selectedColor).closest('.itemBox__row');
    selectedColorBodyRow.append(`{% include javascript/itemSelected.html %}`);

    const bodyCell = colorToggle.closest('.itemBox__cell');
    if (bodyCell.hasClass('itemBox__cell--active')) {
      bodyCell.removeClass('itemBox__cell--active');
    }
    else {
      bodyCell.addClass('itemBox__cell--active');
    }

    expandCloseRow(itemBox__row, undefined, possibleChildren);
  }
}





// INITIAL - collapse all color options
const colorOptions = $(".JS_selectionChildren, .JS_optionsChildren, .JS_itemBox--suggestions").find('.JS_itemBox--children.JS_itemBox--colors');
const colorBodyRow = $(colorOptions).find('.itemBox__row');

$.Velocity.animate(colorOptions, 'slideUp').then(function() {
  $(colorOptions).addClass('JS_children-closed');
});


// MULTISELECT - RESET COLOR TOGGLES
function resetColorToggle(item) {
  // expand/collapse for new selected item
  $(item).find('.JS_toggle--color').on('click', function() {
    const colorToggle = $(this);
    toggleColorSelector(colorToggle);
  });

  // set colorselector hidden
  const possibleColorChildren = $(item).next('.JS_itemBox--colors');
  possibleColorChildren.css('display', 'none').addClass('JS_children-closed');
  $(item).addClass('JS_children-closed');

  // color setting action
  $(possibleColorChildren).find('.itemBox__row').on('click', function() {
    const colorItemBodyRow = $(this);
    selectNewColor(colorItemBodyRow);
  });

}
