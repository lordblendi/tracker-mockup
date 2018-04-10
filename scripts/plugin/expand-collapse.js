////
// EXPAND COLLAPSE
////

// icons to be swapped
const expanded = "ऄ";
const collapsed = "अ";

// expand/collapse action listener on toggle
$('.JS_toggle').on('click', function() {
  const itemBoxTable__bodyRow = $(this).closest('.itemBox');
  expandCloseRow(itemBoxTable__bodyRow);
});

// function to expand or close rows
function expandCloseRow(itemBoxTable__bodyRow, toClose, possibleChildren){

  if(possibleChildren === undefined) {
    // if the next one is color options, then get the one after it
    // as it should be like this:
    // itemBoxTable__bodyRow
    //     [optional .itemBox--children.JS_itemBox--colors]
    //     .itemBox--children
    possibleChildren = $(itemBoxTable__bodyRow).next();
    if (possibleChildren.hasClass('JS_itemBox--colors')) {
      possibleChildren = possibleChildren.next();
    }
  }
  const i = itemBoxTable__bodyRow.find('.JS_toggle .itemBox__cellInner');
  const iContent = i.html();

  // if the 'toClose' is not specified, it will become the opposite state
  if(toClose === undefined) {
    toClose = $(possibleChildren).hasClass('JS_itemBoxTable__bodyRow--closed');
  }

  // check if it's actually a children
  if ($(possibleChildren).hasClass('itemBox--children')) {
    // close it, if we have to
    if (toClose === true) {
      $.Velocity.animate(possibleChildren, 'slideDown').then(function() {
        $(possibleChildren).removeClass('JS_itemBoxTable__bodyRow--closed');
        if(iContent !== null && iContent !== undefined){
          i.html(iContent.replace(collapsed, expanded));
        }
        checkTableHeaderIcon(itemBoxTable__bodyRow);
      });
    }
    // otherwise open it
    else {
      $.Velocity.animate(possibleChildren, 'slideUp').then(function() {
        $(possibleChildren).addClass('JS_itemBoxTable__bodyRow--closed');
        if(iContent !== null && iContent !== undefined){
          i.html(iContent.replace(expanded, collapsed));
        }
        checkTableHeaderIcon(itemBoxTable__bodyRow);
      });
    }
  }
};

// check table header icon
// change icon depending on
// - everything is collapsed
// - everything is expanded
// - some collapsed, some expanded
function checkTableHeaderIcon(itemBoxTable__bodyRow) {
  // check, if everything is closed, or not
  // and change it in the table
  const itemBoxTable = $(itemBoxTable__bodyRow).closest('.itemBoxTable');
  const itemBoxTable__head = $(itemBoxTable).children('.itemBoxTable__head');
  const itemBoxTable__body = $(itemBoxTable).children('.itemBoxTable__body');

  const i = $(itemBoxTable__head).find('.itemBoxTable__headCellInner').find('i');
  const iContent = i.html();

  const closedChildren = $(itemBoxTable__body).children('.JS_itemBoxTable__bodyRow--closed');
  const children = $(itemBoxTable__body).children('.itemBox--children');

  if(iContent !== null && iContent !== undefined) {
    if(closedChildren.length !== children.length) {
      i.html(iContent.replace(collapsed, expanded));
    }
    else {
      i.html(iContent.replace(expanded, collapsed));
    }
  }
}

// action for toggle in header to expand/collapse all
$('.itemBoxTable__headCell--toggle').on('click', function(){
  const toggle = $(this);

  const itemBoxTable = $(toggle).closest('.itemBoxTable');
  const itemBoxTable__body = $(itemBoxTable).children('.itemBoxTable__body');

  // finding all toggles
  const bodyCelltoggles = $(itemBoxTable__body).children('.itemBoxTable__bodyRow').children(' .JS_toggle');

  // finding the bodyRows from toggles
  // so these ARE parent bodyRows
  const itemBoxTable__bodyRow = $(bodyCelltoggles).closest('.itemBoxTable__bodyRow');

  const closedChildren = $(itemBoxTable__body).children('.itemBox--children.JS_itemBoxTable__bodyRow--closed');
  const children = $(itemBoxTable__body).children('.itemBox--children');

  //if the children are all closed
  if(closedChildren.length !== children.length) {
    expandCloseRow(itemBoxTable__bodyRow, false);
  }
  else {
    expandCloseRow(itemBoxTable__bodyRow, true);
  }
});
