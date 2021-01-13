var isSelectionStarted = false;
var startIndex = 0;


$(document).ready(function() {
    var resultArr = [];
    var entry = {};

    $(".grid-item").each(function() {

        $(this).hover(function() {
            let currentIndex = $(this).data("index");
            if(startIndex > 0) {
                $(".grid-item").slice(startIndex-1, currentIndex).children(".overlay").addClass("highlight");
            }
        },
        function() {
            if(isSelectionStarted) {
                $(".grid-item").each(function() {
                    let overlayEle = $(this).children(".overlay");
                    if(!(overlayEle.hasClass("selected"))) {
                        overlayEle.removeClass("highlight");
                    }
                });
            }
        });
    });

    $(".grid-item button").each(function() {
        $(this).click(function() {
            let index = $(this).closest(".grid-item").data("index");
            if(isSelectionStarted) {
                entry.end = index;
                let newObj = Object.create(entry);
                if(newObj.start < newObj.end) {
                    resultArr.push({start: newObj.start, end:newObj.end});
                    $(".grid-item").slice(newObj.start-1, newObj.end).children(".overlay").addClass("highlight selected");
                    isSelectionStarted = false;
                    entry = {};
                    startIndex = 0;
                }   
            }
            else {
                entry.start = index; 
                startIndex = index;
                isSelectionStarted = true;
            }
        });
    });

    $(".submitBtn").click(function() {
        if(!isSelectionStarted)
                console.log(resultArr);
        else
            console.log("Please end the selection by click on more grid");
    });
});