const languages = document.querySelector('.languages')
const langsButton = document.querySelector('.language-btn')
const cardsOutline = document.querySelectorAll('.card-outline')
const seccoes = document.querySelectorAll('#projetos .seccao')
const titles = document.querySelectorAll('#projetos #titles-container .title')
const demonstracaoArticles = document.querySelectorAll('.container#projetos .seccao.demonstracao article')
let demonstracaoArticlesDictionary = {}
let card_id = "portfolio"
let title_id = "visao-geral"

// show border based on selected project
cardsOutline.forEach(outline => {
    const card = outline.querySelector('.card')
    card.addEventListener('click', () => {
        card_id = card.id
        changeContent()

        cardsOutline.forEach(outlin => {
            outlin.classList.remove('active')
        })
        outline.classList.add('active')
  })
})

// show content based on selected option
titles.forEach(title => {
    title.addEventListener('click', () => {
        title_id = title.id
        changeContent()

        // set the title markdown
        titles.forEach(titulo => {
            titulo.classList.remove('active')
        })
        title.classList.add('active')
        
  })
})

langsButton.addEventListener('click', () => {
    languages.classList.toggle('active')
})


function carouselButtons(){
    demonstracaoArticles.forEach(article => {
        const innerCarousel = article.querySelector('.carousel-inner')
        const prevButton = article.querySelector('.carousel-control.prev')
        const nextButton = article.querySelector('.carousel-control.next')
        const images = article.querySelectorAll('.carousel img')
        let dAD = demonstracaoArticlesDictionary
        let carouselImage = document.createElement('img')

        dAD[article.id] = [0, 0, images.length - 1, carouselImage]
        // values are   = [min, current_image, max, image]

        images.forEach(image => {
            image.style.display = 'none'
        });

        carouselImage.src = images[dAD[article.id][1]].src
        carouselImage.classList.add('click-to-fullscreen')
        innerCarousel.appendChild(carouselImage)

        prevButton.addEventListener('click', () => {
            prevLogic(prevButton, nextButton, article, carouselImage, images)
        })
        nextButton.addEventListener('click', () => {
            nextLogic(prevButton, nextButton, article, carouselImage, images)
        })
    })
}

function overlayButtons(){
    document.querySelectorAll('.click-to-fullscreen').forEach(img => {
        img.addEventListener('click', () => {
            const article = img.closest('article')
            const images = article.querySelectorAll('.carousel img')
            let dAD = demonstracaoArticlesDictionary

            const prevButton = document.createElement('button')
            const nextButton = document.createElement('button')
            prevButton.classList.add('carousel-control', 'prev')
            nextButton.classList.add('carousel-control', 'next')
            prevButton.textContent = '❮'
            nextButton.textContent = '❯'

            const overlay = document.createElement('div')
            const fullscreenInner = document.createElement('div')
            const fullscreenImg = document.createElement('img')
            
            overlay.classList.add('fullscreen-overlay')
            fullscreenInner.classList.add('fullscreen-inner')
            fullscreenImg.src = images[dAD[article.id][1]].src
            fullscreenImg.style.width = '100%'
            
            overlay.appendChild(fullscreenInner)
            fullscreenInner.appendChild(fullscreenImg)
            fullscreenInner.appendChild(prevButton)
            fullscreenInner.appendChild(nextButton)
            
            // Close overlay on click
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) {
                    const carouselPrev = article.querySelector('.carousel-control.prev')
                    const carouselNext = article.querySelector('.carousel-control.next')
                    
                    carouselPrev.style.visibility = (dAD[article.id][1] === dAD[article.id][0]) ? 'hidden' : 'visible'
                    carouselNext.style.visibility = (dAD[article.id][1] === dAD[article.id][2]) ? 'hidden' : 'visible'
                    document.body.removeChild(overlay)
                }
            });
            
            // Navigation logic
            prevButton.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent overlay close
                prevLogic(prevButton, nextButton, article, fullscreenImg, images)
                dAD[article.id][3].src = images[dAD[article.id][1]].src
            });
            
            nextButton.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent overlay close
                nextLogic(prevButton, nextButton, article, fullscreenImg, images)
                dAD[article.id][3].src = images[dAD[article.id][1]].src
            });

            prevButton.style.visibility = (dAD[article.id][1] === dAD[article.id][0]) ? 'hidden' : 'visible'
            nextButton.style.visibility = (dAD[article.id][1] === dAD[article.id][2]) ? 'hidden' : 'visible'
            document.body.appendChild(overlay)
        })
    })
}

function prevLogic(prevButton, nextButton, article, image, images){
    let dAD = demonstracaoArticlesDictionary

    if(dAD[article.id][1] == dAD[article.id][0]) return 

    dAD[article.id][1]--
    nextButton.style.visibility = 'visible'
    image.src = images[dAD[article.id][1]].src

    if(dAD[article.id][1] == dAD[article.id][0]) prevButton.style.visibility = 'hidden'
}

function nextLogic(prevButton, nextButton, article, image, images){
    let dAD = demonstracaoArticlesDictionary

    if(dAD[article.id][1] == dAD[article.id][2]) return 

    dAD[article.id][1]++
    prevButton.style.visibility = 'visible'
    image.src = images[dAD[article.id][1]].src
    
    if(dAD[article.id][1] == dAD[article.id][2]) nextButton.style.visibility = 'hidden'
    
    prevButton.style.visibility = (dAD[article.id][1] === dAD[article.id][0]) ? 'hidden' : 'visible'
    nextButton.style.visibility = (dAD[article.id][1] === dAD[article.id][2]) ? 'hidden' : 'visible'
}

// show content based on selected title/tab selected
function changeContent(){

    let seccao_content = document.querySelector(`.seccao.${title_id}`)
    let content = document.querySelector(`.seccao.${title_id} #${card_id}`)

    seccoes.forEach(seccao => {        
        seccao.style.display = "none"
        articles = seccao.querySelectorAll("article")
        articles.forEach(article => {
            article.style.display = "none"
        })
    })

    switch (title_id) {
        case "visao-geral":
            seccao_content.style.display = "block"
            content.style.display = "inline-block"
            break
            
        case "demonstracao":
            seccao_content.style.display = "block"
            content.style.display = "inline-block"
            break

        case "tecnologias":
            seccao_content.style.display = "block"
            content.style.display = "grid"
    }   

}

changeContent() // show content based on active title (first tab by default)
carouselButtons() // make buttons on carousel work
overlayButtons() // make zoomed image that mimics the carousel