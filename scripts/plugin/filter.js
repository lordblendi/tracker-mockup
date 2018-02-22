//  filter for multiselects - action handler for input field
$('.JS_multiSelector__filterInput').keyup(function() {
  var input = $(this);
  var multiSelector = $(input).closest(".multiSelector");
  filterResults(input, '.JS_multiSelector__box--selectionChildren .JS_filterableCell, .JS_multiSelector__box--optionsChildren .JS_filterableCell');

  checkGroups(multiSelector, '.JS_multiSelector__box  .itemBoxTable__bodyRow:not(.JS_filterableCell)');

  reInitActions(multiSelector);
});

// filter for app_navigator - action handler for input field
$('.JS_appNav__filterInput').keyup(function() {
  var input = $(this);
  filterResults(input, '.JS_appNavBox .JS_filterableCell');
  var multiSelector = $(input).closest(".multiSelector");

  checkGroups(multiSelector, '.JS_appNavBox  .itemBoxTable__bodyRow:not(.JS_filterableCell)');

  reInitActions(multiSelector);
});

// function that handles simple filter results
function filterResults(input, listItemSelector) {
  // find the current filter value from the input field
  // find the listItems with the provided selector in the same multiSelector,
  // where the input field is located at
  var filter = input[0].value.toUpperCase();
  var multiSelector = $(input).closest(".multiSelector");
  var listItems = $(multiSelector).find(listItemSelector);

  // if the filter is longar than 0 characters
  // and there is a suggestion block, display it
  // otherwise hide it.
  if(filter.length > 0) {
    $(multiSelector).find('.JS_itemBox--suggestions').css('display', 'block');
  }
  else {
    $(multiSelector).find('.JS_itemBox--suggestions').css('display', 'none');
  }

  // Loop through all list items, and hide those who don't match the search query
  //
  // to keep the alternating colors, we gonna replace the `ul` with `hide`
  // for the hidden items
  for (i = 0; i < listItems.length; i++) {
    var text = $(listItems[i]).find(".JS_itemBoxTable__bodyCellInner--text")[0];

    if(text !== undefined) {
      if (text.innerHTML.toUpperCase().indexOf(filter) > -1) {
        listItems[i].style.display = "";
        listItems[i].outerHTML = listItems[i].outerHTML.trim()
          .replace('<hide ','<ul ')
          .replace('</hide','</ul');
      } else {
        listItems[i].style.display = "none";
        listItems[i].outerHTML = listItems[i].outerHTML.trim()
          .replace('<ul ','<hide ')
          .replace('</ul','</hide');
      }
    }
  }
}

// check all groups, see if they need to be hidden or not
function checkGroups(multiSelector, possibleChildren) {
  var groups = $(multiSelector).find(possibleChildren);

    for (i = 0; i < groups.length; i++) {
      var currentGroup = $(groups[i]);
      var possibleChild = currentGroup.next();
      if(possibleChild.hasClass('itemBox--children')) {
        // find all not hidden children
        var filterableCells = $(possibleChild).find('ul.JS_filterableCell');
        // if there are some, don't hide the group
        if (filterableCells.length > 0) {
          currentGroup.css("display", "flex");
          groups[i].outerHTML = groups[i].outerHTML.trim()
          .replace('<hide ','<ul ')
          .replace(new RegExp('</hide'),'</ul');
          $(possibleChild).css('padding-top', '5px');
          $(possibleChild).css('padding-bottom', '5px');
        }
        // otherwise hide the group
        else {
          currentGroup.css("display", "none");
          groups[i].outerHTML = groups[i].outerHTML.trim()
          .replace('<ul ','<hide ')
          .replace(new RegExp('</ul'),'</hide');
          // make sure to remove the padding around the children
          // in case they were open with all of them hidden, there would be a gap
          $(possibleChild).css('padding-top', '0px');
          $(possibleChild).css('padding-bottom', '0px');
        }
      }
    }
}

// we have to reinit all actions
// because changing the element node removes them
// make sure to only do it to the elements inside the same multiSelector
// where the input field is
function reInitActions(multiSelector) {
  // normal + x actions
  $(multiSelector).find('.JS_multiSelector__box .itemBoxTable__action').on('click', function(){
    const action = $(this);
    handleActionOnclick(action);
  });

  // expand-collapse
  $(multiSelector).find('.itemBoxTable__bodyCell--toggle').unbind('click');
  $(multiSelector).find('.itemBoxTable__bodyCell--toggle').on('click', function() {
    const itemBoxTable__bodyRow = $(this).closest('.itemBoxTable__bodyRow');
    expandCloseRow(itemBoxTable__bodyRow);
  });

  // color picker trigger
  $(multiSelector).find('.JS_multiSelector__box--selectionChildren .JS_itemBoxTable__bodyCellInner--colortoggle, .JS_multiSelector__box--optionsChildren .JS_itemBoxTable__bodyCellInner--colortoggle').on('click', function() {
    const colorToggle = $(this);
    toggleColorSelector(colorToggle);
  });

  // simple multiSelector-1
  $('#multiSelector-1 .itemBoxTable__bodyRow').on('click', function(){
    const row = $(this);
    selectNewSingleItem(row);
  })

  // include-exclude selectors

  $(multiSelector).find('.JS_selectorItem').on('click', function() {
    const selectorValue = $(this);
    const selector = selectorValue.closest('.JS_selector');

    // only if this is not a multiselect popup toggle
    if(!selector.hasClass('MULTISELECT__POPUP')) {
      handleSelector(selector, selectorValue);
    }
  });
}
