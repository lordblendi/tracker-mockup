---
---

// set sortable in multiselect options
$(".itemBoxBody--sortable").sortable({
  handle: '.itemBoxTable__bodyCell--draggable',
  placeholder: 'itemBoxTable__bodyCell--draggablePlaceholder'
});

// // cell icon onclick
$('.MULTISELECT__POPUP').on('click', function() {
  const toggle = $(this);
  const top = toggle.offset().top;
  const left = toggle.offset().left;
  // outerWidth (including padding, border, and optionally margin)
  // innerWidth (including padding but not border)
  // width (not including anything)
  const width = toggle.outerWidth();
  const height = toggle.outerHeight();

  const right = left + width;
  const bottom = top + height;

  const windowWidth = $(window).width();

  const isOnLeft = Math.round(windowWidth/2) >= Math.round(left);
  const isOnRight = Math.round(windowWidth/2) < Math.round(left);

  var newTop = (Math.round(top) + Math.round(height)) + 'px';
  if($(this).hasClass('pmx-selector')) {
    newTop = Math.round(top) + 'px';
  }

  if (isOnLeft) {
    $('' + $(this).attr('data-popid')).css({
      'z-index': '99999999',
      'pointer-events': 'auto',
      'opacity': '1',
      'top': newTop,
      'left': Math.round(left) + 'px',
    });
  }
  else {
    $('' + $(this).attr('data-popid')).css({
      'z-index': '99999999',
      'pointer-events': 'auto',
      'opacity': '1',
      'top': newTop,
      'right': (Math.round($(window).width()) - Math.round(right)) + 'px',
    });
  }

  $(".overlay").css("display", 'block');
});

// close overlay and popups
$('.overlay').on('click', function() {
  $(".overlay").css("display", 'none');

  $('#multiSelector-1, #multiSelector-2, #multiSelector-3').css({
    'z-index': '0',
    'pointer-events': 'none',
    'opacity': '0',
  });
})


//////
// MULTI SELECT ONCLICK
//////
//
// SIMPLE
// $('.MULTISELECT__POPUP[data-popid="#multiSelector-1"]')
$('#multiSelector-1 .itemBoxTable__bodyRow').on('click', function(){
  const row = $(this);
  const newLabel = row.find('.js_itemBoxTable__bodyCell--text .itemBoxTable__bodyCellInner').html();

  const selectorField = $('.MULTISELECT__POPUP[data-popid="#multiSelector-1"]');
  const selectorLabelField = $(selectorField).find('.js_pmx-selector__blockPart--label');
  $(selectorLabelField).html(newLabel);

  $(".overlay").css("display", 'none');
  $('#multiSelector-1, #multiSelector-2, #multiSelector-3').css({
    'z-index': '0',
    'pointer-events': 'none',
    'opacity': '0',
  });
})



// COMPLEX
$('.multiSelector .multiSelector__box .itemBoxTable__action').on('click', function(){
  const action = $(this);
  const multiSelector = action.closest('.multiSelector')[0];
  const exclude = $(multiSelector).find('.js_exclude').length > 0;

  if(action.hasClass('js_itemBoxTable__action--removeAll')){
    const children = action.closest('.itemBoxTable__bodyRow').next();
    if(children.hasClass('itemBox--children')) {
      handleComplexGroupRemove(action, children, action.hasClass('js_itemBoxTable__action--removeAllSelected'));
    }
  }
  else if(action.hasClass('js_itemBoxTable__action--addAll')){
    const children = action.closest('.itemBoxTable__bodyRow').next();
    if(children.hasClass('itemBox--children')) {
      handleComplexGroupAdd(action, children, exclude);
    }
  }
  else {
    handleComplexItemAddRemove(action, exclude);
  }
});

