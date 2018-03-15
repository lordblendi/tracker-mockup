---
---

// set sortable in multiselect options
$(".multiSelector:not(.JS_multiSelector--withFilter) .itemBoxBody--sortable").sortable({
  handle: '.itemBoxTable__bodyCell--draggable',
  placeholder: 'itemBoxTable__bodyCell--draggablePlaceholder'
});

$(".multiSelector.JS_multiSelector--withFilter .itemBoxBody--sortableInclude, .multiSelector.JS_multiSelector--withFilter .itemBoxBody--sortableExclude").sortable({
  handle: '.itemBoxTable__bodyCell--draggable',
  placeholder: 'itemBoxTable__bodyCell--draggablePlaceholder',
  connectWith: ".itemBoxBody--sortableConnected"
});


// COMPLEX multiSelector
// set actions for + and X
$('.multiSelector .JS_multiSelector__box .itemBoxTable__action').on('click', function(){
  const action = $(this);
  const multiSelector = action.closest('.multiSelector');
  var selectedBlockClass = ".JS_multiSelector__box--selectionChildren";
  if(multiSelector.hasClass('JS_multiSelector--withFilter')){
    const JS_filterableCell = action.closest('.JS_filterableCell');
    const filter = $(JS_filterableCell).find('.JS_inclExl');
    if(filter.length > 0) {
      selectedBlockClass += filter.attr('data-filter');
    }
  }

  handleActionOnclick(action, selectedBlockClass);
});

// handles onclick`
function handleActionOnclick(action, selectedBlockClass) {
  // if this just shows selected, don't do anything (has same design css class)
  if(action.hasClass('JS_showSelected')) {
    return;
  }

  // check if it's an include or exclude action
  const multiSelector = action.closest('.multiSelector')[0];
  const exclude = $(multiSelector).find('.JS_exclude').length > 0;

  // if removeAll, then we call the groupRemove
  // with a parameter depending if it's removing all from selected or not
  if(action.hasClass('JS_itemBoxTable__action--removeAll')){
    const children = action.closest('.itemBoxTable__bodyRow').next();
    if(children.hasClass('itemBox--children')) {
      handleComplexGroupRemove(action, children, action.hasClass('JS_itemBoxTable__action--removeAllSelected'));
    }
  }
  // if it's addAll, then we call the groupAdd
  else if(action.hasClass('JS_itemBoxTable__action--addAll')){
    const children = action.closest('.itemBoxTable__bodyRow').next();
    if(children.hasClass('itemBox--children')) {
      handleComplexGroupAdd(action, children, exclude);
    }
  }
  // otherwise we call a function, that handles row action
  else {
    handleComplexItemAddRemove(action, exclude, selectedBlockClass);
  }

  // whatever happened, reset the filter
  // in case some stuff were filtered
  if(!$(action).hasClass('itemBoxTable__action--toggle')){
    $(multiSelector).find('.JS_multiSelector__filterInput').val("").keyup();
  }
}


// different action HTMls are stored in separated html files
const addActionHTML = `{% include javascript/addAction.html %}`;
const addGroupActionHTML = `{% include javascript/addGroupAction.html %}`;
const removeActionHTML = `{% include javascript/removeAction.html %}`;
const removeGroupActionHTML = `{% include javascript/removeGroupAction.html %}`;


// for a whole group adding addActionHTMLs
function resetGroupRemoveActions(removeAllActions, children) {
  $.each(removeAllActions, function(index, item){
    const ulParent = $(item).parent();
    // we always remove the removeAll Button
    item.remove();
    // if the parent doesn't have any addAll -> append
    if(ulParent.children('.JS_itemBoxTable__bodyCell--addAll').length === 0) {
      ulParent.append(addGroupActionHTML);
    }
  });
  // replace all normal actions with addAction
  children.find('ul li.itemBoxTable__bodyCell--remove').replaceWith(addActionHTML);
}

// for a whole group adding removeActionHTMLs
function resetGroupAddActions(removeAllActions, children) {
  $.each(removeAllActions, function(index, item){
    const ulParent = $(item).parent();
    // we always remove the addAll Button
    item.remove();
    // if the parent doesn't have any removeAll -> append
    if(ulParent.children('.JS_itemBoxTable__bodyCell--removeAll').length === 0) {
      ulParent.append(removeGroupActionHTML);
    }
  });
  // replace all normal actions with removeAction
  children.find('ul li.itemBoxTable__bodyCell--add').replaceWith(removeActionHTML);
}


