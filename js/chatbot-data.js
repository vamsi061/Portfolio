/* ============================================================
   Portfolio Chatbot — Configuration & Knowledge Base
   Update this file whenever the portfolio content changes;
   the bot also auto-reads live skills/projects/badges from the
   rendered page at runtime, so visual edits flow in too.
   ============================================================ */

var CHATBOT_CONFIG = {
    // Filled automatically at deploy time from the GitHub Secret
    // MISTRAL_API_KEY (see .github/workflows/deploy.yml).
    // On localhost this stays a placeholder — set your own key
    // via the 🔑 button in the chat header instead.
    apiKey: '__MISTRAL_API_KEY__',

    // Models tried top-down until one responds.
    models: [
        'mistral-medium-latest',
        'mistral-small-latest'
    ],

    web3formsKey: '937a095a-09f4-4d69-ba42-c43fdc1727f6',
    botName: 'Vamsi Bot',
    ownerName: 'Guru Vamsi'
};

var PORTFOLIO_KNOWLEDGE = {
    identity: {
        name: 'Guru Vamsi (Kallepalli)',
        role: 'Software Developer (Backend focus)',
        company: 'Infosys',
        tenure: '2024 — Present',
        location: 'Vijayawada, Andhra Pradesh, India',
        email: 'guruvamsi061@gmail.com',
        summary: 'Builds secure, scalable backend systems — RESTful APIs, microservices, enterprise messaging with Solace & AWS SQS, cloud technologies and automated CI/CD through Jenkins & XL Deploy. Also engineers developer platforms with Backstage (reusable software templates) and creates open-source tools that streamline developer workflows.'
    },

    socials: {
        github: 'https://github.com/vamsi061/',
        linkedin: 'https://www.linkedin.com/in/vamsi061/',
        twitterX: 'https://twitter.com/guruvamsi061/',
        instagram: 'https://www.instagram.com/guruvamsi.vamsi.5/',
        trailblazer: 'https://www.salesforce.com/trailblazer/guruvamsikallepalli',
        googleDev: 'https://g.dev/vamsi061',
        credly: 'https://www.credly.com/users/vamsi061',
        resume: 'Resume.pdf (Download Resume button in the hero section)'
    },

    experience: [
        {
            title: 'Software Developer',
            org: 'Infosys',
            period: '2024 — Present',
            points: [
                'Built and validated 11+ RESTful API integrations for message production/consumption via Solace and AWS SQS.',
                'Performed functional testing ensuring secure message delivery to authorized users only.',
                'Improved code quality and coverage using SonarQube quality gates.',
                'Engineered reusable Backstage software templates providing ready-to-use project structures that accelerate standardized microservices development.',
                'Supported CI/CD by managing deployments through Jenkins and XL Deploy.'
            ]
        },
        {
            title: 'Android Developer (community)',
            org: 'GDSC — VR Siddhartha Engineering College',
            period: '2023 — 2024',
            points: ['Helped peers learn Android development fundamentals in the Google Developer Student Clubs community.']
        },
        {
            title: 'GoogleCloudReady Facilitator',
            org: 'Google Cloud',
            period: '2022',
            points: ['Applied Google Cloud Platform concepts to real-world scenarios in a rigorous program.']
        }
    ],

    education: [
        { level: 'B.Tech — Computer Science & Engineering', school: 'VR Siddhartha Engineering College', period: '2021 — 2024', score: 'CGPA 8.1 / 10' },
        { level: 'Diploma — Computer Engineering', school: 'A.A.N.M & V.V.R.S.R Polytechnic College', period: '2018 — 2021', score: '90%' },
        { level: 'Secondary School Certificate (SSC)', school: 'V.M.C High School', period: '2018', score: 'CGPA 9.5 / 10' }
    ],

    skills: {
        languages: ['Java', 'Python', 'JavaScript', 'C', 'SQL', 'HTML', 'CSS'],
        backendIntegration: ['REST APIs', 'Solace', 'AWS SQS', 'Spring Boot', 'Django', 'MySQL'],
        devopsQuality: ['Git', 'GitHub', 'Jenkins', 'XL Deploy', 'SonarQube', 'Backstage', 'Bootstrap'],
        aiTools: ['Claude Code', 'OpenCode', 'GitHub Copilot', 'Ollama', 'Hugging Face']
    },

    certifications: {
        credly: { count: 18, provider: 'Credly', highlights: ['AWS Associate Cloud Engineer', 'Microsoft Azure Fundamentals', 'Cisco CyberOps Associate', 'CCNA: Introduction to Networks', 'CCNA: Switching, Routing & Wireless Essentials', 'Google Cloud Computing Foundations'] },
        googleDevelopers: { count: 7, provider: 'Google Developers (g.dev)', highlights: ['GDSC Member', 'Cloud Next 2022 Attendee', 'Android Basics pathways', 'Gemini API Competition'] },
        trailhead: { count: 52, provider: 'Salesforce Trailhead', breakdown: '13 Superbadges, 31 Modules, 6 Projects, 2 Badges', superbadgeHighlights: ['Developer Super Set', 'Process Automation Specialist', 'Screen Flow Specialist'] }
    },

    projects: [
        { name: 'Missing Person Finder', stack: ['Android', 'Java', 'Mobile App'], desc: 'User-friendly Android application that helps report and search for missing persons.', link: 'https://github.com/vamsi061/Missing-Person' },
        { name: 'Bus Ticket Booking (HappyJourney)', stack: ['Django', 'HTML/CSS', 'Web App'], desc: 'Bus ticket booking web application designed with Django.', link: 'https://github.com/vamsi061/HappyJourney' },
        { name: 'Mobile Price Classification', stack: ['Machine Learning', 'Python', 'SVM · Random Forest'], desc: 'Classified mobile price ranges using SVM, Random Forest and other algorithms during the YBI Foundation internship.', link: 'LinkedIn post linked on the project card' },
        { name: 'Heart Disease Prediction', stack: ['Machine Learning', 'KNN', 'Healthcare'], desc: 'Predicts heart disease using the K-Nearest Neighbors algorithm.', link: 'LinkedIn post linked on the project card' },
        { name: 'Top Business Persons', stack: ['HTML', 'CSS'], desc: 'First ever website — a simple profile page of top business personalities.', link: 'http://ownonewebsite.unaux.com/' }
    ],

    faqs: {
        hire: 'Reach out via the contact form on this page (or email guruvamsi061@gmail.com) — the inbox is always open.',
        siteTech: 'This portfolio is hand-built with plain HTML, CSS and JavaScript on Bootstrap 5 — no frameworks, no jQuery. Development is AI-assisted daily with Claude Code and OpenCode.',
        resume: 'Use the “Download Resume” button in the hero section (opens Resume.pdf).',
        themeTip: 'Use the palette button (bottom-left) to switch between 5 accent themes, and the sun/moon icon in the navbar for dark/light mode.'
    }
};
