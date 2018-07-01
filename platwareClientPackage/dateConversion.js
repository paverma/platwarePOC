
var dataFormat = function (type,today) {
    
    var day = today.getDate() + "";
    var month = (today.getMonth() + 1) + "";
    var year = today.getFullYear() + "";
    var hour = today.getHours() + "";
    var minutes = today.getMinutes() + "";
    var seconds = today.getSeconds() + "";

    day = checkZero(day);
    month = checkZero(month);
    year = checkZero(year);
    hour = checkZero(hour);
    mintues = checkZero(minutes);
    seconds = checkZero(seconds);

    if(type === 'device'){
        return day + "-" + month + "-" + year + " " + hour + ":" + minutes + ":" + seconds
    }else if(type === 'requestid'){
        return day + month +  year + hour +minutes + seconds
    }

    function checkZero(data) {
        if (data.length == 1) {
            data = "0" + data;
        }
        return data;
    }
}

module.exports={
    dataFormat
}