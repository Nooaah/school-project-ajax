jQuery(document).ready(function () {
    document.querySelector('.loader').innerHTML = '';
    document.getElementById('h1Title').textContent = sessionStorage.title.charAt(0).toUpperCase() + sessionStorage.title.slice(1);
    document.getElementById('article').textContent = sessionStorage.body.charAt(0).toUpperCase() + sessionStorage.body.slice(1);

});