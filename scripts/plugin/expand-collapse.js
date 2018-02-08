////
// EXPAND COLLAPSE
////
const expanded = "ऄ";
const collapsed = "अ";




// row
$('.itemBoxTable__bodyCell--toggle').on('click', function() {
  const itemBoxTable__bodyRow = $(this).closest('.itemBoxTable__bodyRow');
  expandCloseRow(itemBoxTable__bodyRow);
});

function expandCloseRow(itemBoxTable__bodyRow, toClose, possibleChildren){

  if(possibleChildren === undefined) {
    // if the next one is color options, then get the one after it
    // as it should be like this:
    // itemBoxTable__bodyRow
    //     [optional .itemBox--children.js_itemBox--colors]
    //     .itemBox--children
    possibleChildren = $(itemBoxTable__bodyRow).next();
    if (possibleChildren.hasClass('js_itemBox--colors')) {
      possibleChildren = possibleChildren.next();
    }
  }
  const i = itemBoxTable__bodyRow.find('.itemBoxTable__bodyCell--toggle .itemBoxTable__bodyCellInner').find('i');
  const iContent = i.html();

  // if the 'toClose' is not specified, it will become the opposite state
  if(toClose === undefined) {
    toClose = $(possibleChildren).hasClass('js_itemBoxTable__bodyRow--closed');
  }

  // check if it's actually a children
  if ($(possibleChildren).hasClass('itemBox--children')) {
    // close it, if we have to
    if (toClose === true) {
      $.Velocity.animate(possibleChildren, 'slideDown').then(function() {
        $(possibleChildren).removeClass('js_itemBoxTable__bodyRow--closed');
        i.html(iContent.replace(collapsed, expanded));
        checkTableHeaderIcon(itemBoxTable__bodyRow);
      });
    }
  // otherwise open it
    else {
      $.Velocity.animate(possibleChildren, 'slideUp').then(function() {
        $(possibleChildren).addClass('js_itemBoxTable__bodyRow--closed');
        i.html(iContent.replace(expanded, collapsed));
        checkTableHeaderIcon(itemBoxTable__bodyRow);
      });
    }
  }
};

function checkTableHeaderIcon(itemBoxTable__bodyRow) {
  // check, if everything is closed, or not
  // and change it in the table
  const itemBoxTable = $(itemBoxTable__bodyRow).closest('.itemBoxTable');
  const itemBoxTable__head = $(itemBoxTable).children('.itemBoxTable__head');
  const itemBoxTable__body = $(itemBoxTable).children('.itemBoxTable__body');

  const i = $(itemBoxTable__head).find('.itemBoxTable__headCellInner').find('i');
  const iContent = i.html();

  const closedChildren = $(itemBoxTable__body).children('.js_itemBoxTable__bodyRow--closed');
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

// HEADER
$('.itemBoxTable__headCell--toggle').on('click', function(){
  const toggle = $(this);

  const itemBoxTable = $(toggle).closest('.itemBoxTable');
  const itemBoxTable__body = $(itemBoxTable).children('.itemBoxTable__body');

  // finding all toggles
  const bodyCelltoggles = $(itemBoxTable__body).children('.itemBoxTable__bodyRow').children(' .itemBoxTable__bodyCell--toggle');

  // finding the bodyRows from toggles
  // so these ARE parent bodyRows
  const itemBoxTable__bodyRow = $(bodyCelltoggles).closest('.itemBoxTable__bodyRow');

  const closedChildren = $(itemBoxTable__body).children('.itemBox--children.js_itemBoxTable__bodyRow--closed');
  const children = $(itemBoxTable__body).children('.itemBox--children');

  //if the children are all closed
  if(closedChildren.length !== children.length) {
    expandCloseRow(itemBoxTable__bodyRow, false);
  }
  else {
    expandCloseRow(itemBoxTable__bodyRow, true);
  }
});
