let notifications = [];

const uniqueId = () => {
    let id_str = String.fromCharCode(Math.floor((Math.random() * 25) + 65));
    do {
        const asci = Math.floor((Math.random() * 42) + 48);
        if (asci < 58 || asci > 64) {
            id_str += String.fromCharCode(asci);
        }
    } while (id_str.length < 32);
    return (id_str);
}

window.addEventListener('message', function (event) {
    const item = event.data;
    const wait = item.time || 2000;
    const blink = item.blink || false;
    const color = item.color || '#ffffff';
    const id = uniqueId();

    // function validation
    if (!item.title || !item.subTitle || !item.content || !item.image) {
        console.error('Missing parameters', item);
        return;
    }

    // Check that the same notification does not exist !
    const sameNotificationAlreadyExist = notifications.findIndex(object => {
        return object.title === item.title &&
            object.subTitle === item.subTitle &&
            object.content === item.content &&
            object.image === item.image;
    });

    if (sameNotificationAlreadyExist !== -1) {
        const notificationToUpdate = notifications[sameNotificationAlreadyExist].id;
        const selector = $(`#${notificationToUpdate}`).find('#amountNotify');
        let currentAMount = selector.text();
        currentAMount = parseInt(currentAMount) + 1;
        selector.text(currentAMount);
        return;
    }

    let childNotification = `
        <div class="notification-container" id="${id}">
        <div class="notification-header">
            <div class="notification-header-logo">
                <img src="images/${item.image}">
            </div>
            <div class="notification-header-logo2">
                <span id="amountNotify">1</span>
            </div>
            <div class="notification-header-titles">
                <p class="notification-header-title">${item.title}</p>
                <p class="notification-header-subtitle" style="color:${color}!important;">
                    ${item.subTitle}
                </p>
            </div>
            <div class="notification-header-content">
                <p>${item.content}</p>
            </div>
        </div>
    </div>
    `;

    $('.container').append(childNotification);

    if (blink) {
        $(`#${id}`).fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200);
    }

    notifications.push({
        id,
        title: item.title,
        subTitle: item.subTitle,
        content: item.content,
        image: item.image
    });

    setTimeout(() => {
        const notificationIndex = notifications.findIndex(object => {
            return object.id === id;
        });
        notifications.splice(notificationIndex, 1);
        $(`#${id}`).remove();
    }, wait)
});