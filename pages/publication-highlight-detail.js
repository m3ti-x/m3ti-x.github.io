(function () {
    var mobileNav = window.matchMedia('(max-width: 768px)');

    function revealActiveNav() {
        if (!mobileNav.matches) return;
        var list = document.querySelector('.nav-links');
        var active = list && list.querySelector('a.active');
        if (!list || !active) return;
        var listRect = list.getBoundingClientRect();
        var activeRect = active.getBoundingClientRect();
        var inset = 16;
        var left = list.scrollLeft;

        if (activeRect.left < listRect.left + inset) {
            left -= listRect.left + inset - activeRect.left;
        } else if (activeRect.right > listRect.right - inset) {
            left += activeRect.right - (listRect.right - inset);
        }

        list.scrollTo({ left: Math.max(0, left), behavior: 'auto' });
    }

    window.addEventListener('load', revealActiveNav);
    window.addEventListener('resize', revealActiveNav);
})();
