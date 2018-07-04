var dataFormat = function (type, today) {

  var day = today.getDate() + "";
  var month = (today.getMonth() + 1) + "";
  var year = today.getFullYear() + "";
  var hour = today.getHours() + "";
  var minutes = today.getMinutes() + "";
  var seconds = today.getSeconds() + "";
  var miliseconds = today.getMilliseconds() + "";

  day = checkZero(day);
  month = checkZero(month);
  year = checkZero(year);
  hour = checkZero(hour);
  mintues = checkZero(minutes);
  seconds = checkZero(seconds);

  if (type === 'device') {
    return day + "-" + month + "-" + year + " " + hour + ":" + minutes + ":" + seconds
  } else if (type === 'requestid') {
    return day + month + year + hour + minutes + seconds + miliseconds
  } else if (type === 'tnxDate') {
    return year.toString().substr(-2) + month + day + hour + minutes + seconds + padZero(miliseconds.toString())
  }

  function padZero(time) {
    if(time.length == 2) {
        time = '0' + time;
      }else if(time.length == 1) {
        time = '00' + time;
      }
    return time;
  }

  function checkZero(data) {
    if (data.length == 1) {
      data = "0" + data;
    }
    return data;
  }
}

module.exports = {
  dataFormat
}
