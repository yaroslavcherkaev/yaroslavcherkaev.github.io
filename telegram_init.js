let tg = window.Telegram.WebApp;
tg.expand(); 

tg.MainButton.text = "Указать адресс"; //изменяем текст кнопки 
tg.MainButton.textColor = button_text_color; //изменяем цвет текста кнопки
tg.MainButton.color = button_color; //изменяем цвет бэкграунда кнопки

tg.MainButton.show();
tg.MainButton.enable();

console.log("hello")