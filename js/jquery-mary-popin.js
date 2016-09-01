/*
 * jQuery Mary Popin
 *
 * Author : @starfennec
 * Version: 0.7.3 beta
 * Date: aug 25 2016
 * Doc: https://github.com/antoineguillou/jquery-MaryPopin
 */

(function($) {
    var globalData = {
        bodyOverflow: 'auto',
        firstInit: true,
        htmlOverflow: 'auto',
        popins: [],
        windowWidth: undefined,
        scrollbarWidth: undefined,
        fixedElements: $('.marypopin-fixed')
    };

    var MaryPopin = function(popin, options) {
        globalData.popins.push(this);

        if(globalData.firstInit)
            globalInit();

        // Move popin in the mask
        $(popin).hide().appendTo(globalData.mask);

        var settings = $.extend({
            triggers: undefined,
            position: 'middle',
            closeSelector: '.marypopin-close',
            speed: 300,
            maskClick: true,
            beforeOpen: undefined,
            afterOpen: undefined,
            beforeClose: undefined,
            afterClose: undefined
        }, options || {});

        this.settings = settings;

        this.popin = $(popin);
        this.isOpen = false;

        getScrollbarWidth();

        // Triggers click
        if(this.settings.triggers != undefined){

            $(this.settings.triggers).click((function(self){ return function(e){
                e.preventDefault();

                self.open(e.target);
            }; })(this));
        }

        // Close button event
        $(popin).on('click', this.settings.closeSelector, (function(self){ return function(e){
            e.preventDefault();
            self.close(e.target);
        }; })(this));
    };

    // Set popin's vertical position
    MaryPopin.prototype.positionPopin = function(){
        var self = this;

        // set timeout for right popin height
        setTimeout(function(){
            switch(self.settings.position){
                case "top" :
                    var margin = 0;
                    break;
                case "middle" :
                    var margin = Math.floor((globalData.windowHeight - self.popin.outerHeight(false)) / 2);
                    if(margin < 0)
                        margin = 0;
                    break;
            }

            self.popin.css({
                'position' : 'relative',
                'margin-top' : margin + 'px'
            });
        }, 0);
    };

    // Check if a popin is already open & display the new one
    MaryPopin.prototype.open = function(trigger) {
        if($('#marypopin-mask').children(':visible').length !== 0){
            var opened;

            $.each( globalData.popins, function(i,e){
                if(e.isOpen)
                    opened = e;
            });
            closePopin(opened, undefined, (function(self){ return function(){
                openPopin(self, trigger);
            }; })(this));
        } else {
            openMask(this);
            openPopin(this, trigger);
        }
    };

    // Close popin
    MaryPopin.prototype.close = function(trigger) {
        if(globalData.mask.is(':visible')){
            closeMask(this);
            closePopin(this, trigger);
        }
    };

    // Show overlay
    function openMask(){
        // Store html & body tags overflow values
        globalData.htmlOverflow = $('html').css('overflow');
        globalData.bodyOverflow = $('body').css('overflow');

        getWindowWidth();

        setTimeout(function(){
            $('html, body').css({
                'overflow' : 'hidden',
                'width' : globalData.windowWidth
            });
            globalData.fixedElements.css( 'padding-right', globalData.scrollbarWidth );

            // Show mask (set timeout to fix IE display bug)
            setTimeout(function(){
                globalData.mask.fadeIn(300);
            },0);
        }, 0);

    }

    // Hide overlay
    function closeMask(){
        // Hide mask (set timeout to fix IE display bug)
        setTimeout(function(){
            globalData.mask.fadeOut(300, function(){
                // Restore html & body tags initial overflow value
                $('html').css({
                    'overflow' : globalData.htmlOverflow,
                    'width' : 'auto'
                });
                $('body').css({
                    'overflow' : globalData.bodyOverflow,
                    'width' : 'auto'
                });
                globalData.fixedElements.css({
                    'padding-right' : ''
                });
            });
        },0);
    }

    // Show popin
    function openPopin(mp, trigger){
        mp.isOpen = true;

        // Prevent Scroll on iOS
        $('body').on('touchmove', function(e){
            if($(e.target).closest('#marypopin-mask').length <= 0){
                e.preventDefault();
            }
        });

        // 'Before' function
        if(typeof mp.settings.beforeOpen === 'function')
            mp.settings.beforeOpen(mp, trigger);

        // Set popin position
        setTimeout(function(){
            mp.positionPopin();
        }, 0);

        mp.popin.addClass('animate-on').fadeIn(mp.settings.speed, function(){
            if(typeof mp.settings.afterOpen === 'function')
                mp.settings.afterOpen(mp, trigger);
            $(this).removeClass('animate-on');
        });
    }

    // Hide popin
    function closePopin(mp, trigger, callback){
        mp.isOpen = false;

        // 'Before' function
        if(typeof mp.settings.beforeClose === 'function')
            mp.settings.beforeClose(mp, trigger);

        mp.popin.addClass('animate-off').fadeOut(mp.settings.speed, function(){
            // Revert Scroll on iOS
            $('body').off('touchmove');

            if(typeof mp.settings.afterClose === 'function')
                mp.settings.afterClose(mp, trigger);

            if(typeof callback === 'function')
                callback();

            $(this).removeClass('animate-off');
        });
    }

    // Init function (called only once)
    function globalInit(){
        globalData.firstInit = false;

        // Create mask
        globalData.mask = $('#marypopin-mask');

        if(globalData.mask.length == 0){
            globalData.mask = $('<div id="marypopin-mask"></div>');

            globalData.mask
                .css({
                    'bottom' : 0,
                    'display' : 'none',
                    'left' : 0,
                    'position' : 'fixed',
                    'right' : 0,
                    'top' : 0,
                    'z-index' : 99999,
                    'overflow' : 'auto',
                    'overflow-y' : 'scroll',
                    '-webkit-overflow-scrolling' : 'touch'
                })
                .appendTo('body').click(function(event){
                    $.each( globalData.popins, function(i,e){
                        if(e.isOpen){
                            if($(event.target).closest(e.popin).length === 0){
                                if(e.settings.maskClick)
                                    e.close();
                            }
                        }
                    });
                });
        }


        //$('html, body').css({'overflow' : 'auto'});


        // Close popin on escape key press
        document.onkeydown = function(evt) {
            evt = evt || window.event;

            if (evt.keyCode == 27){
                $.each( globalData.popins, function(i,e){
                    if(e.isOpen)
                        e.close();
                });
            }
        };

        // Get viewport height
        getViewportHeight();

        $(window).resize(function(){
            getViewportHeight();
            getWindowWidth();

            $('html, body').css({
                'width' : globalData.windowWidth
            });

            // Reset popin position on viewport size change
            $.each(globalData.popins, function(i,e){
                if(e.isOpen == true)
                    e.positionPopin();
            });
        });
    }

    // Check browser's scrollbars width
    function getScrollbarWidth(){
        var $temp = $('<div id="marypopin-scrollbar-test"></div>');
        $temp
            .css({
                'height' : 100,
                'left' : 0,
                'overflow' : 'scroll',
                'position' : 'absolute',
                'top' : -9000,
                'width' : 100
            })
            .appendTo('body');

        var temp = $temp.get(0);
        globalData.scrollbarWidth = temp.offsetWidth - temp.clientWidth;
        $temp.remove();
    }

    // Check viewport's height
    function getViewportHeight(){
        if (typeof window.innerHeight != 'undefined')
            globalData.windowHeight = window.innerHeight;
        else if (typeof document.documentElement != 'undefined'
        && typeof document.documentElement.clientHeight !=
        'undefined' && document.documentElement.clientHeight != 0)
            globalData.windowHeight = document.documentElement.clientHeight;
        else
            globalData.windowHeight = $(window).height();
    }

    // Check viewport's width
    function getWindowWidth(){
        globalData.windowWidth = $(window).width();
    }

    // Custom console.log
    function log(){
        if (window.console && console.log)
            console.log('[MaryPopin] ' + Array.prototype.join.call(arguments,' '));
    }

    $.fn.marypopin = function(options){
        return this.each(function(i,e){
            var element = $(e);
            var mp = element.data('marypopin');

            if (mp && mp[options]){
                // Apply method if it exists & popin is init
                return mp[options].apply( mp );
            } else if(mp && !mp[options]){
                log('method not available');
            } else {
                // Init popin
                if((typeof(options) === 'string') || (typeof(options) === 'object' && (options.jquery || options.tagName))) {
                    if(MaryPopin.prototype[options]){
                        mp = new MaryPopin(this);
                        return mp[options].apply( mp );
                    } else {
                        mp = new MaryPopin(this, {
                            triggers: options
                        });
                    }
                } else {
                    mp = new MaryPopin(this, options);
                }
                element.data('marypopin', mp);
            }
       });
    };

})(jQuery);
