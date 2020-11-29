const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const kp = 25;
const meret = 23;

let eredmeny = 0;

let kigyo = [
    {
        x: Math.floor(meret / 2) * kp,
        y: Math.floor(meret / 2) * kp,
        direction: "UP"
    },
    {
        x: Math.floor(meret / 2) * kp,
        y: Math.floor(meret / 2) * kp - kp,
        direction: "UP"
    },
    {
        x: Math.floor(meret / 2) * kp,
        y: Math.floor(meret / 2) * kp - 2 * kp,
        direction: "UP"
    }
]
//for (let i = 0; i < kigyo.length; i++) {
//    ctx.fillStyle = 'green';
//    ctx.fillRect(kigyo[i].x, kigyo[i].y, kp, kp);
//}

//iranyok, mozgatas
let ir;
ir = "UP";
var nyom = false;
document.addEventListener('keydown', irany);

function irany(event) {
    if (event.keyCode == 37 && ir != 'RIGHT') {
        ir = 'LEFT';
    }
    else if (event.keyCode == 38 && ir != 'DOWN') {
        ir = 'UP';
    }
    else if (event.keyCode == 39 && ir != 'LEFT') {
        ir = 'RIGHT';
    }
    else if (event.keyCode == 40 && ir != 'UP') {
        ir = 'DOWN';
    }
    console.log("Direction arrow pushed, ir set to " + ir);
}

let kaja = {
    x: Math.floor(1 + (Math.random() * (meret - 1))) * kp,
    y: Math.floor(1 + (Math.random() * (meret - 1))) * kp
}

function rajzolas() {
    ctx.fillStyle = 'lightgreen';
    ctx.fillRect(kp, kp, meret * kp - kp, meret * kp - kp);

    //kigyo mozgatasa
    let kigyoX = kigyo[0].x;
    let kigyoY = kigyo[0].y;

    //uj elem hozzaadasa a kigyo elejehez az uj iranyba, utolso elem torlese
    switch (ir) {
        case "LEFT":
            kigyo.unshift({ x: kigyo[0].x - kp, y: kigyo[0].y, direction: "LEFT" });
            console.log("Turned left");
            break;
        case "RIGHT":
            kigyo.unshift({ x: kigyo[0].x + kp, y: kigyo[0].y, direction: "RIGHT" });
            console.log("Turned right");
            break;
        case "UP":
            kigyo.unshift({ x: kigyo[0].x, y: kigyo[0].y - kp, direction: "UP" });
            console.log("Go up");
            break;
        case "DOWN":
            kigyo.unshift({ x: kigyo[0].x, y: kigyo[0].y + kp, direction: "DOWN" });
            console.log("Go down");
            break;
        default:
            break;
    }
    kigyo.pop();
    for (let i = 0; i < kigyo.length; i++) {
        console.log("kigyo" + i + ", x: " + kigyo[i].x + ", y: " + kigyo[i].y + ", irany: " + kigyo[i].direction);
    }

    //kigyo kirajzolasa
    for (let i = 0; i < kigyo.length; i++) {
        ctx.fillStyle = 'green';
        ctx.fillRect(kigyo[i].x, kigyo[i].y, kp, kp);
    }

    //kigyo eszik
    if (kigyo[0].x == kaja.x && kigyo[0].y == kaja.y) {
        eredmeny += 1;

        kaja = {
            x: Math.floor(1 + (Math.random() * (meret - 1))) * kp,
            y: Math.floor(1 + (Math.random() * (meret - 1))) * kp
        }

        let ujElem;
        let utolsoKigyoElem = kigyo[kigyo.length - 1];
        switch (utolsoKigyoElem.direction) {
            case "LEFT":
                ujelem = { x: utolsoKigyoElem.x + kp, y: utolsoKigyoElem.y, direction: utolsoKigyoElem.direction };
                break;
            case "RIGTH":
                ujelem = { x: utolsoKigyoElem.x - kp, y: utolsoKigyoElem.y, direction: utolsoKigyoElem.direction };
                break;
            case "UP":
                ujelem = { x: utolsoKigyoElem.x, y: utolsoKigyoElem.y + kp, direction: utolsoKigyoElem.direction };
                break;
            case "DOWN":
                ujelem = { x: utolsoKigyoElem.x, y: utolsoKigyoElem.y - kp, direction: utolsoKigyoElem.direction };
                break;
            default:
                break;
        }
        kigyo.push(ujElem);
        ctx.fillRect(ujElem.x, ujElem.y, kp, kp)
    }


    //function collision(head, array) {
    //    for (let i = 0; i < array.length; i++) {
    //        if (head.x == array[i].x && head.y == array[i].y) {
    //            return true;
    //        }
    //    }

    //    return false;
    //}

    //if (kigyoX < kp || kigyoY < kp ||
    //    collision(newHead, kigyo)) {
    //    clearInterval(game);
    //}

    //alma rajzolasa
    ctx.fillStyle = 'red';
    ctx.fillRect(kaja.x, kaja.y, kp / 2, kp / 2);


    //eredmeny
    ctx.fillStyle = 'black';
    ctx.font = '24px Changa one';
    ctx.clearRect(0, 0, 50, 25);
    ctx.fillText(eredmeny, kp, 0.8 * kp);
}


let game = setInterval(rajzolas, 500);
