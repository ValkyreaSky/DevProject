var sidebarButton = document.querySelector('.nav__button');
var sidebar = document.querySelector('.sidebar');
var backdrop = document.querySelector('.backdrop');

sidebarButton.addEventListener('click', function(){
  sidebar.classList.toggle('sidebar__open');
  backdrop.classList.toggle('backdrop__open');
});

backdrop.addEventListener('click', function(){
  sidebar.classList.remove('sidebar__open');
  backdrop.classList.remove('backdrop__open');
});
