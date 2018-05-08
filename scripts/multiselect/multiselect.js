---
---


// COMPLEX multiSelector
// set actions for + and X
$('.multiSelector .JS_itemBox .JS_itemBox__action').on('click', function(){
  const action = $(this);
  handleActionOnclick(action);
});+
$('.multiSelector .JS_itemBox .JS_textAction').on('click', function(){
  handleTextAction($(this));
});

function handleTextAction(text) {
  const bodyRow = text.closest('.itemBox__row');
  // find the first add/remove action close to the text
  $(bodyRow).find('.JS_itemBox__action:not(.itemBox__action--drag)').trigger('click');

}

// handles onclick`
function handleActionOnclick(action) {
  action = $(action).find('.itemBox__action');
  // if this just shows selected, don't do anything (has same design css class)
  if(action.hasClass('JS_showSelected')) {
    return;
  }

  if(action.hasClass('JS_toggle') ||
     action.hasClass('JS_expand') ||
     $(action).find('.JS_toggle, .JS_expand') > 0 ||
     $(action).closest('.JS_toggle, .JS_expand') > 0) {
       return;
     }

  // FOR FILTER INCL/EXCL
  var selectedBlockClass = ".JS_selectionChildren";
  // check if it's from selectedInclude or selectedExclude
  if((action.closest('.JS_selectionChildrenInclude, .JS_selectionTitleInclude').length > 0) || action.closest('.JS_selectionChildrenIncludeTitle').length > 0) {
    selectedBlockClass = ".JS_selectionChildrenInclude";
  }
  else if(action.closest('.JS_selectionChildrenExclude, .JS_selectionTitleExclude').length > 0 ) {
    selectedBlockClass = ".JS_selectionChildrenExclude";
  }
  // otherwise it's from the option. check if it has filter or not
  else {
    const multiSelector = action.closest('.multiSelector');
    if(multiSelector.hasClass('JS_multiSelector--withFilter')){
      const JS_filterableCell = action.closest('.JS_filterableCell');
      const filter = $(JS_filterableCell).find('.JS_inclExl');
      if(filter.length > 0) {
        selectedBlockClass += filter.attr('data-filter');
      }
    }
  }

  // FOR OLD INCL/EXCL
  // check if it's an include or exclude action
  const multiSelector = action.closest('.multiSelector')[0];
  const exclude = $(multiSelector).find('.JS_exclude').length > 0;

  // if removeAll, then we call the groupRemove
  // with a parameter depending if it's removing all from selected or not
  if(action.hasClass('JS_itemBox__action--removeAll')){
    const children = action.closest('.itemBox__row').next();
    if(children.hasClass('JS_itemBox--children')) {
      handleComplexGroupRemove(action, children, action.hasClass('JS_itemBox__action--removeAllSelected'), selectedBlockClass);
    }
  }
  // if it's addAll, then we call the groupAdd
  else if(action.hasClass('JS_itemBox__action--addAll')){
    const children = action.closest('.itemBox__row').next();
    if(children.hasClass('JS_itemBox--children')) {
      handleComplexGroupAdd(action, children, exclude);
    }
  }
  // otherwise we call a function, that handles row action
  else {
    handleComplexItemAddRemove(action, exclude, selectedBlockClass);
  }

  // whatever happened, show resetSuggestions
  // if the multiselector has that enabled
  if($(multiSelector).hasClass('JS_multiSelector--resetFunctionality')){
    showResetToDefault(multiSelector);
  }

  // whatever happened, reset the filter
  // in case some stuff were filtered
  if(!$(action).hasClass('JS_toggle') &&
     !$(action).hasClass('JS_expand') &&
      $(action).find('.JS_toggle, .JS_expand') === 0 &&
      $(action).closest('.JS_toggle, .JS_expand') === 0){
    $(multiSelector).find('.JS_multiSelector__filterInput').val("").keyup();
  }
}


// different action HTMls are stored in separated html files
var addActionHTML = `{% include javascript/addAction.html %}`;
var addGroupActionHTML = `{% include javascript/addGroupAction.html %}`;
var removeActionHTML = `{% include javascript/removeAction.html %}`;
var removeGroupActionHTML = `{% include javascript/removeGroupAction.html %}`;


// for a whole group adding addActionHTMLs
function resetGroupRemoveActions(removeAllActions, children) {
  $.each(removeAllActions, function(index, item){
    const ulParent = $(item).parent();
    // we always remove the removeAll Button
    item.remove();
    // if the parent doesn't have any addAll -> append
    if(ulParent.children('.JS_itemBox__cell--addAll').length === 0) {
      ulParent.append(addGroupActionHTML);
    }
  });
  // replace all normal actions with addAction
  $.each(children, function(index, child) {
    $(child).find('li.JS_itemBox__cell--remove:not(.JS_itemBox__cell--removeAll)').replaceWith(addActionHTML);
  });

}

