document.addEventListener("DOMContentLoaded", () => {
    const lista = document.querySelector('ol')
    const li = document.createElement('li')

    li.textContent = 'hola'

    lista.appendChild(li)

});
