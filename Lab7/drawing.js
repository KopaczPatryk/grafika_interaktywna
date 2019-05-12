
window.onload = () => {
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");
    ctx.canvas.width = 1000;
    ctx.canvas.height = 1000;

    drawSquareFlow(ctx);
    let wartości = {
        Chęci: 5,
        Masa: 40,
        Czas: 10
    }
    drawPieChart(ctx, wartości);

};

function drawSquareFlow(ctx) {
    ctx.beginPath();
    ctx.moveTo(5, 5);
    let cx = 5;
    let cy = 5;
    let h = 10;
    let w = 10;
    let bottom = true;
    for (let i = 0; i < 15; i++) {
        cx += w;
        ctx.lineTo(cx, cy);
        if (bottom) {
            cy += w;
        }
        else {
            cy -= w;
        }
        bottom = !bottom;
        ctx.lineTo(cx, cy);
    }

    ctx.stroke();
}

function drawPieChart(ctx, values) {

    let x = 100;
    let y = 100;

    let r = 50;
    let pi = 3.14;

    //koło
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.stroke();

    let sum = 0;
    Object.values(values).forEach(v => { sum += v; });

    let entries = Object.entries(values);

    //wycinki
    let curAng = 0;
    let legendOffset = 1.5;
    for (const [k, v] of entries) {
        ctx.strokeStyle = getRandomColor();
        ctx.fillStyle = getRandomColor();

        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + Math.cos(curAng) * r, y + Math.sin(curAng) * r);
        ctx.arc(x, y, r, curAng, curAng + calcPercentRad(sum, v));
        ctx.closePath();
        ctx.fill();

        //legenda
        ctx.fillText(
            k,
            x + Math.cos(curAng + calcPercentRad(sum, v) / 2) * r * legendOffset,
            y + Math.sin(curAng + calcPercentRad(sum, v) / 2) * r * legendOffset
        );

        curAng += calcPercentRad(sum, v);
    }
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function calcPercentRad(bigger, lesser) {
    let x = lesser / bigger * 2 * Math.PI;
    console.log(x);
    return x;
}

