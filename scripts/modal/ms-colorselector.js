---
---

// COLOR OPTIONS SELECTION
$('.JS_toolbox-table--colors .toolbox-table__rowInner').on('click', function() {
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
  const color = colorItemBodyRow.find('.JS_toolbox-table__cellInner--color .JS_Color').attr('data-color');
  // find the text of the item
  const toolboxTable = colorItemBodyRow.closest('.JS_toolbox-table--colors');
  const bodyRow = $(toolboxTable).prevAll('ul.toolbox-table__rowInner.JS_filterableCell:first:not(".JS_createNewTag")');
  const tagText = bodyRow.find('.JS_text').html().trim();

  // find all tags with the same text
  const modal = bodyRow.closest('.modal');
  const possibleTags = modal.find('.JS_text');
  var filteredTags = [];

  $.each(possibleTags, function(index, tag){
    if($(tag).html().trim() === tagText) {
      filteredTags.push(tag);
    }
  });

  // change color for all other tags, that have the same textOfActionItem
  $.each(filteredTags, function(index, tag){
    const tagBodyRow = $(tag).closest('.toolbox-table__rowInner');
    const colorItem = tagBodyRow.find('.JS_toggle--color .JS_Color');
    if($(colorItem).hasClass('JS_Color--prefix')) {
      colorItem.css('background-color', color).attr('data-color', color);
    }
    else {
      colorItem.css('color', color).attr('data-color', color);
    }

    // reset color tick of their color selection (in case it's open)
    const possibleChildren = tagBodyRow.next('.JS_toolbox-table--colors');
    $(possibleChildren).find('.JS_showSelected').remove();
    const selectedColor = possibleChildren.find(`.JS_toolbox-table__cellInner--color .JS_Color[data-color='${color}']`);
    const selectedColorBodyRow = $(selectedColor).closest('.toolbox-table__rowInner');
    selectedColorBodyRow.append(`{% include javascript/itemSelected.html %}`);


  });

  // remove active cell from bodyRow as we are closing the selector
  $(bodyRow).find('.toolbox-table__cell--active').removeClass('toolbox-table__cell--active');

  // close color options
  $.Velocity.animate(toolboxTable, 'slideUp').then(function() {
    $(toolboxTable).addClass('JS_children-closed');
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
  const toolbox-table__row = colorToggle.closest('.toolbox-table__rowInner');
  const possibleChildren = toolbox-table__row.nextAll('.JS_toolbox-table--colors:first');

  // only do the action, if the colorChildren exists
  if(possibleChildren.length > 0) {
    const actualColor = colorToggle.find('.JS_Color').attr('data-color');

    // remove other selection shower
    $(possibleChildren).find('.JS_showSelected').remove();

    // add selection to new color (can be changed by other tags)
    // only if opening
    const selectedColor = possibleChildren.find(`.JS_toolbox-table__cellInner--color .JS_Color[data-color='${actualColor}']`);
    const selectedColorBodyRow = $(selectedColor).closest('.toolbox-table__rowInner');
    selectedColorBodyRow.append(`{% include javascript/itemSelected.html %}`);

    const bodyCell = colorToggle.closest('.toolbox-table__cell');
    if (bodyCell.hasClass('toolbox-table__cell--active')) {
      bodyCell.removeClass('toolbox-table__cell--active');
    }
    else {
      bodyCell.addClass('toolbox-table__cell--active');
    }

    expandCloseRow(toolbox-table__row, undefined, possibleChildren);
  }
}





// INITIAL - collapse all color options
const colorOptions = $(".JS_selectionChildren, .JS_optionsChildren, .JS_toolbox-table--suggestions").find('.JS_toolbox-table--children.JS_toolbox-table--colors');
const colorBodyRow = $(colorOptions).find('.toolbox-table__rowInner');

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
  const possibleColorChildren = $(item).next('.JS_toolbox-table--colors');
  possibleColorChildren.css('display', 'none').addClass('JS_children-closed');
  $(item).addClass('JS_children-closed');

  // color setting action
  $(possibleColorChildren).find('.toolbox-table__rowInner').on('click', function() {
    const colorItemBodyRow = $(this);
    selectNewColor(colorItemBodyRow);
  });

}
