import ElementComponent from './ElementComponent.js'

let ElementTags = new ElementComponent()
let cardContainer = document.querySelector('[color-palette-generator]')
let buttonGenerateColors = document.querySelector('[button-generate-palletes]')

export default class Palette {
    insertColorPalettesCards() {
        let cardColor = document.querySelectorAll('.card__color')
        let cardTitle = document.querySelectorAll('.card__title')
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
        let cardTitle = document.querySelectorAll('.card__title')
        const header = document.querySelector('.header')
        setTimeout(() => {
            cardTitle.forEach(color => {
                color.parentNode.addEventListener('click', function() {
                    const range = document.createRange()
                    range.selectNode(color)
                    window.getSelection().removeAllRanges()
                    window.getSelection().addRange(range)
                    document.execCommand("copy")
                    let copyColorAlertCreateTag = ElementTags.createElementTag('strong', 'copy')
                    copyColorAlertCreateTag.innerHTML = `A cor ${color.innerText} foi copiada para a sua área de transferência!`
                    header.appendChild(copyColorAlertCreateTag)
                    setTimeout(() => {
                        copyColorAlertCreateTag.remove()
                    }, 5000)

                })
            })
        }, 1000)
    }
    colorPaletteEvents() {
        this.createCardsElements()
        buttonGenerateColors.onclick = () => this.insertColorPalettesCards()
        document.onkeyup = (e) => { if (e.which === 32 || e.keyCode == 32) this.insertColorPalettesCards() }
        this.copyColorPaletteCard()
    }
}