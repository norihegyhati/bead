const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const kp = 25;
const meret = 23;

let eredmeny = 0;
let kigyo = [];

kigyo[0] = {
    x: Math.floor((meret / 2)) * kp,
    y: Math.floor((meret / 2)) * kp
};

//iranyok, mozgatas
let ir;
var nyom = false;
document.addEventListener('keydown', irany);

function irany(event) {
    if (event.keyCode == 37 && ir != 'RIGHT') {
        ir = "LEFT";
    }
    else if (event.keyCode == 38 && ir != 'DOWN') {
        ir = "UP";
    }
    else if (event.keyCode == 39 && ir != 'LEFT') {
        ir = "RIGHT";

    }
    else if (event.keyCode == 40 && ir != 'UP') {
        ir = "DOWN";

    }
}

let kaja = {
    x: Math.floor(1 + (Math.random() * (meret - 1))) * kp,
    y: Math.floor(1 + (Math.random() * (meret - 1))) * kp
}

function rajzolas() {
    ctx.fillStyle = 'lightgreen';
    ctx.fillRect(kp, kp, meret * kp - kp, meret * kp - kp);

    for (let i = 0; i < kigyo.length; i++) {
        ctx.fillStyle = 'green';
        ctx.fillRect(kigyo[0].x, kigyo[0].y, kp, kp);

    }

    //kigyo mozgatasa
    let kigyoX = kigyo[0].x;
    let kigyoY = kigyo[0].y;

    if (ir == "LEFT")
        kigyo[0].x -= kp;
    if (ir == "RIGHT")
        kigyo[0].x += kp;
    if (ir == "UP")
        kigyo[0].y -= kp;
    if (ir == "DOWN")
        kigyo[0].y += kp;


    //kigyo eszik
    if (kigyo[0].x == kaja.x && kigyo[0].y == kaja.y) {
        eredmeny += 1;
        kaja = {
            x: Math.floor(1 + (Math.random() * (meret - 1))) * kp,
            y: Math.floor(1 + (Math.random() * (meret - 1))) * kp
        }
    }

    //ide jönne az ütközés és a növekedés

    //alma rajzolasa
    ctx.fillStyle = 'red';
    ctx.fillRect(kaja.x, kaja.y, kp/2, kp/2);

    //eredmeny
    ctx.fillStyle = 'black';
    ctx.font = '24px Changa one';
    ctx.clearRect(0, 0, 50, 25);
    ctx.fillText(eredmeny, kp, 0.8 * kp);

}

let game = setInterval(rajzolas, 500);