// for a whole group adding removeActionHTMLs
function resetGroupAddActions(removeAllActions, children) {
  $.each(removeAllActions, function(index, item){
    const ulParent = $(item).parent();
    // we always remove the addAll Button
    item.remove();
    // if the parent doesn't have any removeAll -> append
    if(ulParent.children('.JS_itemBox__cell--removeAll').length === 0) {
      ulParent.append(removeGroupActionHTML);
    }
  });
  // replace all normal actions with removeAction
  children.find('ul li.JS_itemBox__cell--add').replaceWith(removeActionHTML);
}


// if the selected block is not present, we add it to the multiSelector
// also reinit the toggle action, if we want to close it
function addSelectedBlock(multiSelector, selectedBlockClass){
  // if we already have selectionChildrenExclude
  if (multiSelector.find('.JS_selectionChildren').length > 0) {
    // if we are only missing JS_selectionChildrenInclude
    if(selectedBlockClass === '.JS_selectionChildrenInclude') {
      multiSelector.find('.JS_selectionChildren .JS_sortable').prepend(`{% include javascript/selectedBlock-Include.html %}`);
    }
    // if we are only missing JS_selectionChildrenExclude
    else if(selectedBlockClass === '.JS_selectionChildrenExclude') {
      multiSelector.find('.JS_selectionChildren .JS_sortable').append(`{% include javascript/selectedBlock-Exclude.html %}`);
    }
  }
  // otherwise we have to add the whole block
  else {
    var selectedFilters = '';
    var andOrSelector = '';
    if(multiSelector.hasClass('JS_multiSelector--withFilter')) {
      selectedFilters = `{% include javascript/selectedBlock-Include.html %}{% include javascript/selectedBlock-Exclude.html %}`;
      andOrSelector = `<li class="itemBox__cell flex-grow-0 itemBox__cell--action align-right">
        <div class="itemBox__cellInner">
          {% include javascript/and-or-selector.html %}
        </div>
      </li>`;
    }
    const selectedBlock = `{% include javascript/selectedBlock.html %}`;
    multiSelector.find('.JS_optionsTitle').before(selectedBlock);
    const selectionTitle = multiSelector.find('.JS_selectionTitle');
    // enable toggle again
    $(selectionTitle.find('.itemBox__cell--toggle')).on('click', function() {
      const itemBox__row = $(this).closest('.itemBox__row');
      expandCloseRow(itemBox__row);
    });
  }

}

// action to handle ADD for a whole group
function handleComplexGroupAdd(action, children, exclude) {
  var selectedBlockClass = '.JS_selectionChildren';
  const multiSelector = children.closest('.multiSelector');
  exclude = $(multiSelector[0]).find('.JS_exclude').length > 0;

  // check if there is a selected block. if not, add it
  var selection = multiSelector.find(selectedBlockClass);
    if(selection === null || selection === undefined || selection.length === 0) {
      addSelectedBlock(multiSelector, selectedBlockClass);
      selection = multiSelector.find(selectedBlockClass);
    }

    // finding all the already selected items
    const optionItems = children.find('ul .JS_text');
    const itemBoxBody = selection.find('.JS_sortable');
    const selectedItems = selection.find('.JS_text');
    const selectedItemTexts = $.map(selectedItems, function(item){
      return $(item).html().trim();
    });

    // for each item in the group, check if they are already part of selected.
    // if not, add them and change their action to remove
    $.each(optionItems, function(index, item){
      const textOfActionItem = $(item).html().trim();
      const bodyRow = $(item).closest('.itemBox__row');
      // there should be only ONE for an item. either add or remove
      const itemInOptionsAction = $(item).find('.JS_itemBox__cell--add, .JS_itemBox__cell--remove')[0];

      const positionOfItemInSelected = $.inArray(textOfActionItem, selectedItemTexts);
      if (positionOfItemInSelected < 0) {
        var neededSelectedBlock = itemBoxBody;
        // if there is a filter, choose the good selected Block
        const JS_filterableCell = $(item).closest('.JS_filterableCell');
        const filter = $(JS_filterableCell).find('.JS_inclExl');
        if(filter.length > 0) {
          const filteredSelectedBlockSelector = selectedBlockClass + filter.attr('data-filter') + " JS_sortable";
          neededSelectedBlock = $(itemBoxBody).find(filteredSelectedBlockSelector);
        }
        neededSelectedBlock.append(getNewItem(item, exclude));
        const newItem = $(neededSelectedBlock).find('> .itemBox__row').last();
        if($(newItem).find('.JS_toggle--color').length > 0 ){
          resetColorToggle(newItem);
        }

        $(itemInOptionsAction).replaceWith(removeActionHTML);
      }
    });

    // check their actions and the selected counter
    var removeAllActions = children.find('ul li.JS_itemBox__cell--addAll');
    removeAllActions.push(action.closest('li.JS_itemBox__cell--addAll'));
    resetGroupAddActions(removeAllActions, children);
    checkCounter(selection);
    reset();
}


