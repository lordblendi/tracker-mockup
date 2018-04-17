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
function expandCloseRow(itemBox__row, rowClosed, possibleChildren){

  if(possibleChildren === undefined) {
    // if the next one is color options, then get the one after it
    // as it should be like this:
    // itemBox__row
    //     [optional .JS_itemBox--children.JS_itemBox--colors]
    //     .JS_itemBox--children
    possibleChildren = $(itemBox__row).next();
    if (possibleChildren.hasClass('JS_itemBox--colors')) {
      possibleChildren = possibleChildren.next();
    }
  }
  // check if it's actually a children
  if ($(possibleChildren).hasClass('JS_itemBox--children')) {
    const i = itemBox__row.find('.JS_toggle .itemBox__cellInner, .JS_toggle .itemBox__action, .JS_expand .itemBox__cellInner, .JS_expand .itemBox__action');
    const iContent = i.html();

    // if the 'rowClosed' is not specified, it will become the opposite state
    if(rowClosed === undefined) {
      rowClosed = $(possibleChildren).hasClass('JS_children-closed');
    }
    // open it, if we have to
    if (rowClosed === true) {
      $.Velocity.animate(possibleChildren, 'slideDown').then(function() {
        $(possibleChildren).removeClass('JS_children-closed');
        if(iContent !== null && iContent !== undefined){
          i.html(iContent.replace(collapsed, expanded));
        }
        checkTableHeaderIcon(itemBox__row);
      });
    }
    // otherwise close it
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
  const itemBox = $(itemBox__row).closest('.itemBox');
  const itemBoxHead = $(itemBox).children('.itemBox__row--h2');
  const closedChildren = $(itemBox).children('.JS_itemBox--children.JS_children-closed');
  const children = $(itemBox).children('.JS_itemBox--children');

  var i = $(itemBoxHead).find('.JS_expand .itemBox__cellInner');
  if ($(i).find('.itemBox__action') > 0) {
    i = $(i).find('.itemBox__action');
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

// action for toggle in header to expand/collapse all
$('.itemBox__row--h2 .JS_expand').on('click', function(){
  const toggle = $(this);
  const itemBox = $(toggle).closest('.itemBox');
  const siblingRowItems = $(itemBox).children('.itemBox__row--item');

  const closedChildren = $(itemBox).children('.JS_itemBox--children.JS_children-closed');
  const children = $(itemBox).children('.JS_itemBox--children');


  // finding all toggles
  const bodyCelltoggles = $(siblingRowItems).children('.JS_expand');

  // finding the bodyRows from toggles
  // so these ARE parent bodyRows
  const itemBox__row = $(bodyCelltoggles).closest('.itemBox__row--item');


  //if the children are all closed
  if(closedChildren.length !== children.length) {
    expandCloseRow(itemBox__row, false);
  }
  else {
    expandCloseRow(itemBox__row, true);
  }
});
