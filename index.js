function updateClock(){

    const now = new Date();
    let hours = now.getHours();
    const meridiem = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    hours = hours.toString().padStart(2, 0);
    const minutes = now.getMinutes().toString().padStart(2, 0);
    const seconds = now.getSeconds().toString().padStart(2, 0);
    const timeString = `${hours}:${minutes}:${seconds} ${meridiem}`;
    document.getElementById("clock").textContent = timeString;
}

updateClock();
setInterval(updateClock, 1000);

let startTim = 0;
let elapsedTim = 0;
let currentTime = 0;
let paused = true;
let intervalId;
let hrs = 0;
let mins = 0;
let secs = 0;

startBtn.addEventListener("click", () => {
    if(paused){
        paused = false;
        startTime = Date.now() - elapsedTim;
        intervalId = setInterval(updateTime, 1000);
    }
});
pauseBtn.addEventListener("click", () => {
    if(!paused){
        paused = true;
        elapsedTim = Date.now() - startTim;
        clearInterval(intervalId);
    }
});
resetBtn.addEventListener("click", () => {
    paused = true;
    clearInterval(intervalId);
    startTim = 0;
    elapsedTim = 0;
    currentTime = 0;
    hrs = 0;
    mins = 0;
    secs = 0;
    timeDisplay.textContent = "00:00:00";
});

function updateTime(){
    elapsedTim = Date.now() - startTime;

    secs = Math.floor((elapsedTim / 1000) % 60);
    mins = Math.floor((elapsedTim / (1000 * 60)) % 60);
    hrs = Math.floor((elapsedTim / (1000 * 60 * 60)) % 60);

    secs = pad(secs);
    mins = pad(mins);
    hrs = pad(hrs);

    timeDisplay.textContent = `${hrs}:${mins}:${secs}`;

    function pad(unit){
        return (("0") + unit).length > 2 ? unit : "0" + unit;
    }
}


var startTime;
var elapsedTime = 0;
var interval;
var historie = [];

function start() {
    startTime = new Date().getTime();
    interval = setInterval(function() {
        elapsedTime = new Date().getTime() - startTime;
        var minutes = Math.floor(elapsedTime / (1000 * 60));
        var seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
        var milliseconds = Math.floor((elapsedTime % (1000 * 60)) % 1000);
        document.getElementById("cas").innerHTML =
            minutes.toString().padStart(2, "0") + ":" +
            seconds.toString().padStart(2, "0") + ":" +
            milliseconds.toString().padStart(3, "0");
    }, 10);
    document.getElementById("start").disabled = true;
    document.getElementById("stop").disabled = false;
}

function stop() {
    clearInterval(interval);
    document.getElementById("start").disabled = false;
    document.getElementById("stop").disabled = true;
    var datum = new Date();
    var polozka = {
        sit: document.getElementById("sit").value,
        cas: elapsedTime
    };
    historie.push(polozka);
    zobrazitHistorii();
}

function zobrazitHistorii() {
    var html = "";
    for (var i = 0; i < historie.length; i++) {
        var polozka = historie[i];
        var datum = new Date(polozka.cas);
        var casStr = Math.floor(polozka.cas / (1000 * 60)) + " minut";
        html += "<li>" + datum.toLocaleDateString() + " - " + polozka.sit + " (" + casStr + ")</li>";
    }
    document.getElementById("historie").innerHTML = html;
}


var startTime;
var elapsedTime = 0;
var interval;
var limit;
var historie = [];

function start() {
    startTime = new Date().getTime();
    interval = setInterval(function() {
        elapsedTime = new Date().getTime() - startTime;
        var minutes = Math.floor(elapsedTime / (1000 * 60));
        var seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
        var milliseconds = Math.floor((elapsedTime % (1000 * 60)) % 1000);
        document.getElementById("cas").innerHTML =
            minutes.toString().padStart(2, "0") + ":" +
            seconds.toString().padStart(2, "0") + ":" +
            milliseconds.toString().padStart(3, "0");
        if (elapsedTime >= limit * 60 * 1000) {
            clearInterval(interval);
            document.getElementById("start").disabled = true;
            document.getElementById("stop").disabled = true;
            document.getElementById("zprava").innerHTML = "Dosáhli jste svého denního limitu! Doporučujeme si dát pauzu a odpočinout si od sítě " + document.getElementById("sit").value + ".";
        }
    }, 10);
    document.getElementById("start").disabled = true;
    document.getElementById("stop").disabled = false;
}

setTimeout(() => {
    alert("byl si na strance 20 sekund");

}, "20000")


var startTime;
        var elapsedTime = 0;
        var interval;
        var limit;
        var historie = [];
 
        function start() {
            startTime = new Date().getTime();
            interval = setInterval(function() {
                elapsedTime = new Date().getTime() - startTime;
                var minutes = Math.floor(elapsedTime / (1000 * 60));
                var seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
                var milliseconds = Math.floor((elapsedTime % (1000 * 60)) % 1000);
                document.getElementById("cas").innerHTML =
                    minutes.toString().padStart(2, "0") + ":" +
                    seconds.toString().padStart(2, "0") + ":" +
                    milliseconds.toString().padStart(3, "0");
                if (elapsedTime >= limit * 60 * 1000) {
                    clearInterval(interval);
                    document.getElementById("start").disabled = true;
                    document.getElementById("stop").disabled = true;
                    document.getElementById("zprava").innerHTML = "Dosáhli jste svého denního limitu! Doporučujeme si dát pauzu a odpočinout si od sítě " + document.getElementById("sit").value + ".";
                }
            }, 10);
            document.getElementById("start").disabled = true;
            document.getElementById("stop").disabled = false;
        }
 
        function stop() {
            clearInterval(interval);
            document.getElementById("start").disabled = false;
            document.getElementById("stop").disabled = true;
            var datum = new Date();
            var polozka = {
                sit: document.getElementById("sit").value,
                cas: elapsedTime
            };
            historie.push(polozka);
            zobrazitHistorii();
            if (elapsedTime < limit * 60 * 1000) {
                document.getElementById("zprava").innerHTML = "Dobrá práce! Strávili jste na síti " + document.getElementById("sit").value + " jen " + Math.floor(elapsedTime / (60 * 1000)) + " minut.";
            }
        }
 
        function zobrazitHistorii() {
            var html = "";
            for (var i = 0; i < historie.length; i++) {
                var polozka = historie[i];
                var datum = new Date(polozka.cas);
                var casStr = Math.floor(polozka.cas / (1000 * 60)) + " minut";
                html += "<li>" + datum.toLocaleDateString() + " - " + polozka.sit + " (" + casStr + ")</li>";
            }
        }    document.getElementById("zprava").innerHTML = "Dobrá práce! Strávili jste na síti " + document.getElementById("sit").value + " jen " + Math.floor(elapsedTime / (1000 * 60)) + " minut.";