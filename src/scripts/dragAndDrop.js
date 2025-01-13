document.addEventListener("DOMContentLoaded", () => {
    const items = document.querySelectorAll('#container div')
    const almacen = document.getElementById('container')
    const carrito = document.getElementById('container2')

    const dragStart = (event) => {
        event.dataTransfer.setData("articulo", event.target.id)
    }

    const dragOver = (event) => {
        event.preventDefault()
    }

    const drop = (event, targetContainerId) => {
        event.preventDefault()
        if (event.target.id === targetContainerId) {
            const data = event.dataTransfer.getData("articulo")
            const item = document.getElementById(data)
            event.target.appendChild(item)
        }
    }

    items.forEach((item, index) => {
        item.setAttribute('draggable', 'true')
        item.setAttribute('id', `item-${index}`)
        item.addEventListener('dragstart', dragStart)
    })

    carrito.addEventListener('dragover', dragOver)
    carrito.addEventListener('drop', (event) => drop(event, "container2"))

    almacen.addEventListener('dragover', dragOver)
    almacen.addEventListener('drop', (event) => drop(event, "container"))

});
