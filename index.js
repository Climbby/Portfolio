const cardsOutline = document.querySelectorAll('.card-outline')
const seccoes = document.querySelectorAll('#projetos .seccao')
const titles = document.querySelectorAll('#projetos #titles-container .title')
const demonstracaoArticles = document.querySelectorAll('.container#projetos .seccao.demonstracao article')
const prevBtns = document.querySelectorAll('.carousel-control.prev');
const nextBtns = document.querySelectorAll('.carousel-control.next');
let demonstracaoArticlesDictionary = {}
let card_id = "portfolio"
let title_id = "visao-geral"

// show border based on selected project
cardsOutline.forEach(outline => {
    const card = outline.querySelector('.card')
    card.addEventListener('click', () => {

        card_id = card.id
        change_content()

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
        change_content()

        // set the title markdown
        titles.forEach(titulo => {
            titulo.classList.remove('active')
            
        })
        title.classList.add('active')
        
  })
})

// sets carousel buttons functionality
demonstracaoArticles.forEach(article => {
    let prevButton = article.querySelector('.carousel-control.prev')
    let nextButton = article.querySelector('.carousel-control.next')
    let images = article.querySelectorAll('.carousel img')
    let dAD = demonstracaoArticlesDictionary

    dAD[article.id] = [0, 0, images.length - 1]
    // values are   = [min, current_image, max]

    prevButton.addEventListener('click', () => {
        if(dAD[article.id][1] == dAD[article.id][0]) return 
        dAD[article.id][1]++

        images.forEach(image => {
            image.style.transform = `translateY(${dAD[article.id][1] * 100}%)`
        });

        nextButton.style.visibility = 'visible';
        if(dAD[article.id][1] == dAD[article.id][0]){
            prevButton.style.visibility = 'hidden';
        }
    })
    nextButton.addEventListener('click', () => {
        if(dAD[article.id][1] == -dAD[article.id][2]) return
        dAD[article.id][1]--

        images.forEach(image => {
            image.style.transform = `translateY(${dAD[article.id][1] * 100}%)`
        });

        prevButton.style.visibility = 'visible';
        if(dAD[article.id][1] == -dAD[article.id][2]){
            nextButton.style.visibility = 'hidden';
        }
    })
});

// show content based on selected title/tab selected
function change_content(){

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

change_content() // show content based on active title (first tab by default)