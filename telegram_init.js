let tg = window.Telegram.WebApp;
tg.expand(); 

tg.MainButton.text = "Указать адресс"; //изменяем текст кнопки 
tg.MainButton.textColor = "#F55353"; //изменяем цвет текста кнопки
tg.MainButton.color = "#143F6B"; //изменяем цвет бэкграунда кнопки

tg.MainButton.show();
tg.MainButton.enable();

console.log("hello")