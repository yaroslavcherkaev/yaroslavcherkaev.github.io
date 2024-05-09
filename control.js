var tg = window.Telegram.WebApp;
tg.expand(); 
tg.MainButton.text = "Указать адресс";
tg.MainButton.show();
tg.MainButton.enable();

initMap();

async function initMap() {
    // Промис `ymaps3.ready` будет зарезолвлен, когда загрузятся все компоненты основного модуля API
    await ymaps3.ready;

    const {YMap, YMapDefaultSchemeLayer} = ymaps3;

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
    
    
    Telegram.WebApp.onEvent('mainButtonClicked', function(){
        let textInput = document.getElementById("search");
        let res = ymaps3.search({
            'text': textInput.value
        }).then(function (res) {
            console.log(res[0])
        })
        tg.sendData(res); 
        //при клике на основную кнопку отправляем данные в строковом виде
    });


    // Добавляем слой для отображения схематической карты
    map.addChild(new YMapDefaultSchemeLayer());
}


