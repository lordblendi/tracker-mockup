// toggle button actions
$('.JS_toolbox-selectorItem').on('click', function() {
  const selectorValue = $(this);
  const selector = selectorValue.closest('.JS_toolbox-selector');

  // only if this is not a multiselect popup toggle
  if(!selector.hasClass('JS_has-popup')) {
    handleSelector(selector, selectorValue);
  }

});

function handleSelector(selector, selectorValue) {
  const isSelected = selectorValue.hasClass('toolbox-selector__item--selected');

  const required = selector.hasClass('toolbox-selector--required');
  const expanded = selector.hasClass('toolbox-selector--expanded');
  const multiSelect = selector.hasClass('toolbox-selector--multiselect');
  const toggleSelect = !selector.hasClass('toolbox-selector--multiselect');
  const inclExcl = selector.hasClass('JS_toolbox-selector--incl-excl');

  const selectedValues = selector.find('.toolbox-selector__item--selected');

  // toggleSelect = singleSelect
  if (toggleSelect === true) {
    // if required, remove all the others from being selected
    selectedValues.removeClass('toolbox-selector__item--selected JS_toolbox-selectorItem--active');
    // if required, select the one you clicked on
    if(required === true) {
      selectorValue.addClass('toolbox-selector__item--selected JS_toolbox-selectorItem--active');
    }
    // otherwise if it's not selected, toggle it;
    else {
      if(!isSelected) {
        selectorValue.toggleClass('toolbox-selector__item--selected JS_toolbox-selectorItem--active');
      }
    }

    // if it has to change icons -> one specific toggle example
    // swap between - and +
    // TEMPORARY
    if(selector.hasClass('JS_toolbox-selector--changeIcons')) {
      selectedValues.find('.toolbox-selector__blockPart--prefix').html("-");
      if(selectorValue.hasClass('toolbox-selector__item--selected')) {
        selectorValue.find('.toolbox-selector__blockPart--prefix').html("+");
      }
      else {
        selectorValue.find('.toolbox-selector__blockPart--prefix').html("-");
      }
    }
  }
  else if (multiSelect === true) {
    // if required
    // only allow toggle, if the this is not the last checked one
    if(required === true) {
      if(selectedValues.length === 1) {
        if (isSelected === false) {
          selectorValue.toggleClass('toolbox-selector__item--selected JS_toolbox-selectorItem--active');
        }
      }
      else {
        selectorValue.toggleClass('toolbox-selector__item--selected JS_toolbox-selectorItem--active');
      }
    }
    // otherwise just toggle
    else {
      selectorValue.toggleClass('toolbox-selector__item--selected JS_toolbox-selectorItem--active');
    }
  }


  // TEMPORARY FOR MULTISELECT EXAMPLES IN /pmx
  if(inclExcl === true) {
    // old multiselect
    if (selector.hasClass('JS_toolbox-selector--old')) {
      if(selectorValue.hasClass('JS_toolbox-selector__item--exclude') && selectorValue.hasClass('toolbox-selector__item--selected')) {
        $('.old-multiselect-popup .old-multiselect-tab').addClass('JS_old-multiselect-tab-negative');
      }
      else {
        $('.old-multiselect-popup .old-multiselect-tab').removeClass('JS_old-multiselect-tab-negative');
      }
    }
    //  new multiselect
    else {
      if(selectorValue.hasClass('JS_toolbox-selector__item--exclude') && selectorValue.hasClass('toolbox-selector__item--selected')) {
        selectorValue.closest('.JS_toolbox-table').addClass('JS_exclude');
      }
      else {
        selectorValue.closest('.JS_toolbox-table').removeClass('JS_exclude');
      }
    }
  }
}
