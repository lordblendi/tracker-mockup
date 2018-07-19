resetFilterActions();

function resetFilterActions() {
  //  filter for multiselects - action handler for input field
  $('.JS_modal__filterInput').keyup(function() {
    var input = $(this);
    var modal = $(input).closest(".modal");
    filterResults(input, '.JS_selectionChildren .JS_filterableCell, .JS_optionsChildren .JS_filterableCell');

    checkGroups(modal, '.JS_toolbox-table  .toolbox-table__rowInner:not(.JS_filterableCell)');

    reInitActions(modal);
  });

  // filter for app_navigator - action handler for input field
  $('.JS_appNav__filterInput').keyup(function() {
    var input = $(this);
    filterResults(input, '.JS_appNavBox .JS_filterableCell');
    var modal = $(input).closest(".modal, .tabs-panels__panel");

    checkGroups(modal, '.JS_appNavBox  .toolbox-table__rowInner:not(.JS_filterableCell)');

    reInitActions(modal);

    // If there are no results -> show global search suggestion
    const globalSearch = $(modal).find('.JS_globalSearch');
    if ($(modal).find("ul.JS_filterableCell").length === 0) {
      if (globalSearch.css("display") !== 'flex') {
        $.Velocity.animate(globalSearch, 'slideDown', {
          duration: 250,
          delay: 250,
          display: 'flex'
        });
      }
    }
    // otherwise hide it
    else {
      if (globalSearch.css("display") === 'flex') {
        $.Velocity.animate(globalSearch, 'slideUp', {
          duration: 250,
          delay: 250
        });
      }
    }
  });
}

// function that handles simple filter results
function filterResults(input, listItemSelector) {
  // find the current filter value from the input field
  // find the listItems with the provided selector in the same modal,
  // where the input field is located at
  var filter = input[0].value.toUpperCase();
  var modal = $(input).closest(".modal, .tabs-panels__panel");
  var listItems = $(modal).find(listItemSelector);

  // if the filter is longar than 0 characters
  // and there is a suggestion block, display it
  // otherwise hide it.
  if (filter.length > 0) {
    $(modal).find('.JS_toolbox-table--suggestions').css('display', 'block');
  } else {
    $(modal).find('.JS_toolbox-table--suggestions').css('display', 'none');
  }

  // Loop through all list items, and hide those who don't match the search query
  //
  // to keep the alternating colors, we gonna replace the `ul` with `hide`
  // for the hidden items
  for (i = 0; i < listItems.length; i++) {
    var text = $(listItems[i]).find(".JS_text")[0];

    if (text !== undefined) {
      if (text.textContent.toUpperCase().indexOf(filter) > -1) {
        listItems[i].style.display = "";
        listItems[i].outerHTML = listItems[i].outerHTML.trim()
          .replace('<hide ', '<ul ')
          .replace('</hide', '</ul');
      } else {
        listItems[i].style.display = "none";
        listItems[i].outerHTML = listItems[i].outerHTML.trim()
          .replace('<ul ', '<hide ')
          .replace('</ul', '</hide');
      }
    }
  }
}

// check all groups, see if they need to be hidden or not
function checkGroups(modal, possibleChildren) {
  var groups = $(modal).find(possibleChildren);
  for (i = 0; i < groups.length; i++) {
    var currentGroup = $(groups[i]);
    var possibleChild = currentGroup.next();
    if (possibleChild.hasClass('JS_toolbox-table--children') && !possibleChild.hasClass('JS_toolbox-table--suggestions') && !possibleChild.hasClass('JS_toolbox-table--sublist')) {
      // find all not hidden children
      var filterableCells = $(possibleChild).find('ul.JS_filterableCell');
      // if there are some, don't hide the group
      if (filterableCells.length > 0) {
        currentGroup.css("display", "flex");
        groups[i].outerHTML = groups[i].outerHTML.trim()
          .replace('<hide ', '<ul ')
          .replace(new RegExp('</hide'), '</ul');
        $(possibleChild).css('padding-top', '5px');
        $(possibleChild).css('padding-bottom', '5px');
        $(possibleChild).find('.JS_loadMoreButton').css("display", "flex");
      }
      // otherwise hide the group
      else {
        currentGroup.css("display", "none");
        groups[i].outerHTML = groups[i].outerHTML.trim()
          .replace('<ul ', '<hide ')
          .replace(new RegExp('</ul'), '</hide');
        // make sure to remove the padding around the children
        // in case they were open with all of them hidden, there would be a gap
        $(possibleChild).css('padding-top', '0px');
        $(possibleChild).css('padding-bottom', '0px');
        $(possibleChild).find('.JS_loadMoreButton').css("display", "none");
      }
    }
  }
}

// we have to reinit all actions
// because changing the element node removes them
// make sure to only do it to the elements inside the same modal
// where the input field is
function reInitActions(modal) {
  // normal + x actions
  $(modal).find('.JS_toolbox-table .JS_toolbox-table__action').on('click', function() {
    const action = $(this);
    handleActionOnclick(action);
  });

  // expand-collapse
  $(modal).find('.JS_toggle').unbind('click');
  $(modal).find('.JS_toggle').on('click', function() {
    const toolboxTable__row = $(this).closest('.toolbox-table__rowInner');
    expandCloseRow(toolboxTable__row);
  });

  // color picker trigger
  $(modal).find('.JS_selectionChildren .JS_toggle--color, .JS_optionsChildren .JS_toggle--color').on('click', function() {
    const colorToggle = $(this);
    toggleColorSelector(colorToggle);
  });

  // simple modal-1
  $('#modal-1 .toolbox-table__rowInner').on('click', function() {
    const row = $(this);
    selectNewSingleItem(row);
  })

  // include-exclude selectors

  $(modal).find('.JS_toolbox-selectorItem').on('click', function() {
    const selectorValue = $(this);
    const selector = selectorValue.closest('.JS_toolbox-selector');

    // only if this is not a multiselect popup toggle
    if (!selector.hasClass('JS_has-popup')) {
      handleSelector(selector, selectorValue);
    }
  });
  // INCL-EXCL OPTIONS EXPAND-COLLAPSE
  window.setTimeout(() => {
    $(modal).find('.JS_toggle--InclExcl').off('click').on('click', function() {
      const toggle = $(this);
      closeColorOptions(toggle);
      toggleInclExclSelector(toggle);
    });
  }, 250);
}
