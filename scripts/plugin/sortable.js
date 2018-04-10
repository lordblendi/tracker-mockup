---
---

// set sortable in multiselect options
$(".multiSelector:not(.JS_multiSelector--withFilter) .JS_sortable").sortable({
  handle: '.itemBox__cell',
  placeholder: 'itemBox__cell'
});

$(".multiSelector.JS_multiSelector--withFilter .itemBoxBody--sortableInclude, .multiSelector.JS_multiSelector--withFilter .itemBoxBody--sortableExclude").sortable({
  handle: '.itemBox__cell',
  placeholder: 'itemBox__cell',
  connectWith: ".itemBoxBody--sortableConnected"
});
