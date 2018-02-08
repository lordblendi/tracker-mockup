$('.js_colorselector-trigger').on('click', function(){
  var colorSelectorPopup =  $('.multiSelector--colorPicker');

  // if visible, remove it
  if(colorSelectorPopup.hasClass('js_colorSelector--visible')) {
    colorSelectorPopup.removeClass('js_colorSelector--visible');

    colorSelectorPopup.css({
      'z-index': '0',
      'pointer-events': 'none',
      'opacity': '0'
    });
    return;
  }

  // apply id, so the selector will now where to change the color
  const toggle = $(this);
  toggle.attr('id', 'js_changeMyColor');
  // calculate position of color selector

  const top = toggle.offset().top;
  const left = toggle.offset().left;
  // outerWidth (including padding, border, and optionally margin)
  // innerWidth (including padding but not border)
  // width (not including anything)
  const width = toggle.outerWidth();
  const height = toggle.outerHeight();
  const right = left + width;
  const bottom = top + height;
  const windowWidth = $(window).width();
  const isOnLeft = Math.round(windowWidth/2) >= Math.round(left);
  const isOnRight = Math.round(windowWidth/2) < Math.round(left);

  var newTop = (Math.round(top) + Math.round(height)) + 'px';
  if($(this).hasClass('pmx-selector')) {
    newTop = Math.round(top) + 'px';
  }

  if (isOnLeft) {
    colorSelectorPopup.css({
      'z-index': '99999999',
      'pointer-events': 'auto',
      'opacity': '1',
      'margin': '0',
      'top': newTop,
      'left': Math.round(left) + 'px',
    });
  }
  else {
    colorSelectorPopup.css({
      'z-index': '99999999',
      'pointer-events': 'auto',
      'opacity': '1',
      'margin': '0',
      'top': newTop,
      'right': (Math.round($(window).width()) - Math.round(right)) + 'px',
    });
  }

  colorSelectorPopup.addClass('js_colorSelector--visible');
});

$('.multiSelector--colorPicker .js_itemBoxTable__bodyCellInner--color').on('click', function(){
  const color = $(this).find('span').attr('data-color');
  const toggle = $("#js_changeMyColor");
  toggle.find('.pmx-selector__labelIcon').css('color', color);
  toggle.removeAttr('id');

  $('.multiSelector--colorPicker').removeClass('js_colorSelector--visible');

  $('.multiSelector--colorPicker').css({
    'z-index': '0',
    'pointer-events': 'none',
    'opacity': '0'
  });
})
