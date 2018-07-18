////
// EXPAND COLLAPSE
////

// icons to be swapped
const expanded = "";
const collapsed = "";

initExpandCollapseActions();

function initExpandCollapseActions(){
  // expand/collapse action listener on toggle
  $('.JS_toggle, .JS_expand').on('click', function() {
    const toolbox-table__row = $(this).closest('.toolbox-table__rowInner');
    expandCloseRow(toolbox-table__row);
  });

  // action for toggle in header to expand/collapse all
  $('.toolbox-table__rowInner--thead .JS_expand_header').on('click', function(){
    const toggle = $(this);
    const toolbox-table = $(toggle).closest('.toolbox-table');
    const siblingRowItems = $(toolbox-table).find('> .toolbox-table__row > .toolbox-table__rowInner--item');

    const closedChildren = $(toolbox-table).find('> .toolbox-table__row > .JS_toolbox-table--children.JS_children-closed');
    const children = $(toolbox-table).find('> .toolbox-table__row > .JS_toolbox-table--children');

    // finding all toggles
    const bodyCelltoggles = $(siblingRowItems).find('> .JS_expand');

    // finding the bodyRows from toggles
    // so these ARE parent bodyRows
    const toolbox-table__row = $(bodyCelltoggles).closest('.toolbox-table__rowInner--item');

    //if the children are all closed
    if(closedChildren.length !== children.length) {
      expandCloseRow(toolbox-table__row, false);
    }
    else {
      expandCloseRow(toolbox-table__row, true);
    }
  });
}

// function to expand or close rows
function expandCloseRow(toolbox-table__row, rowClosed, possibleChildren){
  if(possibleChildren === undefined) {
    // if the next one is color options, then get the one after it
    // as it should be like this:
    // toolbox-table__row
    //     [optional .JS_toolbox-table--children.JS_toolbox-table--colors]
    //     .JS_toolbox-table--children
    possibleChildren = $(toolbox-table__row).next();
    if (possibleChildren.hasClass('JS_toolbox-table--colors')) {
      possibleChildren = possibleChildren.next();
    }
  }
  // check if it's actually a children
  if ($(possibleChildren).hasClass('JS_toolbox-table--children')) {
    const i = toolbox-table__row.find('.JS_toggle .toolbox-table__cellInner, .JS_toggle .toolbox-table__action, .JS_expand .toolbox-table__cellInner, .JS_expand .toolbox-table__action');
    const iContent = i.html();

    // if the 'rowClosed' is not specified, it will become the opposite state
    if(rowClosed === undefined) {
      rowClosed = $(possibleChildren).hasClass('JS_children-closed');
    }
    // open it, if we have to
    if (rowClosed === true) {
      $.Velocity.animate(possibleChildren, 'slideDown', {
        duration: 250
      }).then(function() {
        $(possibleChildren).removeClass('JS_children-closed');
        if(iContent !== null && iContent !== undefined){
          i.html(iContent.replace(collapsed, expanded));
        }
        checkTableHeaderIcon(toolbox-table__row);
      });
    }
    // otherwise close it
    else {
      $.Velocity.animate(possibleChildren, 'slideUp', {
        duration: 250
      }).then(function() {
        $(possibleChildren).addClass('JS_children-closed');
        if(iContent !== null && iContent !== undefined){
          i.html(iContent.replace(expanded, collapsed));
        }
        checkTableHeaderIcon(toolbox-table__row);
      });
    }
  }
};

// check table header icon
// change icon depending on
// - everything is collapsed
// - everything is expanded
// - some collapsed, some expanded
function checkTableHeaderIcon(toolbox-table__row) {
  // check, if everything is closed, or not
  // and change it in the table
  const toolbox-table = $(toolbox-table__row).closest('.toolbox-table');
  const toolbox-tableHead = $(toolbox-table).find('> .toolbox-table__row > .toolbox-table__rowInner--thead');
  const closedChildren = $(toolbox-table).find('> .toolbox-table__row >  .JS_toolbox-table--children.JS_children-closed');
  const children = $(toolbox-table).find('> .toolbox-table__row > .JS_toolbox-table--children');

  var i = $(toolbox-tableHead).find('.JS_expand_header .toolbox-table__cellInner');
  if ($(i).find('.toolbox-table__action') > 0) {
    i = $(i).find('.toolbox-table__action');
  }
  const iContent = i.html();


  if(iContent !== null && iContent !== undefined) {
    if(closedChildren.length !== children.length) {
      i.html(iContent.replace(collapsed, expanded));
    }
    else {
      i.html(iContent.replace(expanded, collapsed));
    }
  }
}
