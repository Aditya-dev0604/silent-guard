let score = 0;

let situations = [
    "The elder is sitting quietly.",
    "The elder is lying on the floor.",
    "The elder appears to be slumped over.",
    "The elder has been standing still for a long time.",
    "The elder is on the floor and is not moving."
];

let responses = [
    "okay",
    "help",
    "no_response"
];


// Pick a random situation when the game starts

let randomSituation =
    Math.floor(Math.random() * situations.length);

document.getElementById("situation").textContent =
    situations[randomSituation];


// Store the elder's current response

let currentResponse = "";


// Keep track of which buttons have been used

let voice1Used = false;
let voice2Used = false;

let alarmUsed = false;
let notifyUsed = false;


// VOICE CHECK 1

document.getElementById("voice1").onclick = function() {

    if (voice1Used) {
        return;
    }

    voice1Used = true;

    let randomResponse =
        Math.floor(Math.random() * responses.length);

    currentResponse = responses[randomResponse];

    if (currentResponse === "okay") {

        document.getElementById("message").textContent =
            "🟢 Elder: I'm okay.";

    }

    else if (currentResponse === "help") {

        document.getElementById("message").textContent =
            "🔴 Elder: HELP ME!";

    }

    else {

        document.getElementById("message").textContent =
            "⚪ No response...";

        document.getElementById("voice2").disabled = false;
    }
};


// VOICE CHECK 2

document.getElementById("voice2").onclick = function() {

    if (voice2Used || currentResponse !== "no_response") {
        return;
    }

    voice2Used = true;

    document.getElementById("message").textContent =
        "🔊 Are you okay? Please respond.";

    let randomResponse =
        Math.floor(Math.random() * responses.length);

    currentResponse = responses[randomResponse];

    if (currentResponse === "okay") {

        document.getElementById("message").textContent =
            "🟢 Elder: I'm okay.";

    }

    else if (currentResponse === "help") {

        document.getElementById("message").textContent =
            "🔴 Elder: HELP ME!";

    }

    else {

        document.getElementById("message").textContent =
            "⚪ Still no response...";
    }
};


// ALARM

document.getElementById("alarm").onclick = function() {

    if (alarmUsed) {
        return;
    }

    alarmUsed = true;

    if (currentResponse === "help") {

        score = score + 20;

        document.getElementById("message").textContent =
            "✅ Correct! Alarm activated. +20 points";

    }

    else if (currentResponse === "no_response") {

        score = score + 10;

        document.getElementById("message").textContent =
            "⚠️ No response. Alarm activated. +10 points";

    }

    else if (currentResponse === "okay") {

        score = score - 10;

        document.getElementById("message").textContent =
            "❌ The elder said they were okay. -10 points";
    }

    document.getElementById("score").textContent =
        "Score: " + score;
};


// NOTIFY

document.getElementById("notify").onclick = function() {

    if (notifyUsed) {
        return;
    }

    notifyUsed = true;

    if (currentResponse === "okay") {

        score = score - 5;

        document.getElementById("message").textContent =
            "⚠️ The elder said they were okay. -5 points";

    }

    else if (currentResponse === "help") {

        score = score + 10;

        document.getElementById("message").textContent =
            "📱 Notification sent. +10 points";

    }

    else if (currentResponse === "no_response") {

        score = score + 15;

        document.getElementById("message").textContent =
            "✅ Someone responsible has been notified. +15 points";
    }

    document.getElementById("score").textContent =
        "Score: " + score;
};


// CONTINUE

document.getElementById("continue").onclick = function() {

    if (currentResponse === "okay") {

        score = score + 10;

        document.getElementById("message").textContent =
            "✅ Good decision! The elder is okay. +10 points";

        document.getElementById("score").textContent =
            "Score: " + score;

    }

    else {

        document.getElementById("message").textContent =
            "⚠️ Make sure you have checked the situation first.";
    }
};


// NEXT SITUATION

document.getElementById("next").onclick = function() {

    let randomSituation =
        Math.floor(Math.random() * situations.length);

    document.getElementById("situation").textContent =
        situations[randomSituation];

    document.getElementById("message").textContent =
        "What would you do?";

    currentResponse = "";

    // Reset all action buttons for the new situation

    voice1Used = false;
    voice2Used = false;

    alarmUsed = false;
    notifyUsed = false;

    // Voice Check 2 starts locked again

    document.getElementById("voice2").disabled = true;
};