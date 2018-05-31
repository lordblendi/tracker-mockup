$('.JS_share').each(function() {
  const toggle = this;
  var clipboard = new ClipboardJS('.JS_share');

  clipboard.on('success', function(e) {
    $(toggle).removeClass('JS_has-popup--error');
    handlePopupClick(toggle, '#ms-copy-success');
    setTimeout(function() {
      closeOverlay();
    }, 2000);
  });

  clipboard.on('error', function(e) {
    $(toggle).addClass('JS_has-popup--error');
    handlePopupClick(toggle, '#ms-copy-error');
    setTimeout(function() {
      closeOverlay();
    }, 2000);

  });
});
