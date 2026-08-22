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
// Seamless CSS auto-scroll: each track is duplicated once so the loop has no gap.
// Pauses on hover/focus via CSS. Credly badges render dynamically below.

function duplicateTrack(track) {
    if (!track || track.dataset.cloned === '1') return;
    track.dataset.cloned = '1';
    Array.prototype.slice.call(track.children).forEach(function (child) {
        var clone = child.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        track.appendChild(clone);
    });
}

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
    container.dataset.cloned = '';
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

    duplicateTrack(container);
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

    duplicateTrack(document.getElementById('google-badges'));

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

// ---------- Trailhead (Salesforce) badges ----------
// Static snapshot of earned awards; refreshed from the Trailhead GraphQL API when possible.
var TRAILBLAZER_PROFILE_URL = 'https://www.salesforce.com/trailblazer/guruvamsikallepalli';

var trailblazerBadges = [
  {
    "title": "Developer Super Set",
    "type": "SUPERBADGE",
    "icon": "https://res.cloudinary.com/hy4kyit2a/f_auto/fl_lossy/q_70/learn/superbadges/superbadge_developer_superset/513dd652e042afb679675ee70bc694e2_badge.png",
    "url": null
  },
  {
    "title": "Process Automation Specialist Superbadge",
    "type": "SUPERBADGE",
    "icon": "https://res.cloudinary.com/hy4kyit2a/f_auto/fl_lossy/q_70/learn/superbadges/superbadge_process_automation_specialist/1a4f98bfa22508c396048433496def55_badge.png",
    "url": null
  },
  {
    "title": "Screen Flow Specialist Superbadge",
    "type": "SUPERBADGE",
    "icon": "https://res.cloudinary.com/hy4kyit2a/f_auto/fl_lossy/q_70/learn/superbadges/superbadge_screen_flow_specialist/4db533d414f4552b39e57c03eb072663_badge.png",
    "url": null
  },
  {
    "title": "Superbadge: Screen Flow Fundamentals",
    "type": "SUPERBADGE",
    "icon": "https://res.cloudinary.com/hy4kyit2a/f_auto/fl_lossy/q_70/learn/superbadges/superbadge_screen_flows_sbu/d7f57945f55e7fbd4c17e8e80a6d0598_badge.png",
    "url": "https://trailhead.salesforce.com/content/learn/superbadges/superbadge_screen_flows_sbu"
  },
  {
    "title": "Superbadge: Screen Flow Distribution",
    "type": "SUPERBADGE",
    "icon": "https://res.cloudinary.com/hy4kyit2a/f_auto/fl_lossy/q_70/learn/superbadges/superbadge_screen_distribution_sbu/ddcee40f60855da4e37a89cdb71da7dd_badge.png",
    "url": "https://trailhead.salesforce.com/content/learn/superbadges/superbadge_screen_distribution_sbu"
  },
  {
    "title": "Flow Elements and Resources Specialist Superbadge",
    "type": "SUPERBADGE",
    "icon": "https://res.cloudinary.com/hy4kyit2a/f_auto/fl_lossy/q_70/learn/superbadges/superbadge_flow_elements_specialist/ff154ba1999d5cc42389466723fcf15e_badge.png",
    "url": null
  },
  {
    "title": "Superbadge: Flow Administration",
    "type": "SUPERBADGE",
    "icon": "https://res.cloudinary.com/hy4kyit2a/f_auto/fl_lossy/q_70/learn/superbadges/superbadge_flow_administration_sbu/3b8248729e227e3f6ffa6af37ffe49b0_badge.png",
    "url": "https://trailhead.salesforce.com/content/learn/superbadges/superbadge_flow_administration_sbu"
  },
  {
    "title": "Superbadge: Flow Optimization",
    "type": "SUPERBADGE",
    "icon": "https://res.cloudinary.com/hy4kyit2a/f_auto/fl_lossy/q_70/learn/superbadges/superbadge_flow_optimization_sbu/75a15e009bca253a86caaf6eeeefe2ff_badge.png",
    "url": "https://trailhead.salesforce.com/content/learn/superbadges/superbadge_flow_optimization_sbu"
  },
  {
    "title": "Superbadge: Flow Fundamentals",
    "type": "SUPERBADGE",
    "icon": "https://res.cloudinary.com/hy4kyit2a/f_auto/fl_lossy/q_70/learn/superbadges/superbadge_flow_basics_sbu/b62a13bc6c32ff997303f547e2c41e7d_badge.png",
    "url": "https://trailhead.salesforce.com/content/learn/superbadges/superbadge_flow_basics_sbu"
  },
  {
    "title": "Approval Process Specialist Superbadge",
    "type": "SUPERBADGE",
    "icon": "https://res.cloudinary.com/hy4kyit2a/f_auto/fl_lossy/q_70/learn/superbadges/superbadge_ap_specialist/0a100d22c51699a5f2c5f484aec94437_badge.png",
    "url": null
  },
  {
    "title": "Superbadge: Approval Process Troubleshooting",
    "type": "SUPERBADGE",
    "icon": "https://res.cloudinary.com/hy4kyit2a/f_auto/fl_lossy/q_70/learn/superbadges/superbadge_ap_troubleshooting_sbu/303ca5d99fb702a5f780e2440f5c250c_badge.png",
    "url": "https://trailhead.salesforce.com/content/learn/superbadges/superbadge_ap_troubleshooting_sbu"
  },
  {
    "title": "Superbadge: Approval Process Management",
    "type": "SUPERBADGE",
    "icon": "https://res.cloudinary.com/hy4kyit2a/f_auto/fl_lossy/q_70/learn/superbadges/superbadge_ap_management_sbu/5f90fad54b786225f93315015752e265_badge.png",
    "url": "https://trailhead.salesforce.com/content/learn/superbadges/superbadge_ap_management_sbu"
  },
  {
    "title": "Flow Testing: Step-by-Step",
    "type": "MODULE",
    "icon": "https://res.cloudinary.com/hy4kyit2a/f_auto/fl_lossy/q_70/learn/modules/flow-testing-and-distribution/9f02416c1c56e108b9f834c8749ac15d_badge.png",
    "url": null
  },
  {
    "title": "Screen Flow Distribution",
    "type": "MODULE",
    "icon": "https://res.cloudinary.com/hy4kyit2a/f_auto/fl_lossy/q_70/learn/modules/screen_flow_distribution/bddcd7dcbf8e37a490b1f4cdcd89f97b_badge.png",
    "url": "https://trailhead.salesforce.com/content/learn/modules/screen_flow_distribution"
  },
  {
    "title": "Screen Flows",
    "type": "MODULE",
    "icon": "https://res.cloudinary.com/hy4kyit2a/f_auto/fl_lossy/q_70/learn/modules/screen-flows/f8ec5d70f82500288c9c7444a23f6375_badge.png",
    "url": "https://trailhead.salesforce.com/content/learn/modules/screen-flows"
  },
  {
    "title": "Create a Screen Flow That Checks for Duplicates",
    "type": "PROJECT",
    "icon": "https://res.cloudinary.com/hy4kyit2a/f_auto/fl_lossy/q_70/learn/projects/build-a-simple-flow/250ffca8049ecd6a8bcfbe0d6e3846ef_badge.png",
    "url": "https://trailhead.salesforce.com/content/learn/projects/build-a-simple-flow"
  },
  {
    "title": "Salesforce Badge",
    "type": "BADGE",
    "icon": null,
    "url": null
  },
  {
    "title": "Data and Actions in Flows",
    "type": "MODULE",
    "icon": "https://res.cloudinary.com/hy4kyit2a/f_auto/fl_lossy/q_70/learn/modules/data-and-actions-in-flows/3bb498fd6cccf4512b03f755a3bf78ef_badge.png",
    "url": "https://trailhead.salesforce.com/content/learn/modules/data-and-actions-in-flows"
  },
  {
    "title": "Build a Discount Approval Process",
    "type": "PROJECT",
    "icon": "https://res.cloudinary.com/hy4kyit2a/f_auto/fl_lossy/q_70/learn/projects/build-a-discount-approval-process/5fb4842313cbb9dc10dfe125d508ffda_badge.png",
    "url": "https://trailhead.salesforce.com/content/learn/projects/build-a-discount-approval-process"
  },
  {
    "title": "Flow Builder Basics",
    "type": "MODULE",
    "icon": "https://res.cloudinary.com/hy4kyit2a/f_auto/fl_lossy/q_70/learn/modules/flow-basics/c2d1e1b78bb73f734b6f668e6f9428de_badge.png",
    "url": "https://trailhead.salesforce.com/content/learn/modules/flow-basics"
  },
  {
    "title": "Apex Specialist",
    "type": "SUPERBADGE",
    "icon": "https://res.cloudinary.com/hy4kyit2a/f_auto/fl_lossy/q_70/learn/superbadges/superbadge_apex/2d3426c48dc056fd5c083ecb5cb66a56_badge.png",
    "url": null
  },
  {
    "title": "Lightning Web Components Basics",
    "type": "MODULE",
    "icon": "https://res.cloudinary.com/hy4kyit2a/f_auto/fl_lossy/q_70/learn/modules/lightning-web-components-basics/5cec7279d13ac36ab5ddbffae3035337_badge.png",
    "url": "https://trailhead.salesforce.com/content/learn/modules/lightning-web-components-basics"
  },
  {
    "title": "Quick Start: Lightning Web Components",
    "type": "PROJECT",
    "icon": "https://res.cloudinary.com/hy4kyit2a/f_auto/fl_lossy/q_70/learn/projects/quick-start-lightning-web-components/97fa54b90c579eaa8b4e63b80588679e_badge.png",
    "url": "https://trailhead.salesforce.com/content/learn/projects/quick-start-lightning-web-components"
  },
  {
    "title": "Approve Records with Approval Processes",
    "type": "MODULE",
    "icon": "https://res.cloudinary.com/hy4kyit2a/f_auto/fl_lossy/q_70/learn/modules/business_process_automation/eee3b8f9f85dde3f6681645ded4aa215_badge.png",
    "url": "https://trailhead.salesforce.com/content/learn/modules/business_process_automation"
  },
  {
    "title": "Developer Console Basics",
    "type": "MODULE",
    "icon": "https://res.cloudinary.com/hy4kyit2a/f_auto/fl_lossy/q_70/learn/modules/developer_console/a82f66a103ac46e465342fe42ae02375_badge.png",
    "url": null
  },
  {
    "title": "Leads and Opportunities",
    "type": "MODULE",
    "icon": "https://res.cloudinary.com/hy4kyit2a/f_auto/fl_lossy/q_70/learn/modules/leads_opportunities_lightning_experience/59b5454bc337616e4a0ac221f6af4f39_badge.png",
    "url": "https://trailhead.salesforce.com/content/learn/modules/leads_opportunities_lightning_experience"
  },
  {
    "title": "Shield Platform Encryption",
    "type": "MODULE",
    "icon": "https://res.cloudinary.com/hy4kyit2a/f_auto/fl_lossy/q_70/learn/modules/spe_admins/40cf448c30162567a43f16e2f3241ec6_badge.png",
    "url": "https://trailhead.salesforce.com/content/learn/modules/spe_admins"
  },
  {
    "title": "Formulas and Validations",
    "type": "MODULE",
    "icon": "https://res.cloudinary.com/hy4kyit2a/f_auto/fl_lossy/q_70/learn/modules/point_click_business_logic/d685dcb20e493c1bd3aac9d20ffac6e6_badge.png",
    "url": "https://trailhead.salesforce.com/content/learn/modules/point_click_business_logic"
  },
  {
    "title": "API Basics",
    "type": "MODULE",
    "icon": "https://res.cloudinary.com/hy4kyit2a/f_auto/fl_lossy/q_70/learn/modules/pw-api-basics/0a592c1a1e99a0695cd811499a801eef_badge.png",
    "url": "https://trailhead.salesforce.com/content/learn/modules/pw-api-basics"
  },
  {
    "title": "Event Monitoring",
    "type": "MODULE",
    "icon": "https://res.cloudinary.com/hy4kyit2a/f_auto/fl_lossy/q_70/learn/modules/event_monitoring/f1d010fe80ea0d025c902a56b8ff56bc_badge.png",
    "url": "https://trailhead.salesforce.com/content/learn/modules/event_monitoring"
  },
  {
    "title": "Apex Basics & Database",
    "type": "MODULE",
    "icon": "https://res.cloudinary.com/hy4kyit2a/f_auto/fl_lossy/q_70/learn/modules/apex_database/fab27840d343cc13934e9cf1f4a41dbc_badge.png",
    "url": "https://trailhead.salesforce.com/content/learn/modules/apex_database"
  },
  {
    "title": "Picklist Administration",
    "type": "MODULE",
    "icon": "https://res.cloudinary.com/hy4kyit2a/f_auto/fl_lossy/q_70/learn/modules/picklist_admin/2f4c2bb3463638506f20f88902482531_badge.png",
    "url": "https://trailhead.salesforce.com/content/learn/modules/picklist_admin"
  },
  {
    "title": "Data Management",
    "type": "MODULE",
    "icon": "https://res.cloudinary.com/hy4kyit2a/f_auto/fl_lossy/q_70/learn/modules/lex_implementation_data_management/4e8c947ac2967be79e0ca2722dcd491f_badge.png",
    "url": "https://trailhead.salesforce.com/content/learn/modules/lex_implementation_data_management"
  },
  {
    "title": "Duplicate Management",
    "type": "MODULE",
    "icon": "https://res.cloudinary.com/hy4kyit2a/f_auto/fl_lossy/q_70/learn/modules/sales_admin_duplicate_management/950e39701e85e96313aa77529610055b_badge.png",
    "url": "https://trailhead.salesforce.com/content/learn/modules/sales_admin_duplicate_management"
  },
  {
    "title": "Data Modeling",
    "type": "MODULE",
    "icon": "https://res.cloudinary.com/hy4kyit2a/f_auto/fl_lossy/q_70/learn/modules/data_modeling/c87f1c467561ff36a9bffdebcbc835e8_badge.png",
    "url": "https://trailhead.salesforce.com/content/learn/modules/data_modeling"
  },
  {
    "title": "Visualforce Basics",
    "type": "MODULE",
    "icon": "https://res.cloudinary.com/hy4kyit2a/f_auto/fl_lossy/q_70/learn/modules/visualforce_fundamentals/1b78e769311ab1dfd85a6734361bb055_badge.png",
    "url": "https://trailhead.salesforce.com/content/learn/modules/visualforce_fundamentals"
  },
  {
    "title": "Customize a Salesforce Object",
    "type": "PROJECT",
    "icon": "https://res.cloudinary.com/hy4kyit2a/f_auto/fl_lossy/q_70/learn/projects/customize-a-salesforce-object/1344712434eb96630de3f1c31dcc9bbd_badge.png",
    "url": "https://trailhead.salesforce.com/content/learn/projects/customize-a-salesforce-object"
  },
  {
    "title": "Superbadge Program Security: Quick Look",
    "type": "MODULE",
    "icon": "https://res.cloudinary.com/hy4kyit2a/f_auto/fl_lossy/q_70/learn/modules/superbadge-cred-security-quick-look/bd5bd8073bfeaa992eaadf941f4a9f5a_badge.png",
    "url": null
  },
  {
    "title": "Apex Triggers",
    "type": "MODULE",
    "icon": "https://res.cloudinary.com/hy4kyit2a/f_auto/fl_lossy/q_70/learn/modules/apex_triggers/b27bd74e219ef8fec8d06bfe71409cb5_badge.png",
    "url": "https://trailhead.salesforce.com/content/learn/modules/apex_triggers"
  },
  {
    "title": "Apex Integration Services",
    "type": "MODULE",
    "icon": "https://res.cloudinary.com/hy4kyit2a/f_auto/fl_lossy/q_70/learn/modules/apex_integration_services/06d0e8f1f5b59f14d070f0f6e86dc5bd_badge.png",
    "url": "https://trailhead.salesforce.com/content/learn/modules/apex_integration_services"
  },
  {
    "title": "Asynchronous Apex",
    "type": "MODULE",
    "icon": "https://res.cloudinary.com/hy4kyit2a/f_auto/fl_lossy/q_70/learn/modules/asynchronous_apex/37c7d1b37180b79d9dd4bcd3e1bdf056_badge.png",
    "url": "https://trailhead.salesforce.com/content/learn/modules/asynchronous_apex"
  },
  {
    "title": "Apex Testing",
    "type": "MODULE",
    "icon": "https://res.cloudinary.com/hy4kyit2a/f_auto/fl_lossy/q_70/learn/modules/apex_testing/2d3d525254af58a32f2325da207505ea_badge.png",
    "url": "https://trailhead.salesforce.com/content/learn/modules/apex_testing"
  },
  {
    "title": "Quick Start: Lightning App Builder",
    "type": "PROJECT",
    "icon": "https://res.cloudinary.com/hy4kyit2a/f_auto/fl_lossy/q_70/learn/projects/quickstart-app-builder/4d4adca4ec2f595abf20a7e70f91552f_badge.png",
    "url": "https://trailhead.salesforce.com/content/learn/projects/quickstart-app-builder"
  },
  {
    "title": "Quick Start: Build a Salesforce App",
    "type": "PROJECT",
    "icon": "https://res.cloudinary.com/hy4kyit2a/f_auto/fl_lossy/q_70/learn/projects/quickstart-devzone-app/1cd18e74b5adf2ee38c97651d6ca8e0f_badge.png",
    "url": "https://trailhead.salesforce.com/content/learn/projects/quickstart-devzone-app"
  },
  {
    "title": "Agentforce 360 Platform Basics",
    "type": "MODULE",
    "icon": "https://res.cloudinary.com/hy4kyit2a/f_auto/fl_lossy/q_70/learn/modules/starting_force_com/d6c87e2bd754dddc3116963498852e3a_badge.png",
    "url": "https://trailhead.salesforce.com/content/learn/modules/starting_force_com"
  },
  {
    "title": "Setup: Quick Look",
    "type": "MODULE",
    "icon": "https://res.cloudinary.com/hy4kyit2a/f_auto/fl_lossy/q_70/learn/modules/setup-quick-look/a2125d4cd76d29bc4f60c1813e685b81_badge.png",
    "url": "https://trailhead.salesforce.com/content/learn/modules/setup-quick-look"
  },
  {
    "title": "Salesforce Certifications: Quick Look",
    "type": "MODULE",
    "icon": "https://res.cloudinary.com/hy4kyit2a/f_auto/fl_lossy/q_70/learn/modules/salesforce-credentials-quick-look/9b663f1ecbe27859b8acf4ab72bb4bb2_badge.png",
    "url": "https://trailhead.salesforce.com/content/learn/modules/salesforce-credentials-quick-look"
  },
  {
    "title": "Trailhead Playground Management",
    "type": "MODULE",
    "icon": "https://res.cloudinary.com/hy4kyit2a/f_auto/fl_lossy/q_70/learn/modules/trailhead_playground_management/2f5d5c1bfd282031b928027dc61ae51e_badge.png",
    "url": "https://trailhead.salesforce.com/content/learn/modules/trailhead_playground_management"
  },
  {
    "title": "Trailblazer Community: Quick Look",
    "type": "MODULE",
    "icon": "https://res.cloudinary.com/hy4kyit2a/f_auto/fl_lossy/q_70/learn/modules/trailblazer-community-quick-look/5c6eaafd0f616517c0e3b53e863faba3_badge.png",
    "url": "https://trailhead.salesforce.com/content/learn/modules/trailblazer-community-quick-look"
  },
  {
    "title": "Salesforce Values: Quick Look",
    "type": "MODULE",
    "icon": "https://res.cloudinary.com/hy4kyit2a/f_auto/fl_lossy/q_70/learn/modules/salesforce-quick-look-1/259d8619519bb3912ef0100cee5071cc_badge.png",
    "url": "https://trailhead.salesforce.com/content/learn/modules/salesforce-quick-look-1"
  },
  {
    "title": "Salesforce Badge",
    "type": "BADGE",
    "icon": null,
    "url": null
  },
  {
    "title": "Your Guide to Trailhead",
    "type": "MODULE",
    "icon": "https://res.cloudinary.com/hy4kyit2a/f_auto/fl_lossy/q_70/learn/modules/trailhead_basics/11592ff48bc3b35bcd9945e6bde11319_badge.png",
    "url": "https://trailhead.salesforce.com/content/learn/modules/trailhead_basics"
  }
];

