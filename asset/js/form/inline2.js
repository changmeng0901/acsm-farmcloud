jquery(document).ready(function() {

    // MENU
    jquery(".menu-search ul li li:first-child a").css("border-top", "none");
    jquery(".menu-search ul").supersubs({
        minWidth: 15,
        maxWidth: 40
    }).superfish({
        autoArrows: false,
        dropShadows: false
    });

    var htmlStr = jquery("code").html();
    jquery("code").text(htmlStr);

    // BOX HIDE
    jquery('span.hide').click(function() {
        jquery(this).parent().next('.content').fadeToggle(100);
    });

    // TITLE SEARCH BOX
    jquery('.box-search').hide();
    jquery('span.search').click(function() {
        jquery('.box-search').fadeTo(800, 1.0).end();
        jquery('span.search').hide();
    });

    // THUMB OPTIONS
    jquery("a.zoom").fancybox({
        'speedIn': 600,
        'speedOut': 200,
        'overlayShow': true,
        'overlayColor': '#000',
        'titlePosition': 'over'
    });
    jquery("img.shadow").wrap("<span class='shadow'></span>");
    jquery("img.left").wrap("<span class='shadow left'></span>");
    jquery("img.right").wrap("<span class='shadow right'></span>");
    jquery(function() {
        jquery("div.thumb").hover(
        function() {
            jquery(this).children("img").fadeTo(200, 0.85).end().children("div").show();
        }, function() {
            jquery(this).children("img").fadeTo(200, 1).end().children("div").hide();
        });
    });

    // SYSTEM MESSAGES
    jquery(".messages:first-child").css({
        "margin": "0 0 1px"
    });

    // MESSAGE BOX
    jquery(".content .message:last-child").css({
        "border-bottom": "none",
        "padding": "12px 0 0"
    });

    if (jquery.browser.msie && jquery.browser.version.substr(0, 1) < 8) {
        jquery(".content .message:last-child").css({
            "border-bottom": "none",
            "padding": "11px 0 0"
        });
    }

    // MODAL BOXES
    jquery(function() {
        jquery(".modal").dialog({
            autoOpen: false,
            closeText: '',
            resizable: false,
            width: 700,
			height: 500
        });

        jquery('.modalopen').click(function() {
            jquery(".modal").dialog('open');
            return false;
        });
    });

    // TABS, ACCORDIONS, TREEVIEW & TOOLTIPS
    jquery(".tabs").tabs({
        fx: {
            opacity: 'toggle'
        }
    });

    jquery(".accordion").accordion({
        autoHeight: false,
        navigation: true
    });

    jquery(".filetree").treeview({
        persist: "location",
        collapsed: true
    });

    jquery(".tooltip").tipsy();

    // DATATABLE
    jquery('table.all').dataTable({
        "bInfo": false,
        "iDisplayLength": 5,
        "aLengthMenu": [[5, 10, 25, 50, 100], [5, 10, 25, 50, 100]],
        "sPaginationType": "full_numbers",
        "bPaginate": true,
        "aoColumnDefs": [{
            bSortable: false,
            aTargets: [0]}],
        "sDom": 't<plf>'
    });

    jquery('table.sortsearch').dataTable({
        "bInfo": false,
        "bPaginate": false,
        "aoColumnDefs": [{
            bSortable: false,
            aTargets: [0]}],
        "sDom": 't<plf>'
    });

    jquery('table.sorting').dataTable({
        "bInfo": false,
        "bPaginate": false,
        "bFilter": false,
        "aoColumnDefs": [{
            bSortable: false,
            aTargets: [0]}],
        "sDom": 't<plf>'
    });

    jquery(".dataTables_wrapper .dataTables_length select").addClass("entries");

    jquery(function() {
        jquery(".dataTables_paginate span.paginate_button").hover(
        function() {
            jquery(this).fadeTo(200, 0.85).end();
        }, function() {
            jquery(this).fadeTo(200, 1).end();
        });
    });

    // CHECK ALL PAGES
    jquery('.checkall').click(function() {
        jquery(this).parents('table').find(':checkbox').attr('checked', this.checked);
    });

    // BUTTON LINKS
    jquery("a.button").wrapInner("<span></span>");
    jquery("a.button, button, .pager img").hover(

    function() {
        jquery(this).stop().fadeTo(200, 0.7);
    }, function() {
        jquery(this).stop().fadeTo(200, 1.0);
    });

    // STYLE FILE BUTTON
    jquery("input[type=file]").not(".rich-fileupload-hidden").wrap("<div style='display : inline-block; overflow : hidden; width : auto; height : 27px;'></div>");

    // SLIDER
    jquery(".range-slide div.slide").each(function() {
        values = jquery(this).attr('value').split(',');
        firstVal = values[0];
        secondVal = values[1];

        rangeInputfirst = jquery(this).siblings('input.amount-first');
        rangeInputsecond = jquery(this).siblings('input.amount-second');

        jquery(this).slider({
            values: [firstVal, secondVal],
            min: parseInt(jquery(this).attr('min'), 0),
            max: parseInt(jquery(this).attr('max'), 0),
            range: true,
            slide: function(event, ui) {
                jquery(this).siblings('input.amount-first').val("" + ui.values[0]);
                jquery(this).siblings('input.amount-second').val("" + ui.values[1]);
            }
        });
        rangeInputfirst.val("" + jquery(this).slider("values", 0));
        rangeInputsecond.val("" + jquery(this).slider("values", 1));
    });

    jquery(".signle-slide div.slide").each(function() {
        value = jquery(this).attr('value').split(',');
        firstVal = value;

        rangeSpan = jquery(this).siblings('input.amount');

        jquery(this).slider({
            value: [firstVal],
            min: parseInt(jquery(this).attr('min'), 0),
            max: parseInt(jquery(this).attr('max'), 0),
            slide: function(event, ui) {
                jquery(this).siblings('input.amount').val("" + ui.value);
            }
        });
        rangeSpan.val("" + jquery(this).slider("value"));
    });

    // PROGRESSBAR
    jquery(".progressbar div").progressbar({
        value: 100
    });

    // AUTOCOMPLETE
    jquery(function() {
        var availableTags = [
            "ActionScript",
            "AppleScript",
            "Asp",
            "BASIC",
            "C",
            "C++",
            "Clojure",
            "COBOL",
            "ColdFusion",
            "Erlang",
            "Fortran",
            "Groovy",
            "Haskell",
            "Java",
            "JavaScript",
            "Lisp",
            "Perl",
            "PHP",
            "Python",
            "Ruby",
            "Scala",
            "Scheme"
            ];
        jquery(".complete").autocomplete({
            source: availableTags
        });
    });

    // FORMS
    jquery(".line:odd").css({
        "border-top": "2px solid #f2f4f7",
        "border-bottom": "2px solid #f2f4f7"
    });
    jquery(".line:first-child").css({
        "border-top": "none"
    });
    jquery(".line:last-child").css({
        "border-bottom": "none"
    });
	
	jquery("input.datepicker").datepicker({
		dateFormat: 'mm.dd.yy'
	});
	
	jquery("input.timepicker").datetimepicker({});

    jquery(function() {
        jquery('.dataTables_length input, select').not("select.multi").selectmenu({
            style: 'dropdown',
            transferClasses: true,
            width: null
        });
    });

    jquery("input[type=radio], input[type=checkbox]").each(function() {
        if (jquery(this).parents("table").length === 0) {
            jquery(this).customInput();
        }
    });

    jquery('.hide-input input, .filter-box, .search input, .box-search input').click(function() {
        if (this.value === this.defaultValue) {
            this.value = '';
        }
    });

    jquery('.hide-input input, .filter-box, .search input, .box-search input').blur(function() {
        if (this.value === '') {
            this.value = this.defaultValue;
        }
    });

    // Input and textarea IE 7 fix
    if (jquery.browser.msie && jquery.browser.version.substr(0, 1) < 8) {
        jquery("input.tiny").wrap("<div class='input-tiny'></div>");
        jquery("input.small").wrap("<div class='input-small'></div>");
        jquery("input.medium").wrap("<div class='input-medium'></div>");
        jquery("input.big").wrap("<div class='input-big'></div>");
        jquery("input.xl").wrap("<div class='input-xl'></div>");
        jquery("textarea.small").wrap("<div class='textarea-small'></div>");
        jquery("textarea.medium").wrap("<div class='textarea-medium'></div>");
        jquery("textarea.big").wrap("<div class='textarea-big'></div>");
        jquery("textarea.xl").wrap("<div class='textarea-xl'></div>");
    }

    // WYSISWYG
    jquery('.wysiwyg').wysiwyg({
        css: "css/wysiwyg-editor.css",
        plugins: {
            rmFormat: {
                rmMsWordMarkup: true
            }
        }
    });

    // TABEL STATICS        
    jquery("table.statics").each(function() {
        var colors = [];
        jquery("table.statics thead th:not(:first)").each(function() {
            colors.push(jquery(this).css("color"));
        });
        jquery(this).graphTable({
            series: 'columns',
            position: 'replace',
			width : '100%',
            height: '200px',
            colors: colors
        }, {
            xaxis: {
                tickSize: 1
            }
        });
    });

    jquery("table.statics-date").each(function() {
        var colors = [];
        var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        jquery("table.statics-date thead th:not(:first)").each(function() {
            colors.push(jquery(this).css("color"));
        });
        jquery(this).graphTable({
            series: 'columns',
            position: 'replace',
			width : '100%',
            height: '200px',
            colors: colors,
            xaxisTransform: function(month) {
                var i = 0;
                while ((i < 12) && (month != months[i])) {
                    i++;
                }
                return i;
            }
        }, {
            xaxis: {
                tickSize: 1,
                tickFormatter: function(v, a) {
                    return months[v];
                }
            }
        });
    });

    jquery('.flot-graph').before('<div class="space"></div>');

    function showTooltip(x, y, contents) {
        jquery('<div id="tooltip">' + contents + '</div>').css({
            position: 'absolute',
            display: 'none',
            top: y + 5,
            left: x + 5
        }).appendTo("body").fadeIn("fast");
    }

    var previousPoint = null;
    jquery(".flot-graph").bind("plothover", function(event, pos, item) {
        jquery("#x").text(pos.x);
        jquery("#y").text(pos.y);

        if (item) {
            if (previousPoint != item.dataIndex) {
                previousPoint = item.dataIndex;

                jquery("#tooltip").remove();
                var x = item.datapoint[0],
                    y = item.datapoint[1];

                showTooltip(item.pageX, item.pageY, "<b>" + item.series.label + "</b>: " + y);
            }
        }
        else {
            jquery("#tooltip").remove();
            previousPoint = null;
        }
    });

});