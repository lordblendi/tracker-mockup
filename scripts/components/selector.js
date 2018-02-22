// toggle simple
$('.JS_selector').on('click', function() {
  $(this).toggleClass('pmx-selector--clicked');
});

// toggle button actions
$('.JS_selectorItem').on('click', function() {
  const selectorValue = $(this);
  const selector = selectorValue.closest('.JS_selector');

  // only if this is not a multiselect popup toggle
  if(!selector.hasClass('MULTISELECT__POPUP')) {
    const isSelected = selectorValue.hasClass('pmx-selector__item--selected');

    const required = selector.hasClass('pmx-selector--required');
    const expanded = selector.hasClass('pmx-selector--expanded');
    const multiSelect = selector.hasClass('pmx-selector--multiSelect');
    const toggleSelect = selector.hasClass('pmx-selector--toggleSelect');
    const inclExcl = selector.hasClass('JS_pmx-selector--incl-excl');

    const selectedValues = selector.find('.pmx-selector__item--selected');

    // toggleSelect = singleSelect
    if (toggleSelect === true) {
      // if required, remove all the others from being selected
      selectedValues.removeClass('pmx-selector__item--selected');
      // if required, select the one you clicked on
      if(required === true) {
        selectorValue.addClass('pmx-selector__item--selected');
      }
      // otherwise if it's not selected, toggle it;
      else {
        if(!isSelected) {
          selectorValue.toggleClass('pmx-selector__item--selected');
        }
      }

      // if it has to change icons -> one specific toggle example
      // swap between - and +
      // TEMPORARY
      if(selector.hasClass('JS_pmx-selector--changeIcons')) {
        selectedValues.find('.pmx-selector__blockPart--prefix').html("-");
        if(selectorValue.hasClass('pmx-selector__item--selected')) {
          selectorValue.find('.pmx-selector__blockPart--prefix').html("+");
        }
        else {
          selectorValue.find('.pmx-selector__blockPart--prefix').html("-");
        }
      }
    }
    else if (multiSelect === true) {
      // if required
      // only allow toggle, if the this is not the last checked one
      if(required === true) {
        if(selectedValues.length === 1) {
          if (isSelected === false) {
            selectorValue.toggleClass('pmx-selector__item--selected');
          }
        }
        else {
          selectorValue.toggleClass('pmx-selector__item--selected');
        }
      }
      // otherwise just toggle
      else {
        selectorValue.toggleClass('pmx-selector__item--selected');
      }
    }


    // TEMPORARY FOR MULTISELECT EXAMPLES IN /pmx
    if(inclExcl === true) {
      // old multiselect
      if (selector.hasClass('JS_pmx-selector--old')) {
        if(selectorValue.hasClass('JS_pmx-selector__item--exclude') && selectorValue.hasClass('pmx-selector__item--selected')) {
          $('.old-multiselect-popup .old-multiselect-tab').addClass('JS_old-multiselect-tab-negative');
        }
        else {
          $('.old-multiselect-popup .old-multiselect-tab').removeClass('JS_old-multiselect-tab-negative');
        }
      }
      //  new multiselect
      else {
        if(selectorValue.hasClass('JS_pmx-selector__item--exclude') && selectorValue.hasClass('pmx-selector__item--selected')) {
          selectorValue.closest('.JS_multiSelector__box').addClass('JS_exclude');
        }
        else {
          selectorValue.closest('.JS_multiSelector__box').removeClass('JS_exclude');
        }
      }
    }
  }

});
