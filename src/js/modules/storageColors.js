import STORAGE from "../constants/storage.js"
import ElementComponent from "./ElementComponent.js"


const storage = localStorage.getItem(STORAGE.LIST_PALETTE)

const saveStorage = (colorPalette) => {
    let storageTemporary = JSON.parse(storage)
    storageTemporary.push(colorPalette)

    localStorage.setItem(STORAGE.LIST_PALETTE, JSON.stringify(storageTemporary))
}

const buildColorPalette = () => {
    const palette = document.querySelectorAll(".card__title")
    let colorPalette = {}

    palette.forEach((color, index) => {
        colorPalette[`color-${index}`] = {
            id: index,
            color: color.textContent
        }
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
    linkPageColorPaletteList.setAttribute("href", "./list-colors.html")
    linkPageColorPaletteList.textContent = "Minhas Paletas de Cores"

    header ? header.insertAdjacentElement("beforeend", linkPageColorPaletteList) : null
}

const existListPaletteColors = () => {

    if(storage === null){
        localStorage.setItem(STORAGE.LIST_PALETTE, JSON.stringify([]))
    }

    if(JSON.parse(storage).length > 0){
        validateHeaderHome()
    }
}

export const loadStorageFunctionsInHome = () => {
    existListPaletteColors()
    saveColorPalette()
}

export const loadStorageFunctionsInPalettesPage = () => {
   console.log('teste')
}