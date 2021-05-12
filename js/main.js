function createElementTag(tagName, classTag) {
    const element = document.createElement(tagName)
    element.className = classTag
    return element
}

function randomColor() {
    let color = Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, 0);
    return `#${color}`
}

function createCardsElements() {
    const cardContainer = document.querySelector('[color-palette-generator]')
    const card = createElementTag('article', 'card')
    const cardColor = createElementTag('div', 'card__color')
    const cardTitle = createElementTag('p', 'card__title')
    card.appendChild(cardColor)
    cardColor.setAttribute('role', 'figure')
    card.appendChild(cardTitle)
    cardContainer.appendChild(card)

    for (let i = 1; i <= 3; i++) {
        cardContainer.insertAdjacentHTML('beforeend', card.outerHTML)
    }
    insertColorPalettesCards()
}

function insertColorPalettesCards() {
    const colorPalette = document.querySelectorAll('.card__color')
    let colorPaletteHex = document.querySelectorAll('.card__title')
    for (let i = 0; i < colorPalette.length; i++) {
        let colorBackground = randomColor()
        colorPalette[i].style.background = colorBackground
        colorPaletteHex[i].textContent = colorBackground
    }
}

function controllPalettes() {
    const buttonGenerate = document.querySelector('.main__button')
    buttonGenerate.onclick = () => insertColorPalettesCards()
    document.onkeyup = (e) => { if (e.which == 32 || e.keyCode == 32) insertColorPalettesCards() }
}

function generateColorPalettesCards() {
    window.onload = () => createCardsElements(), insertColorPalettesCards(), controllPalettes()
}

generateColorPalettesCards()