const addActionHTML = `<li class="itemBoxTable__bodyCell itemBoxTable__bodyCell--add" style="flex-grow: 0;" data-flex="0">
  <div class="itemBoxTable__bodyCellInner">
    <i class="itemBoxTable__action itemBoxTable__action--add">ބ</i>
  </div>
</li>`;
const addGroupActionHTML = `<li class="itemBoxTable__bodyCell itemBoxTable__bodyCell--add js_itemBoxTable__bodyCell--addAll" style="flex-grow: 0;" data-flex="0">
  <div class="itemBoxTable__bodyCellInner">
    <i class="itemBoxTable__action itemBoxTable__action--add js_itemBoxTable__action--addAll">ބ</i>
  </div>
</li>`;
const removeActionHTML = `<li class="itemBoxTable__bodyCell itemBoxTable__bodyCell--remove" style="flex-grow: 0;" data-flex="0">
  <div class="itemBoxTable__bodyCellInner">
    <i class="itemBoxTable__action itemBoxTable__action--remove">ޅ</i>
  </div>
</li>`;
const removeGroupActionHTML = `<li class="itemBoxTable__bodyCell itemBoxTable__bodyCell--remove js_itemBoxTable__bodyCell--removeAll" style="flex-grow: 0;" data-flex="0">
  <div class="itemBoxTable__bodyCellInner">
    <i class="itemBoxTable__action itemBoxTable__action--remove js_itemBoxTable__action--removeAll">ޅ</i>
  </div>
</li>`;

function resetGroupRemoveActions(removeAllActions, children) {
  $.each(removeAllActions, function(index, item){
    const ulParent = $(item).parent();
    // we always remove the removeAll Button
    item.remove();
    // if the parent doesn't have any addAll -> append
    if(ulParent.children('.js_itemBoxTable__bodyCell--addAll').length === 0) {
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
    if(ulParent.children('.js_itemBoxTable__bodyCell--removeAll').length === 0) {
      ulParent.append(removeGroupActionHTML);
    }
  });
  // replace all normal actions with addAction
  children.find('li.itemBoxTable__bodyCell--add').replaceWith(removeActionHTML);
}

function addSelectedBlock(multiSelector){
  const selectedBlock = `
    <ul class="itemBoxTable__bodyRow js_multiSelector__box--selectionTitle">
        <li class="itemBoxTable__bodyCell itemBoxTable__bodyCell--toggle" style="flex-grow: 1;">
          <div class="itemBoxTable__bodyCellInner itemBoxTable__bodyCellInner--selectedText">
            <i>ऄ Selected</i>
          </div>
        </li>
        <li class="itemBoxTable__bodyCell itemBoxTable__bodyCell--remove" style="flex-grow: 0;" data-flex="0">
          <div class="itemBoxTable__bodyCellInner">
            <i class="itemBoxTable__action itemBoxTable__action--remove js_itemBoxTable__action--removeAll js_itemBoxTable__action--removeAllSelected">ޅ</i>
          </div>
        </li>
    </ul>
    <div class="itemBox itemBox--children  js_multiSelector__box--selectionChildren">
      <div class="itemBoxTable">
        <div class="itemBoxBody itemBoxBody--sortable">

        </div>
      </div>
    </div><!-- /.itemBox selection-->`;
  multiSelector.find('.js_multiSelector__box--optionsTitle').before(selectedBlock);
  const selection = multiSelector.find('.js_multiSelector__box--selectionTitle');
  // enable toggle again
  $(selection.find('.itemBoxTable__bodyCell--toggle')).on('click', function() {
    const itemBoxTable__bodyRow = $(this).closest('.itemBoxTable__bodyRow');
    expandCloseRow(itemBoxTable__bodyRow);
  });
}


function handleComplexGroupAdd(action, children, exclude) {
  const multiSelector = children.closest('.multiSelector');
  exclude = $(multiSelector[0]).find('.js_exclude').length > 0;

  var selection = multiSelector.find('.js_multiSelector__box--selectionChildren');
    if(selection === null || selection === undefined || selection.length === 0) {
      addSelectedBlock(multiSelector);
      selection = multiSelector.find('.js_multiSelector__box--selectionChildren');
    }

    const optionItems = children.find('.js_itemBoxTable__bodyCellInner--text');
    const itemBoxBody = selection.find('> .itemBoxTable > .itemBoxBody');
    const selectedItems = selection.find('.js_itemBoxTable__bodyCellInner--text');
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
        itemBoxBody.append(getNewItem(item, exclude));
        const newItem = $(itemBoxBody).find('> .itemBoxTable__bodyRow').last();
        resetColorToggle(newItem);

        $(itemInOptionsAction).replaceWith(removeActionHTML);
      }
    });

    var removeAllActions = children.find('li.js_itemBoxTable__bodyCell--addAll');
    removeAllActions.push(action.closest('li.js_itemBoxTable__bodyCell--addAll'));
    resetGroupAddActions(removeAllActions, children);
    checkCounter(selection);
    reset();
}

