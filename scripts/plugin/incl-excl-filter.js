---
---

// INCL-EXCL OPTIONS EXPAND-COLLAPSE
$('.JS_itemBoxTable__bodyCellInner--inclexcltoggle').on('click', function() {
  const toggle = $(this);
  closeColorOptions(toggle);
  toggleInclExclSelector(toggle);
});

function toggleInclExclSelector(toggle) {
  // if there is a color box, expand/collapse it
  const itemBoxTable__bodyRow = toggle.closest('.itemBoxTable__bodyRow');
  const possibleChildren = itemBoxTable__bodyRow.nextAll('.JS_itemBox--filterInclExcl:first');

  const actualFilter = toggle.find('i').attr('data-filter');
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
