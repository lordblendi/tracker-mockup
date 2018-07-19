setupSelectors();

function setupSelectors() {
  // toggle button actions
  $('.JS_toolbox-selectorItem').on('click', function() {
    const selectorValue = $(this);
    const selector = selectorValue.closest('.JS_toolbox-selector');

    // only if this is not a multiselect popup toggle
    if(!selector.hasClass('JS_has-popup')) {
      handleSelector(selector, selectorValue);
    }
  });

  checkRequiredSelected();
}

function checkRequiredSelected() {
  $('.toolbox-selector--required.toolbox-selector--singleselect .toolbox-selector__item').each(function (){
    const item = $(this);
    if(item.hasClass('toolbox-selector__item--selected')) {
      item.removeAttr('tabindex');
    }
    else {
      item.attr('tabindex', '0');
    }
  });

  $('.toolbox-selector--required.toolbox-selector--multiselect').each(function (){
    const currentlySelected = $(this).find('.toolbox-selector__item--selected');
    if(currentlySelected.length === 1) {
      $(currentlySelected).addClass('toolbox-selector__item--required')
    }
    else {
      $('.toolbox-selector__item--required').removeClass('toolbox-selector__item--required');
    }
  });
}

function handleSelector(selector, selectorValue) {
  const isSelected = selectorValue.hasClass('toolbox-selector__item--selected');

  const required = selector.hasClass('toolbox-selector--required');
  const expanded = selector.hasClass('toolbox-selector--expanded');
  const multiSelect = selector.hasClass('toolbox-selector--multiselect');
  const singleSelect = selector.hasClass('toolbox-selector--singleselect');
  const inclExcl = selector.hasClass('JS_toolbox-selector--incl-excl');

  const selectedValues = selector.find('.toolbox-selector__item--selected');

  // singleSelect = singleSelect
  if (singleSelect === true) {
    // if required, remove all the others from being selected
    selectedValues.removeClass('toolbox-selector__item--selected JS_toolbox-selectorItem--active');
    // if required, select the one you clicked on
    if(required === true) {
      // we have to lose focus, because this element is not focusable anymore
      $(':focus').blur();
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
      checkRequiredSelected();
    }
    // otherwise just toggle
    else {
      selectorValue.toggleClass('toolbox-selector__item--selected JS_toolbox-selectorItem--active');
    }
  }


  if(required) {
    checkRequiredSelected();
  }
}
