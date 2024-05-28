initMap();

async function initMap() {
    // Waiting for all api elements to be loaded
    await ymaps3.ready;

    const {YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapControls, YMapListener} = ymaps3;

    // Load the control package and extract the zoom control from it
    const {YMapZoomControl} = await ymaps3.import('@yandex/ymaps3-controls@0.0.1');


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
                zoom: 20,
            }
        },
        [
            // Add a map scheme layer
            new YMapDefaultSchemeLayer({}),
            // Add a layer of geo objects to display markers and line
            new YMapDefaultFeaturesLayer({})
          ]
    );

              // Function that creates a handler function to change the status of behavior event
    const createBehaviorEventHandler = (isStart) => {
        return function (object) {

                if (object.type === 'dblClick') return;


                if(object.type === 'scrollZoom'){
                    if (isStart){
                        console.log('startzoom');
                        return;
                    }
                    else{
                        console.log('endzoom');
                        return;
                    }
                }

                if(object.type === 'drag'){
                    if (isStart) {
                    } else {
                        try{
                            ymaps3.search({ 
                                'text': map.center.toString()
                            }).then(function (res){
    
    
    
                                if (res.length > 0){
    
                                    let diff  = Math.sqrt(Math.pow(res[0].geometry.coordinates[0] - map.center[0], 2) +  Math.pow(res[1].geometry.coordinates[1] - map.center[1], 2));
                                    console.log('diff', diff)
                                    if (diff <= 0.01){
                                        map.update({location: {
                                            center: res[0].geometry.coordinates,
                                        }});
                                        document.getElementById('input_search').value = res[0].properties.name;
                                    }
                                    else{
                                        return;
                                    }
                                }else{
                                    return;
                                }
                            })
                            return;
                        }
                        catch(e){
                            console.log(e);
                            return;
                        }
    
                    }
                    
                };

                }
                
        };

        const zooming = () => {
            return function (object) {
                    console.log("Zoom");

                    
                };
            };


        map.addChild(
            new YMapListener({
                scrollZoom: zooming(),
                onActionEnd: createBehaviorEventHandler(false),
                onActionStart: createBehaviorEventHandler(true)
            })
        );



        // Using YMapControls you can change the position of the control.
        map.addChild(
          // Here we place the control on the right
          new YMapControls({position: 'right'})
            // Add the first zoom control to the map
            .addChild(new YMapZoomControl({}))
        );

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
                    zoom: 50
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
            try{
                let answer = [map.center.toString(), document.getElementById('input_search').value];
                tg.sendData(answer); 
            }
            catch(e){
                tg.sendData("Не удалось получить адресс"); 
            }
        }
    );

}


