---
---

// SELECT INCL/EXCL
$('.JS_itemBox--filterInclExcl .itemBoxTable__bodyRow').on('click', function() {
  const incleExclBodyRow = $(this);
  selectNewFilterOption(incleExclBodyRow);
});

// function to set a new filter option
// gets old filter option, replaces in the bodyRow
// then close the pallette
function selectNewFilterOption(incleExclBodyRow) {
  // get new option
  const newOption = incleExclBodyRow.find('.JS_itemBoxTable__bodyCellInner--inclExcl').attr('data-filter');

  // find the bodyRow related to this toggle
  const itemBox = incleExclBodyRow.closest('.JS_itemBox--filterInclExcl');
  const bodyRow = $(itemBox).prevAll('ul.itemBoxTable__bodyRow.JS_filterableCell:first');

  // find toggle and replace text and data-filter
  const toggle = $(bodyRow).find('.JS_inclExl');
  const oldOption = toggle.html().trim();
  toggle.html(newOption).attr('data-filter', newOption);

  // update it in the selected section if it wasn't the same as before
  if(oldOption !== newOption) {
    // get the good classes
    const selectedBlockClass = ".JS_multiSelector__box--selectionChildren";
    const oldClass = selectedBlockClass + oldOption;
    const newClass = selectedBlockClass + newOption;

    // find the blocks
    const multiSelector = $(bodyRow).closest('.multiSelector');
    const oldSelection = $(multiSelector).find(oldClass);
    var newSelection = $(multiSelector).find(newClass);

    // if newSelectionBlock is not there, add it
    if(newSelection === null || newSelection === undefined || newSelection.length === 0) {
      addSelectedBlock(multiSelector, newClass);
      newSelection = multiSelector.find(newClass);
    }

    // find the text in bodyRow - this should be only one
    const textOfActionItem = $(bodyRow).find('.JS_itemBoxTable__bodyCellInner--text').html().trim();

    // find the position of the old item, what should be removed
    const selectedItems = oldSelection.find('.JS_itemBoxTable__bodyCellInner--text');
    const selectedItemTexts = $.map(selectedItems, function(item){
      return $(item).html().trim();
    });
    const positionOfItemInSelected = $.inArray(textOfActionItem, selectedItemTexts);

    const oldItemTextBlock = selectedItems[positionOfItemInSelected];
    const oldItemBodyRow = $(oldItemTextBlock).closest('ul.itemBoxTable__bodyRow.JS_filterableCell');
    // append to newSelectedBlock
    // cloning includes eventhandlers too
    // remove from oldSelectedBlock
    newSelection.append(oldItemBodyRow.clone(true));
    oldItemBodyRow.remove();
  }

  // remove active cell from bodyRow as we are closing the selector
  $(bodyRow).find('.itemBoxTable__bodyCell--active').removeClass('itemBoxTable__bodyCell--active');

  // close options
  $.Velocity.animate(itemBox, 'slideUp').then(function() {
    $(itemBox).addClass('JS_itemBoxTable__bodyRow--closed');
  });
}

// INCL-EXCL OPTIONS EXPAND-COLLAPSE
$('.JS_itemBoxTable__bodyCellInner--inclexcltoggle').on('click', function() {
  const toggle = $(this);
  closeColorOptions(toggle);
  toggleInclExclSelector(toggle);
});

// open color incl/excl pallette
// set a tick for the selected option
// toggle active class depending on expanding/collapsing
function toggleInclExclSelector(toggle) {
  // if there is a color box, expand/collapse it
  const itemBoxTable__bodyRow = toggle.closest('.itemBoxTable__bodyRow');
  const possibleChildren = itemBoxTable__bodyRow.nextAll('.JS_itemBox--filterInclExcl:first');

  // only toggle, if they actually exists;
  if(possibleChildren.length > 0) {
    const actualFilter = toggle.find('.JS_inclExl').attr('data-filter');


  // remove other selection shower
  $(possibleChildren).find('.JS_showSelected').remove();

  // // add selection to new color (can be changed by other tags)
  // // only if opening

  const selectedFilter = possibleChildren.find(`.JS_itemBoxTable__bodyCellInner--inclExcl[data-filter='${actualFilter}']`);
  const selectedFilterBodyRow = $(selectedFilter).closest('.itemBoxTable__bodyRow');
  selectedFilterBodyRow.append(`{% include javascript/itemSelected.html %}`);



  const bodyCell = toggle.closest('.itemBoxTable__bodyCell');
  if (bodyCell.hasClass('itemBoxTable__bodyCell--active')) {
    bodyCell.removeClass('itemBoxTable__bodyCell--active');
  }
  else {
    bodyCell.addClass('itemBoxTable__bodyCell--active');
  }

    expandCloseRow(itemBoxTable__bodyRow, undefined, possibleChildren);
  }
}



// close incl-exlToggle if open
// used by colorToggle
function closeInclExclOptions(colorToggle) {
  const itemBoxTable__bodyRow = colorToggle.closest('.itemBoxTable__bodyRow');
  const activeInclExclTrigger = $(itemBoxTable__bodyRow).find('.JS_incl-excl-trigger.itemBoxTable__bodyCell--active');

  // if there is an active color trigger in this bodyRow
  if(activeInclExclTrigger.length > 0) {
    const inclExlToggle = $(activeInclExclTrigger).find('.JS_itemBoxTable__bodyCellInner--inclexcltoggle');
    toggleInclExclSelector($(inclExlToggle));
  }

}
