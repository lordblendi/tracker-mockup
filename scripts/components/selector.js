// toggle simple
$('.JS_selector').on('click', function() {
  $(this).toggleClass('selector--clicked');
});

// toggle button actions
$('.JS_selectorItem').on('click', function() {
  const selectorValue = $(this);
  const selector = selectorValue.closest('.JS_selector');

  // only if this is not a multiselect popup toggle
  if(!selector.hasClass('MULTISELECT__POPUP')) {
    handleSelector(selector, selectorValue);
  }

});

function handleSelector(selector, selectorValue) {
  const isSelected = selectorValue.hasClass('selector__item--selected');

  const required = selector.hasClass('selector--required');
  const expanded = selector.hasClass('selector--expanded');
  const multiSelect = selector.hasClass('selector--multiselect');
  const toggleSelect = !selector.hasClass('selector--multiselect');
  const inclExcl = selector.hasClass('JS_selector--incl-excl');

  const selectedValues = selector.find('.selector__item--selected');

  // toggleSelect = singleSelect
  if (toggleSelect === true) {
    // if required, remove all the others from being selected
    selectedValues.removeClass('selector__item--selected');
    // if required, select the one you clicked on
    if(required === true) {
      selectorValue.addClass('selector__item--selected');
    }
    // otherwise if it's not selected, toggle it;
    else {
      if(!isSelected) {
        selectorValue.toggleClass('selector__item--selected');
      }
    }

    // if it has to change icons -> one specific toggle example
    // swap between - and +
    // TEMPORARY
    if(selector.hasClass('JS_selector--changeIcons')) {
      selectedValues.find('.selector__blockPart--prefix').html("-");
      if(selectorValue.hasClass('selector__item--selected')) {
        selectorValue.find('.selector__blockPart--prefix').html("+");
      }
      else {
        selectorValue.find('.selector__blockPart--prefix').html("-");
      }
    }
  }
  else if (multiSelect === true) {
    // if required
    // only allow toggle, if the this is not the last checked one
    if(required === true) {
      if(selectedValues.length === 1) {
        if (isSelected === false) {
          selectorValue.toggleClass('selector__item--selected');
        }
      }
      else {
        selectorValue.toggleClass('selector__item--selected');
      }
    }
    // otherwise just toggle
    else {
      selectorValue.toggleClass('selector__item--selected');
    }
  }


  // TEMPORARY FOR MULTISELECT EXAMPLES IN /pmx
  if(inclExcl === true) {
    // old multiselect
    if (selector.hasClass('JS_selector--old')) {
      if(selectorValue.hasClass('JS_selector__item--exclude') && selectorValue.hasClass('selector__item--selected')) {
        $('.old-multiselect-popup .old-multiselect-tab').addClass('JS_old-multiselect-tab-negative');
      }
      else {
        $('.old-multiselect-popup .old-multiselect-tab').removeClass('JS_old-multiselect-tab-negative');
      }
    }
    //  new multiselect
    else {
      if(selectorValue.hasClass('JS_selector__item--exclude') && selectorValue.hasClass('selector__item--selected')) {
        selectorValue.closest('.JS_itemBox').addClass('JS_exclude');
      }
      else {
        selectorValue.closest('.JS_itemBox').removeClass('JS_exclude');
      }
    }
  }
}
