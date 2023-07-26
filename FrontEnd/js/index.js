
const filtersSelected = new Set([0]);
let works = []

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
        if (id === 0 || filtersSelected.has(0)) {
            filtersSelected.clear()
        }

        if (!filtersSelected.has(id)) {
            filtersSelected.add(id)
        } else {
            filtersSelected.delete(id)
        }

        modifierFiltersClassName()

        console.log(filtersSelected);
        afficherFigures()
    }

    boxfilters.append(filter)
}

function modifierFiltersClassName() {
    const filters = document.querySelectorAll('.box-filters .filter')
    let i = 0
    for (const filter of filters) {
        if (filtersSelected.has(i)) {
            filter.classList.add("selected")
        } else {
            filter.classList.remove("selected")
        }
        i++
    }
}


function afficherFigures() {
    const gallery = document.querySelector(".gallery");
    gallery.innerHTML = null


    let filterWorks = works.filter((work, index) => {
        
        // si tous est coché
        if(filtersSelected.has(0)) 
        
        return true
        // si la categoryId de mon work est dans filtersSelected alors je retourne true
        if(filtersSelected.has(work.categoryId)) 
        
        return true

        
    })
    


    for (const work of filterWorks) {
        const figure = createFigure(work.imageUrl, work.title, work.title);
        gallery.append(figure);
    }

}





async function init() {
    works = await getWorks();
    const categories = await getCategories();
    console.log(works, categories);
    afficherFigures()
    

    createFilter('Tous', 0)
    

    for (const category of categories) {
        createFilter(category.name, category.id)
    }
    modifierFiltersClassName()
}

init()

