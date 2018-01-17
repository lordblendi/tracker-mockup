document.ready(function() {

  var setHeightDocumentContent = function() {
    var check = 0;

    $('*[class^="panel__"]').each(function() {
        var _this = $(this).height();

        if (_this >= check) {
            check = _this;
        }
    });

    $('.document__content').css('height', check + 'px');
  }();

}); // END
