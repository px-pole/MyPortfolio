// Function to handle mobile navigation
const mobileNav = () => {
    // Select DOM elements
    const headerBtn = document.querySelector('.header__bars');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileLinks = document.querySelectorAll('.mobile-nav__link');

    // State variable to track if mobile nav is open
    let isMobileNavOpen = false;

    // Event listener for the header button (hamburger menu)
    headerBtn.addEventListener('click', () => {
        // Toggle the state of mobile nav
        isMobileNavOpen = !isMobileNavOpen;
        if (isMobileNavOpen) {
            // If nav is open, display it and prevent scrolling on the body
            mobileNav.style.display = 'flex';
            document.body.style.overflowY = 'hidden';
        } else {
            // If nav is closed, hide it and allow scrolling on the body
            mobileNav.style.display = 'none';
            document.body.style.overflowY = 'auto';
        }
    });

    // Add click event listeners to all mobile nav links
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        // Close the mobile nav when a link is clicked
        isMobileNavOpen = false;
        mobileNav.style.display = 'none';
        document.body.style.overflowY = 'auto';
      });
    });
};

// Execute mobileNav function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    mobileNav();
});

// Function to handle dark/light mode toggle
const darkMode = () => {
    // Select all theme toggle buttons
    const themeToggleBtns = document.querySelectorAll('#theme-toggle');

    // Retrieve theme from local storage
    const theme = localStorage.getItem('theme');

    // Apply saved theme on page load
    theme && document.body.classList.add(theme);

    // Function to handle theme toggle
    const handleThemeToggle = () => {
        document.body.classList.toggle('light-mode');
        if (document.body.classList.contains('light-mode')) {
            // If light mode, save to local storage
            localStorage.setItem('theme', 'light-mode');
        } else {
            // If dark mode, remove from local storage and reset body class
            localStorage.removeItem('theme');
            document.body.removeAttribute('class');
        }
    }

    // Add click event listeners to all theme toggle buttons
    themeToggleBtns.forEach(btn => 
        btn.addEventListener('click', handleThemeToggle)
    );
};

// Execute darkMode function immediately
darkMode();

// Select the "back to top" button
let myButton = document.querySelector(".top-btn");

// Function to show/hide the "back to top" button based on scroll position
function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        myButton.style.display = "block";
    } else {
        myButton.style.display = "none";
    }
}

// Add scroll event listener to window
window.onscroll = scrollFunction;

// Function to scroll to the top of the page
function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
