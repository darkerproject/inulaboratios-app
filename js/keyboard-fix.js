// Lock portrait orientation where supported
try { screen.orientation.lock('portrait-primary').catch(function(){}); } catch(e) {}

// Keyboard stability: prevent layout jump when keyboard opens on iOS/Android
(function() {
        if (!window.visualViewport) return;

        var root = document.getElementById('root');

        function onViewportChange() {
            var vv = window.visualViewport;
            var windowHeight = window.innerHeight;
            var viewportHeight = vv.height;

            if (viewportHeight < windowHeight - 50) {
                root.style.height = viewportHeight + 'px';
                root.style.position = 'fixed';
                root.style.top = vv.offsetTop + 'px';
                root.style.width = vv.width + 'px';
            } else {
                root.style.height = '';
                root.style.position = '';
                root.style.top = '';
                root.style.width = '';
            }
        }

        window.visualViewport.addEventListener('resize', onViewportChange);
        window.visualViewport.addEventListener('scroll', onViewportChange);
    })();