var TRAILHEAD_QUERY = 'query { profile(slug: "guruvamsikallepalli") { ... on PublicProfile { earnedAwards(first: 100) { edges { node { ... on EarnedAwardBase { award { title type icon content { webUrl } } } } } } } } }';

function awardTypeLabel(type) {
    var t = (type || 'badge').toLowerCase();
    return t.charAt(0).toUpperCase() + t.slice(1);
}

function renderTrailblazerBadges(list) {
    var container = document.getElementById('trailblazer-badges');
    var countEl = document.getElementById('trailblazer-count');
    if (!container || !Array.isArray(list)) return;

    container.innerHTML = '';
    container.dataset.cloned = '';

    list.forEach(function (b) {
        var title = b.title || 'Salesforce Badge';
        var item = document.createElement('div');
        item.className = 'item';
        item.setAttribute('role', 'listitem');

        var link = document.createElement('a');
        link.href = b.url || TRAILBLAZER_PROFILE_URL;
        link.target = '_blank';
        link.rel = 'noopener';
        link.title = title;

        var imgWrap = document.createElement('div');
        imgWrap.className = 'badge-img';
        var img = document.createElement('img');
        img.src = b.icon;
        img.alt = awardTypeLabel(b.type) + ' - ' + title;
        img.loading = 'lazy';
        img.addEventListener('error', function () {
            imgWrap.innerHTML = '<i class="bi bi-patch-check-fill"></i>';
        });
        imgWrap.appendChild(img);

        var caption = document.createElement('span');
        caption.className = 'badge-name';
        caption.textContent = title;

        link.appendChild(imgWrap);
        link.appendChild(caption);
        item.appendChild(link);
        container.appendChild(item);
    });

    duplicateTrack(container);
    if (countEl) countEl.textContent = list.length;
}

document.addEventListener('DOMContentLoaded', function () {
    // Render static snapshot immediately, then try a live refresh.
    renderTrailblazerBadges(trailblazerBadges);

    fetch('https://profile.api.trailhead.com/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: TRAILHEAD_QUERY })
    })
        .then(function (res) { return res.json(); })
        .then(function (data) {
            var profile = (data && data.data && data.data.profile) || {};
            var edges = (profile.earnedAwards && profile.earnedAwards.edges) || [];
            if (!edges.length) return;
            var fresh = edges.map(function (e) {
                var n = e.node || {};
                var a = n.award || {};
                return {
                    title: a.title,
                    type: a.type,
                    icon: a.icon,
                    url: (a.content && a.content.webUrl) || null
                };
            });
            if (fresh.length !== trailblazerBadges.length) {
                console.log('Trailhead badges refreshed:', fresh.length);
                renderTrailblazerBadges(fresh);
            }
        })
        .catch(function () { /* keep static snapshot */ });
});
