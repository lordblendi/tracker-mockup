////
// INITIAL EXPAND COLLAPSE
////

// default second level collapsed
const multiOptionChildren = $(".js_multiSelector__box--optionsChildren").find('.itemBox--children:not(.js_itemBox--colors)');
const multiOptionBodyRow = $(multiOptionChildren).find('.itemBoxTable__bodyRow');

$.Velocity.animate(multiOptionChildren, 'slideUp').then(function() {
  $(multiOptionBodyRow).addClass('js_itemBoxTable__bodyRow--closed');
  $(multiOptionChildren).addClass('js_itemBoxTable__bodyRow--closed');
});


//default collapse everything in  app-navigator
const appNavChildren = $(".app__nav .tabs-panels .tabs-panels__panel[tabindex='1']").find('.itemBox--children');
const appNavBodyRow = $(appNavChildren).find('.itemBoxTable__bodyRow');

$.Velocity.animate(appNavChildren, 'slideUp').then(function() {
  $(appNavBodyRow).addClass('js_itemBoxTable__bodyRow--closed');
  $(appNavChildren).addClass('js_itemBoxTable__bodyRow--closed');
});
