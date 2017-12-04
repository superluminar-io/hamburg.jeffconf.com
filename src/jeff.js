(function (window) {

    'use strict';

    var LANGS = ['en', 'it'];

    function changePage(elementID) {
        if (!document.getElementById(elementID)) {
            return;
        }
        document.title = "JeffConf Hamburg 2018 - " + elementID;
        window.history.pushState(null, null, "/" + elementID);
        changeArticle(elementID);
    }

    function changeArticle(elementID) {
        var sections = document.getElementById("contentBody").children;
        var i;
        for (i = 0; i < sections.length; i += 1) {
            if (sections[i].id === elementID) {
                sections[i].className = "dtc w-100";
            } else {
                sections[i].className = "dn";
            }
        }
        var links = document.getElementsByClassName("nav-link");

        for (i = 0; i < links.length; i += 1) {
            if (links[i].dataset && links[i].dataset.page === elementID) {
                links[i].style.textDecoration = 'underline';
            } else {
                links[i].style.textDecoration = null;
            }
        }
        if (window.ga) {
            ga('set', 'page', '/' + elementID);
            ga('send', 'pageview');
        }
    }

    function pageLoad() {
        var siteMap = {
            home: true,
            agenda: true,
            speakers: true,
            venue: true,
            coc: true,
            tickets: true,
            diversity: true
        };

        if (location.pathname !== "") {

            var sitePath = location.pathname.replace(/\//g, '');

            if (sitePath.length > 0 && siteMap[sitePath]) {
                return changeArticle(sitePath);
            }

        }

        changeArticle('home');

    }

    function loadEventbrite() {
        var iframe = document.getElementById("eventbrite");
        if (iframe) {
            iframe.src = "//eventbrite.com/tickets-external?eid=36770706172&ref=etckt";
        }
    }

    function switchLanguage() {
        var texts = document.querySelectorAll('[data-lang]');
        var i, text;

        for (i = 0; i < texts.length; i += 1) {
            text = texts[i].innerHTML;
            texts[i].innerHTML = texts[i].dataset.lang;
            texts[i].dataset.lang = text;
        }
    }

    function changeLanguage(lang) {
        var html = document.getElementsByTagName("html")[0],
            currentLang = html.lang;

        if (lang === currentLang || LANGS.indexOf(lang) === -1) {
            return;  // nothing to do
        }

        html.lang = lang;
        window.localStorage.preferredLanguage = lang;

        switchLanguage();
    }

    window.onpopstate = function (event) {
        if (event) {
            pageLoad();
        }
    };

    window.onload = function () {
        pageLoad();
        loadEventbrite();
    };

    window.changePage = changePage;
    window.changeLanguage = changeLanguage;

    if (window.localStorage.preferredLanguage &&
        window.localStorage.preferredLanguage !== LANGS[0]) {
        changeLanguage(window.localStorage.preferredLanguage);
    }

})(window);