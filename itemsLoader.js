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
        switch (gender) {
            case 'veteranPassBtn':
                setItem(this.object.characters().veteranPass, itemsContainer, false, this.itemGenerator);
                setImageURL(this.object.characters().veteranPass, false);
                break;
                
            case 'evolutionaryBtn':
                setItem(this.object.weapon(), itemsContainer, true, this.itemGenerator);
                setImageURL(this.object.weapon(), true);
                break;

            case 'criminalsBtn':
                setItem(this.object.characters().criminals, itemsContainer, false, this.itemGenerator);
                setImageURL(this.object.characters().criminals, false);
                break;

            case 'collabNarutoBtn':
                setItem(this.object.characters().collaboration, itemsContainer, false, this.itemGenerator);
                setImageURL(this.object.characters().collaboration, false);
                break;

            case 'skinBtn':
                setItem(this.object.characters().skins, itemsContainer, false, this.itemGenerator);
                setImageURL(this.object.characters().skins, false);
                break;
            
            case 'skinBtn2':
                setItem(this.object.characters().skin_2, itemsContainer, false, this.itemGenerator);
                setImageURL(this.object.characters().skin_2, false);
                break;

            case 'skinBtn3':
                setItem(this.object.characters().skin_3, itemsContainer, false, this.itemGenerator);
                setImageURL(this.object.characters().skin_3, false);
                break;
    
            case 'fistBtn':
                setItem(this.object.characters().fist, itemsContainer, false, this.itemGenerator);
                setImageURL(this.object.characters().fist, false);
                break;

            default:
                console.warn(`Género o tipo "${gender}" no reconocido.`);
                console.log(gender)
                return;
        }

        Array.from(document.querySelector(".items-container").children).map(item => item.classList.remove('item--selected'));

        Array.from(itemsContainer.children).map(item => this.selectedItem.map(url =>{
            if(item.src == url){
                item.classList.add('item--selected');
            }
            
        }))

        function setItem(characters, container, isWeapon, cb){
            const currentItems = Array.from(container.children);

            // Validar si es un item de tipo arma
            if(isWeapon == true){
                container.classList.add('items-container--bigger-fixed');
            }
            else{
                container.classList.remove('items-container--bigger-fixed');
            }

            if (currentItems.length !== characters.length){
                const difference = characters.length - currentItems.length;
                
                if (difference < 0) {
                    for (let i = 0; i < Math.abs(difference); i++) {
                        container.removeChild(container.lastElementChild);
                    }
                }
                else if(isWeapon){
                    container.classList.add("items-container--bigger-fixed");
                    cb(container, difference, [["item--big-size"], ["item__video"]]);
                }
                else {
                    itemsContainer.classList.remove("items-container--bigger-fixed");
                    cb(itemsContainer, difference, [["item--normal-size"], ["item__video"]]);
                }
                
            }
        }

        function setImageURL(character, isWeapon){
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
        
    selectingItems(item, playSound){
        // Condicion para determinar si algun item esta seleccionado, para que en caso contrario, este sea seleccionado
        if(item.tagName === 'IMG'){
            if(!item.classList.contains('item--selected')){
                item.classList.add('item--selected');
                this.selectedItem.push(item.src);
            }
            else{
                item.classList.remove('item--selected');
                this.selectedItem.pop(item.src);
            }
            playSound()
        }
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
            closeButton.textContent = 'OK';
            
            // Añadir el boton fuera del contenedor de contenidos
            popup.appendChild(closeButton);
            
            //Funcion para cerrar el Pop-Up
            
            skipAndClose(null, null, null, selectedItems);
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
                        selectedItem.length = 0;
                        Array.from(document.querySelector(".items-container").children).map(item => item.classList.remove('item--selected'));
                    }  
                }
            })
        }
    }
    
}