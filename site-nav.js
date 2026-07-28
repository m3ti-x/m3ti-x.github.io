(function () {
    var items = Array.from(document.querySelectorAll('.nav-has-submenu'));

    function closeMenus(except) {
        items.forEach(function (item) {
            if (item === except) return;
            item.classList.remove('is-open');
            var button = item.querySelector('.nav-submenu-toggle');
            if (button) button.setAttribute('aria-expanded', 'false');
        });

        if (!except) document.body.classList.remove('nav-submenu-open');
    }

    items.forEach(function (item) {
        var button = item.querySelector('.nav-submenu-toggle');
        if (!button) return;

        button.addEventListener('click', function (event) {
            event.preventDefault();
            event.stopPropagation();

            var willOpen = !item.classList.contains('is-open');
            closeMenus(willOpen ? item : null);
            item.classList.toggle('is-open', willOpen);
            button.setAttribute('aria-expanded', String(willOpen));
            document.body.classList.toggle('nav-submenu-open', willOpen);
        });

        item.querySelectorAll('.nav-submenu a').forEach(function (link) {
            link.addEventListener('click', function () {
                closeMenus();
            });
        });
    });

    document.addEventListener('click', function (event) {
        if (!event.target.closest('.nav-has-submenu')) closeMenus();
    });

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') closeMenus();
    });

    function alignActiveNav() {
        if (!window.matchMedia('(max-width: 768px)').matches) return;

        var list = document.querySelector('.nav-links');
        var active = list && list.querySelector('a.active');
        var item = active && active.closest('.nav-links > li');
        if (!list || !item) return;

        var previous = item.previousElementSibling;
        var target = previous ? previous.offsetLeft - 16 : 0;
        list.scrollTo({ left: Math.max(0, target), behavior: 'auto' });
    }

    window.addEventListener('load', alignActiveNav);
    window.addEventListener('resize', alignActiveNav);
    window.addEventListener('hashchange', alignActiveNav);
})();
