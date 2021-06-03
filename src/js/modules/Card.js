import ElementComponent from './ElementComponent.js'
let ElementTags = new ElementComponent()

let cardContainer = document.querySelector('[color-palette-generator]')
let card = document.querySelectorAll('.card')
let cardColor = document.querySelectorAll('.card__color')
let cardTitle = document.querySelectorAll('.card__title')

export default class Card {
    insertColorPalettesCards() {
        for (let i = 0; i < cardColor.length; i++) {
            let elementColor = ElementTags.randomColor()
            cardColor[i].style.background = elementColor
            cardTitle[i].textContent = elementColor
        }
    }
    createCardsElements() {
        let card = ElementTags.createElementTag('article', 'card')
        let cardColor = ElementTags.createElementTag('div', 'card__color')
        let cardTitle = ElementTags.createElementTag('strong', 'card__title')

        card.appendChild(cardColor)
        cardColor.setAttribute('role', 'figure')
        card.appendChild(cardTitle)
        cardContainer.appendChild(card)

        for (let i = 0; i <= 3; i++) {
            cardContainer.insertAdjacentHTML('beforeend', card.outerHTML)
        }
        this.insertColorPalettesCards()
    }

    copyColorPaletteCard() {
        setTimeout(() => {
            cardTitle.forEach(color => {
                color.parentNode.addEventListener('click', function() {
                    const range = document.createRange();
                    range.selectNode(color)
                    window.getSelection().removeAllRanges();
                    window.getSelection().addRange(range)
                    document.execCommand("copy");
                })
            })
        }, 1000);
    }
    colorPaletteEvents() {
        window.onload = () => createCardsElements()
        document.onkeyup = (e) => { if (e.which == 32 || e.keyCode == 32) insertColorPalettesCards() }
    }
}