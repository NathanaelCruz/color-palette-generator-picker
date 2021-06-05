export default class ElementComponent {
    createElementTag(tagName, classTag) {
        const element = document.createElement(tagName)
        element.className = classTag
        return element
    }
    removeElement(elementNode) {
        setTimeout(() => {
            elementNode.remove()
        }, 3000)
    }
    randomColor() {
        let color = Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, 0);
        return `#${color}`
    }
}