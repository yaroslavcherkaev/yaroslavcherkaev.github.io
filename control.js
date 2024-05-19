initMap();

async function initMap() {

    ymaps3.ready.then(() => {
        // Copy your api key for routes from the developer's dashboard and paste it here
        ymaps3.getDefaultConfig().setApikeys({router: '97fb642a-8ecb-4410-8278-f2660f9d6fef'});
    });

    const {YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapFeature} = ymaps3;
    const {YMapDefaultMarker} = await ymaps3.import('@yandex/ymaps3-markers@0.0.1');
    const tg = window.Telegram.WebApp;

        // The function for fetching a route between two points
    async function fetchRoute(startCoordinates, endCoordinates, type) {
            let truck;
            if (type === 'truck') {
            // set truck with trailer by default
            truck = {
                weight: 40,
                maxWeight: 40,
                axleWeight: 10,
                payload: 20,
                height: 4,
                width: 2.5,
                length: 16,
                ecoClass: 4,
                hasTrailer: true
            };
            }
            // Request a route from the Router API with the specified parameters.
            const routes = await ymaps3.route({
            points: [startCoordinates, endCoordinates], // Start and end points of the route LngLat[]
            type, // Type of the route
            bounds: true, // Flag indicating whether to include route boundaries in the response
            truck
            });
        
            // Check if a route was found
            if (!routes[0]) return;
        
            // Convert the received route to a RouteFeature object.
            const route = routes[0].toRoute();
        
            // Check if a route has coordinates
            if (route.geometry.coordinates.length == 0) return;
        
            return route;
    }

    

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
                zoom: 15
            }
        },
        [
            // Add a map scheme layer
            new YMapDefaultSchemeLayer({}),
            // Add a layer of geo objects to display markers and line
            new YMapDefaultFeaturesLayer({})
          ]
    );

    // Завод
    const pointA = new YMapDefaultMarker({
                coordinates: [37.634240, 54.211076],
                draggable: false,
                title: 'Завод'
              });
    var pointB = null;
    map.addChild(new YMapDefaultSchemeLayer());
    // Добавляем точку завода
    map.addChild(pointA);

    document.getElementById('button_search').onclick = myFunction;
    
    
    function myFunction() {
        var adress_to_search =  document.getElementById('input_search').value;
        try{
            ymaps3.search({
                'text': adress_to_search
            }).then(function (res) {

                if (pointB != null){
                    map.removeChild(pointB);
                    pointB = new YMapDefaultMarker({
                        coordinates: res[0].geometry.coordinates,
                        draggable: false,
                        title: 'Разгрузка'
                      });
    
                    map.addChild(pointB);
                    map.update(            {location: {
                        // Координаты центра карты
                        center: res[0].geometry.coordinates,
                        zoom: 15
                    }})
                }
                else{
                    pointB = new YMapDefaultMarker({
                        coordinates: res[0].geometry.coordinates,
                        draggable: false,
                        title: 'Разгрузка'
                      });
                    map.addChild(pointB);
                    map.update(            {location: {
                        // Координаты центра карты
                        center: res[0].geometry.coordinates,
                        zoom: 15
                    }})
                }

                // Create and add a route line to the map
                //const routeLine = new YMapFeature({geometry: {type: 'LineString', coordinates: []}, style: lineStyle});
                //map.addChild(routeLine);
                //fetchRoute(pointA.coordinates, pointB.coordinates, "driving").then(routeHandler);
            });
        }
        catch(e)
        {
            pointB = null;
            console.log(e);
        }
      }
    /* A handler function that updates the route line 
        and shifts the map to the new route boundaries, if they are available. */
        function routeHandler(newRoute) {
            // If the route is not found, then we alert a message and clear the route line
            if (!newRoute) {
            alert('Route not found');
            routeLine.update({geometry: {type: 'LineString', coordinates: []}});
            return;
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


