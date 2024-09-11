var ctx;
var alphabet = "abcdefghijklmnopqrstuvwxyz";
var alphabety = 300;
var alphabetx = 20;
var alphabetwidth = 25;
var secret;
var lettersguessed = 0;
var secretx = 160;
var secrety = 50;
var secretwidth = 50;
var gallowscolor = "brown";
var facecolor = "tan";
var bodycolor = "tan";
var noosecolor = "#F60";
var bodycenterx = 70;
var steps = [
    drawgallows,
    drawhead,
    drawbody,
    drawrightarm,
    drawleftarm,
    drawrightleg,
    drawleftleg,
    drawnoose
];
var cur = 0;

function drawgallows() {
    ctx.lineWidth = 8;
    ctx.strokeStyle = gallowscolor;
    ctx.beginPath();
    ctx.moveTo(2, 180);
    ctx.lineTo(40, 180);
    ctx.moveTo(20, 180);
    ctx.lineTo(20, 40);
    ctx.moveTo(2, 40);
    ctx.lineTo(80, 40);
    ctx.moveTo(80, 40);
    ctx.lineTo(80, 60); // Draw top bar
    ctx.stroke();
    ctx.closePath();
}

function drawhead() {
    ctx.lineWidth = 3;
    ctx.strokeStyle = facecolor;
    ctx.beginPath();
    ctx.arc(bodycenterx, 75, 15, 0, Math.PI * 2, false);
    ctx.stroke();
    ctx.closePath();
}

function drawbody() {
    ctx.strokeStyle = bodycolor;
    ctx.beginPath();
    ctx.moveTo(bodycenterx, 90);
    ctx.lineTo(bodycenterx, 125);
    ctx.stroke();
    ctx.closePath();
}

function drawrightarm() {
    ctx.beginPath();
    ctx.moveTo(bodycenterx, 100);
    ctx.lineTo(bodycenterx + 20, 110);
    ctx.stroke();
    ctx.closePath();
}

function drawleftarm() {
    ctx.beginPath();
    ctx.moveTo(bodycenterx, 100);
    ctx.lineTo(bodycenterx - 20, 110);
    ctx.stroke();
    ctx.closePath();
}

function drawrightleg() {
    ctx.beginPath();
    ctx.moveTo(bodycenterx, 125);
    ctx.lineTo(bodycenterx + 10, 155);
    ctx.stroke();
    ctx.closePath();
}

function drawleftleg() {
    ctx.beginPath();
    ctx.moveTo(bodycenterx, 125);
    ctx.lineTo(bodycenterx - 10, 155);
    ctx.stroke();
    ctx.closePath();
}

function drawnoose() {
    ctx.strokeStyle = noosecolor;
    ctx.beginPath();
    ctx.moveTo(80, 60);
    ctx.lineTo(80, 90);
    ctx.stroke();
    ctx.closePath();
}

function init() {
    ctx = document.getElementById('canvas').getContext('2d');
    setupgame();
    ctx.font = "bold 20pt Arial";
}

function setupgame() {
    var i;
    var x;
    var y;
    var uniqueid;
    for (i = 0; i < alphabet.length; i++) {
        uniqueid = "a" + String(i);
        var d = document.createElement('div');
        d.innerHTML = "<div class='letters' id='" + uniqueid + "'>" + alphabet[i] + "</div>";
        document.body.appendChild(d);
        var thingelem = document.getElementById(uniqueid);
        x = alphabetx + alphabetwidth * i;
        y = alphabety;
        thingelem.style.top = String(y) + "px";
        thingelem.style.left = String(x) + "px";
        thingelem.addEventListener('click', pickelement, false);
    }
    var ch = Math.floor(Math.random() * words.length);
    secret = words[ch];
    for (i = 0; i < secret.length; i++) {
        uniqueid = "s" + String(i);
        var d = document.createElement('div');
        d.innerHTML = "<div class='blanks' id='" + uniqueid + "'> __ </div>";
        document.body.appendChild(d);
        var thingelem = document.getElementById(uniqueid);
        x = secretx + secretwidth * i;
        y = secrety;
        thingelem.style.top = String(y) + "px";
        thingelem.style.left = String(x) + "px";
    }
    steps[cur]();
    cur++;
}

function pickelement(ev) {
    var not = true;
    var picked = this.textContent.trim();
    var i;
    var j;
    var uniqueid;
    var thingelem;
    var out;
    for (i = 0; i < secret.length; i++) {
        if (picked == secret[i]) {
            id = "s" + String(i);
            document.getElementById(id).textContent = picked;
            not = false;
            lettersguessed++;
            if (lettersguessed == secret.length) {
                ctx.fillStyle = gallowscolor;
                ctx.font = "bold 30pt Arial";
                ctx.fillText("Você ganhou!", 200, 80);
                ctx.font = "bold 20pt Arial";
                ctx.fillText("Recarregue a página e tente novamente.", 200, 120);
                for (j = 0; j < alphabet.length; j++) {
                    uniqueid = "a" + String(j);
                    thingelem = document.getElementById(uniqueid);
                    thingelem.removeEventListener('click', pickelement, false);
                }
            }
        }
    }
    if (not) {
        steps[cur]();
        cur++;
        if (cur >= steps.length) {
            for (i = 0; i < secret.length; i++) {
                id = "s" + String(i);
                document.getElementById(id).textContent = secret[i];
            }
            ctx.fillStyle = gallowscolor;
            ctx.font = "bold 30pt Arial";
            ctx.fillText("Você perdeu!", 200, 80);
            ctx.font = "bold 20pt Arial";
            ctx.fillText("Recarregue a página e tente novamente.", 200, 120);
            for (j = 0; j < alphabet.length; j++) {
                uniqueid = "a" + String(j);
                thingelem = document.getElementById(uniqueid);
                thingelem.removeEventListener('click', pickelement, false);
            }
        }
        var id = this.id;
        document.getElementById(id).style.display = "none";
    }
}
