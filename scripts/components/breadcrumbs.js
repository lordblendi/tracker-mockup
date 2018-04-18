// smart placeholder
$('.JS_breadcrumbPopup').on('click', function() {
  const breadcrumbText = $(this).html();
  $('.JS_Breadcrumb_Input').attr("placeholder", `filter through ${breadcrumbText} items`);
});
