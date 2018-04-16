---
---

// SELECT INCL/EXCL
$('.JS_itemBox--filterInclExcl .itemBox__row').on('click', function() {
  const incleExclBodyRow = $(this);
  selectNewFilterOption(incleExclBodyRow);
});

// function to set a new filter option
// gets old filter option, replaces in the bodyRow
// then close the pallette
function selectNewFilterOption(incleExclBodyRow) {
  // get new option
  const newOption = incleExclBodyRow.find('.JS_itemBox__cellInner--inclExcl').attr('data-filter');

  // find the bodyRow related to this toggle
  const itemBox = incleExclBodyRow.closest('.JS_itemBox--filterInclExcl');
  const bodyRow = $(itemBox).prevAll('ul.itemBox__row.JS_filterableCell:first:not(".JS_createNewTag")');

  // find toggle and replace text and data-filter
  const toggle = $(bodyRow).find('.JS_inclExl');
  const oldOption = toggle.attr('data-filter');
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
    const textOfActionItem = $(bodyRow).find('.JS_text').html().trim();

    // find the position of the old item, what should be removed
    const selectedItems = oldSelection.find('.JS_text');
    const selectedItemTexts = $.map(selectedItems, function(item){
      return $(item).html().trim();
    });
    const positionOfItemInSelected = $.inArray(textOfActionItem, selectedItemTexts);

    const oldItemTextBlock = selectedItems[positionOfItemInSelected];
    const oldItemBodyRow = $(oldItemTextBlock).closest('ul.itemBox__row.JS_filterableCell');
    // append to newSelectedBlock
    // cloning includes eventhandlers too
    // remove from oldSelectedBlock
    newSelection.append(oldItemBodyRow.clone());
    oldItemBodyRow.remove();
    reset();
  }

  // remove active cell from bodyRow as we are closing the selector
  $(bodyRow).find('.itemBox__cell--active').removeClass('itemBox__cell--active');

  // close options
  $.Velocity.animate(itemBox, 'slideUp').then(function() {
    $(itemBox).addClass('JS_children-closed');
  });
}

// SELECT INCL/EXCL - TOGGLE
// ONLY IF IT'S NOT SELECTED YET
$('.JS_itemBox__cellInner--inclExcl.JS_selectorItem').on('click', function() {
  // get new option
  const newOption = $(this).attr('data-filter');

  // find the bodyRow related to this toggle
  const bodyRow = $(this).closest('.JS_filterableCell');

  var oldOption = "Include";
  if(newOption === "Include") {
    oldOption = "Exclude";
  }

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
    const textOfActionItem = $(bodyRow).find('.JS_text').html().trim();

    // find the position of the old item, what should be removed
    const selectedItems = oldSelection.find('.JS_text');
    const selectedItemTexts = $.map(selectedItems, function(item){
      return $(item).html().trim();
    });
    const positionOfItemInSelected = $.inArray(textOfActionItem, selectedItemTexts);

    const oldItemTextBlock = selectedItems[positionOfItemInSelected];
    const oldItemBodyRow = $(oldItemTextBlock).closest('ul.itemBox__row.JS_filterableCell');
    // append to newSelectedBlock
    // cloning includes eventhandlers too
    // remove from oldSelectedBlock
    newSelection.append(oldItemBodyRow.clone());
    oldItemBodyRow.remove();
    reset();
  }
});
// INCL-EXCL OPTIONS EXPAND-COLLAPSE
$('.JS_toggle--InclExcl').on('click', function() {
  const toggle = $(this);
  closeAllOtherSublists(toggle);
  toggleInclExclSelector(toggle);
});

// open incl/excl pallette
// set a tick for the selected option
// toggle active class depending on expanding/collapsing
function toggleInclExclSelector(toggle) {
  // if there is a  box, expand/collapse it
  const itemBox__row = toggle.closest('.itemBox__row');
  const possibleChildren = itemBox__row.nextAll('.JS_itemBox--filterInclExcl:first');

  // only toggle, if they actually exists;
  if(possibleChildren.length > 0) {
    const actualFilter = toggle.find('.JS_inclExl').attr('data-filter');


  // remove other selection shower
  $(possibleChildren).find('.JS_showSelected').remove();

  // // add selection to new incl-excl (can be changed by other tags)
  // // only if opening

  const selectedFilter = possibleChildren.find(`.JS_itemBox__cellInner--inclExcl[data-filter='${actualFilter}']`);
  const selectedFilterBodyRow = $(selectedFilter).closest('.itemBox__row');
  selectedFilterBodyRow.append(`{% include javascript/itemSelected.html %}`);



  const bodyCell = toggle.closest('.itemBox__cell');
  if (bodyCell.hasClass('itemBox__cell--active')) {
    bodyCell.removeClass('itemBox__cell--active');
  }
  else {
    bodyCell.addClass('itemBox__cell--active');
  }

    expandCloseRow(itemBox__row, undefined, possibleChildren);
  }
}
