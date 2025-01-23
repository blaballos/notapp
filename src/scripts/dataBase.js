

// DATABASE CODE

const cardContainer = document.querySelector('card-container')

const setupCards = data => {
  if (data.length) {
    let html = ''
    data.forEach(doc => {
      const post = doc.data()
      const card = `
            <article class="w-full">
                <div class="w-full bg-[#14202E] py-2 rounded-xl max-w-[272px] flex flex-col items-start px-2">
                    <div class="w-full flex items-center justify-between mb-2">
                        <textarea name="titleCard" id="titleCard" rows="1" class="bg-transparent text-white text-md font-semibold rounded-lg px-2 border-none focus:outline-none resize-none">${post.titleTable}</textarea>
                    </div>
                    <div class="w-full">
                        <form class="flex justify-between items-center">
                            <input type="text" placeholder="Agregar tarea..." class="input-item bg-[#14202E] text-gray-400 outline-none px-2">
                            <button class="add-item-button w-8 h-8 flex items-center justify-center bg-[#14202E] text-white text-md p-2 rounded-xl hover:bg-gray-400/50 transition duration-200">+</button>
                        </form>
                    </div>
                    <div class="w-full">
                        <ul class="items-list w-full">

                        </ul>
                    </div>
                </div>
            </article>
        `;

        html += card

        cardContainer.innerHTML = html;
    })
  } else {
    cardContainer.innerHTML = '<p class="text-5xl">NO PUBLICACIONES</p>'
  }
}



// EVENTS

auth.onAuthStateChanged(user => {
  if (user) {
    fs.collection('tableros').get().then((snapshot) => {
      setupCards(snapshot.docs)
    })
  } else {
    setupCards([])
  }
})
