const cardsOutline = document.querySelectorAll('.card-outline')
const seccoes = document.querySelectorAll('#projetos .seccao')
const titlesContainer = document.querySelector('#projetos #titles-container')
const titles = document.querySelectorAll('#projetos #titles-container .title')
const projetos = document.querySelector('.container#projetos')
const githubs = document.querySelectorAll('.container#projetos .seccao #github')
const articleLinks = document.querySelectorAll('.container#projetos .seccao.demonstracao article #link')
let card_id = "portfolio"
let title_id = "projetos"
let maxHeight = 0

function calculate_size(){
    const projetos__seccao = document.querySelector('#projetos .seccao.projetos')
    projetos__seccao.style.visibility = 'hidden'
    projetos__seccao.style.display = 'grid'
    maxHeight = projetos__seccao.offsetHeight
    projetos__seccao.style.visibility = 'visible'
    if (title_id !== "projetos") projetos__seccao.style.display = 'none'
    projetos.style.paddingBottom = `${maxHeight}px`
    git_pos()
    links_pos()
}

function git_pos(){
    
    githubs.forEach(github => {
        let zeroHeight = maxHeight - github.offsetHeight
        github.style.top = `${zeroHeight - 50}px`
    })
}
function links_pos(){
    
    articleLinks.forEach(link => {
        let zeroHeight = maxHeight - link.offsetHeight
        link.style.top = `${zeroHeight - 50}px`
    })
}

// show border based on selected project
cardsOutline.forEach(outline => {
    const card = outline.querySelector('.card')
    card.addEventListener('click', () => {

        card_id = card.id
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
        let portfolio_content = document.querySelector(`.seccao.${title_id}`)
        let content = document.querySelector(`.seccao.${title_id} #${card_id}`)

        // show content based on selected title
        seccoes.forEach(seccao => {

            if (seccao.classList.contains("projetos")){
                if (title_id === "projetos") return
                seccao.style.display = "none"
                return
            }

            articles = seccao.querySelectorAll("article")
            articles.forEach(article => {
                article.style.display = "none"
            })
        })

        switch (title_id) {
            case "projetos":  
                portfolio_content.style.display = "grid"
                break
                
            case "visao-geral":
                content.style.display = "inline-block"
                break
                
            case "demonstracao":
                content.style.display = "inline-block"
                git_pos()
                links_pos()
                break

            case "tecnologias":
                content.style.display = "grid"
        }   

        // set the title markdown
        titles.forEach(titulo => {
            titulo.classList.remove('active')
            
        })
        title.classList.add('active')
        
  })
})

calculate_size()
window.addEventListener('resize', calculate_size)