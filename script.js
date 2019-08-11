const exercises = [
    "1. Burpee Broad (Far) Jumps",
    "2. Jump Rope",
    "3. Switching Knee Taps",
    "4. Jumping Jacks",
    "5. Diamond Pushups",
    "6. Mountain Climbers",
    "7. Plank / Leg Side to Side",
    "8. Leg Raises / Seated Side to Side",
    "9. Russian Twist / Weighted",
    "10. Boxing Punches",
    "11. Bicycles",
    "12. Fast Foot Shuffle (Fast Low Run)",
    "13. Squats (Tight / Broad)",
    "14. Boxing Punches",
    "15. Back Extentions"
];

/*
    "3. Switching Knee Taps",
    "4. Jumping Jacks",
    "5. Diamond Pushups",
    "6. Mountain Climbers",
    "7. Plank / Leg Side to Side",
    "8. Leg Raises / Seated Side to Side",
    "9. Russian Twist / Weighted",
    "10. Boxing Punches",
    "11. Bicycles",
    "12. Fast Foot Shuffle (Fast Low Run)",
    "13. Squats (Tight / Broad)",
    "14. Boxing Punches",
    "15. Back Extentions"
*/

const start = document.getElementById("start");
const reset = document.getElementById("reset");
const finish = document.getElementById("finish");
const early = document.getElementById("early");
const inputs = document.getElementsByTagName("input");
let statistics = document.querySelectorAll("ul:last-child li");

start.addEventListener("click", () => {
    // Checks if all the inputs have some kind of value
    if(start.innerText === "START" && checkEmptyInputs()) {document.getElementById("required").style.opacity = 1;}
    else if(start.innerText === "START") {timer();}

    if(start.innerText !== "START" || start.innerText === "START" && !checkEmptyInputs()) {
        // Disables styles to divs that are used when checking whether any inputs are empty
        document.getElementById("required").style.transition = "none";
        document.getElementById("required").style.opacity = 0;
        document.getElementById("required").style.display = "none";
        reset.style.display = "initial";
        colorChange();
    }
});

reset.addEventListener("click", resetEverything);

reset.addEventListener("click", resetStats);

finish.addEventListener("click", displayStats);

early.addEventListener("click", finishEarly);

// Changes and displays active time and sets once started, when written(changed) in input
inputs[0].addEventListener("change", () => {
    document.querySelector("#timer p").innerText = inputs[0].value;
});

inputs[0].addEventListener("keyup", () => {
    document.querySelector("#timer p").innerText = inputs[0].value;
});

inputs[2].addEventListener("change", () => {
    document.querySelector("#sets p").innerText = inputs[2].value;
});

inputs[2].addEventListener("keyup", () => {
    document.querySelector("#sets p").innerText = inputs[2].value;
});

// Start timer when "START" button is pressed
function timer() {
    // First start
    if(document.querySelector("#action p").innerText === "") {
        document.getElementsByTagName("form")[0].style.display = "none";       // Hides form
        start.style.top = "100px";                  // Lowers down `START` button
        reset.style.top = "100px";                  // Lowers down `RESET` button
        document.querySelector("#action p").innerText = "Get Ready!";          // Changes action text
        document.querySelector("#timer p").innerText = 10;                      // Initial countdown ("Get Ready!")
        document.querySelector("#exercise p").innerText = exercises[0];        // Displays first exercise
        document.querySelector(".information.stats").style.dataCount = "true"; // Starts tracking statistics

        // Displays all the necessary exercise information
        document.getElementById("action").style.display = "initial";
        document.getElementById("sets").style.display = "initial";
        document.getElementById("timer").style.display = "initial";
        document.getElementById("exercise").style.display = "initial";
        early.style.display = "initial";

        resetStats();
    }
    if(reset.style.dataReset !== "true") {
        setInterval(countdown, 1000);
    }
}

// Stop timer (when all exercises and sets are finished)
function stopTimer() {
    resetEverything();
    start.style.display = "none";
    finish.style.display = "initial";
    document.getElementsByTagName("form")[0].style.display = "none"; // Hides form
    document.getElementById("page").style.backgroundColor = "#7c1b1fe6";
    document.getElementsByClassName("congratulations")[0].style.display = "flex";
}

// Executes when "RESET" button is pressed
function resetEverything() {
    if(start.style.display = "none") {start.style.display = "initial";}
    document.getElementsByClassName("stats")[0].style.display = "none"; // Hides statistics

    start.innerText = "START";
    early.style.display = "none";
    reset.style.dataReset = "true"; // Indication that timer has been reset
    document.querySelector(".information.stats").style.dataCount = "false"; // Disables statistics tracking
    reset.style.display = "none"; // Hides "RESET" button

    document.getElementById("page").style.backgroundColor = "#066bb6";

    // Displays form and repositions buttons
    document.getElementsByTagName("form")[0].style.display = "flex";
    start.style.top = "120px";
    reset.style.top = "120px";

    // Resets values that are shown during exercise
    document.querySelector("#action p").innerText = "";
    document.querySelector("#exercise p").innerText = "";
    document.querySelector("#timer p").innerText = "";
    document.querySelector("#sets p").innerText = "";

    // Resets inputs' values
    inputs[0].value = "";
    inputs[1].value = "";
    inputs[2].value = "";

    // Hides the information related to exercises
    document.getElementById("action").style.display = "none";
    document.getElementById("sets").style.display = "none";
    document.getElementById("timer").style.display = "none";
    document.getElementById("exercise").style.display = "none";

    // Applies styles to divs that are used when checking whether any inputs are empty
    document.getElementById("required").style.opacity = 0;
    document.getElementById("required").style.display = "initial";
    document.getElementById("required").style.transition = "opacity 0.5s";
}

