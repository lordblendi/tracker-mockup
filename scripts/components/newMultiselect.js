// set sortable in multiselect options
$(".itemBoxBody--sortable").sortable({
  handle: '.itemBoxTable__bodyCell--draggable',
  placeholder: 'itemBoxTable__bodyCell--draggablePlaceholder'
});


// // cell icon onclick
// $('.MULTISELECT__POPUP').on('click', function() {
//   const toggle = $(this);
//   const top = toggle.offset().top;
//   const left = toggle.offset().left;
//   // outerWidth (including padding, border, and optionally margin)
//   // innerWidth (including padding but not border)
//   // width (not including anything)
//   const width = toggle.outerWidth();
//   const height = toggle.outerHeight();
//
//   const right = left + width;
//   const bottom = top + height;
//
//   const windowWidth = $(window).width();
//
//   const isOnLeft = Math.round(windowWidth/2) >= Math.round(left);
//   const isOnRight = Math.round(windowWidth/2) < Math.round(left);
//
//   var newTop = (Math.round(top) + Math.round(height)) + 'px';
//   if($(this).hasClass('pmx-selector')) {
//     newTop = Math.round(top) + 'px';
//   }
//
//   if (isOnLeft) {
//     $('' + $(this).attr('data-popid')).css({
//       'z-index': '99999999',
//       'pointer-events': 'auto',
//       'opacity': '1',
//       'top': newTop,
//       'left': Math.round(left) + 'px',
//     });
//   }
//   else {
//     $('' + $(this).attr('data-popid')).css({
//       'z-index': '99999999',
//       'pointer-events': 'auto',
//       'opacity': '1',
//       'top': newTop,
//       'right': (Math.round($(window).width()) - Math.round(right)) + 'px',
//     });
//   }
//
//   $(".overlay").css("display", 'block');
// });
//
// // close overlay and popups
// $('.overlay').on('click', function() {
//   $(".overlay").css("display", 'none');
//
//   $('#multiSelector-1, #multiSelector-2, #multiSelector-3').css({
//     'z-index': '0',
//     'pointer-events': 'none',
//     'opacity': '0',
//   });
// })


//////
// MULTI SELECT ONCLICK
//////
//
// // SIMPLE
// // $('.MULTISELECT__POPUP[data-popid="#multiSelector-1"]')
// $('#multiSelector-1 .itemBoxTable__bodyRow').on('click', function(){
//   const row = $(this);
//   const newLAbelText = row.find('.itemBoxTable__bodyCell--text .itemBoxTable__bodyCellInner').html();
//
//   const selectorField = $('.MULTISELECT__POPUP[data-popid="#multiSelector-1"]');
//   const selectorLabelField = $(selectorField).find('.pmx-selector__label');
//   const selectorLabel = $(selectorLabelField).html();
//
//   const splittedLabel = selectorLabel.split('</span>');
//
//   // if we don't have status icon
//   var oldLabelText = splittedLabel[0];
//   // if we have status icon
//   if(splittedLabel.length > 0) {
//     oldLabelText = splittedLabel[1];
//   }
//
//   const newLabel = selectorLabel.replace(oldLabelText, ' ' + newLAbelText);
//   $(selectorLabelField).html(newLabel);
//
//   $(".overlay").css("display", 'none');
//   $('#multiSelector-1, #multiSelector-2, #multiSelector-3').css({
//     'z-index': '0',
//     'pointer-events': 'none',
//     'opacity': '0',
//   });
// })
//


// COMPLEX
$('.multiSelector__box--selection .itemBoxTable__action, .multiSelector__box--options .itemBoxTable__action').on('click', function(){
  const action = $(this);
  if(action.hasClass('itemBoxTable__action--removeAll')){
    const children = action.closest('.itemBoxTable__bodyRow').next();
    if(children.hasClass('itemBox--children')) {
      handleComplexGroupRemove(action, children, action.hasClass('itemBoxTable__action--removeAllSelected'));
    }
  }
  else if(action.hasClass('itemBoxTable__action--addAll')){
    const children = action.closest('.itemBoxTable__bodyRow').next();
    if(children.hasClass('itemBox--children')) {
      handleComplexGroupAdd(action, children);
    }
  }
  else {
    handleComplexItemAddRemove(action);
  }
});

