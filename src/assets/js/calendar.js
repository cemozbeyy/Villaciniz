var Calendar = {
    init: function() {
        var btnCalendarPrev = '#calendar-prev-btn',
            btnCalendarNext = '#calendar-next-btn',
            btnAvailable = ".btn-available",
            calendarContainer = document.querySelector(".calendar-container"),
            currentDate, NOW = new Date(),
            getAvailability = function(start, end, el) {
                
                el.innerHTML = "";
                
                var calendarDATA = [
                    {
                        date: "25/03/2020",    
                        class: "c-full"    
                    },
                    {
                        date: "27/03/2020",    
                        class: "c-full"    
                    },
                    {
                        date: "05/04/220",    
                        class: "c-full"    
                    },
                    {
                        date: "10/05/2020",    
                        class: "c-full"    
                    }
                ];
                
                var mFormat = 'MM/DD/YYYY',
                    dateFormat = 'DD/MM/YYYY';
            
                var setFullDates = function(el,data) {
                    setTimeout(function() {
                        var TDs = $(el).find(".day");
                        for(var i=0;i<TDs.length;i++) {
                            var td = TDs[i];
                            var day = $(td).attr("data-day");
                            day =  day.split('.').join("/");
                            for(var i=0;i<data.length;i++) {
                                if(data[i].date === day) {
                                    $(td).addClass("em-active");
                                    $(td).addClass(data[i].class);
                                }
                            }
                        }
                    },500);
                },
                optPicker = {
                    inline: true
                };
                for (var i = 0; i < 6; i++) {
                    var mDate = moment(start).add(i, 'M'),
                        date = moment(mDate).format(mFormat);
                
                    var div = '<div id="calendar_picker_'+i+'" class="calendar-picker-item" data-value="'+date+'"></div>';
                    $(el).append(div);
                    
                    var picker = document.getElementById("calendar_picker_" + i),
                        pickerARR = [];
                    pickerARR.push(picker);
                    APP.picker(pickerARR,optPicker);
                    setFullDates(picker,calendarDATA);
                    
                }
            };
            
            
        $(btnAvailable).on("click",function(e) {
            setTimeout(function() {
                getAvailability(moment(NOW), moment(NOW).add(6, 'M'),calendarContainer); 
            },100);
            e.preventDefault();
        }); 
        

        $(btnCalendarPrev).click(function () {
            NOW = moment();
            var currentStartDate = moment(currentDate);
            var startDate = moment(currentStartDate).subtract(6, 'M');
                var endDate = currentDate;
                currentDate = startDate;
                getAvailability(startDate, endDate,calendarContainer);
        });
        
        
        $(btnCalendarNext).click(function () {
            NOW = moment();
            var currentStartDate = moment(currentDate);
            var startDate = currentStartDate;
            var endDate = moment(currentStartDate).add(6, 'M');
            currentDate = endDate;
            getAvailability(startDate, endDate,calendarContainer);
        });
    }
};


