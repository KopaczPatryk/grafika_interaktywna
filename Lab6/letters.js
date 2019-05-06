const positions = [];

window.onload = () => {

    let container = document.getElementById("letters");


    let lettersArray = container.innerHTML.trim().split('');
    console.log(lettersArray);
    let content = "";
    for (let i = 0; i < lettersArray.length; i++) {
        const element = lettersArray[i];
        content += `<div class="letter">${element}</div>`;
    }
    container.innerHTML = content;

    saveOriginalPositions();
    dislocateString();

    container.onmouseover = constructString;
    container.mouseleave = dislocateString;
};

function saveOriginalPositions () {
    let containerChildren = document.getElementById("letters").childNodes;
    for (let i = 0; i < containerChildren.length; i++) {
        const element = containerChildren[i];
        
        positions[i] = {
            top: element.offsetTop,
            left: element.offsetLeft
        }
    }
};

function dislocateString()  {
    alert("Dislocate");
    let containerChildren = document.getElementById("letters").childNodes;
    for (let i = 0; i < containerChildren.length; i++) {
        const element = containerChildren[i];
        element.style.top = Math.random() * 200 - 100 + "px";
        element.style.left = Math.random() * 200 - 100 + "px";
    }
}

function constructString() {
    let containerChildren = document.getElementById("letters").childNodes;
    for (let i = 0; i < containerChildren.length; i++) {
        const element = containerChildren[i];
        element.style.top = positions[i].top + "px";
        element.style.left = positions[i].left + "px";
    }
}