const addActionHTML = `<li class="itemBoxTable__bodyCell itemBoxTable__bodyCell--add" style="flex-grow: 0;" data-flex="0">
  <div class="itemBoxTable__bodyCellInner">
    <i class="itemBoxTable__action itemBoxTable__action--add">ބ</i>
  </div>
</li>`;
const addGroupActionHTML = `<li class="itemBoxTable__bodyCell itemBoxTable__bodyCell--add itemBoxTable__bodyCell--addAll" style="flex-grow: 0;" data-flex="0">
  <div class="itemBoxTable__bodyCellInner">
    <i class="itemBoxTable__action itemBoxTable__action--add itemBoxTable__action--addAll">ބ</i>
  </div>
</li>`;
const removeActionHTML = `<li class="itemBoxTable__bodyCell itemBoxTable__bodyCell--remove" style="flex-grow: 0;" data-flex="0">
  <div class="itemBoxTable__bodyCellInner">
    <i class="itemBoxTable__action itemBoxTable__action--remove">ޅ</i>
  </div>
</li>`;
const removeGroupActionHTML = `<li class="itemBoxTable__bodyCell itemBoxTable__bodyCell--remove itemBoxTable__bodyCell--removeAll" style="flex-grow: 0;" data-flex="0">
  <div class="itemBoxTable__bodyCellInner">
    <i class="itemBoxTable__action itemBoxTable__action--remove itemBoxTable__action--removeAll">ޅ</i>
  </div>
</li>`;

function resetGroupRemoveActions(removeAllActions, children) {
  $.each(removeAllActions, function(index, item){
    const ulParent = $(item).parent();
    // we always remove the removeAll Button
    item.remove();
    // if the parent doesn't have any addAll -> append
    if(ulParent.children('.itemBoxTable__bodyCell--addAll').length === 0) {
      ulParent.append(addGroupActionHTML);
    }
  });
  // replace all normal actions with addAction
  children.find('li.itemBoxTable__bodyCell--remove').replaceWith(addActionHTML);
}

function resetGroupAddActions(removeAllActions, children) {
  $.each(removeAllActions, function(index, item){
    const ulParent = $(item).parent();
    // we always remove the removeAll Button
    item.remove();
    // if the parent doesn't have any addAll -> append
    if(ulParent.children('.itemBoxTable__bodyCell--removeAll').length === 0) {
      ulParent.append(removeGroupActionHTML);
    }
  });
  // replace all normal actions with addAction
  children.find('li.itemBoxTable__bodyCell--add').replaceWith(removeActionHTML);
}

function addSelectedBlock(multiSelector){
  const selectedBlock = `<div class="multiSelector__box multiSelector__box--selection">
      <div class="itemBox">
        <div class="itemBoxTable">
          <div class="itemBoxBody">
            <ul class="itemBoxTable__bodyRow">
                <li class="itemBoxTable__bodyCell itemBoxTable__bodyCell--toggle" style="flex-grow: 1;">
                  <div class="itemBoxTable__bodyCellInner itemBoxTable__bodyCellInner--selectedText">
                    <i>ऄ Selected</i>
                  </div>
                </li>
                <li class="itemBoxTable__bodyCell itemBoxTable__bodyCell--remove" style="flex-grow: 0;" data-flex="0">
                  <div class="itemBoxTable__bodyCellInner">
                    <i class="itemBoxTable__action itemBoxTable__action--remove">ޅ</i>
                  </div>
                </li>
            </ul>
            <div class="itemBox itemBox--children">
              <div class="itemBoxTable">
                <div class="itemBoxBody itemBoxBody--sortable">

                </div>
              </div>
            </div><!-- /.itemBox -->
          </div>
        </div>
      </div><!-- /.itemBox -->

  </div><!-- /.multiSelector__box -->`;
  multiSelector.find('.multiSelector__box--options').before(selectedBlock);
  const selection = multiSelector.find('.multiSelector__box--selection');
  // enable toggle again
  $(selection.find('.itemBoxTable__bodyCell--toggle')).on('click', function() {
    const itemBoxTable__bodyRow = $(this).closest('.itemBoxTable__bodyRow');
    expandCloseRow(itemBoxTable__bodyRow);
  });
}


function handleComplexGroupAdd(action, children) {
  const multiSelector = children.closest('.multiSelector');
  var selection = multiSelector.find('.multiSelector__box--selection');
    if(selection === null || selection === undefined || selection.length === 0) {
      addSelectedBlock(multiSelector);
      selection = multiSelector.find('.multiSelector__box--selection');
    }

    const optionItems = children.find('.itemBoxTable__bodyCellInner--text');
    const itemBoxBody = selection.find('.itemBox--children .itemBoxBody');
    const selectedItems = selection.find('.itemBox--children .itemBoxTable__bodyCellInner--text');
    const selectedItemTexts = $.map(selectedItems, function(item){
      return $(item).html();
    });


    $.each(optionItems, function(index, item){
      const textOfActionItem = $(item).html();
      const bodyRow = $(item).closest('.itemBoxTable__bodyRow');
      // there should be only ONE for an item. either add or remove
      const itemInOptionsAction = $(item).find('.itemBoxTable__bodyCell--add, .itemBoxTable__bodyCell--remove')[0];

      const positionOfItemInSelected = $.inArray(textOfActionItem, selectedItemTexts);
      if (positionOfItemInSelected < 0) {
        itemBoxBody.append(getNewItem(textOfActionItem));
        $(itemInOptionsAction).replaceWith(removeActionHTML);
      }
    });

    var removeAllActions = children.find('li.itemBoxTable__bodyCell--addAll');
    removeAllActions.push(action.closest('li.itemBoxTable__bodyCell--addAll'));
    resetGroupAddActions(removeAllActions, children);
    checkCounter(selection);
    reset();
}