// action to handle REMOVE for a whole group
function handleComplexGroupRemove(action, children, fromSelectedAction, selectedBlockClass){
  const multiSelector = children.closest('.multiSelector');

  const selection = multiSelector.find(selectedBlockClass);
  // exit if there is no selection block
  if(selection === null || selection === undefined || selection.length === 0) {
    return;
  }

  // if it's triggered from the selected group
  // remove selected block, set everything to add
  if(fromSelectedAction) {
    // here the "children" were not part of the options block, so we have to look for them
    const options = multiSelector.find('.JS_optionsChildren');
    var removeAllActions = options.find('li.JS_itemBox__cell--removeAll');
    var childrenToRemove = [];
    const selectedItems = selection.find('.JS_text');
    const selectedItemTexts = $.map(selectedItems, function(item){
      return $(item).html().trim();
    });
    const optionChildren = options.find('.JS_text');
    if(selectedBlockClass !== '.JS_selectionChildren') {
      $.each(optionChildren, function(index, child){
        if($.inArray($(child).html().trim(), selectedItemTexts) > -1){
          childrenToRemove = childrenToRemove.concat($(child).closest('ul.itemBox__row'));
        }
      });
    }
    else {
      $.each(optionChildren, function(index, child){
        // if($.inArray($(child).html().trim(), selectedItemTexts) > -1){
          childrenToRemove = childrenToRemove.concat($(child).closest('ul.itemBox__row'));
        // }
      });
    }

    resetGroupRemoveActions(removeAllActions, childrenToRemove);


    const selectionTitle = selection.prev();
    selection.remove();
    selectionTitle.remove();

  }
  // otherwise find each selected item from a group and remove it from selected
  else {
    const childrenToRemove = children.find('ul li.JS_itemBox__cell--remove').closest('.itemBox__row').find('.JS_text');
    const selectedItems = selection.find('.JS_text');
    const selectedItemTexts = $.map(selectedItems, function(item){
      return $(item).html().trim();
    });


    $.each(childrenToRemove, function(index, child) {
      const textOfActionItem = $(child).html().trim();
      const positionOfItemInSelected = $.inArray(textOfActionItem, selectedItemTexts);
      if(positionOfItemInSelected >= 0) {
        selectedItems[positionOfItemInSelected].closest('ul.itemBox__row').remove();
      }
    });

    // remove children actions
    // also adding the original action button
    var removeAllActions = children.find('ul li.JS_itemBox__cell--removeAll');
    removeAllActions.push(action.closest('li.JS_itemBox__cell--removeAll'));
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
    excludeClass = "itemBox__cellInner--excluded";
  }

  // check if there should be a color trigger or not.
  var textOfActionItem = $(item).html().trim();
  var bodyRow = $(item).closest('.itemBox__row');
  var colorPrefix = $(bodyRow).find('.JS_Color--prefix');
  var colorSelectorToggle = $(bodyRow).find('.JS_toggle--color');
  var simpleText = $(item).closest('.JS_multiSelector--simpleText');
  var textAction = $(item).closest('.JS_multiSelector--textAction');
  var columnpickerOption = $(item).closest('.JS_multiSelector--columnpickerOptions');

  var textActionClass = ""
  var newSelectedItemHTML = "";
  var colorPrefixHTML = '';
  var colorChildren = '';
  var colorToggleHTML = '';
  var colorToggleTriggerInnerClass = '';
  var columnPickerOptionBlock = ""
  var columnpickeroptions = ""


  if(columnpickerOption.length > 0) {
    columnPickerOptionBlock = `{% include javascript/ms-toggle-columnpicker-option.html %}`;
    columnpickeroptions = `{% include blocks/popup/ms-sublist-options.html %}`;
  }
  if(textAction.length > 0){
    textActionClass = 'JS_textAction';
  }
  if(simpleText.length > 0) {
    newSelectedItemHTML = `{% include javascript/newSelectedItem--text.html %}`;
  }
  else {
    newSelectedItemHTML = `{% include javascript/newSelectedItem--unit.html %}`;
    // if so, adds both color toggle and color pallette
    if(colorSelectorToggle.length > 0) {
      var color = $(colorPrefix).attr('data-color');
      colorToggleHTML = `{% include javascript/colorToggle.html color="${color}" %}`;
      if($(item).closest('.multiSelector.JS_multiSelector--withColors').length > 0) {
        colorToggleTriggerInnerClass = ' JS_toggle--color';
        colorChildren = `{% include blocks/popup/ms-sublist-tags-colors-color.html %}`;
      }
    }
    // otherwise only check if the prefix is there or not
    else if(colorPrefix.length > 0) {
      var color = $(colorPrefix).attr('data-color');
      colorPrefixHTML = `{% include javascript/colorPrefix.html %}`
    }
  }

  return `{% include javascript/newSelectedItem.html %}`;
}

