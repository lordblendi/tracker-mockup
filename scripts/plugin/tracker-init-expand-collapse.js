////
// INITIAL EXPAND COLLAPSE
////

//default collapse everything in  app-navigator
const appNavChildren = $(".app-navigator .toolbox-tabs-panels .toolbox-tabs-panels__panel[tabindex='1']").find('.JS_toolbox-table--children');
const appNavBodyRow = $(appNavChildren).find('.toolbox-table__rowInner');

$.Velocity.animate(appNavChildren, 'slideUp').then(function() {
  $(appNavBodyRow).addClass('JS_children-closed');
  $(appNavChildren).addClass('JS_children-closed');
});