function handleComplexGroupRemove(action, children, fromSelectedAction){
  const multiSelector = children.closest('.multiSelector');

  const selection = multiSelector.find('.multiSelector__box--selection');
  // exit if there is no selection block
  if(selection === null || selection === undefined || selection.length === 0) {
    return;
  }

  if(fromSelectedAction) {
    selection.remove();
    // here the "children" were not part of the options block, so we have to look for them
    const options = multiSelector.find('.multiSelector__box--options');
    const removeAllActions = options.find('li.itemBoxTable__bodyCell--removeAll');
    resetGroupRemoveActions(removeAllActions, options);

  }
  else {
    const childrenToRemove = children.find('li.itemBoxTable__bodyCell--remove').closest('.itemBoxTable__bodyRow').find('.itemBoxTable__bodyCellInner--text');
    const selectedItems = selection.find('.itemBox--children .itemBoxTable__bodyCellInner--text');
    const selectedItemTexts = $.map(selectedItems, function(item){
      return $(item).html();
    });


    $.each(childrenToRemove, function(index, child) {
      const textOfActionItem = $(child).html();
      const positionOfItemInSelected = $.inArray(textOfActionItem, selectedItemTexts);
      if(positionOfItemInSelected >= 0) {
        selectedItems[positionOfItemInSelected].closest('ul.itemBoxTable__bodyRow').remove();
      }
    });

    // remove children actions
    // also adding the original action button
    var removeAllActions = children.find('li.itemBoxTable__bodyCell--removeAll');
    removeAllActions.push(action.closest('li.itemBoxTable__bodyCell--removeAll'));
    resetGroupRemoveActions(removeAllActions, children);

  }

  checkCounter(selection);
  // reinitiate onclick and reorder actions in selection blocks
  reset();
}

function getNewItem(textOfActionItem) {
    return `<ul class="itemBoxTable__bodyRow">
      <li class="itemBoxTable__bodyCell" style="flex-grow: 1;">
        <div class="itemBoxTable__bodyCellInner itemBoxTable__bodyCellInner--text">${textOfActionItem}</div>
      </li>
      <li class="itemBoxTable__bodyCell itemBoxTable__bodyCell--draggable" style="flex-grow: 0;" data-flex="0">
        <div class="itemBoxTable__bodyCellInner">
          <i class="itemBoxTable__action itemBoxTable__action--drag">އ</i>
        </div>
      </li>
      <li class="itemBoxTable__bodyCell itemBoxTable__bodyCell--remove" style="flex-grow: 0;" data-flex="0">
        <div class="itemBoxTable__bodyCellInner">
          <i class="itemBoxTable__action itemBoxTable__action--remove">ޅ</i>
        </div>
      </li>
  </ul>`;
}

function checkCounter(selection){
  // if there are no more added items, then remove selected block
  // if there are more than 5 elements, refresh a counter
  // otherwise remove counter
  const numOfSelected = selection.find('.itemBox--children .itemBoxTable__bodyCellInner--text').length;
  if( numOfSelected === 0) {
    selection.remove();
  }
  else if (numOfSelected >= 5 ){
    const selectedText = selection.find('.itemBoxTable__bodyCellInner--selectedText');
    selectedText.find('sup').remove();
    selectedText.append(`<sup>${numOfSelected}</sup>`);
  }
  else {
    selection.find('.itemBoxTable__bodyCellInner--selectedText sup').remove();
  }
}


