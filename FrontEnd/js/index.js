
const filtresSelectionner = new Set([0]);
let works = []
let categories = []

function createFigure(urlImage, textFigCaption, textAlt = '', className = '') {

    const figure = document.createElement("figure");
    figure.className = className
    const img = document.createElement("img");
    img.src = urlImage
    img.alt = textAlt


    const figcaption = document.createElement("figcaption");
    figcaption.innerText = textFigCaption;

    figure.append(img);
    figure.append(figcaption);
    console.log(figure);
    return figure
    
}



async function getCategories() {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    try {
        const response = await fetch("http://localhost:5678/api/categories", requestOptions)
        const res = await response.json()
        return res
    } catch (error) {
        console.error('error getCategories', error)
    }


}


async function getWorks() {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };


    try {
        const response = await fetch("http://localhost:5678/api/works", requestOptions)
        const res = await response.json()
        return res
    } catch (error) {
        console.error('error getWorks', error)
    }


}


function createFilter(title, id) {

    const boxfilters = document.querySelector(".box-filters")
    const filter = document.createElement("button")
    filter.className = 'filter'

    filter.innerText = title

    filter.onclick = (event) => {
        if (id === 0 || filtresSelectionner.has(0)) {
            filtresSelectionner.clear()
        }

        if (!filtresSelectionner.has(id)) {
            filtresSelectionner.add(id)
        } else {
            filtresSelectionner.delete(id)
        }

        modifierFiltersClassName()

        console.log(filtresSelectionner);
        afficherFigures()
    }

    boxfilters.append(filter)
    
}

function modifierFiltersClassName() {
    const filters = document.querySelectorAll('.box-filters .filter')
    let i = 0
    for (const filter of filters) {
        if (filtresSelectionner.has(i)) {
            filter.classList.add("selected")
        } else {
            filter.classList.remove("selected")
        }
        i++
    }
}

function createGestionPhoto(work) {
    

    const imageModal = document.createElement('div')
    imageModal.className = 'image-modal'

    const image = document.createElement('img')
    image.src = work.imageUrl
    image.className = "image-modal1"

    imageModal.append(image)

    const icon1 = document.createElement('i')
    icon1.className = "fa-solid fa-trash-can icon-modal"
    imageModal.append(icon1)


    const icon2 = document.createElement('i')
    icon2.className = "fa-solid fa-arrows-up-down-left-right icon-modal1"
    imageModal.append(icon2)

    return imageModal

}

function afficherGestionGallery() {
    // 1. recupère la div gestion gallery
    // 2. boucle sur les traveaux
    // 3. ajoute les photos
    const gallery = document.querySelector(".gestionGallery");
    gallery.innerHTML = null


    for (const work of works) {
        const photo = createGestionPhoto(work);
        gallery.append(photo);
    }


}

function afficherFigures() {
    const gallery = document.querySelector(".gallery");
    gallery.innerHTML = null


  let filterWorks = works.filter((work, index) => {

        // si tous est coché
        if (filtresSelectionner.has(0))

            return true
        // si la categoryId de mon work est dans filtresSelectionner alors je retourne true
        if (filtresSelectionner.has(work.categoryId))

           return true


    })

    for (const work of filterWorks) {
        const figure = createFigure(work.imageUrl, work.title, work.title);
        gallery.append(figure);
    }

}





async function init() {
    works = await getWorks();
    categories = await getCategories();
    console.log(works, categories);
    afficherFigures()



    createFilter('Tous', 0)
    


    for (const category of categories) {
        createFilter(category.name, category.id)
    }
   modifierFiltersClassName()

    afficherGestionGallery()
}

init()

//-------------------------------------------------------------------------

let modal = null
console.log(modal);

const openModal = function (e) {
    // console.log('openModal', works);
    e.preventDefault()
    const id = e.target.getAttribute('href')
    const target = document.querySelector(id)

    target.style.display = null
    target.removeAttribute('aria-hidden')
    target.setAttribute('aria-modal', 'true')
    modal = target
    modal.addEventListener('click', closeModal)
    modal.querySelector('.js-modal-close').addEventlistener('click', closeModal)
    modal.querySelector('.js-modal-stop').addEventlistener('click', stopPropagation)

}

const closeModal = function (e) {
    if (modal === null) return
    e.preventDefault()
    modal.style.display = "none"
    modal.setAttribute('aria-hidden', 'true')
    modal.removeAttribute('aria-modal')
    modal.removeEventListener('click', closeModal)
    modal.querySelector('.js-modal-close').removelistener('click', closeModal)
    let z = modal.querySelector('.js-modal-stop').removelistener('click', stopPropagation)
    modal = null
    console.log(z);
}

const stopPropagation = function (e) {
    e.stopPropagation()
}

document.querySelectorAll('.js-modal').forEach(a => {
    a.addEventListener(`click`, openModal)
});






