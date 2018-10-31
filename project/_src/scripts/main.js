var $g, window, document;

//=include ../../../node_modules/jquery/dist/jquery.min.js
//=include ../../../node_modules/bootstrap/dist/js/bootstrap.min.js
//=include ../../../node_modules/particles.js/particles.js

(function() {
    'use strict';
    
    $g = {
        ww: window.innerWidth,
        wh: window.innerHeight,
        dh: $(document).height(),
        methos: {}
    };
    
    /*
     * Function for get a new size windows if a resized
     */
    $g.methos.windowResize = function () {
        window.addEventListener('resize', function () {
            $g.ww = window.innerWidth;
            $g.wh = window.innerHeigh;
            $g.dh = $(document).height();
        });
    };
    
    /*
     * Change height size of container
     */
    $g.methos.suitSection = function () {
        var Elems = document.querySelectorAll('[suit]');
        
        [].forEach.call(Elems, function (elem, index) {
            var getSet = +elem.getAttribute('suit'),
                setHeight = getSet || $g.wh;
            
            elem.style.height = setHeight + 'px';
            
            if (!getSet) {
                window.addEventListener('resize', function () {
                    elem.style.height = window.innerHeight + 'px';
                });
            }
        });
    };
    
    /*
     * Funcion para hacer adaptar el tamaño de fuente al contenedor en una sola linea
     */
    $g.methos.fitFontSize = function () {
        var Elems = $("[fit-fz]");
        
        function core(divElem) {
            var spanElem,
                spanWidth,
                getReduce = divElem.data("reduce"),
                divWidth = divElem.width();
            
            divElem.html("<span>" + divElem.text() + "</div>");
            
            spanElem = divElem.children();
            spanWidth = spanElem.width();
            
            let currentFontSize = 1,
                prevWidth = 0;
            
            while (divWidth > spanWidth && currentFontSize < 200) {
                divElem.css({
                    "font-size": `${currentFontSize}px`,
                    "line-height": `${currentFontSize}px`
                });
                
                currentFontSize += 1;
                prevWidth = spanWidth;
                spanWidth = spanElem.width();
                
                if (spanWidth < prevWidth && currentFontSize > 3) {
                    spanWidth = divWidth;
                    divElem.css("font-size", (currentFontSize - 2) + "px");
                }
            }
            
            if (getReduce) {
                let getReduceInPx = currentFontSize - (getReduce * 100 / currentFontSize);
                divElem.css({
                    "font-size": `${ getReduceInPx }px`,
                    "line-height": `${ getReduceInPx }px`
                });
            }
        }
        
        Elems.each(function (index, value) {
            var getDiv = $(this).children("div");
            
            getDiv.each(function (inx, val) { core($(val)); });
            
            $(window).on("resize", function () {
                getDiv.each(function (inx, val) { core($(val)); });
            });
            
        });
    };
    
    /*
     * Funcion para administrar el conportamiento del NAV
     */
    $g.methos.nav = {
        $element: undefined,
        isMobile: false,
        
        menuSkin: function () {
            var self = this,
                offsetElem = self.$element.height(),
                burgerModeActive = false,
                burgerModeMenuIsView = false;
            
            function changeSkin() {
                var scrollTop = $(window).scrollTop();
                
                if (scrollTop > offsetElem && !burgerModeActive) {
                    burgerModeActive = true;
                    self.$element.addClass("burger-mode");
                    
                } else if (scrollTop < offsetElem && burgerModeActive) {
                    burgerModeActive = burgerModeMenuIsView = false;
                    self.$element.removeClass("burger-mode open");
                }
            }
            
            function toogleViewOptions() {
                if (!burgerModeMenuIsView) {
                    self.$element.addClass("open");
                    burgerModeMenuIsView = true;
                } else {
                    self.$element.removeClass("open");
                    burgerModeMenuIsView = false;
                }
            }
            
            self.$element.on("click", function () {
                if ($(this).hasClass("burger-mode") || $(this).hasClass("bm-attach")) toogleViewOptions();
            });
            $(window).on("scroll", changeSkin);
            changeSkin();
        },
        
        goSection: function () {
            var self = this;
            
            function core(Elem) {
                var getSecId = Elem.attr("data-go"),
                    getPositionSection,
                    setScrollTop;
                
                if (getSecId) {
                    getPositionSection = $("#" + getSecId);
                    setScrollTop = getPositionSection.offset().top;
                } else {
                    setScrollTop = 0;
                }
                
                $("html, body").stop().animate({scrollTop: setScrollTop}, 1000);
            }
            
            self.$element.on("click", "a", function () {
                core($(this));
            });
            
            setTimeout(function () {
                core(self.$element.find("a[href='" + window.location.hash + "']"));
            }, 1000);
        },
        
        currentSection: function() {
            var elems = this.$element.find("a"),
                dataSec = [],
                linkAct,
                linksAllDisabled = true;
            
            elems.each(function (index, value) {
                var getDataGo = $(value).attr("data-go"),
                    secBoundingRect;
                
                if (getDataGo) {
                    secBoundingRect = document.getElementById(getDataGo).getBoundingClientRect();
                    dataSec.push({
                        elem: $(value),
                        sec: getDataGo,
                        positionSec: [secBoundingRect.top, secBoundingRect.top + secBoundingRect.height]
                    });
                }
            });
            
            function core() {
                var currentScrollTop = $(window).scrollTop(),
                    getCurrentSecInView;
                
                getCurrentSecInView = dataSec.filter(function (value, index) {
                    return currentScrollTop >= value.positionSec[0] && currentScrollTop < value.positionSec[1];
                });
                
                getCurrentSecInView = getCurrentSecInView.length ? getCurrentSecInView[0] : {};
                
                if (getCurrentSecInView.sec && getCurrentSecInView.sec !== linkAct) {
                    let prevActElem;
                    
                    getCurrentSecInView.elem.addClass("act");
                    window.location.hash = getCurrentSecInView.elem.attr("href");
                    
                    prevActElem = dataSec.filter(function (value) { return linkAct === value.sec; });
                    prevActElem = prevActElem.length ? prevActElem[0] : {};
                    if (prevActElem.sec) { prevActElem.elem.removeClass("act"); }
                    
                    linkAct = getCurrentSecInView.sec;
                    linksAllDisabled = false;
                    
                } else if (!linksAllDisabled && !getCurrentSecInView.sec) {
                    elems.removeClass("act");
                    linksAllDisabled = true;
                    linkAct = undefined;
                }
            }
            
            $(window).scroll(core);
            core();
        },
        
        pipe: function (ww) {
            var self = this;
            
            if (ww >= 1028 && self.isMobile) {
                self.isMobile = false;
                self.$element.removeClass("bm-attach");
                
            } else if (ww < 1028 && !self.isMobile) {
                self.isMobile = true;
                self.$element.addClass("bm-attach");
            }
        },
        
        init: function () {
            var self = this;
            
            self.$element = $("nav.main-nav");
            
            self.menuSkin();
            self.goSection();
            self.currentSection();
            
            self.pipe(window.innerWidth);
            $(window).on("resize", function () {
                self.pipe(this.innerWidth);
            });
        }
    };
    
    /*
     * Funcion para crear un scroll horizonral segun en ancho total del contenido
     */
    $g.methos.scroollX = function () {
        var Elems = $("[scroll]");
        
        function core(elem) {
            var saveContent = elem.html(),
                getMaxWidthWrap = elem.attr("max-width"),
                scrollWrap,
                getWidthParent,
                getWidthChild;
            
            getMaxWidthWrap = +getMaxWidthWrap > 0 || !isNaN(+getMaxWidthWrap) ? +getMaxWidthWrap : 5000;
            
            elem.html("<div class='scroll-wrap'>" + saveContent + "</div>");
            scrollWrap = elem.find(".scroll-wrap");
            scrollWrap.css("width", getMaxWidthWrap);
            
            getWidthParent = elem.width();
            getWidthChild = elem.find(".scroll-wrap").children().eq(0).outerWidth() + 20;
            scrollWrap.css("width", getWidthChild + "px");
            
            if (getWidthParent < getWidthChild) {
                elem.css({ overflowX: "auto" });
            }
        }
        
        Elems.each(function (i, elem) {
            core($(this));
        });
    };
    
    /*
     * Transferir o mover elementos a otros lugares del DOM
     */
    $g.methos.transfer_ = function () {
        var Elems = $("[transfer]"),
            data = [];
        
        Elems.each(function (i, elem) {
            var splitActions = $(this).attr("transfer").split(":"),
                getAction = splitActions[0],
                getInstance = splitActions[1],
                instanceExist = false;
            
            if (data.length) {
                data.forEach(function (value) {
                    if (value.name === getInstance) {
                        value[getAction] = $(elem);
                        instanceExist = true;
                    }
                });
            }
            
            if (!instanceExist) {
                let attachData = {};
                attachData.name = getInstance;
                attachData[getAction] = $(this);
                data.push(attachData);
            }
        });
        
        // Run Transfer
        data.forEach(function (value) {
            if (value.to && value.resive) {
                let getContentTo = value.to.html();
                value.resive.html(getContentTo);
            }
        });
    };
    $g.methos.transfer = function () {
        $("[transfer]").each(function (i, elem) {
            var getQuery = $(this).attr("transfer"),
                ElemResive = $(getQuery);
            
            if (ElemResive.length) {
                ElemResive.html($(elem).html());
            }
        });
    };
    
    /*
     * Funcion para generar un canvas con animacion de particulas.
     */
    $g.methos.particles = {
        sets: [
            {
                id: "particles-sec1",
                settings: {
                    particles: {
                        number: { value: 10 },
                        move: { random: true, speed: 5, out_mode: "bounce" },
                        color: { value: "#FFFFFF" },
                        size: {
                            value: 7, random: false,
                            anim: { size_min: 5, speed: 200 }
                        },
                        line_linked: { distance: 350, color: "#FFFFFF", opacity: 0.5 },
                        opacity: { value: 0.5, random: true }
                    },
                    interactivity: {
                        detect_on: "canvas",
                        events: {
                            onclick: { enable: false }
                        }
                    }
                }
            },
            {
                id: "particles-full",
                settings: {
                    particles: {
                        number: { value: 5 },
                        move: { random: true, speed: 15, out_mode: "out"},
                        color: { value: "#000000"},
                        size: {
                            value: 7, random: false,
                            anim: {size_min: 5, speed: 200}
                        },
                        line_linked: { distance: 400, color: "#000000", opacity: 0.3},
                        opacity: { value: 0.3, random: true}
                    },
                    interactivity: {}
                },
                beforeAction: function () {
                    var elem = $("#" + this.id),
                        sec1Height,
                        docHeight;
                    
                    function miniCore () {
                        sec1Height = $("#sec1").outerHeight();
                        docHeight = $(document).outerHeight() - sec1Height;
                        
                        elem.css({top: sec1Height + "px", height: docHeight + "px"});
                    }
                    miniCore();
                    
                    $(window).on("resize", miniCore);
                }
            }
        ],
        
        Run: function () {
            function runPaticlesJS(idElement, settings) {
                particlesJS(idElement, settings);
            }
            
            this.sets.forEach(function (value) {
                if (value.beforeAction && typeof value.beforeAction === "function") {
                    value.beforeAction();
                }
                
                if (Array.isArray(value.id)) {
                    value.id.forEach(function (id) {
                        runPaticlesJS(id, value.settings);
                    });
                    
                } else {
                    runPaticlesJS(value.id, value.settings);
                }
            });
        }
    }
    
    //Init
    $g.methos.windowResize();
    $g.methos.suitSection();
    $g.methos.nav.init();
    $g.methos.particles.Run();
    $g.methos.scroollX();
    $g.methos.transfer();
    setTimeout($g.methos.fitFontSize, 100);
    
    $(function () {
        $("a[href*='https://www.hostinger.com']").remove();
    });
})();