function handleComplexItemAddRemove(action){
  const add = $(action).hasClass('itemBoxTable__action--add');
  const remove = $(action).hasClass('itemBoxTable__action--remove');
  const toggle = $(action).hasClass('itemBoxTable__action--toggle');

  // only continue if it's not a toggle button (expand/collapse)
  if(!toggle) {
    // if it's not an add/remove action, quit
    if(!add && !remove){
      return;
    }
    const itemBoxTable__bodyRow = action.closest('.itemBoxTable__bodyRow');
    const actionItem = itemBoxTable__bodyRow.find('.itemBoxTable__bodyCellInner--text')[0];
    const textOfActionItem = $(actionItem).html();

    const multiSelector = action.closest('.multiSelector');

    // get selected items
    var selection = multiSelector.find('.multiSelector__box--selection');
    // if there is no selection block
    // on remove -> nothing to do, exit function
    // on add -> readd the selected block
    if(selection === null || selection === undefined || selection.length === 0) {
      if(add) {
        addSelectedBlock(multiSelector);
        selection = multiSelector.find('.multiSelector__box--selection');
      }
      else if(remove) {
        return;
      }
    }

    const selectedItems = selection.find('.itemBox--children .itemBoxTable__bodyCellInner--text');
    const selectedItemTexts = $.map(selectedItems, function(item){
      return $(item).html();
    });
    const positionOfItemInSelected = $.inArray(textOfActionItem, selectedItemTexts);
    const isAlreadySelected = positionOfItemInSelected >= 0;

    // get option items
    const options = multiSelector.find('.multiSelector__box--options');
    const optionItems = options.find('.itemBox--children .itemBoxTable__bodyCellInner--text');
    const optionItemTexts = $.map(optionItems, function(item){
      return $(item).html();
    });

    const positionOfItemInOptions = $.inArray(textOfActionItem, optionItemTexts);
    // we need this item separate, in case the action is made from the selected block
    const itemInOptions = $(optionItems[positionOfItemInOptions]).closest('.itemBoxTable__bodyRow');
    // there should be only ONE for an item. either add or remove
    const itemInOptionsAction = $(itemInOptions).find('.itemBoxTable__bodyCell--add, .itemBoxTable__bodyCell--remove')[0];

    if(add && !isAlreadySelected) {
      const itemBoxBody = selection.find('.itemBox--children .itemBoxBody');
      itemBoxBody.append(getNewItem(textOfActionItem));

      if(positionOfItemInOptions >= 0) {
        $(itemInOptionsAction).replaceWith(removeActionHTML);
      }
    }
    else if(remove && isAlreadySelected) {
      const itemBox_children = selection.find('.itemBox--children');
      const itemBoxTable__bodyRow = itemBox_children.find('.itemBoxTable__bodyRow');
      const itemToRemove = itemBoxTable__bodyRow[positionOfItemInSelected];
      itemToRemove.remove();

      if(positionOfItemInOptions >= 0) {
        $(itemInOptionsAction).replaceWith(addActionHTML);
      }
    }

    // check on the current status group action, remove or add necessary actions
    const childrenInOptions = options.find('.itemBox--children');
    $.each(childrenInOptions, function(index, children){
      var children = $(children);
      const groupHeader = children.prev();
      const groupAddAction = groupHeader.find('.itemBoxTable__bodyCell--addAll');
      const groupRemoveAction = groupHeader.find('.itemBoxTable__bodyCell--removeAll');

      const addedItems = children.find('.itemBoxTable__action--add:not(.itemBoxTable__action--addAll)');
      const removedItems = children.find('.itemBoxTable__action--remove:not(.itemBoxTable__action--removeAll)');

      // if no addedItems items, remove groupAddAction
      if(addedItems.length === 0) {
        groupAddAction.remove();
      }
      else if (groupRemoveAction.length === 0) {
        // otherwise add it, if it doesn't exist yet
        // if possible, before the groupAddAction
        // otherwise just append it to the header
        if (groupAddAction.length > 0){
          groupAddAction.before(removeGroupActionHTML);
        }
        else {
            groupHeader.append(removeGroupActionHTML);
        }
      }

      // if no removed items, remove groupRemoveAction
      if(removedItems.length === 0) {
        groupRemoveAction.remove();
      }
      // otherwise add it, if it doesn't exist yet
      // just append it to the header
      else if (groupAddAction.length === 0){
        groupHeader.append(addGroupActionHTML);
      }
    });


    checkCounter(selection);
    reset();
  }
}

function reset(){
  // reinitiate onclick and reorder actions in selection blocks
  $('.multiSelector__box--selection .itemBoxTable__action, .multiSelector__box--options .itemBoxTable__action').on('click', function(){
    const action = $(this);
    if(action.hasClass('itemBoxTable__action--removeAll')){
      const children = action.closest('.itemBoxTable__bodyRow').next();
      if(children.hasClass('itemBox--children')) {
        handleComplexGroupRemove(action, children, action.hasClass('itemBoxTable__action--removeAllSelected'));
      }
    }
    else if(action.hasClass('itemBoxTable__action--addAll')){
      const children = action.closest('.itemBoxTable__bodyRow').next();
      if(children.hasClass('itemBox--children')) {
        handleComplexGroupAdd(action, children);
      }
    }
    else {
      handleComplexItemAddRemove(action);
    }
  });
  $(".itemBoxBody--sortable").sortable({
    handle: '.itemBoxTable__bodyCell--draggable',
    placeholder: 'itemBoxTable__bodyCell--draggablePlaceholder'
  });
}
