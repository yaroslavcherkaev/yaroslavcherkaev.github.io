initMap();

async function initMap() {
    // Waiting for all api elements to be loaded
    await ymaps3.ready;

    const {YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapFeature, YMapListener} = ymaps3;
    const {YMapDefaultMarker} = await ymaps3.import('@yandex/ymaps3-markers@0.0.1');
    const tg = window.Telegram.WebApp;

    // Иницилиазируем карту
    const map = new YMap(
        // Передаём ссылку на HTMLElement контейнера
        document.getElementById('map'),

        // Передаём параметры инициализации карты
        {
            location: {
                // Координаты центра карты
                center: [37.634240, 54.211076],

                // Уровень масштабирования
                zoom: 20
            }
        },
        [
            // Add a map scheme layer
            new YMapDefaultSchemeLayer({}),
            // Add a layer of geo objects to display markers and line
            new YMapDefaultFeaturesLayer({})
          ]
    );

    const mouseMoveCallback = () => {
        console.log(map.center);
    };

    // Создание объекта-слушателя.
    const mapListener = new YMapListener({
        layer: 'any',
        onTouchCancel: mouseMoveCallback
    });
  
  // Добавление слушателя на карту.
    map.addChild(mapListener);

    var pointB = null;

    document.getElementById("input_search").oninput = myFunction;
    
    
    function myFunction() {
        var adress_to_search =  document.getElementById('input_search').value;

        try{
            ymaps3.search({
                'text': adress_to_search
            }).then(function (res){

            });
        }
        catch{

        }


        try{
            ymaps3.search({
                'text': adress_to_search
            }).then(function (res) {
                map.update(            {location: {
                    // Координаты центра карты
                    center: res[0].geometry.coordinates,
                    zoom: 15
                }})
            });
        }
        catch(e)
        {
            console.log(e);
        }
      }

    


    tg.expand(); 
    tg.MainButton.text = "Указать адресс";
    tg.MainButton.show();
    tg.MainButton.enable();
    Telegram.WebApp.onEvent('mainButtonClicked', function(){
        if (pointB != null){

            try{
                //alert(pointB.coordinates);
                tg.sendData(pointB.coordinates.toString()); 
            }
            catch(e){
                alert(e);
            }

        }
        else{
            tg.sendData("не удалось получить координаты"); 
        }
    });

}


