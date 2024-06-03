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

    
    function sendDataToTgBot(){
        try{
            let data_to_send = {
                adress: document.getElementById("adress").value,
                approach: document.getElementById("approach").value,
                code: document.getElementById("code").value,
                floor: document.getElementById("floor").value,
                appartament: document.getElementById("appartament").value,
                comment: document.getElementById("comment").value
            }
            return data_to_send;
        }
        catch(e){
            return null;
        }

    }

    const tg = window.Telegram.WebApp;
    tg.expand(); 
    tg.MainButton.text = "Указать адресс";
    tg.MainButton.show();
    tg.MainButton.enable();
    
    Telegram.WebApp.onEvent('mainButtonClicked', function(){
            try{
                let answer = sendDataToTgBot();
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

    document.getElementById("adress").value = "";
    document.getElementById("approach").value = "";
    document.getElementById("code").value = "";
    document.getElementById("floor").value = "";
    document.getElementById("appartament").value = "";
    document.getElementById("comment").value = "";



    function debounce(callee, timeoutMs) {
        return function perform(...args) {
          let previousCall = this.lastCall
      
          this.lastCall = Date.now()
      
          if (previousCall && this.lastCall - previousCall <= timeoutMs) {
            clearTimeout(this.lastCallTimer)
          }
      
          this.lastCallTimer = setTimeout(() => callee(...args), timeoutMs)
        }
      }


      function lookingForAdress() {
        if(input.value === ""){
            return;
        }

        try{
            ymaps3.search({
                'text': input.value
            }).then(function(res){
                try{
                    map.update(
                        {location: 
                            {
                                center: res[0].geometry.coordinates,
                                zoom: 17
                            }
                        }
                    )
                }
                catch(e){
                    return;
                }

            })
        }
        catch(e){
            console.log(e);
        }
     }


     var input = document.getElementById("adress");
     const debouncedlookingForAdress = debounce(lookingForAdress, 500);

     input.oninput = debouncedlookingForAdress;


     

}


