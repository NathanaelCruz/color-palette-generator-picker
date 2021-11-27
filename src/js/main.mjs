import Palette from './modules/Palette.js'
import { loadStorageFunctionsInPalettesPage, loadStorageFunctionsInHome } from './modules/storageColors.js'

let palette = new Palette()
window.onload = () => {
    const route = window.location.pathname

    switch (route) {
        case "list-colors.html":
            loadStorageFunctionsInPalettesPage()
            break;
    
        default:
            loadStorageFunctionsInHome()
            palette.colorPaletteEvents()
            break;
    }
}