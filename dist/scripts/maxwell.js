/**
 * Maxwell by Webcreek
 */

let sidebarToggleBtn = document.querySelector('.js-sidebar-toggle');
let sidebar = document.querySelector('.js-sidebar');

sidebarToggleBtn.addEventListener('click', sidebarToggleFn);

function sidebarToggleFn() {
  sidebar.classList.toggle('sidebar-hide');
}