function handleComplexGroupRemove(action, children, fromSelectedAction){
  const multiSelector = children.closest('.multiSelector');

  const selection = multiSelector.find('.js_multiSelector__box--selectionChildren');
  // exit if there is no selection block
  if(selection === null || selection === undefined || selection.length === 0) {
    return;
  }

  if(fromSelectedAction) {
    const selectionTitle = selection.prev();
    selection.remove();
    selectionTitle.remove();
    // here the "children" were not part of the options block, so we have to look for them
    const options = multiSelector.find('.js_multiSelector__box--optionsChildren');
    const removeAllActions = options.find('li.js_itemBoxTable__bodyCell--removeAll');
    resetGroupRemoveActions(removeAllActions, options);

  }
  else {
    const childrenToRemove = children.find('li.itemBoxTable__bodyCell--remove').closest('.itemBoxTable__bodyRow').find('.js_itemBoxTable__bodyCellInner--text');
    const selectedItems = selection.find('.js_itemBoxTable__bodyCellInner--text');
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
    var removeAllActions = children.find('li.js_itemBoxTable__bodyCell--removeAll');
    removeAllActions.push(action.closest('li.js_itemBoxTable__bodyCell--removeAll'));
    resetGroupRemoveActions(removeAllActions, children);

  }

  checkCounter(selection);
  // reinitiate onclick and reorder actions in selection blocks
  reset();
}

function getNewItem(item, exclude) {
    var excludeClass = "";
    if (exclude === true) {
      excludeClass = "itemBoxTable__bodyCellInner--excluded";
    }

    var textOfActionItem = $(item).html();
    var bodyRow = $(item).closest('.itemBoxTable__bodyRow');
    var colorTrigger = $(bodyRow).find('.js_colorselector-trigger');

    var colorHTML = '';
    var colorChildren = '';
    if(colorTrigger.length > 0) {
      var colorToggle = colorTrigger.find('.js_itemBoxTable__bodyCellInner--colortoggle i');
      var color = $(colorToggle).attr('data-color');

      colorHTML = `<li class="itemBoxTable__bodyCell js_colorselector-trigger" style="flex-grow: 0;" data-flex="0">
        <div class="itemBoxTable__bodyCellInner js_itemBoxTable__bodyCellInner--colortoggle">
          <i class="itemBoxTable__action itemBoxTable__action--toggle" style="color: ${color};" data-color="${color}">ग़</i>
        </div>
      </li>`

      colorChildren = `{% include blocks/colorSelector-children.html %}`;
    }

    return `<ul class="itemBoxTable__bodyRow js_filterableCell">
        ${colorHTML}
      <li class="itemBoxTable__bodyCell" style="flex-grow: 1;">
        <div class="itemBoxTable__bodyCellInner js_itemBoxTable__bodyCellInner--text ${excludeClass}">${textOfActionItem}</div>
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
  </ul>
  ${colorChildren}`;
}

