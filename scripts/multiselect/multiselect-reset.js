// different action HTMls are stored in separated html files
addActionHTML = `{% include javascript/addAction.html %}`;
addGroupActionHTML = `{% include javascript/addGroupAction.html %}`;
removeActionHTML = `{% include javascript/removeAction.html %}`;
removeGroupActionHTML = `{% include javascript/removeGroupAction.html %}`;


// resetting actions for new action buttons
// checking group actions
function reset(){

  $('.multiSelector').each(function(index, multiSelector){
    checkAllSelectedItems(multiSelector);
    checkGroupActions(multiSelector);
    // probably doesn't belong here, but making sure, we don't have empty selection subgroups
    const selectionMainTitle = $(multiSelector).find('.JS_selectionTitle');
    const selectionMain = $(multiSelector).find('.JS_selectionChildren');
    if(selectionMain.find('.JS_text').length === 0) {
      selectionMainTitle.remove();
      selectionMain.remove();
    }
    else {
      checkCounter(selectionMain);
      const selectionExcludedTitle = $(multiSelector).find('.JS_selectionTitleExclude');
      const selectionExcluded = $(multiSelector).find('.JS_selectionChildrenExclude');
      if(selectionExcluded.find('.JS_text').length === 0) {
        selectionExcludedTitle.remove();
        selectionExcluded.remove();
      }
      const selectionIncludedTitle = $(multiSelector).find('.JS_selectionTitleInclude');
      const selectionIncluded = $(multiSelector).find('.JS_selectionChildrenInclude');
      if(selectionIncluded.find('.JS_text').length === 0) {
        selectionIncludedTitle.remove();
        selectionIncluded.remove();
      }
    }

    // reinitiate onclick and reorder actions in selection blocks
    $(multiSelector).find('.JS_itemBox .JS_itemBox__action').off('click').on('click', function(){
      const action = $(this);
      handleActionOnclick(action);
    });
    window.setTimeout( function() {
        $(multiSelector).find('.JS_itemBox .JS_textAction').off('click').on('click', function(){
          handleTextAction($(this));
        });
    }, 250);
    // reinitiate reorder functionality
    reinitSortable(multiSelector);

    // reinitiate selectorItem inside multiselector
    $(multiSelector).find('.JS_selectorItem').off('click').on('click', function() {
      const selectorValue = $(this);
      const selector = selectorValue.closest('.JS_selector');

      // only if this is not a multiselect popup toggle
      if(!selector.hasClass('JS_has-popup')) {
        handleSelector(selector, selectorValue);
      }

    });

    // INCL-EXCL OPTIONS EXPAND-COLLAPSE
    window.setTimeout( function() {
      $(multiSelector).find('.JS_toggle--InclExcl').off('click').on('click', function() {
        const toggle = $(this);
        closeColorOptions(toggle);
        toggleInclExclSelector(toggle);
      });
    }, 250);


    // reset functionality
    $(multiSelector).find('.JS_resetToDefault').off('click').on('click', function() {
      resetToDefault($(this));
    });

    // expand-collapse reset
    $(multiSelector).find('.JS_toggle').off('click').on('click', function() {
      const itemBox__row = $(this).closest('.itemBox__row');
      expandCloseRow(itemBox__row);
    });

    // columnpicker OPTIONS
    $(multiSelector).find('.JS_itemBox--columnpickerOptions .JS_selectorItem').on('click', function() {
      handleColumnPickerOptionChange($(this));
    });
    $(multiSelector).find('.JS_toggle--columnpickerOptions').off('click').on('click', function() {
      const toggle = $(this);
      closeAllOtherSublists(toggle);
      toggleColumnpickerOptions(toggle);
    });
  });
}

// check all items if they are selected or not
function checkAllSelectedItems(multiSelector) {
  multiSelector = $(multiSelector);
  var selection = multiSelector.find('.JS_selectionChildren');
  const options = multiSelector.find('.JS_optionsChildren');

  var selectedItemTexts = [];
  // if there is no selected block; then the list of selected items is []
  if(selection !== null || options !== undefined || selection.length !== 0) {
    const selectedItems = $(selection).find('.JS_text');
    selectedItemTexts = $.map(selectedItems, function(item){
      return $(item).html().trim();
    });
  }

  const optionItems = options.find('.JS_text');
  // for each item we check if it's selected or not.
  $.each(optionItems, function(index, optionItem){
    const textOfActionItem = $(optionItem).html().trim();
    const row = $(optionItem).closest('.itemBox__row');
    const positionOfItemInSelected = $.inArray(textOfActionItem, selectedItemTexts);

    if(positionOfItemInSelected >= 0) {
      // if selected, remove --add action and replace it with --remove action
      $(row).find('.JS_itemBox__cell--add').replaceWith(removeActionHTML);
    }
    else {
      // if not selected, remove --remove action and replace it with --add action
      $(row).find('.JS_itemBox__cell--remove').replaceWith(addActionHTML);
    }
  });
}


// check group actions to make sure that addAll and removeAll show
// nothing selected -> addAll
// everything selected -> removeAll
// both selected and unselected -> removeAll addAll
function checkGroupActions(multiSelector) {
  multiSelector = $(multiSelector);

  // check on the current status group action, remove or add necessary actions
  const childrenInOptions = multiSelector.find('.JS_itemBox--children:not(.JS_selectionChildren):not(.JS_itemBox--sublist):not(.JS_itemBox--suggestions)');
  $.each(childrenInOptions, function(index, children) {
    var children = $(children);
    const groupHeader = children.prev();
    const groupAddAction = groupHeader.find('.JS_itemBox__cell--addAll');
    const groupRemoveAction = groupHeader.find('.JS_itemBox__cell--removeAll');

    const removedItems = children.find('.JS_itemBox__action--add:not(.JS_itemBox__action--addAll)');
    const addedItems = children.find('.JS_itemBox__action--remove:not(.JS_itemBox__action--removeAll)');

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
        groupHeader.find('.JS_itemBox__cell--addAll').before(removeGroupActionHTML);
      }
    }
  });
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
    const selectedText = selectionTitle.find('.JS_selectedText');
    selectedText.find('sup').remove();
    selectedText.append(`<sup>${numOfSelected}</sup>`);
  }
  else {
    selectionTitle.find('.JS_selectedText sup').remove();
  }
}
