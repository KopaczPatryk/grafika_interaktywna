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

    drawRoundRect(ctx, 250, 250, 150, 150, 25);


    let a = 0;
    setInterval(() => {
        drawSpur(ctx,a);
        ctx.strokeStyle = getRandomColor();
        ctx.fillStyle = getRandomColor();
        a+=0.5;
    }, 100);
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
        } else {
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
    Object.values(values).forEach(v => {
        sum += v;
    });

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

function drawRoundRect(ctx, xx, yy, xs, ys, r) {

    ctx.beginPath();
    ctx.arc(xx + r, yy + r, r, 3.14, 3.14 * 1.5, false);
    // ctx.lineTo(xx + xs, yy);

    ctx.arc(xx + xs, yy + r, r, 3.14 * 1.5, 3.14 * 2, false);
    // ctx.lineTo(xx + xs + r, yy + ys);

    ctx.arc(xx + xs, yy + ys, r, 3.14 * 2, 3.14 * 0.5, false);
    // ctx.lineTo(xx + r, yy + ys + r);

    ctx.arc(xx + r, yy + ys, r, 3.14 * 0.5, 3.14, false);
    // ctx.lineTo(xx, yy);
    ctx.closePath();
    ctx.fill();
}

function drawSpur(ctx,a) {
    let koloZ = {
        x: 500,
        y: 500,
        r1: 50 + a*2,
        r2: 100 + a*2
    };
    
    let ile = 52; //liczba zębów
    let r = koloZ.r1;
    ctx.beginPath();
    for (let i = 0; i < ile; i++) {
        let alpha = ((Math.PI * 2) / ile) * (i); //aktualny kąt
        alpha += a;
        if (i % 2 == 0) {
            if (r == koloZ.r1)
                r = koloZ.r2;
            else
                r = koloZ.r1;
        }
        let x = (r * Math.sin(alpha)) + koloZ.x;
        let y = (r * Math.cos(alpha)) + koloZ.y;
        if (i == 0)
            ctx.moveTo(x, y);
        else
            ctx.lineTo(x, y);
    }
    ctx.closePath();    
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle
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