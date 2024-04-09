/////////////////////////////////////////////////////////////////
//the scroll thing 
///////////////////
let wholeBook = document.getElementById("whole-book");
let selectors = document.getElementsByClassName("locator");

let selector1 = document.getElementById("locator1");
let selector2 = document.getElementById("locator2");
let selector3 = document.getElementById("locator3");
let selector4 = document.getElementById("locator4");
let selector5 = document.getElementById("locator5");
let selector6 = document.getElementById("locator6");

let pages = document.getElementsByClassName("page");

selector1.style.backgroundColor = "white";
selector2.style.backgroundColor = "white";

let oldScrollPosition = 0;

let sunRows = document.getElementsByClassName("row");
let littleSuns = document.getElementsByClassName("little-sun");

for(let i = 0; i < sunRows.length; i++){
    if(i%2 == 0){
        sunRows[i].style.marginLeft = "0vw";
    }
}

let deg1 = 0;
let deg2 = 90;

setInterval(function() {
    for(let i = 0; i < littleSuns.length; i++){
        if(i%2 == 0){
            littleSuns[i].style.transform = "rotate(" + deg1%360 + "deg)";
        } else if (i%2 == 1) {
            littleSuns[i].style.transform = "rotate(-" + deg2%360 + "deg)";
        }
    }
    deg1++;
    deg2++;
}, 50);

// for(let i = 0; i<selectors.length; i++){
//     // selectors[i].addEventListener("scroll", function(){
//     //     if(window.scrollX%500 == 0){
//     //         i += 1;
//     //     }
//     // });

//     selectors[i].addEventListener("click", function(){
//         selectors[i].style.backgroundColor = "white";
//         selectors[i + 1].style.backgroundColor = "white";

//         wholeBook.style.left = 50 - (50 * i) + "vw";

//         for (let j = 0; j<selectors.length; j++){
//             if(selectors[j].style.backgroundColor == "white" && j != i && j != i + 1){
//                 selectors[j].style.backgroundColor = "black";
//             }
//         }
//     }); 
    
// }

let worshipSun = document.getElementById("worship-sun");
let oldScrollLeft = 0;

let text2 = document.getElementById("text-2");//2.5 to 3 growth = 1.5
let sunLabelContainer = document.getElementById("sun-label-container");
let sunLabel = document.getElementById("sun-label");
let sunPointer = document.getElementById("arrow");

let intro = document.getElementById("intro-paragraph");

let bigParagraph = document.getElementById("big-paragraph");

let sunsHeatImage = document.getElementById("suns-heat-background");
let sunsHeatText = document.getElementById("suns-heat-text");

document.body.onscroll = function(e){
    windowExpander(window.scrollX);
    let finalPage = document.getElementById("final-page");

    let currentPosition = wholeBook.style.left;
    
    let scrollPosition = window.scrollX;
    let scrollPositionString = scrollPosition + "px";

    wholeBook.style.left = "calc(" + (innerWidth / 2) + "(0 - " + currentPosition + "+" + scrollPositionString + "))";

    if(window.scrollX / innerWidth > 6){
        sunLabelContainer.style.opacity = map((window.scrollX / innerWidth), 6.75, 7, 0, 0.6);
        console.log(sunLabelContainer.style.opacity);
        textGrow(sunLabel, 3, 6.75, 7);
        textGrow(arrow, 1.5, 6.75, 7);
        sunLabelContainer.style.left = map(sunLabel.style.scale, 1, 3, 724.2, 721) + "vw";
        arrow.style.left = map(sunLabel.style.scale, 1, 3, 35, 80) + "px";
    }

    if(window.scrollX / innerWidth > 7.25){
        textGrow(bigParagraph, 1.25, 7.25, 7.75);
        bigParagraph.style.left = map(window.scrollX / innerWidth, 7.25, 7.75, 749.85, 753) + "vw";
    }

    if (window.scrollX /innerWidth > 0.75){
        let adjustedTracking = map((window.scrollX / innerWidth), 0.75, 1.5, 0.03, 0.3);
        if(adjustedTracking >= 0.3){
            adjustedTracking = 0.3;
        }
        intro.style.letterSpacing = adjustedTracking + "rem";
    }

    if(window.scrollX /innerWidth > 1.75){
        sunsHeatImage.style.scale = map((window.scrollX / innerWidth), 1.75, 2.5, 1, 1.5);
        if(sunsHeatImage.style.scale >= 1.5){
            sunsHeatImage.style.scale = 1.5;
        }
    }

    if(window.scrollX / innerWidth > 9.75){
        let k = 0;
        setInterval(function (){
            finalPage.style.opacity = k + "%";
            k++;
        }, 25);
    }

    if(window.scrollX / innerWidth > 2.5){
        worshipSun.style.opacity = map(window.scrollX / innerWidth, 2.5, 3, 0, 1);
    }

    if(window.scrollX / innerWidth > 3){
        textGrow(text2, 1.3, 3, 3.5);
        text2.style.left = map(window.scrollX / innerWidth, 3, 3.5, 305.45, 307) + "vw";
    }
    
    ////////////////////

    for(let i = 0; i<selectors.length; i++){
        if(window.scrollX/(innerWidth/2) > i){
            selectors[i].style.backgroundColor = "white";
            selectors[i + 1].style.backgroundColor = "white";
            if(i > 0){
                selectors[i - 1].style.backgroundColor = "black";
            }    
        }
    }
    if(oldScrollPosition < window.scrollX){
        oldScrollPosition = window.scrollX;
    }
    if(oldScrollPosition > window.scrollX){
        for(let j = selectors.length - 1; j >= 0; j--){
            if((window.scrollX/(innerWidth / 2)) < j){
                selectors[j].style.backgroundColor = "white";
                selectors[j - 1].style.backgroundColor = "white";
                if(j < selectors.length - 1){
                    selectors[j + 1].style.backgroundColor = "black";
                }
            }
        }
    }
    ////////////////YESSSS THIS FINALLY WORKS
}

