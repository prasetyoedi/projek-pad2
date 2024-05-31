//! Date Time
function updateDateTime() {
    const currentDateTimeElement = document.getElementById('currentDateTime');
    
    if (currentDateTimeElement) {
        const now = new Date();
        const formattedDateTime = now.getFullYear() + '-' +
            String(now.getMonth() + 1).padStart(2, '0') + '-' +
            String(now.getDate()).padStart(2, '0') + ' ' +
            String(now.getHours()).padStart(2, '0') + ':' +
            String(now.getMinutes()).padStart(2, '0') + ':' +
            String(now.getSeconds()).padStart(2, '0');
        
        currentDateTimeElement.textContent = formattedDateTime;
    }
}

updateDateTime();

setInterval(updateDateTime, 1000);