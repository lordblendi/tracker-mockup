////
// EXPAND COLLAPSE
////

// icons to be swapped
const expanded = "ऄ";
const collapsed = "अ";

// expand/collapse action listener on toggle
$('.JS_toggle').on('click', function() {
  const itemBox__row = $(this).closest('.itemBox__row');
  expandCloseRow(itemBox__row);
});

// function to expand or close rows
function expandCloseRow(itemBox__row, toClose, possibleChildren){

  if(possibleChildren === undefined) {
    // if the next one is color options, then get the one after it
    // as it should be like this:
    // itemBox__row
    //     [optional .itemBox--children.JS_itemBox--colors]
    //     .itemBox--children
    possibleChildren = $(itemBox__row).next();
    if (possibleChildren.hasClass('JS_itemBox--colors')) {
      possibleChildren = possibleChildren.next();
    }
  }
  const i = itemBox__row.find('.JS_toggle .itemBox__cellInner');
  var iContent = i.html();

  // if the 'toClose' is not specified, it will become the opposite state
  if(toClose === undefined) {
    toClose = $(possibleChildren).hasClass('JS_children-closed');
  }

  // check if it's actually a children
  if ($(possibleChildren).hasClass('itemBox--children')) {
    // close it, if we have to
    if (toClose === true) {
      $.Velocity.animate(possibleChildren, 'slideDown').then(function() {
        $(possibleChildren).removeClass('JS_children-closed');
        if(iContent !== null && iContent !== undefined){
          i.html(iContent.replace(collapsed, expanded));
        }
        checkTableHeaderIcon(itemBox__row);
      });
    }
    // otherwise open it
    else {
      $.Velocity.animate(possibleChildren, 'slideUp').then(function() {
        $(possibleChildren).addClass('JS_children-closed');
        if(iContent !== null && iContent !== undefined){
          i.html(iContent.replace(expanded, collapsed));
        }
        checkTableHeaderIcon(itemBox__row);
      });
    }
  }
};

// check table header icon
// change icon depending on
// - everything is collapsed
// - everything is expanded
// - some collapsed, some expanded
function checkTableHeaderIcon(itemBox__row) {
  // check, if everything is closed, or not
  // and change it in the table
  const itemBoxTable = $(itemBox__row).closest('.itemBox');
  const itemBoxTable__head = $(itemBoxTable).children('.itemBox__row--h2');
  const itemBoxTable__body = $(itemBoxTable).children('.itemBoxTable__body');

  const i = $(itemBoxTable__head).find('.itemBox__cellInner').find('i');
  const iContent = i.html();

  const closedChildren = $(itemBoxTable__body).children('.JS_children-closed');
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
$('.JS_expand').on('click', function(){
  const toggle = $(this);

  const itemBox = $(toggle).closest('.itemBox');
  const itemBoxTable__body = $(itemBoxTable).children('.itemBoxTable__body');

  // finding all toggles
  const bodyCelltoggles = $(itemBoxTable__body).children('.itemBox__row').children(' .JS_toggle');

  // finding the bodyRows from toggles
  // so these ARE parent bodyRows
  const itemBox__row = $(bodyCelltoggles).closest('.itemBox__row');

  const closedChildren = $(itemBoxTable__body).children('.itemBox--children.JS_children-closed');
  const children = $(itemBoxTable__body).children('.itemBox--children');

  //if the children are all closed
  if(closedChildren.length !== children.length) {
    expandCloseRow(itemBox__row, false);
  }
  else {
    expandCloseRow(itemBox__row, true);
  }
});
