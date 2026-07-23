// Theme toggle
function setTheme(theme) {
    document.body.setAttribute('data-bs-theme', theme);
    localStorage.setItem('theme', theme);
    var btn = document.getElementById('switchTheme');
    if (btn) btn.innerHTML = theme === 'dark' ? '<i class="bi bi-sun-fill"></i>' : '<i class="bi bi-moon-stars-fill"></i>';
}
var currentTheme = localStorage.getItem('theme') || 'dark';
setTheme(currentTheme);
document.getElementById('switchTheme')?.addEventListener('click', () => {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(currentTheme);
});

// Fixed header & back-to-top
window.addEventListener('scroll', () => {
    var header = document.getElementById('header');
    if (window.scrollY > 30 && !header.classList.contains('fixed-top')) {
        header.classList.add('fixed-top');
        document.getElementById('offcanvasNavbar')?.classList.add('fixedHeaderNavbar');
    } else if (window.scrollY <= 30 && header.classList.contains('fixed-top')) {
        header.classList.remove('fixed-top');
        document.getElementById('offcanvasNavbar')?.classList.remove('fixedHeaderNavbar');
    }
    var btt = document.getElementById('backToTopButton');
    if (window.scrollY > 400 && btt.style.display === 'none') btt.style.display = 'block';
    else if (window.scrollY <= 400 && btt.style.display === 'block') btt.style.display = 'none';
});
function scrollToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

// Render credly badges via fetch, no jQuery
function renderBadges(data) {
    var container = document.getElementById('credly-badges');
    if (!container) return;
    container.innerHTML = '';
    if (!data || !data.data) return;
    data.data.forEach(function(badge) {
        var col = document.createElement('div');
        col.className = 'col-6 col-md-4 col-lg-3 mb-3';
        col.innerHTML = '<a href="https://www.credly.com/badges/' + badge.id + '" target="_blank" title="' + badge.badge_template.name + '"><img src="' + badge.badge_template.image_url + '" alt="' + badge.badge_template.name + '" class="img-fluid"></a>';
        container.appendChild(col);
    });
    document.getElementById('credly-count').textContent = data.data.length;
}

document.addEventListener('DOMContentLoaded', function() {
    var credlyUser = '732f62e8-4b03-46ea-9f0f-e7d737c4a439';
    var url = 'https://api.codetabs.com/v1/proxy?quest=' + encodeURIComponent('https://www.credly.com/users/' + credlyUser + '/badges.json');
    fetch(url)
        .then(function(r) { return r.json(); })
        .then(function(data) {
            renderBadges(data);
        })
        .catch(function() {
            document.getElementById('credly-count').textContent = '—';
        });

    // Floating background particles (vanilla, no deps)
    var canvas = document.getElementById('particles-canvas');
    if (canvas) {
        for (var i = 0; i < 12; i++) {
            var p = document.createElement('div');
            p.className = 'particle';
            canvas.appendChild(p);
        }
    }
});