function checkCounter(selectionChildren){
  // if there are no more added items, then remove selected block
  // if there are more than 5 elements, refresh a counter
  // otherwise remove counter
  const selectionTitle = selectionChildren.prev();
  const numOfSelected = selectionChildren.find('.js_itemBoxTable__bodyCellInner--text').length;
  if( numOfSelected === 0) {
    selectionChildren.remove();
    selectionTitle.remove();
  }
  else if (numOfSelected >= 5 ){
    const selectedText = selectionTitle.find('.itemBoxTable__bodyCellInner--selectedText');
    selectedText.find('sup').remove();
    selectedText.append(`<sup>${numOfSelected}</sup>`);
  }
  else {
    selectionTitle.find('.itemBoxTable__bodyCellInner--selectedText sup').remove();
  }
}


function handleComplexItemAddRemove(action, exclude){
  const add = $(action).hasClass('itemBoxTable__action--add');
  const remove = $(action).hasClass('itemBoxTable__action--remove');
  const toggle = $(action).hasClass('itemBoxTable__action--toggle');
  var multiSelector = action.closest('.multiSelector')[0];
  exclude = $(multiSelector).find('.js_exclude').length > 0;

  // only continue if it's not a toggle button (expand/collapse)
  if(!toggle) {
    // if it's not an add/remove action, quit
    if(!add && !remove){
      return;
    }
    const itemBoxTable__bodyRow = action.closest('.itemBoxTable__bodyRow');
    const actionItem = itemBoxTable__bodyRow.find('.js_itemBoxTable__bodyCellInner--text')[0];
    var textOfActionItem = $(actionItem).html();



    multiSelector = action.closest('.multiSelector');

    // get selected items
    var selection = multiSelector.find('.js_multiSelector__box--selectionChildren');
    // if there is no selection block
    // on remove -> nothing to do, exit function
    // on add -> readd the selected block
    if(selection === null || selection === undefined || selection.length === 0) {
      if(add) {
        addSelectedBlock(multiSelector);
        selection = multiSelector.find('.js_multiSelector__box--selectionChildren');
      }
      else if(remove) {
        return;
      }
    }

    const selectedItems = selection.find('.js_itemBoxTable__bodyCellInner--text');
    const selectedItemTexts = $.map(selectedItems, function(item){
      return $(item).html();
    });
    const positionOfItemInSelected = $.inArray(textOfActionItem, selectedItemTexts);
    const isAlreadySelected = positionOfItemInSelected >= 0;

    // get option items
    const options = multiSelector.find('.js_multiSelector__box--optionsChildren');
    const optionItems = options.find('.js_itemBoxTable__bodyCellInner--text');
    const optionItemTexts = $.map(optionItems, function(item){
      return $(item).html();
    });

    const positionOfItemInOptions = $.inArray(textOfActionItem, optionItemTexts);
    // we need this item separate, in case the action is made from the selected block
    const itemInOptions = $(optionItems[positionOfItemInOptions]).closest('.itemBoxTable__bodyRow');
    // there should be only ONE for an item. either add or remove
    const itemInOptionsAction = $(itemInOptions).find('.itemBoxTable__bodyCell--add, .itemBoxTable__bodyCell--remove')[0];

    if(add && !isAlreadySelected) {
      const itemBoxBody = selection.find('> .itemBoxTable > .itemBoxBody');
      itemBoxBody.append(getNewItem(actionItem, exclude));

      const newItem = $(itemBoxBody).find('> .itemBoxTable__bodyRow').last();
      resetColorToggle(newItem);



      if(positionOfItemInOptions >= 0) {
        $(itemInOptionsAction).replaceWith(removeActionHTML);
      }
    }
    else if(remove && isAlreadySelected) {
      const itemBoxTable__bodyRow = selection.find('> .itemBoxTable > .itemBoxBody > .itemBoxTable__bodyRow');
      const itemToRemove = itemBoxTable__bodyRow[positionOfItemInSelected];
      itemToRemove.remove();

      if(positionOfItemInOptions >= 0) {
        $(itemInOptionsAction).replaceWith(addActionHTML);
      }
    }

    checkCounter(selection);
    reset();
  }
}

