---
---


// COMPLEX modal
// set actions for + and X
$('.toolbox-modal .JS_toolbox-table .JS_toolbox-table__action').on('click', function(){
  const action = $(this);
  handleActionOnclick(action);
});+
$('.toolbox-modal .JS_toolbox-table .JS_textAction').on('click', function(){
  handleTextAction($(this));
});

// handles onclick on text
function handleTextAction(text) {
  const bodyRow = text.closest('.toolbox-table__rowInner');
  // find the first add/remove action close to the text
  $(bodyRow).find('.JS_toolbox-table__action:not(.toolbox-table__action--drag)').trigger('click');

}

// handles onclick`
function handleActionOnclick(action) {
  action = $(action).find('.toolbox-table__action');
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
    const modal = action.closest('.toolbox-modal');
    if(modal.hasClass('JS_toolbox-modal--withFilter')){
      const JS_filterableCell = action.closest('.JS_filterableCell');
      const filter = $(JS_filterableCell).find('.JS_inclExl');
      if(filter.length > 0) {
        selectedBlockClass += filter.attr('data-filter');
      }
    }
  }

  // FOR OLD INCL/EXCL
  // check if it's an include or exclude action
  const modal = action.closest('.toolbox-modal')[0];
  const exclude = $(modal).find('.JS_exclude').length > 0;

  // if removeAll, then we call the groupRemove
  // with a parameter depending if it's removing all from selected or not
  if(action.hasClass('JS_toolbox-table__action--removeAll')){
    const children = action.closest('.toolbox-table__rowInner').next();
    if(children.hasClass('JS_toolbox-table--children')) {
      handleComplexGroupRemove(action, children, action.hasClass('JS_toolbox-table__action--removeAllSelected'), selectedBlockClass);
    }
  }
  // if it's addAll, then we call the groupAdd
  else if(action.hasClass('JS_toolbox-table__action--addAll')){
    const children = action.closest('.toolbox-table__rowInner').next();
    if(children.hasClass('JS_toolbox-table--children')) {
      handleComplexGroupAdd(action, children, exclude);
    }
  }
  // otherwise we call a function, that handles row action
  else {
    handleComplexItemAddRemove(action, exclude, selectedBlockClass);
  }

  // whatever happened, show resetSuggestions
  // if the modal has that enabled
  if($(modal).hasClass('JS_toolbox-modal--resetFunctionality')){
    showResetToDefault(modal);
  }

  // whatever happened, reset the filter
  // in case some stuff were filtered
  if(!$(action).hasClass('JS_toggle') &&
     !$(action).hasClass('JS_expand') &&
      $(action).find('.JS_toggle, .JS_expand') === 0 &&
      $(action).closest('.JS_toggle, .JS_expand') === 0){
    $(modal).find('.JS_toolbox-modal__filterInput').val("").keyup();
  }
}


// different action HTMls are stored in separated html files
var addActionHTML = `{% include javascript/addAction.html %}`;
var addGroupActionHTML = `{% include javascript/addGroupAction.html %}`;
var removeActionHTML = `{% include javascript/removeAction.html %}`;
var removeGroupActionHTML = `{% include javascript/removeGroupAction.html %}`;

// if the selected block is not present, we add it to the modal
// also reinit the toggle action, if we want to close it
function addSelectedBlock(modal, selectedBlockClass){
  // if we already have selectionChildrenExclude
  if (modal.find('.JS_selectionChildren').length > 0) {
    // if we are only missing JS_selectionChildrenInclude
    if(selectedBlockClass === '.JS_selectionChildrenInclude') {
      modal.find('.JS_selectionChildren .JS_sortable').prepend(`{% include javascript/selectedBlock-Include.html %}`);
    }
    // if we are only missing JS_selectionChildrenExclude
    else if(selectedBlockClass === '.JS_selectionChildrenExclude') {
      modal.find('.JS_selectionChildren .JS_sortable').append(`{% include javascript/selectedBlock-Exclude.html %}`);
    }
  }
  // otherwise we have to add the whole block
  else {
    var selectedFilters = '';
    var andOrSelector = '';
    if(modal.hasClass('JS_toolbox-modal--withFilter')) {
      selectedFilters = `{% include javascript/selectedBlock-Include.html %}{% include javascript/selectedBlock-Exclude.html %}`;
      andOrSelector = `<li class="toolbox-table__cell flex-grow-0 toolbox-table__cell--action align-right">
        <div class="toolbox-table__cellInner">
          {% include javascript/and-or-toolbox-selector.html %}
        </div>
      </li>`;
    }
    const selectedBlock = `{% include javascript/selectedBlock.html %}`;
    modal.find('.JS_optionsTitle').before(selectedBlock);
    const selectionTitle = modal.find('.JS_selectionTitle');
    // enable toggle again
    $(selectionTitle.find('.JS_toggle')).on('click', function() {
      const toolboxTable__row = $(this).closest('.toolbox-table__rowInner');
      expandCloseRow(toolboxTable__row);
    });
  }

}

