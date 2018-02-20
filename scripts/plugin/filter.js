//  filter for multiselects
$('.JS_multiSelector__filterInput').keyup(function() {
  var input = $(this);
  var multiSelector = $(input).closest(".multiSelector");
  filterResults(input, '.js_multiSelector__box--selectionChildren .js_filterableCell, .js_multiSelector__box--optionsChildren .js_filterableCell');

  checkGroups(multiSelector, '.js_multiSelector__box--selectionChildren  .itemBoxTable__bodyRow:not(.js_filterableCell), .js_multiSelector__box--optionsChildren  .itemBoxTable__bodyRow:not(.js_filterableCell)');

  reInitActions(multiSelector);
});

// filter for app_navigator

$('.js_appNav__filterInput').keyup(function() {
  var input = $(this);
  filterResults(input, '.js-appNavBox .js_filterableCell');
  var multiSelector = $(input).closest(".multiSelector");

  checkGroups(multiSelector, '.js-appNavBox  .itemBoxTable__bodyRow:not(.js_filterableCell)');

  reInitActions(multiSelector);
});

// function that handles simple filter results
function filterResults(input, listItemSelector) {
  var filter = input[0].value.toUpperCase();
  var multiSelector = $(input).closest(".multiSelector");
  var listItems = $(multiSelector).find(listItemSelector);

  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < listItems.length; i++) {
    var text = $(listItems[i]).find(".js_itemBoxTable__bodyCellInner--text")[0];
    if (text.innerHTML.toUpperCase().indexOf(filter) > -1) {
      listItems[i].style.display = "";
      listItems[i].outerHTML = listItems[i].outerHTML.trim()
                                     .replace('<span ','<ul ')
                                     .replace('</span>','</ul');
    } else {
      listItems[i].style.display = "none";
      listItems[i].outerHTML = listItems[i].outerHTML.trim()
                                     .replace('<ul ','<span ')
                                     .replace('</ul>','</span');
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
        var filterableCells = $(possibleChild).find('ul.js_filterableCell');
        if (filterableCells.length > 0) {
          currentGroup.css("display", "flex");
          groups[i].outerHTML = groups[i].outerHTML.trim()
          .replace('<span ','<ul ')
          .replace(new RegExp('</span>' + '$'),'</ul');
          $(possibleChild).css('padding-top', '5px');
          $(possibleChild).css('padding-bottom', '5px');
        } else {
          currentGroup.css("display", "none");
          groups[i].outerHTML = groups[i].outerHTML.trim()
          .replace('<ul ','<span ')
          .replace(new RegExp('</ul>'+ '$'),'</span');

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
  $(multiSelector).find('.js_multiSelector__box--selectionChildren .js_itemBoxTable__bodyCellInner--colortoggle, .js_multiSelector__box--optionsChildren .js_itemBoxTable__bodyCellInner--colortoggle').on('click', function() {
    const colorToggle = $(this);
    toggleColorSelector(colorToggle);
  });

  // simple multiSelector-1
  $('#multiSelector-1 .itemBoxTable__bodyRow').on('click', function(){
    const row = $(this);
    selectNewSingleItem(row);
  })
}