// if the selected block is not present, we add it to the multiSelector
// also reinit the toggle action, if we want to close it
function addSelectedBlock(multiSelector){

  var selectedFilters = '';
  if(multiSelector.hasClass('JS_multiSelector--withFilter')) {
    selectedFilters = `{% include javascript/selectedBlock-Include.html %}{% include javascript/selectedBlock-Exclude.html %}`;
  }
  const selectedBlock = `{% include javascript/selectedBlock.html %}`;
  multiSelector.find('.JS_multiSelector__box--optionsTitle').before(selectedBlock);
  const selection = multiSelector.find('.JS_multiSelector__box--selectionTitle');
  // enable toggle again
  $(selection.find('.itemBoxTable__bodyCell--toggle')).on('click', function() {
    const itemBoxTable__bodyRow = $(this).closest('.itemBoxTable__bodyRow');
    expandCloseRow(itemBoxTable__bodyRow);
  });
}

// action to handle ADD for a whole group
function handleComplexGroupAdd(action, children, exclude) {
  var selectedBlockClass = '.JS_multiSelector__box--selectionChildren';
  const multiSelector = children.closest('.multiSelector');
  exclude = $(multiSelector[0]).find('.JS_exclude').length > 0;

  // check if there is a selected block. if not, add it
  var selection = multiSelector.find(selectedBlockClass);
    if(selection === null || selection === undefined || selection.length === 0) {
      addSelectedBlock(multiSelector);
      selection = multiSelector.find(selectedBlockClass);
    }


    // finding all the already selected items
    const optionItems = children.find('ul .JS_itemBoxTable__bodyCellInner--text');
    const itemBoxBody = selection.find('> .itemBoxTable > .itemBoxBody');
    const selectedItems = selection.find('.JS_itemBoxTable__bodyCellInner--text');
    const selectedItemTexts = $.map(selectedItems, function(item){
      return $(item).html().trim();
    });

    // for each item in the group, check if they are already part of selected.
    // if not, add them and change their action to remove
    $.each(optionItems, function(index, item){
      const textOfActionItem = $(item).html().trim();
      const bodyRow = $(item).closest('.itemBoxTable__bodyRow');
      // there should be only ONE for an item. either add or remove
      const itemInOptionsAction = $(item).find('.itemBoxTable__bodyCell--add, .itemBoxTable__bodyCell--remove')[0];

      const positionOfItemInSelected = $.inArray(textOfActionItem, selectedItemTexts);
      if (positionOfItemInSelected < 0) {
        var neededSelectedBlock = itemBoxBody;
        // if there is a filter, choose the good selected Block
        const JS_filterableCell = $(item).closest('.JS_filterableCell');
        const filter = $(JS_filterableCell).find('.JS_inclExl');
        if(filter.length > 0) {
          const filteredSelectedBlockSelector = selectedBlockClass + filter.attr('data-filter') + " > .itemBoxTable > .itemBoxBody";
          neededSelectedBlock = $(itemBoxBody).find(filteredSelectedBlockSelector);
        }

        neededSelectedBlock.append(getNewItem(item, exclude));
        const newItem = $(neededSelectedBlock).find('> .itemBoxTable__bodyRow').last();
        if($(newItem).find('.JS_itemBoxTable__bodyCellInner--colortoggle').length > 0 ){
          resetColorToggle(newItem);
        }

        $(itemInOptionsAction).replaceWith(removeActionHTML);
      }
    });

    // check their actions and the selected counter
    var removeAllActions = children.find('ul li.JS_itemBoxTable__bodyCell--addAll');
    removeAllActions.push(action.closest('li.JS_itemBoxTable__bodyCell--addAll'));
    resetGroupAddActions(removeAllActions, children);
    checkCounter(selection);
    reset();
}


