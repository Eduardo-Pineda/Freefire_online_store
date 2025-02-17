// Importar las clase donde se guardan las rutas de acceso hacia la imagen de los items
import {game} from './resources.js';
import {itemsLoader} from './itemsLoader.js';

// Crear las constantes primarias con las cuales vamos a trabajar
const currentGame = new itemsLoader(new game('Eduardo Pineda', 'eduardo030'));
const optionsAside = document.querySelector('.body-container__aside');
const aside = document.querySelector('.body-container__aside--test')
const itemsContainer = document.querySelector('.right .items-container');

const buyBtn = document.getElementById("buyBtn");

currentGame.itemGenerator(itemsContainer, undefined, [["item--normal-size"], []]);

aside.addEventListener('click', e =>{
    e.preventDefault();
    
    if(e.target.classList.contains('left__btn')){
        document.querySelector(".aside__right").classList.toggle("aside__right--hide");
    }
    if(e.target.tagName == "A"){
        Array.from(document.querySelector(".aside__right").children).map(x =>{
            if(x.classList.contains("right__text--selected")){
                x.classList.remove("right__text--selected");
            }
        })

        e.target.classList.add("right__text--selected");
    }

    currentGame.togglingCharacters(e.target.id, itemsContainer);
})

// optionsAside.addEventListener('click', e =>{
//     currentGame.togglingCharacters(e.target.id, itemsContainer);
// })
    
itemsContainer.addEventListener('click', e =>{
    currentGame.selectingItems(e.target, ()=>{
        const sound = new Audio('assets/media/sounds/item_sound.mp3');
        sound.play()
        
        
    });
});

buyBtn.addEventListener('click', () =>{
    currentGame.createPopUp()

});



