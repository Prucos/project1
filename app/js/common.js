$(document).ready(function () {

  $('.fa-bars').on('click', function(){
    toggleMenu('nav', 'opened');
  });

// Menu items animation
  $('nav ul li a').on('click', function(){
    activeItems(this)
   });

  $('.sitemap ul li a').on('click', function(){
    activeItems(this);
  });
// SLIDER menu items animation
   $('.box').on('click', function(){
     $('.box').removeClass('active');
     $(this).addClass('active');
    });

// functions

  function activeItems(menuItem) {
    $('ul li').removeClass('active');
    $(menuItem).parent().addClass('active');
    scrollById(menuItem);
  }

  function toggleMenu(toggler, togClass) {
    if ($(toggler).hasClass(togClass)) {
        $(toggler).slideUp(300);
        $(toggler).removeClass(togClass);

    } else {
      $(toggler).addClass(togClass).slideDown(300);
    }
  };

  function scrollById(btnPressed) {
    var link = $(btnPressed).attr("href");
    $('html, body').animate({
      scrollTop: $(link).offset().top
    }, 300);
  }





});