///////////////////////////////////////////////////////////////////////////////////
//embelishments
///////////////////////////////////////////////////////////////////////////////////
function map(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

////////////////////
//orbiting planets//
////////////////////

let orbitImage = document.getElementById("orbit-image");

let planet1 = document.getElementById("planet-1");
let planet2= document.getElementById("planet-2");
let planet3 = document.getElementById("planet-3");

let i = 0;

function orbiting(planet, min, max, offset){
    if(i<2*Math.PI){
        planet.style.top = map(Math.sin(i + offset), -1, 1, min, max) + "%";
        planet.style.left = map(Math.cos(i + offset), -1, 1, min, max) + "%";

        i += 0.0174533;
    } else {
        i = 0;
    }
}
setInterval(orbiting, 50, planet1, -1, 99.5, 0);

setInterval(orbiting, 50, planet2, 15, 83.5, 4.5);

setInterval(orbiting, 50, planet3, 22, 77, 2);

////////////////////////
//big expanding space//
///////////////////////

console.log(window.scrollX);
let spaceViewPort = document.getElementById("big-galaxy-container");
let longQuoteContainer = document.getElementById("cosmos-entire-quote");
let longQuoteParts = document.getElementsByClassName("cosmos-quote");
let j = 0 ;

//this still isn't working rip ok i'll figure her out later hehe
function windowExpander(scrollAmount){
    spaceViewPort.style.height = "50vh";
    let adjustedScrollAmount = (scrollAmount / innerWidth) - 5;

    if (scrollAmount > 5 * innerWidth){

        spaceViewPort.style.top = map(scrollAmount, innerWidth * 5, innerWidth * 6, 10, 0) + "vh";
        console.log("adjusted scroll " + adjustedScrollAmount);
        spaceViewPort.style.height = (adjustedScrollAmount * 50) + 50 + "vh";

        longQuoteContainer.style.height = (adjustedScrollAmount * 50) + 50 + "vh";
        longQuoteContainer.style.top = map(scrollAmount, innerWidth * 5, innerWidth * 6, 0, -10) + "vh";
        
        console.log("you have scrolled " + scrollAmount / innerWidth + " window widths");
        console.log("window size = " + spaceViewPort.style.height); //idk why this is instantly going to 100vh
        // console.log(space)
        j++;
    } 

    for(let parts of longQuoteParts){
        parts.style.height = "5vw";
    }
}

//////////////
//text-grow//
/////////////

function textGrow(text, growth, start, end){
    text.style.scale = map(window.scrollX / innerWidth, start, end, 1, growth);
    if(text.style.scale >= growth){
        text.style.scale = growth;
    }
    if(window.scrollX / innerWidth < start){
        text.style.scale = 1;
    }
}