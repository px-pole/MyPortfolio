// This code runs when the web page has fully loaded
document.addEventListener('DOMContentLoaded', () => {
    
    // Mobile Navigation Handler
    // This function handles the behavior of the mobile navigation menu.
    const mobileNavHandler = () => {
        // Select the button that will open the mobile menu
        const headerBtn = document.querySelector('.header__bars');
        // Select the mobile navigation menu itself
        const mobileNav = document.querySelector('.mobile-nav');
        
        // When the menu button is clicked, toggle the 'open' class to show or hide the menu
        headerBtn.addEventListener('click', () => {
            const isOpen = mobileNav.classList.toggle('open');
            // Prevent body scrolling when the menu is open
            document.body.style.overflowY = isOpen ? 'hidden' : 'auto';
        });

        // When a link inside the mobile menu is clicked, close the menu
        mobileNav.addEventListener('click', (e) => {
            // Check if the clicked element has the class 'mobile-nav__link'
            if (e.target.classList.contains('mobile-nav__link')) {
                // Remove the 'open' class to close the menu
                mobileNav.classList.remove('open');
                // Allow scrolling again after the menu is closed
                document.body.style.overflowY = 'auto';
            }
        });
    };

    // Dark Mode Handler
    // This function handles the theme (light/dark mode) toggle feature.
    const darkModeHandler = () => {
        // Select the toggle switch for dark mode (both desktop and mobile versions)
        const themeToggle = document.querySelector('#theme-toggle');
        const mobileThemeToggle = document.querySelector('.mobile-nav__theme-toggle');

        // This function applies the selected theme (light or dark)
        const applyTheme = (theme) => {
            // Apply the theme by changing the class of the body
            document.body.className = theme || '';
            // Update the toggle switch based on the current theme
            themeToggle.checked = theme === 'light-mode';
        };

        // Get the saved theme from local storage and apply it
        const savedTheme = localStorage.getItem('theme');
        applyTheme(savedTheme);

        // Handle theme toggle for desktop (clicking the theme switch)
        themeToggle.addEventListener('change', () => {
            const theme = themeToggle.checked ? 'light-mode' : '';
            applyTheme(theme);
            // Save the selected theme in local storage so it persists
            localStorage.setItem('theme', theme || '');
        });

        // Handle theme toggle for mobile (clicking the theme button in the mobile menu)
        if (mobileThemeToggle) {
            mobileThemeToggle.addEventListener('click', () => {
                // Toggle between light and dark theme on mobile
                const currentTheme = document.body.className === 'light-mode' ? '' : 'light-mode';
                applyTheme(currentTheme);
                // Save the selected theme in local storage
                localStorage.setItem('theme', currentTheme);
            });
        }
    };

    // "Back to Top" Button Handler
    // This function shows a button to scroll back to the top of the page.
    const backToTopHandler = () => {
        // Select the 'Back to Top' button
        const topButton = document.querySelector('.top-btn');

        // This function shows the 'Back to Top' button when the page is scrolled down
        const scrollFunction = () => {
            topButton.style.display =
                document.documentElement.scrollTop > 20 ? 'block' : 'none';
        };

        // This function scrolls the page back to the top when the button is clicked
        const topFunction = () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        };

        // Listen for the scroll event and run the scrollFunction
        window.addEventListener('scroll', scrollFunction);
        // Listen for the click event on the 'Back to Top' button and run the topFunction
        topButton.addEventListener('click', topFunction);
    };

    // Initialize all the handlers when the page is ready
    mobileNavHandler();
    darkModeHandler();
    backToTopHandler();
});
