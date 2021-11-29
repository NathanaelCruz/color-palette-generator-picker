import STORAGE from "../constants/storage.js"
import ElementComponent from "./ElementComponent.js"

const buildItemNoPalettesSave = (target) => {
    const noPaletteColors = [
        "<li class='palette__no-colors'>",
        "<h2 class='no-colors__title'>",
        "Não tem nenhuma paleta salva :(",
        "</h2>",
        "<a class='no-colors__link' href='./index.html'>",
        "Vamos gerar uma paleta?",
        "</a>",
        "</li>"
    ]

    target.innerHTML = ""
    target.insertAdjacentHTML("afterbegin", noPaletteColors.join(""))
}

const saveClipBoard = (textCopy, textAlert) => {
    const alertCopy = document.querySelector(".main__alert--copy")
    alertCopy.textContent = textAlert
    navigator.clipboard.writeText(textCopy)
    alertCopy.classList.add("isOpen")
    activeSound()

    setTimeout(() => {
        alertCopy.classList.remove("isOpen")
    }, 1500)
}

const activeCopyColor = () => {
    const colors = document.querySelectorAll(".palette__color-item")

    colors.forEach((color, index) => {
        const colorWrite = color.getAttribute("data-color")
        color.addEventListener("click", () => {
            saveClipBoard(colorWrite, `Cor ${colorWrite} copiada com sucesso!`)
        })
    })
}

const activeCopyPalette = () => {
    const palettes = document.querySelectorAll(".list-palettes__palette")

    palettes.forEach((palette, index) => {
        const colorsContainer = palette.querySelectorAll(".palette__colors .palette__color-item")
        const buttonCopyPalette = palette.querySelectorAll(".palette__copy")
        const colors = Array.prototype.slice.call(colorsContainer).map((color, index) => {
            return color.getAttribute("data-color")
        })

        buttonCopyPalette.forEach((buttonCopy, index) => {
            buttonCopy.addEventListener("click", () => {
                saveClipBoard(colors.join(", "), `Paleta das cores ${colors.join(", ")} copiada com sucesso!`)
            })
        })
    })
}

const buildMessageForPalette = (target) => {

    const colorsOfPalette = target.map((colorWrite, index) => {
        return String(colorWrite.color).toUpperCase()
    })
    
    return encodeURIComponent(`O que acha da minha paleta de cores? ${colorsOfPalette.join(", ")}`)
}

const listPalettesSave = () => {
    existListPaletteColors()
    const storage = JSON.parse(localStorage.getItem(STORAGE.LIST_PALETTE))
    const containerListPalettes = document.querySelector(".main__list-palettes")

    if(storage.length === 0){
        buildItemNoPalettesSave(containerListPalettes)
    } else {
        storage.forEach((palette, index) => {
            let paletteHTML = [
                '<li class="list-palettes__palette"><ul class="palette__colors">'
            ]
            const paletteFooter = [
                '<li class="palette__color-action">',
                '<button class="palette__copy">Copiar</button>',
                '</li></ul>',
                '<ul class="palette__actions--mobile">',
                '<li class="actions--mobile__copy">',
                '<button class="palette__copy">Copiar</button>',
                '</li>',
                '<li class="actions--mobile__whatsapp">',
                `<a href="https://tinyurl.com/2p9xmdu3?text=${buildMessageForPalette(palette)}" class="whatsapp__link" target="_blank"><img src="./src/image/whatsapp__icon.svg" alt="Ícone do Whatsapp" /></a>`,
                '</li>',
                '</ul>',
                '</li>'
            ]
            let paletteOfColorsHTML = palette.map((colorOfPalette, index) => {
                const colorFormated = String(colorOfPalette.color).toUpperCase()
                return `<li class="palette__color-item" data-color="${colorFormated}"><div class="palette__color" style="background-color: ${colorFormated};"></div><p class="palette__color-write">${colorFormated}</p></li>`
            })
            paletteHTML.push(paletteOfColorsHTML.join(''))
            paletteHTML.push(paletteFooter.join(""))
            
            containerListPalettes.insertAdjacentHTML('afterbegin', paletteHTML.join(""))
        })
        activeCopyColor()
        activeCopyPalette()
    }

}


const activeSound = () => {
    const alertRinging = new Audio('/src/sounds/alertSave.mp3')
    alertRinging.volume = 0.1
    alertRinging.play()
    alertRinging.loop = false
}

const showMessage = () => {
    const alertMessage = document.querySelector(".main__alert--save")
    alertMessage.classList.add("isOpen")
    activeSound()

    setTimeout(() => {
        alertMessage.classList.remove("isOpen")
    }, 1500)
}

const activeLinkForPagePalette = (countPaletteSave) => {
    if(countPaletteSave === 0){
        validateHeaderHome()
    }
}

const saveStorage = (colorPalette) => {
    const storage = localStorage.getItem(STORAGE.LIST_PALETTE)
    let storageTemporary = JSON.parse(storage)

    activeLinkForPagePalette(storageTemporary.length)

    storageTemporary.push(colorPalette)

    localStorage.setItem(STORAGE.LIST_PALETTE, JSON.stringify(storageTemporary))
    showMessage()
}

const buildColorPalette = () => {
    const palette = document.querySelectorAll(".card__title")
    let colorPalette = []

    palette.forEach((color, index) => {
        colorPalette.push({
            id: index,
            color: color.textContent
        })
    })

    return colorPalette
}

const saveColorPalette = () => {
    const button = document.querySelector(".main__button--save-palette")

    button.addEventListener("click", () => {
        const colorPalette = buildColorPalette()
        saveStorage(colorPalette)
    })
}

const validateHeaderHome = () => {
    const header = document.querySelector(".header")
    const linkPageColorPaletteList = new ElementComponent().createElementTag("a", "header__link")
    const route = window.location.pathname
    const textLink = route === '/index.html' ? "Minhas Paletas de Cores" : "Gerar Paleta de Cores"
    const anchorLink = route === '/index.html' ? "./list-colors.html" : "./index.html"

    linkPageColorPaletteList.setAttribute("href", anchorLink)
    linkPageColorPaletteList.textContent = textLink

    header ? header.insertAdjacentElement("beforeend", linkPageColorPaletteList) : null
}

const existListPaletteColors = () => {
    const storage = localStorage.getItem(STORAGE.LIST_PALETTE)

    if(storage === null){
        localStorage.setItem(STORAGE.LIST_PALETTE, JSON.stringify([]))
    } else {
        if(JSON.parse(storage).length > 0){
            validateHeaderHome()
        }
    }
}

export const loadStorageFunctionsInHome = () => {
    existListPaletteColors()
    saveColorPalette()
}

export const loadStorageFunctionsInPalettesPage = () => {
    listPalettesSave()
}