// action to handle REMOVE for a whole group
function handleComplexGroupRemove(action, children, fromSelectedAction){
  const multiSelector = children.closest('.multiSelector');

  const selection = multiSelector.find('.JS_multiSelector__box--selectionChildren');
  // exit if there is no selection block
  if(selection === null || selection === undefined || selection.length === 0) {
    return;
  }

  // if it's triggered from the selected group
  // remove selected block, set everything to add
  if(fromSelectedAction) {
    const selectionTitle = selection.prev();
    selection.remove();
    selectionTitle.remove();
    // here the "children" were not part of the options block, so we have to look for them
    const options = multiSelector.find('.JS_multiSelector__box--optionsChildren');
    const removeAllActions = options.find('li.JS_itemBoxTable__bodyCell--removeAll');
    resetGroupRemoveActions(removeAllActions, options);

  }
  // otherwise find each selected item from a group and remove it from selected
  else {
    const childrenToRemove = children.find('ul li.itemBoxTable__bodyCell--remove').closest('.itemBoxTable__bodyRow').find('.JS_itemBoxTable__bodyCellInner--text');
    const selectedItems = selection.find('.JS_itemBoxTable__bodyCellInner--text');
    const selectedItemTexts = $.map(selectedItems, function(item){
      return $(item).html().trim();
    });


    $.each(childrenToRemove, function(index, child) {
      const textOfActionItem = $(child).html().trim();
      const positionOfItemInSelected = $.inArray(textOfActionItem, selectedItemTexts);
      if(positionOfItemInSelected >= 0) {
        selectedItems[positionOfItemInSelected].closest('ul.itemBoxTable__bodyRow').remove();
      }
    });

    // remove children actions
    // also adding the original action button
    var removeAllActions = children.find('ul li.JS_itemBoxTable__bodyCell--removeAll');
    removeAllActions.push(action.closest('li.JS_itemBoxTable__bodyCell--removeAll'));
    resetGroupRemoveActions(removeAllActions, children);

  }

  // check counter and reinitiate onclick and reorder actions in selection blocks
  checkCounter(selection);
  reset();
}

// creates new selected item
function getNewItem(item, exclude) {
  // check if it has to be excluded or not (design difference)
  var excludeClass = "";
  if (exclude === true) {
    excludeClass = "itemBoxTable__bodyCellInner--excluded";
  }

  // check if there should be a color trigger or not.
  var textOfActionItem = $(item).html().trim();
  var bodyRow = $(item).closest('.itemBoxTable__bodyRow');
  var colorTrigger = $(bodyRow).find('.JS_colorselector-trigger');

  var colorHTML = '';
  var colorChildren = '';
  // if so, adds both color toggle and color pallette
  if(colorTrigger.length > 0) {
    var colorToggle = colorTrigger.find('.JS_itemBoxTable__bodyCellInner--colortoggle .JS_Color');
    var color = $(colorToggle).attr('data-color');

    colorHTML = `{% include javascript/colorAction.html %}`

    colorChildren = `{% include blocks/ms-tags-colors-color-sublist.html %}`;
  }

  return `{% include javascript/newSelectedItem.html %}`;
}

