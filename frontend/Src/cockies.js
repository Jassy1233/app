document.addEventListener('DOMContentLoaded', function () {
    const banner = document.getElementById('cookie-banner');
    const acceptAllBtn = document.getElementById('accept-all');
    const customizeBtn = document.getElementById('customize-btn');
    const savePrefBtn = document.getElementById('save-preferences');
    const confirmAcceptBtn = document.getElementById('confirm-accept');
    const customizePanel = document.getElementById('customize-panel');

    function getSavedPreferences() {
        const localPrefs = localStorage.getItem('cookies-preferences');
        if (localPrefs) return JSON.parse(localPrefs);

        const cookie = document.cookie.split('; ').find(row => row.startsWith('cookies_prefs='));
        return cookie ? JSON.parse(cookie.split('=')[1]) : null;
    }

    const savedPrefs = getSavedPreferences();
    if (savedPrefs) {
        loadCookies(savedPrefs);
        banner.style.display = 'none';
        return;
    }

    banner.style.display = 'block';

    acceptAllBtn.addEventListener('click', function () {
        savePreferences({
            essential: true,
            analytics: true,
            marketing: true
        });
    });

    customizeBtn.addEventListener('click', function () {
        customizePanel.style.display = 'block';
    });

    savePrefBtn.addEventListener('click', function () {
        tempPreferences = {
            essential: true,
            analytics: document.querySelector('input[name="analytics"]').checked,
            marketing: document.querySelector('input[name="marketing"]').checked
        };
        savePrefBtn.style.display = 'none';
        confirmAcceptBtn.style.display = 'inline-block';
    });

    confirmAcceptBtn.addEventListener('click', function () {
        savePreferences(tempPreferences);
    });

    // ----- Funciones ----- //
    function savePreferences(prefs) {
        localStorage.setItem('cookies-preferences', JSON.stringify(prefs));
        document.cookie = `cookies_prefs=${JSON.stringify(prefs)}; path=/; max-age=${30 * 24 * 60 * 60}`;

        if (document.body.classList.contains('modoOscuro')) {
            localStorage.setItem('modoOscuro', 'true');
        }

        loadCookies(prefs);
        hideBanner();
    }

    function loadCookies(prefs) {
        console.log("Cargando servicios permitidos:", prefs);
        if (prefs.analytics) loadScript('https://www.google-analytics.com/analytics.js');
        if (prefs.marketing) loadScript('https://connect.facebook.net/en_US/fbevents.js');
    }

    function loadScript(src) {
        console.log("Cargando script:", src);
        const script = document.createElement('script');
        script.src = src;
        document.body.appendChild(script);
    }

    function hideBanner() {
        banner.style.transition = 'opacity 0.3s';
        banner.style.opacity = '0';
        setTimeout(() => banner.style.display = 'none', 300);
    }
});