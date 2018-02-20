//  filter for multiselects
$('.JS_multiSelector__filterInput').keyup(function() {
  var input = $(this);
  var multiSelector = $(input).closest(".multiSelector");
  filterResults(input, '.JS_multiSelector__box--selectionChildren .JS_filterableCell, .JS_multiSelector__box--optionsChildren .JS_filterableCell');

  checkGroups(multiSelector, '.multiSelector__box:not(.JS_multiSelector__box)  .itemBoxTable__bodyRow:not(.JS_filterableCell)');

  reInitActions(multiSelector);
});

// filter for app_navigator

$('.JS_appNav__filterInput').keyup(function() {
  var input = $(this);
  filterResults(input, '.JS_appNavBox .JS_filterableCell');
  var multiSelector = $(input).closest(".multiSelector");

  checkGroups(multiSelector, '.JS_appNavBox  .itemBoxTable__bodyRow:not(.JS_filterableCell)');

  reInitActions(multiSelector);
});

// function that handles simple filter results
function filterResults(input, listItemSelector) {
  var filter = input[0].value.toUpperCase();
  var multiSelector = $(input).closest(".multiSelector");
  var listItems = $(multiSelector).find(listItemSelector);

  // Loop through all list items, and hide those who don't match the search query
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
        var filterableCells = $(possibleChild).find('ul.JS_filterableCell');
        if (filterableCells.length > 0) {
          currentGroup.css("display", "flex");
          groups[i].outerHTML = groups[i].outerHTML.trim()
          .replace('<hide ','<ul ')
          .replace(new RegExp('</hide'),'</ul');
          $(possibleChild).css('padding-top', '5px');
          $(possibleChild).css('padding-bottom', '5px');
        } else {
          currentGroup.css("display", "none");
          groups[i].outerHTML = groups[i].outerHTML.trim()
          .replace('<ul ','<hide ')
          .replace(new RegExp('</ul'),'</hide');

          $(possibleChild).css('padding-top', '0px');
          $(possibleChild).css('padding-bottom', '0px');
        }
      }
    }
}

// we have to reinit all actions
function reInitActions(multiSelector) {
  // normal + x actions
  $(multiSelector).find('.multiSelector__box .itemBoxTable__action').on('click', function(){
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
}
