



async function ValidateBot(){
    let params = new URLSearchParams(document.location.search);
    let value = params.get('key'); 
    // isValid = await fetch(key)
    if (isValid){
        return true;
    }
    else{
        return false;
    }
}




initMap();

async function initMap() {

    
    const tg = window.Telegram.WebApp;
    tg.expand(); 
    tg.MainButton.text = "Указать адресс";
    tg.MainButton.show();
    tg.MainButton.enable();
    
    Telegram.WebApp.onEvent('mainButtonClicked', function(){
            try{
                let answer = [map.center.toString(), document.getElementById('input_search').value];
                tg.sendData(answer.toString()); 
            }
            catch(e){
                tg.sendData("Не удалось получить адресс"); 
            }
        }
    );


    // Промис `ymaps3.ready` будет зарезолвлен, когда загрузятся все компоненты основного модуля API
    await ymaps3.ready;
    const {YMap, YMapDefaultSchemeLayer} = ymaps3;
    const map = new YMap(
        // Передаём ссылку на HTMLElement контейнера
        document.querySelector('.map-container .map'),
    
        // Передаём параметры инициализации карты
        {
            location: {
                // Координаты центра карты
                center: [37.588144, 55.733842],
    
                // Уровень масштабирования
                zoom: 15
            }
        }
    );
     map.addChild(new YMapDefaultSchemeLayer());

}


