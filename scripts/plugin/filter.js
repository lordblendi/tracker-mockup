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
});
