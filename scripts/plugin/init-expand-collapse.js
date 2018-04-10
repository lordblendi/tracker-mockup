////
// INITIAL EXPAND COLLAPSE
////

// default second level collapsed
const multiOptionChildren = $(".JS_multiSelector__box--optionsChildren").find('.itemBox--children:not(.JS_itemBox--colors)');
const multiOptionBodyRow = $(multiOptionChildren).find('.itemBox__row');

$.Velocity.animate(multiOptionChildren, 'slideUp').then(function() {
  $(multiOptionBodyRow).addClass('JS_itemBox__row--closed');
  $(multiOptionChildren).addClass('JS_itemBox__row--closed');
});


//default collapse everything in  app-navigator
const appNavChildren = $(".app-navigator__nav .tabs-panels .tabs-panels__panel[tabindex='1']").find('.itemBox--children');
const appNavBodyRow = $(appNavChildren).find('.itemBox__row');

$.Velocity.animate(appNavChildren, 'slideUp').then(function() {
  $(appNavBodyRow).addClass('JS_itemBox__row--closed');
  $(appNavChildren).addClass('JS_itemBox__row--closed');
});



// default collapse for filter-tagpicker / options block
const filterTagPopupChildren = $("#filter-tagpicker .JS_multiSelector__box--optionsChildren, #filter-datepicker .JS_multiSelector__box--optionsChildren");
const filterTagPopupBodyRow = $(filterTagPopupChildren).find('.itemBox__row');

$.Velocity.animate(filterTagPopupChildren, 'slideUp').then(function() {
  $(filterTagPopupBodyRow).addClass('JS_itemBox__row--closed');
  $(filterTagPopupChildren).addClass('JS_itemBox__row--closed');
});
