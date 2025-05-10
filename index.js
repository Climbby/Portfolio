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

// zoom image feature
document.querySelectorAll('.click-to-fullscreen').forEach(img => {
  img.addEventListener('click', (e) => {
    const article = img.closest('article'); // Assuming images are inside <article>
    const articleId = article.id;
    const images = article.querySelectorAll('.carousel img');
    const currentIndex = demonstracaoArticlesDictionary[articleId][1];
    
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'fullscreen-overlay';
    
    // Clone the clicked image
    const fullscreenImg = new Image();
    fullscreenImg.src = images[currentIndex].src;
    fullscreenImg.className = 'fullscreen-image';
    fullscreenImg.alt = img.alt;
    
    // Clone carousel controls
    const prevButton = document.createElement('button');
    prevButton.className = 'carousel-control prev';
    prevButton.innerHTML = '❮';
    
    const nextButton = document.createElement('button');
    nextButton.className = 'carousel-control next';
    nextButton.innerHTML = '❯';
    
    // Append elements to overlay
    overlay.appendChild(fullscreenImg);
    overlay.appendChild(prevButton);
    overlay.appendChild(nextButton);
    
    // Close overlay on click (outside buttons)
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        document.body.removeChild(overlay);
      }
    });
    
    // Navigation logic (reuse your carousel code)
    prevButton.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent overlay close
      if (demonstracaoArticlesDictionary[articleId][1] === demonstracaoArticlesDictionary[articleId][0]) return;
      
      demonstracaoArticlesDictionary[articleId][1]--;
      fullscreenImg.src = images[demonstracaoArticlesDictionary[articleId][1]].src;
      
      // Update button visibility (sync with your original carousel)
      nextButton.style.visibility = 'visible';
      if (demonstracaoArticlesDictionary[articleId][1] === demonstracaoArticlesDictionary[articleId][0]) {
        prevButton.style.visibility = 'hidden';
      }
    });
    
    nextButton.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent overlay close
      if (demonstracaoArticlesDictionary[articleId][1] === -demonstracaoArticlesDictionary[articleId][2]) return;
      
      demonstracaoArticlesDictionary[articleId][1]++;
      fullscreenImg.src = images[demonstracaoArticlesDictionary[articleId][1]].src;
      
      // Update button visibility
      prevButton.style.visibility = 'visible';
      if (demonstracaoArticlesDictionary[articleId][1] === -demonstracaoArticlesDictionary[articleId][2]) {
        nextButton.style.visibility = 'hidden';
      }
    });
    
    // Initial button visibility
    prevButton.style.visibility = 
      (demonstracaoArticlesDictionary[articleId][1] === demonstracaoArticlesDictionary[articleId][0]) 
        ? 'hidden' : 'visible';
    
    nextButton.style.visibility = 
      (demonstracaoArticlesDictionary[articleId][1] === -demonstracaoArticlesDictionary[articleId][2]) 
        ? 'hidden' : 'visible';
    
    // Add to DOM
    document.body.appendChild(overlay);
  });
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