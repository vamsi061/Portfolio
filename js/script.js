// Function to set the theme and update UI
 function setTheme(theme) {
    document.body.setAttribute('data-bs-theme', theme);
    localStorage.setItem('theme', theme);
    var switchThemeBtn = document.getElementById('switchTheme');
    if (switchThemeBtn) {
        switchThemeBtn.innerHTML = theme === 'dark' ?  '<i class="bi bi-sun-fill"></i>' : '<i class="bi bi-moon-stars-fill"></i>';
    }
    //console.log(`Switched to ${theme} theme`);
}

var currentTheme = localStorage.getItem('theme') || 'dark';
setTheme(currentTheme);

// Event listener for the switch theme button
var switchThemeBtn = document.getElementById('switchTheme');
if (switchThemeBtn) {
    switchThemeBtn.addEventListener('click', () => {
        currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(currentTheme);
    });
}

//AOS Initiliaze
AOS.init();

// Fixed Header & back to top button on Scroll
window.addEventListener('scroll', () => {
    // fixed header
    const header = document.getElementById('header');
    if (window.scrollY > 30 && !header.classList.contains('fixed-top')) {
        header.classList.add('fixed-top');
        document.getElementById('offcanvasNavbar').classList.add('fixedHeaderNavbar');
    } else if (window.scrollY <= 30 && header.classList.contains('fixed-top')) {
        header.classList.remove('fixed-top');
        document.getElementById('offcanvasNavbar').classList.remove('fixedHeaderNavbar');
    }

    //backtotop
    const backToTopButton = document.getElementById("backToTopButton");
    if (window.scrollY > 400 && backToTopButton.style.display === 'none') {
        backToTopButton.style.display = 'block';
    } else if (window.scrollY <= 400 && backToTopButton.style.display === 'block') {
        backToTopButton.style.display = 'none';
    }
});


