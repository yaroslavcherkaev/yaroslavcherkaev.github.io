initMap();

async function initMap() {
    // Промис `ymaps3.ready` будет зарезолвлен, когда загрузятся все компоненты основного модуля API
    await ymaps3.ready;

    const {YMap, YMapDefaultSchemeLayer} = ymaps3;
    const tg = window.Telegram.WebApp;

    

    // Иницилиазируем карту
    const map = new YMap(
        // Передаём ссылку на HTMLElement контейнера
        document.getElementById('map'),

        // Передаём параметры инициализации карты
        {
            location: {
                // Координаты центра карты
                center: [37.588144, 55.733842],

                // Уровень масштабирования
                zoom: 30
            }
        }
    );
    // Добавляем слой для отображения схематической карты
    map.addChild(new YMapDefaultSchemeLayer());
    tg.expand(); 
    tg.MainButton.text = "Найти адресс";
    tg.MainButton.show();
    tg.MainButton.enable();

    Telegram.WebApp.onEvent('mainButtonClicked', function(){
        tg.sendData("some string that we need to send"); 
        //при клике на основную кнопку отправляем данные в строковом виде
    });

}


