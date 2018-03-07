module.exports = function (css) {
    // Here we can change the original css
    console.log(window.innerHeight);
    const transformed = css.replace('red', 'green');

    return transformed;
}