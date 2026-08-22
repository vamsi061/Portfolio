/* ============================================================
   Guru Vamsi — Portfolio scripts (vanilla JS, no jQuery)
   ============================================================ */

// ---------- Theme ----------
function setTheme(theme) {
    document.body.setAttribute('data-bs-theme', theme);
    localStorage.setItem('theme', theme);
    var switchThemeBtn = document.getElementById('switchTheme');
    if (switchThemeBtn) {
        switchThemeBtn.innerHTML = theme === 'dark'
            ? '<i class="bi bi-sun-fill"></i>'
            : '<i class="bi bi-moon-stars-fill"></i>';
    }
}

var currentTheme = localStorage.getItem('theme') || 'dark';
setTheme(currentTheme);

var switchThemeBtn = document.getElementById('switchTheme');
if (switchThemeBtn) {
    switchThemeBtn.addEventListener('click', function () {
        currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(currentTheme);
    });
}

// ---------- Accent color picker ----------
var THEME_COLORS = {
    violet:  { a1: '#6366f1', a2: '#a855f7', a3: '#22d3ee' },
    ocean:   { a1: '#3b82f6', a2: '#06b6d4', a3: '#38bdf8' },
    emerald: { a1: '#10b981', a2: '#14b8a6', a3: '#6ee7b7' },
    sunset:  { a1: '#f97316', a2: '#ef4444', a3: '#fbbf24' },
    rose:    { a1: '#ec4899', a2: '#d946ef', a3: '#f9a8d4' }
};

function applyThemeColor(name) {
    var c = THEME_COLORS[name] || THEME_COLORS.violet;
    var rootStyle = document.documentElement.style;
    rootStyle.setProperty('--accent-1', c.a1);
    rootStyle.setProperty('--accent-2', c.a2);
    rootStyle.setProperty('--accent-3', c.a3);
    localStorage.setItem('themeColor', name);
    document.querySelectorAll('.swatch').forEach(function (swatch) {
        swatch.classList.toggle('active', swatch.dataset.color === name);
    });
}

