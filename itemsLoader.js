export class itemsLoader {
    constructor(object){
        this.object = object;
        this.selectedItem = [];
    }

    itemGenerator(itemsContainer, amountOfCharacters, classesToAdd){

        if(itemsContainer){
            // Crear objeto fragment para guardar los items que sean creados
            const fragment = new DocumentFragment();

            // Condicion para determinar si el contenedor esta vacio o no
            const isContainerEmpty = (itemsContainer.children.length == 0) ? true : false;

            // Condicion para determinar la cantidad de items disponibles en almacenamiento
            const amountOfItems = (amountOfCharacters == undefined) ? this.object.characters().veteranPass.length : amountOfCharacters;

            // Bucle para crear las imagenes que se insertaran en el contendor de items
            for(let i = 0; i < amountOfItems; i++){
                const image = document.createElement("img");

                image.classList.add(...classesToAdd[0]);

                if(isContainerEmpty == true){
                    image.src = this.object.characters().veteranPass[i];
                }
                else{
                    image.src = "";
                }

                fragment.appendChild(image);
            }

            //Añade los items creados al contenedor de items
            itemsContainer.appendChild(fragment);
        }
        else{
            alert("ERROR: EL CONTENEDOR DE ITEMS NO EXISTE")
        }
    }

    togglingCharacters(gender, itemsContainer) {
        const items = Array.from(itemsContainer.children);
        let characters = [];

        switch (gender) {
            case 'veteranPassBtn':

                characters = this.object.characters().veteranPass;
                itemsContainer.classList.remove('items-container--bigger-fixed');
                adjustingImage(false, characters, this.itemGenerator);
                setImage(false, characters);
                break;
                
            case 'evolutionaryBtn':
                characters = this.object.weapon();
                itemsContainer.classList.add('items-container--bigger-fixed');
                adjustingImage(true, characters, this.itemGenerator);
                setImage(true, characters);
                break;



            case 'criminalsBtn':
                characters = this.object.characters().criminals;
                itemsContainer.classList.remove('items-container--bigger-fixed');
                adjustingImage(false, characters, this.itemGenerator);
                setImage(false, characters);
                break;

            case 'collabNarutoBtn':
                characters = this.object.characters().collaboration;
                itemsContainer.classList.remove('items-container--bigger-fixed');
                adjustingImage(false, characters, this.itemGenerator);
                setImage(false, characters);
                break;

            case 'skinBtn':
                characters = this.object.characters().skins;
                itemsContainer.classList.remove('items-container--bigger-fixed');
                adjustingImage(false, characters, this.itemGenerator);
                setImage(false, characters);
                break;
    
            case 'fistBtn':
                characters = this.object.characters().fist;
                itemsContainer.classList.remove('items-container--bigger-fixed');
                adjustingImage(false, characters, this.itemGenerator);
                setImage(false, characters);
                break;

            default:
                console.warn(`Género o tipo "${gender}" no reconocido.`);
                return;
        }


        function adjustingImage(isWeapon, character, cb){
            if (items.length !== character.length) {
                const difference = character.length - items.length;
        
                if (difference < 0) {
                    for (let i = 0; i < Math.abs(difference); i++) {
                        itemsContainer.removeChild(itemsContainer.lastElementChild);
                    }
                }
                else if(isWeapon){
                    console.log(difference);
                    itemsContainer.classList.add("items-container--bigger-fixed");
                    cb(
                        itemsContainer,
                        difference,
                        [["item--big-size"], ["item__video"]]
                    );
                }
                else {
                    itemsContainer.classList.remove("items-container--bigger-fixed");
                    cb(
                        itemsContainer,
                        difference,
                        [["item--normal-size"], ["item__video"]]
                    );
                }
            }
        }
    
        //------------------------ Funcion para ajustar y agragar al contenedor los items que puedan hacer falta----------------------------
        function setImage(isWeapon, character){
            Array.from(itemsContainer.children).forEach((item, index) => {
                if (item.tagName === 'IMG') {
                    if(isWeapon){
                        item.classList.remove("item--normal-size");
                        item.classList.add("item--big-size");
                    }
    
                    else{
                        item.classList.remove("item--big-size");
                        item.classList.add("item--normal-size");
                    }
    
                    item.src = character[index];
    
                } else {
                    console.warn(`Elemento en la posición ${index} no es una imagen.`);
                }
            });
        }
    }

    selectingItems(element, cb){

        // Condicion para determinar si algun item esta seleccionado, para que en caso contrario, este sea seleccionado
        if(element.classList.contains('item--selected')){
            element.classList.remove('item--selected');
            this.selectedItem.pop(element.src);
        }
        else{
            element.classList.add('item--selected');
            this.selectedItem.push(element.src);
        }

        cb()
    }

    createPopUp(){
        //Crear el contendedor principal del popup
        const popupContainer = document.createElement('section');
        popupContainer.classList.add('popup-container', 'popup-container--show');
        popupContainer.id = 'popupContainer';

        // Crear el popup
        const popup = document.createElement('div');
        popup.classList.add('popup');

        //Crear el contenedor de contenidos
        const content = document.createElement('div');
        content.id = 'content'
        content.classList.add('content', 'content--manual-height');

        //Insertar el popup en el DOM
        popup.append(content);
        popupContainer.append(popup);
        document.querySelector('main').append(popupContainer);

        // Invocar la funcion que generara los resultados
        generateResults(content, popup, this.selectedItem, results);

        // ------------Funcion que genera la primera seccion de resultados---------------------
        function generateResults(content, popup, selectedItem, callback){

            // Crear el video-gift
            const videoGift = document.createElement('video');
            videoGift.src = 'assets/webpage/gift_vido.MOV';
            content.appendChild(videoGift);

            // Reproducir el video-gift
            videoGift.play();

            // Evento para evitar que el video concluya completamente
            videoGift.addEventListener('timeupdate', ()=> {
                if(videoGift.currentTime >= 3.00){
                    videoGift.currentTime = 2.45;
                    videoGift.play();
                }

                // Condicion que activa el box-shadow
                // if(videoGift.currentTime >= 0.060){
                //     videoGift.classList.add('video--box-shadow');
                // }

            });

            // Metodo que ejecuta la funcion result luego de 10 segundos
            setTimeout(()=> {
                if(content.children.length == 1){
                    callback(content, popup, videoGift, selectedItem);
                }
            }, 10000);

            // funcion que ejecuta la funcion result en caso de dar click en cualquier parte de la pantalla
            skipAndClose(popup, content, videoGift, selectedItem, results);
        }

        // ------------Funcion que genera la segunda seccion de resultados---------------------
        function results(content, popup, videoGift, selectedItems){
            // Remover el elemento video
            if(videoGift){
                content.removeChild(videoGift);
            }

            // Reemplaza las clases para la nueva ventana
            content.classList.replace('content--manual-height', 'content--auto-height');

            // Insertar el logo para la nueva ventana
            const logo = document.createElement('div');
            logo.classList.add('logo');
            content.appendChild(logo);
            
            // Insertar el título para la nueva ventana
            const title = document.createElement('h1');
            title.textContent = '¡Pedido realizado con éxito!';
            content.appendChild(title);
            
            // Insertar los parrafos para la nueva ventana
            const paragraphs = [
                                { text: `ID: ${document.querySelector('input').value}`},
                                { text: `Cantidad de Items Veteranos: ${selectedItems.length} Items`},
                                { text: `Fecha de envío: ${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}` },
                                { text: 'Tu envío llegará a tu cuenta en: 23 horas' }
                            ];

            //Añadir texto al contenedor de contenidos
            paragraphs.forEach(p => {
                const paragraph = document.createElement('p');
                
                paragraph.textContent = p.text;
                content.appendChild(paragraph);
            });
            
            // Contenedor de artículos comprados
            const boughtItems = document.createElement('div');
            boughtItems.classList.add('bought-items');
            
            // Titulo del contenedor
            const boughtItemsTitle = document.createElement('p');
            boughtItemsTitle.textContent = 'Artículos enviados';
            boughtItems.appendChild(boughtItemsTitle);
            
            // Añadir dinámicamente las imágenes proporcionadas
            selectedItems.forEach((imagePath) => {
                const imgElement = document.createElement('img');
                imgElement.src = imagePath;
                imgElement.alt = 'Artículo';
                imgElement.classList.add('item');
                boughtItems.appendChild(imgElement);
            });
            
            //Añadir los items comprados al contenedor de contenidos
            content.appendChild(boughtItems);
            
            // Botón de cierre
            const closeButton = document.createElement('button');
            closeButton.classList.add('close');
            closeButton.id = 'closeBtn';
            closeButton.textContent = 'Ok';
            
            // Añadir el boton fuera del contenedor de contenidos
            popup.appendChild(closeButton);
            
            //Funcion para cerrar el Pop-Up
            skipAndClose();
        }
        
        // ------------Funcion que permite cerrar y omitir partes del Pou-Up---------------------
        function skipAndClose(popup, content, video, selectedItem, callback){
            popupContainer.addEventListener('click', e =>{
                //Condicion que ejecuta la funcion results
                if(video){
                    if(e.target.id == 'popupContainer' || e.target.id == 'content'){
                        callback(content, popup, video, selectedItem);
                    }  
                }

                //Condicion que eliminar el Pop-Pup
                if(!video){
                    if(e.target.id == 'popupContainer' || e.target.id == 'closeBtn'){
                        document.querySelector('main').removeChild(popupContainer);
                        console.log(this.selectedItem);
                    }  
                }
            })
        }
    }
}