////
// INITIAL EXPAND COLLAPSE
////

// default second level collapsed
const multiOptionChildren = $(".JS_optionsChildren").find('.JS_itemBox--children:not(.JS_itemBox--colors)');
const multiOptionBodyRow = $(multiOptionChildren).find('.itemBox__rowInner');

$.Velocity.animate(multiOptionChildren, 'slideUp').then(function() {
  $(multiOptionBodyRow).addClass('JS_children-closed');
  $(multiOptionChildren).addClass('JS_children-closed');
});


//default collapse everything in  app-navigator
const appNavChildren = $(".app-navigator .tabs-panels .tabs-panels__panel[tabindex='1']").find('.JS_itemBox--children');
const appNavBodyRow = $(appNavChildren).find('.itemBox__rowInner');

$.Velocity.animate(appNavChildren, 'slideUp').then(function() {
  $(appNavBodyRow).addClass('JS_children-closed');
  $(appNavChildren).addClass('JS_children-closed');
});



// default collapse for filter-tagpicker / options block
const filterTagPopupChildren = $("#filter-tagpicker .JS_optionsChildren, #filter-datepicker .JS_optionsChildren");
const filterTagPopupBodyRow = $(filterTagPopupChildren).find('.itemBox__rowInner');

$.Velocity.animate(filterTagPopupChildren, 'slideUp').then(function() {
  $(filterTagPopupBodyRow).addClass('JS_children-closed');
  $(filterTagPopupChildren).addClass('JS_children-closed');
});
