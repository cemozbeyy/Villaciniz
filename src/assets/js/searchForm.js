
var heroSearch = {
        el: ".hero-search",
        init: function() {
            var _self = this;
            
            window.addEventListener('scroll', function(e) {
                _self.setTop(_self.el);
            });
            _self.picker();
            _self.villaTypes();
            _self.guestPanel();
            
            
        },
        setTop: function(el){
            if(!document.querySelector(el)) {return false;}
            var searchTop = $(el).offset().top;
            if(window.innerWidth < breakpoints.lg) {return false;}
            if(st >= searchTop) {
                   $(html).addClass("search--fixed");
            } else {
                   $(html).removeClass("search--fixed");
            }
        },
        villaTypes: function() {
            var group = document.querySelector(".group-villa-type");
            if(!group) {return false;}
            var $group = $(group),
                $input = $group.find(".form-control"),
                $checks = $group.find("[type='checkbox']");
            if(!$group[0]) {return false;}
            $checks.on("change",function() {
                var values = "",
                    i=0;
                $checks.each(function () {
                    if(this.checked) {
                        var virgul  = (i>0) ? "," : "";
                        values = values + virgul + $(this).val();
                        i++;
                    }
               });
               $input.val(values);
               if(values) {
                   $group.removeClass("group-selected");
               } else {
                   $group.addClass("group-selected");
               }
            });  
        },
        guestPanel: function() {
            var panel = document.querySelector(".group-guest");
            if(!panel) {return false;}
            var $panel = $(panel),
                $input = $panel.find(".guest-input"),
                groupAttr = "data-guest-type",
                $btnMinus = $panel.find(".btn-minus"),
                $btnPlus = $panel.find(".btn-plus"),
                $wrap = $panel.find(".guest-wrap"),
                setRooms = function() {
                    var formGroups = $wrap.find(".form-group"),
                        values = "";
                    formGroups.each(function(i,group) {
                        var attr = $(group).attr(groupAttr),
                            inputText = $input.attr("data-text-" + attr),
                            val = $(group).find(".form-control").val() + " " + inputText,
                            virgul  = (i>0) ? ", " : "";
                            
                        values = values + virgul + val;  
                    });

                    $input.val(values);
                    
                    if(!values) {
                        $panel.removeClass("group-selected");
                    } else {
                        $panel.addClass("group-selected");
                    }

                };
            $btnPlus.on("click", function(e) {
                var $input = $(this).prev(".form-control"),
                    val = parseInt($input.val()),
                    max = parseInt($input.attr("max"));
                if(val < max) {
                    $input.val(val + 1);
                    setRooms();
                }  
            });
            $btnMinus.on("click",function() {
                var $input = $(this).next(".form-control"),
                    val = parseInt($input.val()),
                    min = parseInt($input.attr("min"));
                if(val > min) {
                    $input.val(val - 1);
                    setRooms();
                } 
            });
        },
        picker: function() {
            var startDate = document.querySelector(".startdate"),
                endDate = document.querySelector(".enddate"),
                datestart,
                dateend;
            
            $(startDate).datepicker({
                monthNamesShort: $.datepicker.regional["tr"].monthNames,
                minDate: +0,
                numberOfMonths: 2,
                onSelect: function () {
                    var start_date = $(startDate).val();
                    datestart = start_date;
                    var a = start_date.substring(0, 2);
                    var b = start_date.substring(3, 5);
                    var c = start_date.substring(6, 10);
                    var start_date = new Date(c + "-" + b + "-" + a);
                    var end_date = new Date(c + "-" + b + "-" + a);
                    dateend = $(endDate).val();
                    if ($(endDate).val() === "" || start_date > end_date) {
                        var start_time = new Date(start_date);
                        start_time.setDate(start_time.getDate() + 1);
                        var ay = ((start_time.getMonth() + 1).toString().length == 1) ? "0" + (start_time.getMonth() + 1).toString() : (start_time.getMonth() + 1).toString();
                        var gun = (start_time.getDate().toString().length == 1) ? "0" + start_time.getDate().toString() : start_time.getDate().toString();
                        $(endDate).val(gun + "." + ay + "." + start_time.getFullYear());
                    }
                },
                onClose: function (selectedDate) {
                    $(endDate).datepicker("option", "minDate", selectedDate).focus();
                }
            });
            $(endDate).datepicker({ 
                minDate: 0,numberOfMonths: 2, monthNamesShort: $.datepicker.regional["tr"].monthNames,
                 onSelect: function () {
                     var start_date = $(startDate).val();
                    datestart = start_date;
                 }
            });      
    }
};
    
    
$(document).ready(function() {
    heroSearch.init();
});


