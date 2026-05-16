/* ============================================================
   script.js  —  Portfolio JavaScript
   Linked from: index.html  (placed just before </body>)
   ============================================================ */


/* ============================================================
   ASSIGNMENT LINKS
   ============================================================ */
const assignmentLinks = {
    1: 'https://github.com/MohamedSahamath/Assignments/tree/main/JS_Ex-main/case_01(Calculater)',   /* <-- Assignment 1 URL */
    2: 'https://github.com/MohamedSahamath/Assignments/blob/main/JS_Ex-main/case_02/index.html',   /* <-- Assignment 2 URL */
    3: 'https://github.com/MohamedSahamath/Assignments/blob/main/JS_Ex-main/case_03/index.html',   /* <-- Assignment 3 URL */

};


/* ============================================================
   FUNCTION: openAssignment
   Called by onclick on each assignment card.
   Opens the matching URL in a new browser tab.
   ============================================================ */
function openAssignment(event, num) {
    event.preventDefault(); /* stops the # href from jumping the page */

    const url = assignmentLinks[num];
    const placeholder = '#assignment-' + num + '-url';

    if (url && url !== placeholder) {
        window.open(url, '_blank');
    } else {
        alert(
            'Assignment ' + num + ' URL not set yet.\n\n' +
            'Open script.js and replace the value for key ' + num + ' in the assignmentLinks object.'
        );
    }
}


/* ============================================================
   FUNCTION: sendMessage
   Handles the contact form send button.
   Shows a loading state, then a success confirmation.
   ============================================================ */
function sendMessage() {
    const btn = document.querySelector('.btn-send');

    /* Loading state */
    btn.textContent = 'Sending...';
    btn.disabled = true;

    /* Simulate sending  */
    setTimeout(function () {
        btn.textContent = 'Message Sent ✓';
        btn.style.background = 'var(--accent3)';   /* turns green */

        /* Reset button after 3 seconds */
        setTimeout(function () {
            btn.textContent = 'Send Message ✦';
            btn.style.background = '';
            btn.disabled = false;
        }, 3000);

    }, 1200);
}


/* ============================================================
   SCROLL ANIMATIONS
   Uses IntersectionObserver to add .visible class when
   .fade-in and .gallery-item elements enter the viewport.
   CSS then transitions them from hidden to visible.
   ============================================================ */
const scrollObserver = new IntersectionObserver(
    function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    },
    { threshold: 0.12 }
);

/* Observe every fade-in element and every gallery item */
document.querySelectorAll('.fade-in, .gallery-item').forEach(function (el) {
    scrollObserver.observe(el);
});


/* ============================================================
   ACTIVE NAV LINK HIGHLIGHT
   Watches scroll position and highlights the nav link that
   matches the currently visible section.
   ============================================================ */
const allSections = document.querySelectorAll('section[id]');
const allNavLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', function () {
    let currentSection = '';

    allSections.forEach(function (section) {
        if (window.scrollY >= section.offsetTop - 100) {
            currentSection = section.getAttribute('id');
        }
    });

    allNavLinks.forEach(function (link) {
        const linkTarget = link.getAttribute('href'); /* e.g. "#about" */
        if (linkTarget === '#' + currentSection) {
            link.style.color = 'var(--accent)';
        } else {
            link.style.color = '';  /* resets to CSS default */
        }
    });
});


/* ============================================================
   SMOOTH SCROLL FOR NAV LINKS (backup for older browsers)
   Modern browsers use CSS scroll-behavior:smooth on html,
   but this ensures consistency everywhere.
   ============================================================ */
allNavLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
        const targetId = link.getAttribute('href');
        if (targetId.startsWith('#')) {
            e.preventDefault();
            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    });
});
