(function ($) {
    var defaults = {
        rowsToDisplay: 10
    };
    
    var scrollBarWidth = 15, fixedTableWidth;
    
    $.fn.scrollTableBody = function(options) {
        options = $.extend(defaults, options);
        
        var table = this;
        
        wrapTable(table, options);
        alignColumns(table);

        var resizeAlignFunction = function () { alignOnResize(table); };
        var canDebounce = typeof _ == 'function' && typeof _.debounce == 'function';
        if (canDebounce) resizeAlignFunction = _.debounce(resizeAlignFunction, 150);
        $(window).resize(resizeAlignFunction);
    };
    
    function wrapTable(table, options) {
        var existingClasses = table.attr('class');
        var existingMarginBottom = table.css('margin-bottom');
        table.css('margin-bottom', 0);
        var rowHeight = table.find('tbody tr:first').outerHeight();
        var tableHeight = rowHeight * options.rowsToDisplay;
        
        var scrollDiv = '<div class="jqstb-scroll" style="height:' + tableHeight + 'px; width:100%; margin-top:-10px; overflow-y:auto"></div>';
        
        // Insert the table that will hold the fixed header and footer, and insert the div that will get scrolled
        table.before(scrollDiv);
    }
    
    function alignColumns(table) {
        table.each(function (index) {
            // To minimize "Flash of Unstyled Content" (FOUC), set the relevant variables before manipulating the DOM
            var $dataTable = $(this);
            
            // Place main table data inside of relevant scrollable div (using jQuery eq() and index)
            var $scrollDiv = $('div.jqstb-scroll').eq(index);
            $scrollDiv.prepend($dataTable);
            var scrollEl = $scrollDiv[0];
            
            var hasHorizontalScroll = scrollEl.clientWidth < scrollEl.scrollWidth;
            $scrollDiv.outerWidth(fixedTableWidth + scrollBarWidth + 2);
            
            if (hasHorizontalScroll) {
                var dataTableWidth = $dataTable.outerWidth();
                $scrollDiv.outerWidth(scrollEl.clientWidth);
                var scrollDivWidth = $scrollDiv.outerWidth();
                
                var width = scrollDivWidth - scrollBarWidth;

                
            }

            // Force column widths to be set for each header column
            $dataTable.find('thead tr:first th, tbody tr:first td').each(function () {
                $(this).outerWidth($(this).outerWidth());
            });
            
            // Force column widths to be set for each footer column
            $dataTable.find('tfoot tr:first td').each(function () {
                $(this).outerWidth($(this).outerWidth());
            });

            // Hide original caption, header, and footer
            $dataTable.children('caption, thead, tfoot').hide();
        });
    }
    
    function alignOnResize(table) {
        table.each(function (index) {
            var $dataTable = $(this);

            // Temporarily show the inner table's header and footer since the dom calculates width based on them being visible
            $dataTable.children('thead, tfoot').show();
            
            var scrollEl = $('div.jqstb-scroll')[0];
            var hasHorizontalScroll = scrollEl.clientWidth < scrollEl.scrollWidth;
            if (hasHorizontalScroll) {
                var scrollDivWidth = $('div.jqstb-scroll').outerWidth();
                $('div.jqstb-header-scroll').outerWidth(scrollDivWidth - scrollBarWidth);
                $('div.jqstb-footer-scroll').outerWidth(scrollDivWidth - scrollBarWidth);
            }

            // Hide the inner table's header and footer when we're done 
            $dataTable.children('thead, tfoot').hide();
        });
    }
})(jQuery);