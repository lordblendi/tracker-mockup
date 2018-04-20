---
---

// set sortable in multiselect options
$('.multiSelector').each(function(){
  reinitSortable($(this));
})


// reinitiate reorder functionality
function reinitSortable(multiSelector) {
  if ($(multiSelector).hasClass('JS_multiSelector--withFilter')){
    $(multiSelector).find(".itemBoxBody--sortableInclude, .itemBoxBody--sortableExclude").sortable({
      handle: '.JS_itemBox__cell--draggable',
      placeholder: 'itemBox__row itemBox__row--item',
      connectWith: ".itemBoxBody--sortableConnected"
    });
  }
  else {
    $(multiSelector).find(".JS_sortable").sortable({
      handle: '.JS_itemBox__cell--draggable',
      placeholder: 'itemBox__row itemBox__row--item'
    });
  }
}