// Display
function displayStats() {
    document.getElementById("page").style.backgroundColor = "#066bb6";
    finish.style.display = "none";
    reset.style.display = "initial"
    document.getElementsByClassName("information")[1].style.display = "none";
    document.getElementsByClassName("stats")[0].style.display = "flex";
    reset.style.top = "100px";

    // How many exercises are in a set
    statistics[6].innerText = exercises.length;

    // Total time
    statistics[4].innerText = (+statistics[1].innerText) +
                              (+statistics[2].innerText) +
                              (+statistics[3].innerText);
}

// Checks if either of the inputs are empty
function checkEmptyInputs() {
    return inputs[0].value == "" ||
           inputs[1].value == "" ||
           inputs[2].value == "" ?
           true : false;
}

// Changes color and button text when either of the buttons are pressed
function colorChange() {
    let color = document.getElementById("page");
    let actionText = document.querySelector("#action p").innerText;

    if(actionText === "Get Ready!" && start.innerText === "PAUSE") {
        start.innerText = "CONTINUE";
        color.style.backgroundColor = "#6e4804";
    }
    else if(actionText === "Get Ready!" && start.innerText === "CONTINUE") {
        start.innerText = "PAUSE";
        color.style.backgroundColor = "#066bb6";
    }
    else if(actionText === "Get Ready!") {
        start.innerText = "PAUSE";
    }
    else if(actionText === "Work" && start.innerText === "CONTINUE") {
        start.innerText = "PAUSE";
        color.style.backgroundColor = "#118007";
    }
    else if(actionText === "Break" && start.innerText === "CONTINUE") {
        start.innerText = "PAUSE";
        color.style.backgroundColor = "#066bb6";
    }
    else {
        start.innerText = "CONTINUE";
        color.style.backgroundColor = "#6e4804";
    }
}

// Counts down time and changes things related to time
function countdown() {
    countTime();
    // Executes if timer is not paused 
    if(start.innerText === "PAUSE" || start.innertext === "BREAK") {
        let time = document.querySelector("#timer p").innerText,
            action = document.querySelector("#action p").innerText,
            color = document.getElementById("page"),
            active = inputs[0].value,
            pause = inputs[1].value,
            sets = document.querySelector("#sets p").innerText;
        
        // Subtracts 1 second from running time
        document.querySelector("#timer p").innerText--;

        // After a repetition is finished: changes screen color, exercise text, action text
        // After a set is finished: lowers sets number by 1
        // After all sets are finished: executes "stopTimer"
        if(time <= 1 && action === "Work") {
            countExercises();
            // Changes from work to break
            document.querySelector("#timer p").innerText = pause;
            document.querySelector("#action p").innerText = "Break";
            color.style.backgroundColor = "#076dd1";
            
            // Changes exercise text after one is finished and lowers sets number if all exercises are finished
            let whichExercise = document.querySelector("#exercise p").innerText.match(/\d+/g).map(Number)[0];
            if(whichExercise === exercises.length) {
                countSets();
                whichExercise = 0;
                document.querySelector("#sets p").innerText = --sets;

                // Stops the timer after all sets are finished
                if(sets == 0) {stopTimer();}
            }
            // Changes exercise text after every repetition
            document.querySelector("#exercise p").innerText = exercises[whichExercise];
        }
        else if (time <= 1 && action === "Break") {
            // Changes from break to work
            document.querySelector("#timer p").innerText = active;
            document.querySelector("#action p").innerText = "Work";
            color.style.backgroundColor = "#118007";
        }
        else if(time <= 1 && action === "Get Ready!"){
            // Used only for first start. Changes from get ready to work
            document.querySelector("#timer p").innerText = active;
            document.querySelector("#action p").innerText = "Work";
            color.style.backgroundColor = "#118007";
        }
    }
}

function countTime() {
    if(document.querySelector(".information.stats").style.dataCount === "true") {
        let action = document.querySelector("#action p").innerText;
        if(start.innerText === "CONTINUE") {statistics[3].innerText++;}
        else if(action === "Work") {statistics[1].innerText++;}
        else if(action === "Break") {statistics[2].innerText++;}
    }
}

function countExercises() {
    if(document.querySelector(".information.stats").style.dataCount === "true") {
        statistics[7].innerText++;
    }
}

function countSets() {
    if(document.querySelector(".information.stats").style.dataCount === "true") {
        statistics[5].innerText++;
    }
}

function resetStats() {
    statistics[1].innerText = 0;
    statistics[2].innerText = 0;
    statistics[3].innerText = 0;
    statistics[5].innerText = 0;
    statistics[7].innerText = 0;
}

function finishEarly() {
    stopTimer();
    displayStats();
}