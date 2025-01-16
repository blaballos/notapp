const input = document.querySelector('input')
const addButton = document.getElementById('add-button')
const ul = document.getElementById('ul-list')

addButton.addEventListener('click', (e) => {
    e.preventDefault()
    
    const text = input.value

    if (text !== '') {
        const li = document.createElement('li')
        const p = document.createElement('p')

        li.className = 'w-full bg-[#88A9C3] flex justify-between items-center rounded-lg mt-2 border-2 border-transparent hover:cursor-pointer hover:border-white'
        p.className = 'text-gray-950 text-md font-medium px-2'
    
        p.textContent = text
    
        li.appendChild(p)
        li.appendChild(addDeleteButton())
        ul.appendChild(li)
    
        input.value = ''
    }
})

const addDeleteButton = () => {
    const deleteButton = document.createElement('button')

    deleteButton.textContent = 'x'
    deleteButton.className = 'w-8 h-8 flex items-center justify-center text-white text-md p-2 rounded-xl hover:text-[#14202E] transition duration-200'

    deleteButton.addEventListener('click', (e) => {
        const item = e.target.parentElement
        ul.removeChild(item)
    })

    return deleteButton
}