// creates new selected item
function getNewItem(item, exclude) {
  // check if it has to be excluded or not (design difference)
  var excludeClass = "";
  if (exclude === true) {
    excludeClass = "toolbox-table__cellInner--excluded";
  }

  // check for multiple options/sublists.
  var textOfActionItem = $(item).html().trim();
  var bodyRow = $(item).closest('.toolbox-table__rowInner');
  var colorPrefix = $(bodyRow).find('.JS_Color--prefix');
  var colorSelectorToggle = $(bodyRow).find('.JS_toggle--color');
  var simpleText = $(item).closest('.JS_toolbox-modal--simpleText');
  var textAction = $(item).closest('.JS_toolbox-modal--textAction');
  var columnpickerOption = $(item).closest('.JS_toolbox-modal--columnpickerOptions');

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
      if($(item).closest('.toolbox-modal.JS_toolbox-modal--withColors').length > 0) {
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

// action to handle ADD for a whole group
function handleComplexGroupAdd(action, children, exclude) {
  var selectedBlockClass = '.JS_selectionChildren';
  const modal = children.closest('.toolbox-modal');
  exclude = $(modal[0]).find('.JS_exclude').length > 0;

  // check if there is a selected block. if not, add it
  var selection = modal.find(selectedBlockClass);
  if(selection === null || selection === undefined || selection.length === 0) {
    addSelectedBlock(modal, selectedBlockClass);
    selection = modal.find(selectedBlockClass);
  }

  // finding all the already selected items
  const optionItems = children.find('ul .JS_text');
  const toolboxTableBody = selection.find('.JS_sortable');
  const selectedItems = selection.find('.JS_text');
  const selectedItemTexts = $.map(selectedItems, function(item){
    return $(item).html().trim();
  });

  // for each item in the group, check if they are already part of selected.
  // if not, add them and change their action to remove
  $.each(optionItems, function(index, item){
    const textOfActionItem = $(item).html().trim();
    const bodyRow = $(item).closest('.toolbox-table__rowInner');
    // there should be only ONE for an item. either add or remove
    const itemInOptionsAction = $(item).find('.JS_toolbox-table__cell--add, .JS_toolbox-table__cell--remove')[0];

    const positionOfItemInSelected = $.inArray(textOfActionItem, selectedItemTexts);
    if (positionOfItemInSelected < 0) {
      var neededSelectedBlock = toolboxTableBody;
      // if there is a filter, choose the good selected Block
      const JS_filterableCell = $(item).closest('.JS_filterableCell');
      const filter = $(JS_filterableCell).find('.JS_inclExl');
      if(filter.length > 0) {
        const filteredSelectedBlockSelector = selectedBlockClass + filter.attr('data-filter') + " JS_sortable";
        neededSelectedBlock = $(toolboxTableBody).find(filteredSelectedBlockSelector);
      }
      neededSelectedBlock.append(getNewItem(item, exclude));
      const newItem = $(neededSelectedBlock).find('> .toolbox-table__rowInner').last();
      animateNewItem(newItem, () => {
        if($(newItem).find('.JS_toggle--color').length > 0 ){
          resetColorToggle(newItem);
        }
        $(itemInOptionsAction).replaceWith(removeActionHTML);
        reset();
      });
    }
  });
}

// action to handle REMOVE for a whole group
function handleComplexGroupRemove(action, children, fromSelectedAction, selectedBlockClass){
  const modal = children.closest('.toolbox-modal');

  const selection = modal.find(selectedBlockClass);
  // exit if there is no selection block
  if(selection === null || selection === undefined || selection.length === 0) {
    return;
  }

  // if it's triggered from the selected group
  // remove selected block, set everything to add
  if(fromSelectedAction) {
    const selectionTitle = selection.prev();
    const selectedTitleToggle = $(selectionTitle).find('.JS_toggle');
    selectedTitleToggle.click();
    setTimeout(function() {
      animateToBeRemovedItem(selectionTitle, () => {
        selection.remove();
        selectionTitle.remove();
        reset()
      });
    }, 300);
  }
  // otherwise find each selected item from a group and remove it from selected
  else {
    const childrenToRemove = children.find('ul li.JS_toolbox-table__cell--remove').closest('.toolbox-table__rowInner').find('.JS_text');
    const selectedItems = selection.find('.JS_text');
    const selectedItemTexts = $.map(selectedItems, function(item){
      return $(item).html().trim();
    });

    $.each(childrenToRemove, function(index, child) {
      const textOfActionItem = $(child).html().trim();
      const positionOfItemInSelected = $.inArray(textOfActionItem, selectedItemTexts);
      if(positionOfItemInSelected >= 0) {
        const itemToRemove = selectedItems[positionOfItemInSelected].closest('ul.toolbox-table__rowInner');
        animateToBeRemovedItem(itemToRemove, () => {
          itemToRemove.remove();
          reset()
        });
      }
    });
  }
}

// function to handle add/remove for one item
function handleComplexItemAddRemove(action, exclude, selectedBlockClass){
  const add = $(action).hasClass('JS_toolbox-table__action--add');
  const remove = $(action).hasClass('JS_toolbox-table__action--remove');
  const toggle = $(action).hasClass('JS_toggle');
  var modal = action.closest('.toolbox-modal')[0];
  exclude = $(modal).find('.JS_exclude').length > 0;

  // only continue if it's not a toggle button (expand/collapse)
  if(!toggle) {
    // if it's not an add/remove action, quit
    if(!add && !remove){
      return;
    }

    // check if the action item exists or not
    // if so, get the text of it
    const toolboxTable__row = action.closest('.toolbox-table__rowInner');
    const actionItem = toolboxTable__row.find('.JS_text')[0];
    if(actionItem === undefined) {
      return;
    }
    var textOfActionItem = $(actionItem).html().trim();

    modal = action.closest('.toolbox-modal');

    // get selected items
    var selection = modal.find(selectedBlockClass);
    // if there is no selection block
    // on remove -> nothing to do, exit function
    // on add -> readd the selected block
    if(selection === null || selection === undefined || selection.length === 0) {
      if(add) {
        addSelectedBlock(modal, selectedBlockClass);
        selection = modal.find(selectedBlockClass);
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
    const options = modal.find('.JS_optionsChildren');
    const optionItems = options.find('.JS_text');
    const optionItemTexts = $.map(optionItems, function(item){
      return $(item).html().trim();
    });

    // find the position of this item in the options block
    const positionOfItemInOptions = $.inArray(textOfActionItem, optionItemTexts);
    // we need this item separate, in case the action is made from the selected block
    const itemInOptions = $(optionItems[positionOfItemInOptions]).closest('.toolbox-table__rowInner');
    // there should be only ONE for an item. either add or remove
    const itemInOptionsAction = $(itemInOptions).find('.JS_toolbox-table__cell--add, .JS_toolbox-table__cell--remove')[0];

    // if selecting and it's not selected yet
    // create a new item, add it to selected and replace action in options
    if(add && !isAlreadySelected) {
      const toolboxTableBody = selection.find('.JS_sortable');
      toolboxTableBody.append(getNewItem(actionItem, exclude));

      const newItem = $(toolboxTableBody).find('> .toolbox-table__rowInner').last();
      if($(newItem).find('.JS_toggle--color').length > 0 ){
        resetColorToggle(newItem);
      }
      animateNewItem(newItem, () => {
        if(positionOfItemInOptions >= 0) {
          $(itemInOptionsAction).replaceWith(removeActionHTML);
        }
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

        reset();
      });

    }
  }
}
