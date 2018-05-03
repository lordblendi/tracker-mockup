var lastScrollTop = 0;

window.addEventListener("scroll", function() {
  var st = window.pageYOffset || document.documentElement.scrollTop;
  var windowHeight = $(window).height();

  $('.ms-fixed').each(function() {
    var panel = $(this);
    var container = $(this).parent();
    var panelHeight = $(this).outerHeight();
    var panelRest = panelHeight - windowHeight;

    // Going DOWN
    if (st > lastScrollTop) {
      if ( panelHeight < windowHeight ) { // Scrolling DOWN -> block fits in window -> ALWAYS top
        panel.css('top', st + 'px');
      }
      else { // Scrolling DOWN -> block bigger than window -> Scroll to bottom block
        if (st < panelRest) { /* DO NOTHING */ }
        else {
          if ( st <= (panel.offset().top + panelRest) ) { /* DO NOTHING */ }
          else {
            panel.css('top', st - panelRest + 'px');
          }
        }
      }
    // Going UP
    } else {
      if ( panelHeight < windowHeight ) { // Scrolling UP -> block fits in window -> ALWAYS top
        panel.css('top', st + 'px');
      }
      else { // Scrolling UP -> block bigger than window -> Scroll to top block
        if ( st <= panel.offset().top ) {
          panel.css('top', st + 'px');
        }
      }
    }
  });

  lastScrollTop = st;
}, false);
