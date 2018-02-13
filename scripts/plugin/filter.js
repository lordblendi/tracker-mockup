$('.js_multiSelector__filterInput').keyup(function() {
  var input = $(this);
  var filter = input[0].value.toUpperCase();
  var multiSelector = $(input).closest(".multiSelector");
  var listItems = $(multiSelector).find('.js_multiSelector__box--selectionChildren .js_filterableCell, .js_multiSelector__box--optionsChildren .js_filterableCell');

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

  // check all groups, see if they need to be hidden or not
  var groups = $(multiSelector).find('.itemBoxTable__bodyRow:not(.js_filterableCell)');

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

    reInitActions();
});
