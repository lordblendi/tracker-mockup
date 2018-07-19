---
---

// SELECT INCL/EXCL
$('.JS_toolbox-table--filterInclExcl .toolbox-table__rowInner').on('click', function() {
  const incleExclBodyRow = $(this);
  selectNewFilterOption(incleExclBodyRow);
});

// function to set a new filter option
// gets old filter option, replaces in the bodyRow
// then close the pallette
function selectNewFilterOption(incleExclBodyRow) {
  // get new option
  const newOption = incleExclBodyRow.find('.JS_toolbox-table__cellInner--inclExcl').attr('data-filter');

  // find the bodyRow related to this toggle
  const toolboxTable = incleExclBodyRow.closest('.JS_toolbox-table--filterInclExcl');
  const bodyRow = $(toolboxTable).prevAll('ul.toolbox-table__rowInner.JS_filterableCell:first:not(".JS_createNewTag")');

  // find toggle and replace text and data-filter
  const toggle = $(bodyRow).find('.JS_inclExl');
  const oldOption = toggle.attr('data-filter');
  toggle.html(newOption).attr('data-filter', newOption);

  // update it in the selected section if it wasn't the same as before
  if(oldOption !== newOption) {
    // get the good classes
    const selectedBlockClass = ".JS_selectionChildren";
    const oldClass = selectedBlockClass + oldOption;
    const newClass = selectedBlockClass + newOption;

    // find the blocks
    const modal = $(bodyRow).closest('.modal');
    const oldSelection = $(modal).find(oldClass);
    var newSelection = $(modal).find(newClass);

    // if newSelectionBlock is not there, add it
    if(newSelection === null || newSelection === undefined || newSelection.length === 0) {
      addSelectedBlock(modal, newClass);
      newSelection = modal.find(newClass);
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
    const oldItemBodyRow = $(oldItemTextBlock).closest('ul.toolbox-table__rowInner.JS_filterableCell');
    // append to newSelectedBlock
    // cloning includes eventhandlers too
    // remove from oldSelectedBlock
    newSelection.append(oldItemBodyRow.clone());
    oldItemBodyRow.remove();
    reset();
  }

  // remove active cell from bodyRow as we are closing the selector
  $(bodyRow).find('.toolbox-table__cell--active').removeClass('toolbox-table__cell--active');

  // close options
  $.Velocity.animate(toolboxTable, 'slideUp').then(function() {
    $(toolboxTable).addClass('JS_children-closed');
  });
}

// SELECT INCL/EXCL - TOGGLE
// ONLY IF IT'S NOT SELECTED YET
$('.JS_toolbox-table__cellInner--inclExcl.JS_toolbox-selectorItem').on('click', function() {
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
    const selectedBlockClass = ".JS_selectionChildren";
    const oldClass = selectedBlockClass + oldOption;
    const newClass = selectedBlockClass + newOption;

    // find the blocks
    const modal = $(bodyRow).closest('.modal');
    const oldSelection = $(modal).find(oldClass);
    var newSelection = $(modal).find(newClass);

    // if newSelectionBlock is not there, add it
    if(newSelection === null || newSelection === undefined || newSelection.length === 0) {
      addSelectedBlock(modal, newClass);
      newSelection = modal.find(newClass);
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
    const oldItemBodyRow = $(oldItemTextBlock).closest('ul.toolbox-table__rowInner.JS_filterableCell');
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
  const toolboxTable__row = toggle.closest('.toolbox-table__rowInner');
  const possibleChildren = toolboxTable__row.nextAll('.JS_toolbox-table--filterInclExcl:first');

  // only toggle, if they actually exists;
  if(possibleChildren.length > 0) {
    const actualFilter = toggle.find('.JS_inclExl').attr('data-filter');


  // remove other selection shower
  $(possibleChildren).find('.JS_showSelected').remove();

  // // add selection to new incl-excl (can be changed by other tags)
  // // only if opening

  const selectedFilter = possibleChildren.find(`.JS_toolbox-table__cellInner--inclExcl[data-filter='${actualFilter}']`);
  const selectedFilterBodyRow = $(selectedFilter).closest('.toolbox-table__rowInner');
  selectedFilterBodyRow.append(`{% include javascript/itemSelected.html %}`);



  const bodyCell = toggle.closest('.toolbox-table__cell');
  if (bodyCell.hasClass('toolbox-table__cell--active')) {
    bodyCell.removeClass('toolbox-table__cell--active');
  }
  else {
    bodyCell.addClass('toolbox-table__cell--active');
  }

    expandCloseRow(toolboxTable__row, undefined, possibleChildren);
  }
}