//jumping to top function
function scrollToTop(){
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

const fallbackBadges = {
    "data": [
        {
            "id": "fc64ce10-55b2-401a-9495-c541639f173c",
            "badge_template": {
                "name": "Build a Secure Google Cloud Network Skill Badge",
                "image_url": "https://images.credly.com/images/e1131ae3-4a52-4af1-9801-b7853767cf79/image.png"
            }
        },
        {
            "id": "5cbd9f81-ceb3-4da3-a125-dac13bb00ad7",
            "badge_template": {
                "name": "Build Infrastructure with Terraform on Google Cloud Skill Badge",
                "image_url": "https://images.credly.com/images/b18154fb-9bd3-47e5-a6f1-554be512947d/image.png"
            }
        },
        {
            "id": "459d79a2-aec5-4acd-a656-f79851c9365f",
            "badge_template": {
                "name": "Develop Your Google Cloud Network Skill Badge",
                "image_url": "https://images.credly.com/images/b126c61c-4781-4f03-9b2b-062963003abf/image.png"
            }
        },
        {
            "id": "4d73c108-c6cb-4b2f-a737-d3e6570bbe9a",
            "badge_template": {
                "name": "Google Cloud Computing Foundations Certificate",
                "image_url": "https://images.credly.com/images/4dda8ae4-99ee-476c-bca3-6f0adbab42fe/image.png"
            }
        },
        {
            "id": "9de7ea5c-73a1-40d8-a6bc-72274856c7a9",
            "badge_template": {
                "name": "Implement Load Balancing on Compute Engine Skill Badge",
                "image_url": "https://images.credly.com/images/eea11cba-2a98-4bbe-bad2-447878dd34a2/image.png"
            }
        },
        {
            "id": "bf318bf2-21d9-4f49-a4cf-2262e9518cad",
            "badge_template": {
                "name": "Prepare Data for ML APIs on Google Cloud Skill Badge",
                "image_url": "https://images.credly.com/images/68756311-9319-4eeb-a2b7-76defc8dd8a2/image.png"
            }
        },
        {
            "id": "a84388c9-47fd-4f64-93e0-3b079c4cbcc3",
            "badge_template": {
                "name": "Set Up an App Dev Environment on Google Cloud Skill Badge",
                "image_url": "https://images.credly.com/images/42326d44-14ff-4eda-b9c5-7d8f12919253/image.png"
            }
        },
        {
            "id": "6c54c658-a938-4054-aa84-25f87c4578b6",
            "badge_template": {
                "name": "AWS Academy Graduate - Machine Learning Foundations",
                "image_url": "https://images.credly.com/images/727c2754-d727-4e27-a1aa-3de2425ce239/blob"
            }
        },
        {
            "id": "7dd7897b-e8ba-45f1-87bc-9c91d58dc2cb",
            "badge_template": {
                "name": "Associate Cloud Engineer Certification",
                "image_url": "https://images.credly.com/images/08096465-cbfc-4c3e-93e5-93c5aa61f23e/image.png"
            }
        },
        {
            "id": "e5bf9d0d-f717-4ce5-847c-aecd37f2c6b9",
            "badge_template": {
                "name": "Job Application Essentials",
                "image_url": "https://images.credly.com/images/7ae738cc-d7af-45fd-ad53-3e21666cdeca/Job_Application_Essentials.png"
            }
        },
        {
            "id": "6c850e67-6342-41e5-8b98-da021d11a865",
            "badge_template": {
                "name": "Cybersecurity Fundamentals",
                "image_url": "https://images.credly.com/images/50b96632-6cbb-40b7-ac0e-b83f49ff7f94/image.png"
            }
        },
        {
            "id": "bfca2a35-ab22-4e66-9efd-b4cfbd7bdf53",
            "badge_template": {
                "name": "CyberOps Associate",
                "image_url": "https://images.credly.com/images/53f37f83-04a1-4935-9b1e-21a99cc6e1b2/CyberOpsAssoc.png"
            }
        },
        {
            "id": "ddc9c217-ca1b-4986-8113-85f821d3adc8",
            "badge_template": {
                "name": "Microsoft Certified: Azure Fundamentals",
                "image_url": "https://images.credly.com/images/be8fcaeb-c769-4858-b567-ffaaa73ce8cf/image.png"
            }
        },
        {
            "id": "f834bf00-cbea-487b-b1bd-41b2f8bcdbde",
            "badge_template": {
                "name": "CCNA: Switching, Routing, and Wireless Essentials",
                "image_url": "https://images.credly.com/images/f4ccdba9-dd65-4349-baad-8f05df116443/CCNASRWE__1_.png"
            }
        },
        {
            "id": "49fe6f63-7bf9-4bfe-8954-60698721ad20",
            "badge_template": {
                "name": "AWS Educate Introduction to Cloud 101",
                "image_url": "https://images.credly.com/images/e51a8579-188d-4363-8ed1-12ad164ef57b/blob"
            }
        },
        {
            "id": "25a1d583-18e8-45bf-9ac5-9c6b420cb434",
            "badge_template": {
                "name": "Cybersecurity Essentials",
                "image_url": "https://images.credly.com/images/054913b2-e271-49a2-a1a4-9bf1c1f9a404/CyberEssentials.png"
            }
        },
        {
            "id": "8e3ea51d-ed09-48f6-9319-6cc181d90011",
            "badge_template": {
                "name": "AWS Academy Graduate - Cloud Foundations",
                "image_url": "https://images.credly.com/images/e3541a0c-dd4a-4820-8052-5001006efc85/blob"
            }
        },
        {
            "id": "1ae2ffc6-6911-448f-9801-62b165a5ca30",
            "badge_template": {
                "name": "CCNA: Introduction to Networks",
                "image_url": "https://images.credly.com/images/70d71df5-f3dc-4380-9b9d-f22513a70417/CCNAITN__1_.png"
            }
        }
    ]
};

// Function to render badges (reusable)
function renderBadges(badgesData) {
    const container = $("#credly-badges");
    container.empty(); // Clear potential "loading" text
    
    if (badgesData && badgesData.data) {
        badgesData.data.forEach(badge => {
            const badgeImg = badge.badge_template.image_url;
            const badgeTitle = badge.badge_template.name;
            const badgeLink = `https://www.credly.com/badges/${badge.id}`;
            
            const itemHtml = `
                <div class="item">
                    <a href="${badgeLink}" target="_blank" title="${badgeTitle}">
                        <img src="${badgeImg}" alt="${badgeTitle}">
                    </a>
                </div>
            `;
            container.append(itemHtml);
        });

        // Initialize Owl Carousel with navigation and dots enabled
        container.owlCarousel({
            center: true,
            items: 2,
            loop: true,
            margin: 30,
            nav: true,
            dots: true,
            navText: ["<i class='bi bi-chevron-left'></i>", "<i class='bi bi-chevron-right'></i>"],
            autoplay: true,
            autoplayTimeout: 2500,
            autoplayHoverPause: true,
            responsive: {
                0: { 
                    items: 1,
                    center: true,
                    margin: 10
                },
                768: { 
                    items: 2,
                    center: false,
                    margin: 20
                },
                1000: { 
                    items: 3,
                    center: true,
                    margin: 30
                }
            }
        });
    }
}

// Fetch and Initialize Credly Badges (Dynamic with Fallback)
$(document).ready(function(){
    // Initialize Google Badges Carousel (Static)
    $("#google-badges").owlCarousel({
        center: true,
        items: 2,
        loop: true,
        margin: 30,
        nav: true,
        dots: true,
        navText: ["<i class='bi bi-chevron-left'></i>", "<i class='bi bi-chevron-right'></i>"],
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        responsive: {
            0: { 
                items: 1,
                center: true,
                margin: 10
            },
            768: { 
                items: 2,
                center: false,
                margin: 20
            },
            1000: { 
                items: 3,
                center: true,
                margin: 30
            }
        }
    });

    const credlyUser = '732f62e8-4b03-46ea-9f0f-e7d737c4a439'; // User ID for vamsi061
    
    // Using codetabs proxy (often more reliable for simple JSON)
    const proxyUrl = 'https://api.codetabs.com/v1/proxy?quest=';
    const targetUrl = encodeURIComponent(`https://www.credly.com/users/${credlyUser}/badges.json`);


    $.getJSON(proxyUrl + targetUrl, function(data) {
        console.log("Successfully fetched Credly badges dynamically.");
        renderBadges(data);
        // Update count
        if(data && data.data) {
            $("#credly-count").text(data.data.length);
        }
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.warn("Failed to fetch Credly badges dynamically. Using fallback data.", textStatus, errorThrown);
        // Fallback to static data
        renderBadges(fallbackBadges);
        // Update count from fallback
        if(fallbackBadges && fallbackBadges.data) {
            $("#credly-count").text(fallbackBadges.data.length);
        }
    });
});
