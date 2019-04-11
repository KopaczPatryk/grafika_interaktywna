function hydrateWithGibberish(amount) {
    const source = `Mauris mauris ante, blandit et, ultrices a, suscipit eget, quam. Integer ut neque. Vivamus nisi
    metus, molestie vel, gravida
    in, condimentum sit amet, nunc. Nam a nibh. Donec suscipit eros. Nam mi. Proin viverra leo ut
    odio. Curabitur malesuada.
    Vestibulum a velit eu ante scelerisque vulputate.`;
    let words = source.split(' ');
    let string = "";
    for (let index = 0; index < amount; index++) {
        string += words[getRandomInt(0, words.length)] + " ";
    }
    string.trim();
    document.write(string);
}
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}