// if there are no more added items, then remove selected block
// if there are more than 5 elements, refresh a counter
// otherwise remove counter
function checkCounter(selectionChildren){
  const selectionTitle = selectionChildren.prev();
  const numOfSelected = selectionChildren.find('.JS_itemBoxTable__bodyCellInner--text').length;
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

// function to handle add/remove for one item
function handleComplexItemAddRemove(action, exclude, selectedBlockClass){
  const add = $(action).hasClass('itemBoxTable__action--add');
  const remove = $(action).hasClass('itemBoxTable__action--remove');
  const toggle = $(action).hasClass('itemBoxTable__action--toggle');
  var multiSelector = action.closest('.multiSelector')[0];
  exclude = $(multiSelector).find('.JS_exclude').length > 0;

  // only continue if it's not a toggle button (expand/collapse)
  if(!toggle) {
    // if it's not an add/remove action, quit
    if(!add && !remove){
      return;
    }

    // check if the action item exists or not
    // if so, get the text of it
    const itemBoxTable__bodyRow = action.closest('.itemBoxTable__bodyRow');
    const actionItem = itemBoxTable__bodyRow.find('.JS_itemBoxTable__bodyCellInner--text')[0];
    if(actionItem === undefined) {
      return;
    }
    var textOfActionItem = $(actionItem).html().trim();

    multiSelector = action.closest('.multiSelector');

    // get selected items
    var selection = multiSelector.find(selectedBlockClass);
    // if there is no selection block
    // on remove -> nothing to do, exit function
    // on add -> readd the selected block
    if(selection === null || selection === undefined || selection.length === 0) {
      if(add) {
        addSelectedBlock(multiSelector);
        selection = multiSelector.find(selectedBlockClass);
      }
      else if(remove) {
        return;
      }
    }

    // find the selected Items
    // check if this item is already selected or not
    const selectedItems = selection.find('.JS_itemBoxTable__bodyCellInner--text');
    const selectedItemTexts = $.map(selectedItems, function(item){
      return $(item).html().trim();
    });
    const positionOfItemInSelected = $.inArray(textOfActionItem, selectedItemTexts);
    const isAlreadySelected = positionOfItemInSelected >= 0;

    // get option items
    const options = multiSelector.find('.JS_multiSelector__box--optionsChildren');
    const optionItems = options.find('.JS_itemBoxTable__bodyCellInner--text');
    const optionItemTexts = $.map(optionItems, function(item){
      return $(item).html().trim();
    });

    // find the position of this item in the options block
    const positionOfItemInOptions = $.inArray(textOfActionItem, optionItemTexts);
    // we need this item separate, in case the action is made from the selected block
    const itemInOptions = $(optionItems[positionOfItemInOptions]).closest('.itemBoxTable__bodyRow');
    // there should be only ONE for an item. either add or remove
    const itemInOptionsAction = $(itemInOptions).find('.itemBoxTable__bodyCell--add, .itemBoxTable__bodyCell--remove')[0];

    // if selecting and it's not selected yet
    // create a new item, add it to selected and replace action in options
    if(add && !isAlreadySelected) {
      const itemBoxBody = selection.find('> .itemBoxTable > .itemBoxBody');
      itemBoxBody.append(getNewItem(actionItem, exclude));

      const newItem = $(itemBoxBody).find('> .itemBoxTable__bodyRow').last();
      if($(newItem).find('.JS_itemBoxTable__bodyCellInner--colortoggle').length > 0 ){
        resetColorToggle(newItem);
      }

      if(positionOfItemInOptions >= 0) {
        $(itemInOptionsAction).replaceWith(removeActionHTML);
      }
    }
    // if removing something that is already selected
    // remove it from selected, replace action in options
    else if(remove && isAlreadySelected) {
      const itemBoxTable__bodyRow = selection.find('> .itemBoxTable > .itemBoxBody > .itemBoxTable__bodyRow');
      const itemToRemove = itemBoxTable__bodyRow[positionOfItemInSelected];
      itemToRemove.remove();

      if(positionOfItemInOptions >= 0) {
        $(itemInOptionsAction).replaceWith(addActionHTML);
      }
    }

    // check counter, reset actions
    checkCounter(selection);
    reset();
  }
}

// check group actions to make sure that addAll and removeAll show
// nothing selected -> addAll
// everything selected -> removeAll
// both selected and unselected -> removeAll addAll
function checkGroupActions() {
  const multiSelector = $('.multiSelector');

  // check on the current status group action, remove or add necessary actions
  const childrenInOptions = multiSelector.find('.itemBox--children:not(.JS_multiSelector__box--selectionChildren):not(.itemBox--children-sublist):not(.JS_itemBox--suggestions)');
  $.each(childrenInOptions, function(index, children) {
    var children = $(children);
    const groupHeader = children.prev();
    const groupAddAction = groupHeader.find('.JS_itemBoxTable__bodyCell--addAll');
    const groupRemoveAction = groupHeader.find('.JS_itemBoxTable__bodyCell--removeAll');

    const removedItems = children.find('.itemBoxTable__action--add:not(.JS_itemBoxTable__action--addAll)');
    const addedItems = children.find('.itemBoxTable__action--remove:not(.JS_itemBoxTable__action--removeAll)');

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
        groupHeader.find('.JS_itemBoxTable__bodyCell--addAll').before(removeGroupActionHTML);
      }
    }
  });
}

// resetting actions for new action buttons
// checking group actions
function reset(){
  checkGroupActions();

  // reinitiate onclick and reorder actions in selection blocks
  $('.multiSelector .JS_multiSelector__box .itemBoxTable__action').on('click', function(){
    const action = $(this);
    const multiSelector = action.closest('.multiSelector');
    var selectedBlockClass = ".JS_multiSelector__box--selectionChildren";
    if(multiSelector.hasClass('JS_multiSelector--withFilter')){
      const JS_filterableCell = action.closest('.JS_filterableCell');
      const filter = $(JS_filterableCell).find('.JS_inclExl');
      if(filter.length > 0) {
        selectedBlockClass += filter.attr('data-filter');
      }
    }

    handleActionOnclick(action, selectedBlockClass);
  });
  $(".multiSelector:not(.JS_multiSelector--withFilter) .itemBoxBody--sortable").sortable({
    handle: '.itemBoxTable__bodyCell--draggable',
    placeholder: 'itemBoxTable__bodyCell--draggablePlaceholder'
  });

  $(".multiSelector.JS_multiSelector--withFilter .itemBoxBody--sortableInclude, .multiSelector.JS_multiSelector--withFilter .itemBoxBody--sortableExclude").sortable({
    handle: '.itemBoxTable__bodyCell--draggable',
    placeholder: 'itemBoxTable__bodyCell--draggablePlaceholder',
    connectWith: ".itemBoxBody--sortableConnected"
  });
}