document.addEventListener('DOMContentLoaded', function () {
    applyThemeColor(localStorage.getItem('themeColor') || 'violet');

    var picker = document.getElementById('themePicker');
    var toggle = document.getElementById('themePickerToggle');
    var panel = document.getElementById('themePickerPanel');
    if (!picker || !toggle || !panel) return;

    toggle.addEventListener('click', function (e) {
        e.stopPropagation();
        var isOpen = panel.classList.toggle('open');
        toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    document.querySelectorAll('.swatch').forEach(function (swatch) {
        swatch.addEventListener('click', function () {
            applyThemeColor(swatch.dataset.color);
        });
    });

    document.addEventListener('click', function (e) {
        if (!picker.contains(e.target)) {
            panel.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');
        }
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            panel.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');
        }
    });
});

// ---------- Custom scrollspy (replaces Bootstrap ScrollSpy) ----------
(function () {
    var map = {};
    document.querySelectorAll('#navbar .nav-link[href^="#"]').forEach(function (link) {
        var hash = link.getAttribute('href');
        if (!map[hash]) map[hash] = [];
        map[hash].push(link);
    });

    var sections = Object.keys(map)
        .filter(function (hash) { return document.querySelector(hash); })
        .map(function (hash) { return { hash: hash, el: document.querySelector(hash) }; });

    if (!sections.length) return;

    function setActive(hash) {
        sections.forEach(function (s) {
            map[s.hash].forEach(function (link) {
                var on = s.hash === hash;
                link.classList.toggle('active', on);
                if (on) link.setAttribute('aria-current', 'page');
                else link.removeAttribute('aria-current');
            });
        });
    }

    var ticking = false;
    function onScroll() {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(function () {
            ticking = false;
            var line = window.scrollY + 140;
            var active = sections[0].hash;
            for (var i = 0; i < sections.length; i++) {
                if (sections[i].el.offsetTop <= line) active = sections[i].hash;
            }
            if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
                active = sections[sections.length - 1].hash;
            }
            setActive(active);
        });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    window.addEventListener('load', onScroll);
    onScroll();
})();

// ---------- Preloader ----------
window.addEventListener('load', function () {
    var preloader = document.getElementById('preloader');
    if (preloader) preloader.classList.add('hidden');
});
// Safety: never trap the user behind the preloader
setTimeout(function () {
    var preloader = document.getElementById('preloader');
    if (preloader) preloader.classList.add('hidden');
}, 2500);

// ---------- AOS ----------
document.addEventListener('DOMContentLoaded', function () {
    if (window.AOS) AOS.init({ once: true, duration: 650, offset: 60 });
});

// ---------- Header state + back-to-top on scroll ----------
window.addEventListener('scroll', function () {
    var header = document.getElementById('header');
    if (header) {
        if (window.scrollY > 30) header.classList.add('fixed-top');
        else header.classList.remove('fixed-top');
    }

    var backToTopButton = document.getElementById('backToTopButton');
    if (backToTopButton) {
        if (window.scrollY > 400) backToTopButton.classList.add('visible');
        else backToTopButton.classList.remove('visible');
    }
});

// ---------- Back to top ----------
var backToTopButton = document.getElementById('backToTopButton');
if (backToTopButton) {
    backToTopButton.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ---------- Footer year ----------
var yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ---------- Typing effect ----------
document.addEventListener('DOMContentLoaded', function () {
    if (!window.Typed) return;
    new Typed('.typing-text', {
        strings: ['Backend Engineer', 'Software Developer', 'API Integration Specialist'],
        typeSpeed: 55,
        backSpeed: 35,
        smartBackspace: true,
        backDelay: 1600,
        showCursor: false,
        loop: true
    });
});

// ---------- Floating particles ----------
document.addEventListener('DOMContentLoaded', function () {
    var canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    for (var i = 0; i < 12; i++) {
        var particle = document.createElement('div');
        particle.className = 'particle';
        canvas.appendChild(particle);
    }
});

// ---------- Badge marquees ----------
// Auto-scroll handled natively via <marquee> tags (pause on hover).
// Credly badges are rendered dynamically below; Google badges are static HTML.

// ---------- Credly badges (vanilla fetch + fallback) ----------
var fallbackBadges = [
    { name: 'Build a Secure Google Cloud Network Skill Badge', image_url: 'https://images.credly.com/images/e1131ae3-4a52-4af1-9801-b7853767cf79/image.png', id: 'fc64ce10-55b2-401a-9495-c541639f173c' },
    { name: 'Build Infrastructure with Terraform on Google Cloud Skill Badge', image_url: 'https://images.credly.com/images/b18154fb-9bd3-47e5-a6f1-554be512947d/image.png', id: '5cbd9f81-ceb3-4da3-a125-dac13bb00ad7' },
    { name: 'Develop Your Google Cloud Network Skill Badge', image_url: 'https://images.credly.com/images/b126c61c-4781-4f03-9b2b-062963003abf/image.png', id: '459d79a2-aec5-4acd-a656-f79851c9365f' },
    { name: 'Google Cloud Computing Foundations Certificate', image_url: 'https://images.credly.com/images/4dda8ae4-99ee-476c-bca3-6f0adbab42fe/image.png', id: '4d73c108-c6cb-4b2f-a737-d3e6570bbe9a' },
    { name: 'Implement Load Balancing on Compute Engine Skill Badge', image_url: 'https://images.credly.com/images/eea11cba-2a98-4bbe-bad2-447878dd34a2/image.png', id: '9de7ea5c-73a1-40d8-a6bc-72274856c7a9' },
    { name: 'Prepare Data for ML APIs on Google Cloud Skill Badge', image_url: 'https://images.credly.com/images/68756311-9319-4eeb-a2b7-76defc8dd8a2/image.png', id: 'bf318bf2-21d9-4f49-a4cf-2262e9518cad' },
    { name: 'Set Up an App Dev Environment on Google Cloud Skill Badge', image_url: 'https://images.credly.com/images/42326d44-14ff-4eda-b9c5-7d8f12919253/image.png', id: 'a84388c9-47fd-4f64-93e0-3b079c4cbcc3' },
    { name: 'AWS Academy Graduate - Machine Learning Foundations', image_url: 'https://images.credly.com/images/727c2754-d727-4e27-a1aa-3de2425ce239/blob', id: '6c54c658-a938-4054-aa84-25f87c4578b6' },
    { name: 'Associate Cloud Engineer Certification', image_url: 'https://images.credly.com/images/08096465-cbfc-4c3e-93e5-93c5aa61f23e/image.png', id: '7dd7897b-e8ba-45f1-87bc-9c91d58dc2cb' },
    { name: 'Job Application Essentials', image_url: 'https://images.credly.com/images/7ae738cc-d7af-45fd-ad53-3e21666cdeca/Job_Application_Essentials.png', id: 'e5bf9d0d-f717-4ce5-847c-aecd37f2c6b9' },
    { name: 'Cybersecurity Fundamentals', image_url: 'https://images.credly.com/images/50b96632-6cbb-40b7-ac0e-b83f49ff7f94/image.png', id: '6c850e67-6342-41e5-8b98-da021d11a865' },
    { name: 'CyberOps Associate', image_url: 'https://images.credly.com/images/53f37f83-04a1-4935-9b1e-21a99cc6e1b2/CyberOpsAssoc.png', id: 'bfca2a35-ab22-4e66-9efd-b4cfbd7bdf53' },
    { name: 'Microsoft Certified: Azure Fundamentals', image_url: 'https://images.credly.com/images/be8fcaeb-c769-4858-b567-ffaaa73ce8cf/image.png', id: 'ddc9c217-ca1b-4986-8113-85f821d3adc8' },
    { name: 'CCNA: Switching, Routing, and Wireless Essentials', image_url: 'https://images.credly.com/images/f4ccdba9-dd65-4349-baad-8f05df116443/CCNASRWE__1_.png', id: 'f834bf00-cbea-487b-b1bd-41b2f8bcdbde' },
    { name: 'AWS Educate Introduction to Cloud 101', image_url: 'https://images.credly.com/images/e51a8579-188d-4363-8ed1-12ad164ef57b/blob', id: '49fe6f63-7bf9-4bfe-8954-60698721ad20' },
    { name: 'Cybersecurity Essentials', image_url: 'https://images.credly.com/images/054913b2-e271-49a2-a1a4-9bf1c1f9a404/CyberEssentials.png', id: '25a1d583-18e8-45bf-9ac5-9c6b420cb434' },
    { name: 'AWS Academy Graduate - Cloud Foundations', image_url: 'https://images.credly.com/images/e3541a0c-dd4a-4820-8052-5001006efc85/blob', id: '8e3ea51d-ed09-48f6-9319-6cc181d90011' },
    { name: 'CCNA: Introduction to Networks', image_url: 'https://images.credly.com/images/70d71df5-f3dc-4380-9b9d-f22513a70417/CCNAITN__1_.png', id: '1ae2ffc6-6911-448f-9801-62b165a5ca30' }
];

function renderCredlyBadges(badges) {
    var container = document.getElementById('credly-badges');
    var countEl = document.getElementById('credly-count');
    if (!container) return;

    container.innerHTML = '';
    badges.forEach(function (badge) {
        var name = badge.name || (badge.badge_template && badge.badge_template.name) || 'Certification';
        var imgUrl = badge.image_url || (badge.badge_template && badge.badge_template.image_url);

        var item = document.createElement('div');
        item.className = 'item';
        item.setAttribute('role', 'listitem');

        var link = document.createElement('a');
        link.href = 'https://www.credly.com/badges/' + badge.id;
        link.target = '_blank';
        link.rel = 'noopener';
        link.title = name;

        var imgWrap = document.createElement('div');
        imgWrap.className = 'badge-img';

        var img = document.createElement('img');
        img.src = imgUrl;
        img.alt = name;
        img.loading = 'lazy';
        img.addEventListener('error', function () {
            imgWrap.innerHTML = '<i class="bi bi-patch-check-fill" title="' + name.replace(/"/g, '&quot;') + '"></i>';
        });
        imgWrap.appendChild(img);

        var caption = document.createElement('span');
        caption.className = 'badge-name';
        caption.textContent = name;

        link.appendChild(imgWrap);
        link.appendChild(caption);
        item.appendChild(link);
        container.appendChild(item);
    });

    if (countEl) countEl.textContent = badges.length;
}

document.addEventListener('DOMContentLoaded', function () {
    // Normalize static Google badge items to the same card markup as Credly
    document.querySelectorAll('#google-badges .item').forEach(function (item) {
        var img = item.querySelector('img');
        if (!img || item.querySelector('.badge-img')) return;
        var anchor = img.closest('a') || item;

        var wrap = document.createElement('div');
        wrap.className = 'badge-img';
        img.parentNode.insertBefore(wrap, img);
        wrap.appendChild(img);

        var caption = document.createElement('span');
        caption.className = 'badge-name';
        caption.textContent = img.alt;
        anchor.appendChild(caption);
    });

    var credlyUser = '732f62e8-4b03-46ea-9f0f-e7d737c4a439';
    var proxyUrl = 'https://api.codetabs.com/v1/proxy?quest=';
    var targetUrl = encodeURIComponent('https://www.credly.com/users/' + credlyUser + '/badges.json');

    // Render fallback immediately so the section is never empty
    renderCredlyBadges(fallbackBadges);

    fetch(proxyUrl + targetUrl)
        .then(function (res) { if (!res.ok) throw new Error(res.status); return res.json(); })
        .then(function (data) {
            if (data && Array.isArray(data.data) && data.data.length) {
                console.log('Credly badges fetched dynamically.');
                renderCredlyBadges(data.data.map(function (b) {
                    return {
                        id: b.id,
                        name: b.badge_template && b.badge_template.name,
                        image_url: b.badge_template && b.badge_template.image_url
                    };
                }));
            }
        })
        .catch(function (err) {
            console.warn('Using fallback Credly badges:', err.message);
        });
});