function resetColorToggle(item) {
  $(item).find('.js_itemBoxTable__bodyCellInner--colortoggle').on('click', function() {
    // if there is a color box, expand/collapse it
    const itemBoxTable__bodyRow = $(this).closest('.itemBoxTable__bodyRow');
    const possibleChildren = itemBoxTable__bodyRow.next('.js_itemBox--colors');
    if(possibleChildren.length > 0) {
      expandCloseRow(itemBoxTable__bodyRow, undefined, possibleChildren);
    }
  });

  const possibleColorChildren = $(item).next('.js_itemBox--colors');
  possibleColorChildren.css('display', 'none').addClass('js_itemBoxTable__bodyRow--closed');
  $(item).addClass('js_itemBoxTable__bodyRow--closed');
}

function checkGroupActions() {
  const multiSelector = $('.multiSelector');

  // check on the current status group action, remove or add necessary actions
  const childrenInOptions = multiSelector.find('.itemBox--children:not(.js_multiSelector__box--selectionChildren):not(.js_itemBox--colors)');
  $.each(childrenInOptions, function(index, children) {
    var children = $(children);
    const groupHeader = children.prev();
    const groupAddAction = groupHeader.find('.js_itemBoxTable__bodyCell--addAll');
    const groupRemoveAction = groupHeader.find('.js_itemBoxTable__bodyCell--removeAll');

    const removedItems = children.find('.itemBoxTable__action--add:not(.js_itemBoxTable__action--addAll)');
    const addedItems = children.find('.itemBoxTable__action--remove:not(.js_itemBoxTable__action--removeAll)');

    // if there are no added items
    //  keep only groupAddAction
    // add groupAddAction if it doesn't exist
    if(addedItems.length === 0) {
      groupRemoveAction.remove();
      if(groupAddAction.length === 0) {
        groupHeader.append(addGroupActionHTML);
      }
    }
    // if there are no removed items
    //  keep only groupRemoveAction
    // add groupRemoveAction if it doesn't exist
    else if(removedItems.length === 0) {
      groupAddAction.remove();
      if(groupRemoveAction.length === 0) {
        groupHeader.append(removeGroupActionHTML);
      }
    }
    // else have both
    else {
      // if no add action is not there
      // append it to the end
      if(groupAddAction.length === 0){
        groupHeader.append(addGroupActionHTML);
      }
      // if there is no groupRemoveAction
      //  add it before the add button
      if(groupRemoveAction.length === 0) {
        // make sure we know that there is an addAll button now
        groupHeader.find('.js_itemBoxTable__bodyCell--addAll').before(removeGroupActionHTML);
      }
    }
  });
}

function reset(){
  checkGroupActions();

  // reinitiate onclick and reorder actions in selection blocks
  $('.multiSelector .multiSelector__box .itemBoxTable__action').on('click', function(){
    const action = $(this);
    const multiSelector = action.closest('.multiSelector')[0];
    const exclude = $(multiSelector).find('.js_exclude').length > 0;

    if(action.hasClass('js_itemBoxTable__action--removeAll')){
      const children = action.closest('.itemBoxTable__bodyRow').next();
      if(children.hasClass('itemBox--children')) {
        handleComplexGroupRemove(action, children, action.hasClass('js_itemBoxTable__action--removeAllSelected'));
      }
    }
    else if(action.hasClass('js_itemBoxTable__action--addAll')){
      const children = action.closest('.itemBoxTable__bodyRow').next();
      if(children.hasClass('itemBox--children')) {
        handleComplexGroupAdd(action, children, exclude);
      }
    }
    else {
      handleComplexItemAddRemove(action, exclude);
    }
  });
  $(".itemBoxBody--sortable").sortable({
    handle: '.itemBoxTable__bodyCell--draggable',
    placeholder: 'itemBoxTable__bodyCell--draggablePlaceholder'
  });
}