// if there are no more added items, then remove selected block
// if there are more than 5 elements, refresh a counter
// otherwise remove counter
function checkCounter(selectionChildren){
  const selectionTitle = selectionChildren.prev();
  const numOfSelected = selectionChildren.find('.JS_text').length;
  if( numOfSelected === 0) {
    selectionChildren.remove();
    selectionTitle.remove();
  }
  else if (numOfSelected >= 5 ){
    const selectedText = selectionTitle.find('.itemBox__cellInner--selectedText');
    selectedText.find('sup').remove();
    selectedText.append(`<sup>${numOfSelected}</sup>`);
  }
  else {
    selectionTitle.find('.itemBox__cellInner--selectedText sup').remove();
  }
}

// function to handle add/remove for one item
function handleComplexItemAddRemove(action, exclude, selectedBlockClass){
  const add = $(action).hasClass('JS_itemBox__action--add');
  const remove = $(action).hasClass('JS_itemBox__action--remove');
  const toggle = $(action).hasClass('JS_toggle');
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
    const itemBox__row = action.closest('.itemBox__row');
    const actionItem = itemBox__row.find('.JS_text')[0];
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
        addSelectedBlock(multiSelector, selectedBlockClass);
        selection = multiSelector.find(selectedBlockClass);
      }
      else if(remove) {
        return;
      }
    }

    // find the selected Items
    // check if this item is already selected or not
    const selectedItems = selection.find('.JS_text');
    const selectedItemTexts = $.map(selectedItems, function(item){
      return $(item).html().trim();
    });
    const positionOfItemInSelected = $.inArray(textOfActionItem, selectedItemTexts);
    const isAlreadySelected = positionOfItemInSelected >= 0;

    // get option items
    const options = multiSelector.find('.JS_optionsChildren');
    const optionItems = options.find('.JS_text');
    const optionItemTexts = $.map(optionItems, function(item){
      return $(item).html().trim();
    });

    // find the position of this item in the options block
    const positionOfItemInOptions = $.inArray(textOfActionItem, optionItemTexts);
    // we need this item separate, in case the action is made from the selected block
    const itemInOptions = $(optionItems[positionOfItemInOptions]).closest('.itemBox__row');
    // there should be only ONE for an item. either add or remove
    const itemInOptionsAction = $(itemInOptions).find('.JS_itemBox__cell--add, .JS_itemBox__cell--remove')[0];

    // if selecting and it's not selected yet
    // create a new item, add it to selected and replace action in options
    if(add && !isAlreadySelected) {
      const itemBoxBody = selection.find('.JS_sortable');
      itemBoxBody.append(getNewItem(actionItem, exclude));

      const newItem = $(itemBoxBody).find('> .itemBox__row').last();
      if($(newItem).find('.JS_toggle--color').length > 0 ){
        resetColorToggle(newItem);
      }
      animateNewItem(newItem, () => {
        if(positionOfItemInOptions >= 0) {
          $(itemInOptionsAction).replaceWith(removeActionHTML);
        }

        // needed because of the delay
        // check counter, reset actions
        checkCounter(selection);
        reset();
      });

    }
    // if removing something that is already selected
    // remove it from selected, replace action in options
    else if(remove && isAlreadySelected) {
      const itemToRemove = $(selectedItems[positionOfItemInSelected]).closest('.JS_filterableCell');
      animateToBeRemovedItem(itemToRemove, () => {
        itemToRemove.remove();
        if(positionOfItemInOptions >= 0) {
          $(itemInOptionsAction).replaceWith(addActionHTML);
        }

        // needed because of the delay
        // check counter, reset actions
        checkCounter(selection);
        reset();
      });

    }

    // check counter, reset actions
    checkCounter(selection);
    reset();
  }
}
