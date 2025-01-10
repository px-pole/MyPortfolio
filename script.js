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

    // Function to create a typing effect for text on a webpage
    const typeEffect = () => {
        // Selects the <span> element inside the <h2> where the text will be displayed
        const dynamicText = document.querySelector('h2 span');
        // Array of phrases that will be typed out dynamically
        const phrases = [
            "Hi, I'm Karol",             // English
            "Cześć, jestem Karol",      // Polish
            "Hola yo soy Karol",       // Spanish
            "こんにちは私はカロルです", // Japanese
            "Salut, je suis Karol",  // French
            "Olá, eu sou o Karol",  // Portuguese
            "您好，很高兴见到你",    // Chinese
            "Hej, jag är Karol"   // Swedish
        ];
        
        // Index to keep track of which phrase in the array is currently being displayed
        let phraseIndex = 0;
        // Index to keep track of the character position in the current phrase
        let charIndex = 0;
        // Flag to indicate whether characters are being deleted (true) or typed (false)
        let isDeleting = false;

        // Inner function that handles the typing and deleting of characters
        const type = () => {
            // Get the current phrase from the array using phraseIndex
            const currentPhrase = phrases[phraseIndex];
            // Get a substring of the current phrase, up to the current character index
            const currentChar = currentPhrase.substring(0, charIndex);

            // Update the <span> element's text with the current characters
            dynamicText.textContent = currentChar;
            // Add a "blinking" effect class to the text (defined in CSS)
            dynamicText.classList.add('blink');

            // If not deleting and there are more characters to type in the current phrase
            if (!isDeleting && charIndex < currentPhrase.length) {
                charIndex++; // Move to the next character
                setTimeout(type, 100); // Wait 100ms before typing the next character
            } 
            // If deleting and there are still characters left to delete
            else if (isDeleting && charIndex > 0) {
                charIndex--; // Move backwards, deleting a character
                setTimeout(type, 50); // Wait 50ms before deleting the next character
            } 
            // If finished typing or deleting the current word
            else {
                // Toggle the isDeleting flag (start deleting if typing is done, or vice versa)
                isDeleting = !isDeleting;
                // Remove the "blinking" effect (for better UX)
                dynamicText.classList.remove('blink');

                // If starting to type a new word
                if (!isDeleting) {
                    // Move to the next word in the array (loop back to the start if at the end)
                    phraseIndex = (phraseIndex + 1) % phrases.length;
                }

                // Wait 1000ms (1 second) before typing/deleting the next word
                setTimeout(type, 1000);
            }
        };
        type();
    };



    // Initialize all the handlers when the page is ready
    mobileNavHandler();
    darkModeHandler();
    backToTopHandler();
    typeEffect();
});
