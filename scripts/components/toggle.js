// toggle simple
$('.pmx-selector').on('click', function() {
  $(this).toggleClass('pmx-selector--clicked');
});








// toggle button actions
$('.pmx-selector__value').on('click', function() {
  const selectorValue = $(this);
  const selector = selectorValue.closest('.pmx-selector');

  if(!selector.hasClass('MULTISELECT__POPUP')) {
    const isSelected = selectorValue.hasClass('pmx-selector__value--selected');

    const required = selector.hasClass('pmx-selector--required');
    const expanded = selector.hasClass('pmx-selector--expanded');
    const multiSelect = selector.hasClass('pmx-selector--multiSelect');
    const singleSelect = selector.hasClass('pmx-selector--singleSelect');
    const toggleSelect = selector.hasClass('pmx-selector--toggleSelect');
    const inclExcl = selector.hasClass('js_pmx-selector--incl-excl');

    const selectedValues = selector.find('.pmx-selector__value--selected');

    if(singleSelect === true) {

    }
    else if (toggleSelect === true) {
      if(required === true) {
        selectedValues.removeClass('pmx-selector__value--selected');
        selectorValue.addClass('pmx-selector__value--selected');
      }
      else {
        if(!isSelected) {
          selectorValue.toggleClass('pmx-selector__value--selected');
        }
        selectedValues.removeClass('pmx-selector__value--selected');
      }

      if(selector.hasClass('js_pmx-selector--changeIcons')) {
        selectedValues.find('.pmx-selector__icon').html("-");
        if(selectorValue.hasClass('pmx-selector__value--selected')) {
          selectorValue.find('.pmx-selector__icon').html("+");
        }
        else {
          selectorValue.find('.pmx-selector__icon').html("-");
        }
      }
    }
    else if (multiSelect === true) {
      // if required
      // only allow toggle, if the this is not the last checked one
      if(required === true) {
        if(selectedValues.length === 1) {
          if (isSelected === false) {
            selectorValue.toggleClass('pmx-selector__value--selected');
          }
        }
        else {
          selectorValue.toggleClass('pmx-selector__value--selected');
        }
      }
      else {
        selectorValue.toggleClass('pmx-selector__value--selected');
      }
    }


    // TEMPORARY FOR MULTISELECT EXAMPLES IN /pmx
    if(inclExcl === true) {
      // old multiselect
      if (selector.hasClass('js_pmx-selector--old')) {
        if(selectorValue.hasClass('js_pmx-selector__value--exclude') && selectorValue.hasClass('pmx-selector__value--selected')) {
          $('.old-multiselect-popup .old-multiselect-tab').addClass('js_old-multiselect-tab-negative');
        }
        else {
          $('.old-multiselect-popup .old-multiselect-tab').removeClass('js_old-multiselect-tab-negative');
        }
      }
      //  new multiselect
      else {
        if(selectorValue.hasClass('js_pmx-selector__value--exclude') && selectorValue.hasClass('pmx-selector__value--selected')) {
          $('#multiSelector-2 .multiSelector__box').addClass('js_exclude');
        }
        else {
          $('#multiSelector-2 .multiSelector__box').removeClass('js_exclude');
        }
      }
    }
  }

});
