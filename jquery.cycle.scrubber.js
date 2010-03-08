/*
 * jQuery Cycle Scrubber Plugin by M. Pezzi
 * http://thespiral.ca/jquery/scrubber
 * Version: 1.0 (03/07/10)
 * Dual licensed under the MIT and GPL licences:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 * Requires: jQuery v1.3.2 or later
 */
;(function($){

var instance = 1;

$.fn.scrubber = function(options) {
  return this.each(function(){
    var self = $(this),
        pager = $.fn.scrubber.defaults.scrubber + '-' + instance,
        opts = $.extend({ pager: '#' + pager }, $.fn.scrubber.defaults, options || {}),
        container =   $('<div></div>').addClass(opts.container)
                                      .html(self.html()),
        scrubber =    $('<div></div>').addClass(opts.scrubber)
                                      .attr('id', pager)
                                      .css({ position: 'absolute', top: 0, left: 0, zIndex: 1000 });
    
    // Empty and append new container and scrubber.
    self.empty().css('position', 'relative').append(container).append(scrubber);
    
    // Initialize cycle plugin.
    container.cycle(opts);
    
    // Position cycle pagers.
    scrubber.find('a').each(function(i){
      var items = scrubber.children().length,
          width = Math.floor(container.width() / items),
          remainder = container.width() % items,
          height = container.height(),
          css = $.extend(opts.pagerCss, { 
            left: width * i, 
            width: ( i < (items - 1) ) ? width : width + remainder, 
            height: height
          });
      
      $(this).css(css);
    });
    
    instance++;
  });
};

$.fn.scrubber.defaults = {
  timeout: 0,
  speed: 100,
  fastOnEvent: 0,
  fx: 'none',
  pagerEvent: 'mouseover',
  pauseOnPagerHover: true,
  container: 'scrubber',
  scrubber: 'scrubber-pager',
  pagerCss: { 
    display: 'block', 
    position: 'absolute', 
    top: 0, 
    zIndex: 500, 
    fontSize: '1px', 
    textIndent: '-1000em', 
    outline: 'none', 
    cursor: 'pointer'
  }
};
  
})(jQuery);