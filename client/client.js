RegisterNetEvent("dnotif:client:sendNotification")
AddEventHandler("dnotif:client:sendNotification", (title, subTitle, content, image, time, blink, color) => {
    SendNUIMessage({
        title,
        subTitle,
        content,
        image,
        time,
        blink,
        color: Config['colors'][color],
    });
});

if (Config.Debug) {
    RegisterCommand(Config.DebugCommand , () => {
        SendNUIMessage({
            advanced: true,
            title : 'title ' + (Math.random() + 1).toString(36).substring(7),
            subTitle : 'subTitle ' + + (Math.random() + 1).toString(36).substring(7),
            content : 'content ' + (Math.random() + 1).toString(36).substring(7),
            image : 'Char_agent14.jpg',
            time: 2000,
            blink : false,
            color: 'info',
        });
    } , false)
}