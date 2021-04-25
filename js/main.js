function createElementTag(tagName, className) {
    const element = document.createElementTag(tagName)
    element.classTag = className
    return element
}

function randomColor() {
    let color = Math.floor(Math.random() * 16777215).toString(16);
    return `#${color}`
}

function upadatePalettesCards() {
    const colorPalette = document.querySelectorAll('.card__color')
    const colorPaletteHex = document.querySelectorAll('.card__title')
    for (let i = 0; i < colorPalette.length; i++) {
        let colorBackground = randomColor()
        colorPalette[i].style.background = colorBackground
        colorPaletteHex[i].textContent = colorBackground
    }
}
const buttonGenerate = document.querySelector('.main__button')

window.onload = () => upadatePalettesCards()

buttonGenerate.onclick = () => upadatePalettesCards()

const colorPalette = document.querySelectorAll('.card__color')

const colorPaletteHex = document.querySelectorAll('.card__title')

document.onkeyup = (e) => { if (e.which == 32 || e.keyCode == 32) upadatePalettesCards() }