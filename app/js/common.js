$(document).ready(function () {

  $('.fa-bars').on('click', function(){
    toggleMenu('nav', 'opened');
  });

  $('nav ul li a').on('click', function(){
    $('nav ul li').removeClass('active');
    $(this).parent().addClass('active');
   });

   $('.box').on('click', function(){
     $('.box').removeClass('active');
     $(this).addClass('active');
    });

  function toggleMenu(toggler, togClass) {
    if ($(toggler).hasClass(togClass)) {
        $(toggler).slideUp(300);
        $(toggler).removeClass(togClass);

    } else {
      $(toggler).addClass(togClass).slideDown(300);
    }
  };


});
