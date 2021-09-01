import React from 'react';

export const iso_to_date = (date_in_iso, months) => {
    var splitDate = date_in_iso.split("T");
    // Get Date
    var date = splitDate[0];
    date = date.split("-");
    date.push(date.shift());
    date[0] = (months[parseInt(date[0] - 1)])
    date = `${date[0]}, ${date[1]} ${date[2]}`
    // Get Time
    var time = splitDate[1];
    time = time.split(":");
    time.pop();
    if (parseInt(time[0]) > 12) {
        time[0] = parseInt(time[0]) % 12
        time[1] += "PM"
    } else {
        time[1] += "AM"
    }
    time = time.join(":");
    return [date, time]
}

export const iso_to_seconds = (date_in_iso) => {
    if (date_in_iso === null) {
        return
    }
    var hour
    var minute
    var second
    // trims milliseconds if inculded
    if (date_in_iso.includes("Z")) {
        date_in_iso = date_in_iso.slice(0, -5);
    }
    // split date and time
    var split_iso_date = date_in_iso.split("T");
    let date = split_iso_date[0]
    let time = split_iso_date[1]
    // trim date
    var splitTime = time.split(":");
    if (splitTime.length > 3) {
        splitTime = splitTime.slice(0, 3);
        hour = parseInt(splitTime[0])
        minute = parseInt(splitTime[1])
        second = parseInt(splitTime[2])
        var fixSeconds = splitTime[2]
        var secondsFix = fixSeconds.split("-");
        splitTime[2] = secondsFix[0]
        var offsetHours = parseInt(secondsFix[1]);
        hour = hour + offsetHours
    } else {
        hour = parseInt(splitTime[0])
        minute = parseInt(splitTime[1])
        second = parseInt(splitTime[2])
    }
    // fixes situations where hour can be 00:30
    if (hour === 0) {
        hour = 24;
        // fixes timezone offsets where hour can go above 24
    } else if (hour > 24) {
        hour = hour % 24;
    }
    // convert timeslots to seconds
    return ((hour * 60) * 60) + (minute * 60) + second;
}

export const prepend_zero_to_single_digits = (number_to_check) => {
    if (number_to_check < 10) {
        return "0" + number_to_check.toString()
    } else {
        return number_to_check
    }
}

export const display_train_information = (bus) => {
    if (isNaN(bus)) {
        if (bus.includes("Green")) {
            return <div className="Green train__id">{bus.slice(-1)}</div>
        } else if (bus.includes("CR-")) {
            return <div className={`Commuter train__id`}>{bus.slice(0, 1)}</div>
        } else {
            return <div className={`${bus} train__id`}>{bus.slice(0, 1)}</div>
        }
    } else {
        return <div className="bus__id">{bus}</div>
    }
}
