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
  toggle.html(newOption).attr('data-filter', newOption);

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

  const actualFilter = toggle.find('.JS_inclExl').attr('data-filter');
  // debugger;


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

  if(possibleChildren.length > 0) {
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
