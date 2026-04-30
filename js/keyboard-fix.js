// Lock portrait orientation where supported
try { screen.orientation.lock('portrait-primary').catch(function(){}); } catch(e) {}

// Keyboard stability: prevent layout jump / zoom when keyboard opens on iOS/Android
(function() {
    if (!window.visualViewport) return;

    var root = document.getElementById('root');
    var html = document.documentElement;

    // Match html/body background to app so no white flash peeks through
    html.style.background = '#f3f4f6';
    document.body.style.background = '#f3f4f6';

    function onViewportChange() {
        var vv = window.visualViewport;
        var windowHeight = window.innerHeight;
        var viewportHeight = vv.height;

        if (viewportHeight < windowHeight - 50) {
            // Keyboard open — pin root to visual viewport, no transition
            root.style.transition = 'none';
            root.style.height = viewportHeight + 'px';
            root.style.position = 'fixed';
            root.style.top = vv.offsetTop + 'px';
            root.style.width = vv.width + 'px';
        } else {
            // Keyboard closed — restore instantly to avoid flash
            root.style.transition = 'none';
            root.style.height = '';
            root.style.position = '';
            root.style.top = '';
            root.style.width = '';
        }
    }

    window.visualViewport.addEventListener('resize', onViewportChange);
    window.visualViewport.addEventListener('scroll', onViewportChange);
})();
