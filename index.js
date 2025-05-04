const cardsOutline = document.querySelectorAll('.card-outline')
const seccoes = document.querySelectorAll('#projetos .seccao')
const titlesContainer = document.querySelector('#projetos #titles-container')
const titles = document.querySelectorAll('#projetos #titles-container .title')
const projetos = document.querySelector('.container#projetos')
const githubs = document.querySelectorAll('.container#projetos .seccao #github')
const articleLinks = document.querySelectorAll('.container#projetos .seccao.demonstracao article #link')
let card_id = "portfolio"
let title_id = "visao-geral"

function calculate_size(){
    const projetos__seccao = document.querySelector('#projetos #the-projetos')
    projetos.style.height = `${titlesContainer.offsetHeight + projetos__seccao.offsetHeight + 500}px`
    seccoes.forEach(seccao => {
        seccao.style.height = `${500}px`
    });
    git_pos()
    links_pos()
}

function git_pos(){
    
    githubs.forEach(github => {
        let zeroHeight = 500 - github.offsetHeight
        github.style.top = `${zeroHeight - 50}px`
    })
}
function links_pos(){
    
    articleLinks.forEach(link => {
        let zeroHeight = 500 - link.offsetHeight
        link.style.top = `${zeroHeight - 50}px`
    })
}

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

function change_content(){

    let seccao_content = document.querySelector(`.seccao.${title_id}`)
    let content = document.querySelector(`.seccao.${title_id} #${card_id}`)

    // show content based on selected title
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
            git_pos()
            links_pos()
            break

        case "tecnologias":
            seccao_content.style.display = "block"
            content.style.display = "grid"
    }   

}

calculate_size()
change_content()
window.addEventListener('resize', calculate_size)