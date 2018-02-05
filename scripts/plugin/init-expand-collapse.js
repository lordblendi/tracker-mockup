////
// INITIAL EXPAND COLLAPSE
////

// default second level collapsed
const multiOptionChildren = $(".multiSelector__box--optionsChildren").find('.itemBox--children');
const multiOptionBodyRow = $(multiOptionChildren).find('.itemBoxTable__bodyRow');

$.Velocity.animate(multiOptionChildren, 'slideUp').then(function() {
  $(multiOptionBodyRow).addClass('itemBoxTable__bodyRow--closed');
  $(multiOptionChildren).addClass('itemBoxTable__bodyRow--closed');
});

//default collapse everything in  app-navigator
const appNavChildren = $(".app__nav .tabs__panels .tabs__panel[tabindex='1']").find('.itemBox--children');
const appNavBodyRow = $(appNavChildren).find('.itemBoxTable__bodyRow');

$.Velocity.animate(appNavChildren, 'slideUp').then(function() {
  $(appNavBodyRow).addClass('itemBoxTable__bodyRow--closed');
  $(appNavChildren).addClass('itemBoxTable__bodyRow--closed');
});
