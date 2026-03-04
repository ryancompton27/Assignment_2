// Ryan Compton
// Assignment 2

const valid = require("validator");
const {LocalStorage} = require('node-localstorage');

const localStorage = new LocalStorage('./scratch')
const create_event = (name, date) => {
    let event_info = {name: name, date: date, type: "Event"}
    let check_event = JSON.parse(localStorage.getItem(name))
    if(!valid.isDate(date)){
        throw new Error("Date is not valid, please retry")
    }
    else {
        if(check_event && check_event.name == name && check_event.date == date){
            throw new Error("Event already exists")
        }
        else {
            localStorage.setItem(name, JSON.stringify(event_info))
        }
    }
    
}

const get_event = (name) => {
    let event_info = JSON.parse(localStorage.getItem(name))
    return event_info_info;
}

const register_attendee = (name, email, event_name) => {
    if (!valid.isEmail(email))
    {
        throw new Error("Email is not valid, please retry")
    }
    else {
        let attendee = JSON.parse(localStorage.getItem(name))

        if(attendee && attendee.email == email && attendee.event_name == event_name){
            throw new Error("Attendee already exists")
        }
        else {
            let attendee_info = {email: email, event_name: event_name, checked_in: false, type: "Attendee"}
            localStorage.setItem(name, JSON.stringify(attendee_info))
        }
        
    }
}

const get_attendee = (name) => {
    let attendee_info = JSON.parse(localStorage.getItem(name))
    return attendee_info;
}

const check_in = (name, email, event_name) => {
    let attendee_info = JSON.parse(localStorage.getItem(name))
    if (attendee_info && attendee_info.email == email && attendee_info.event_name == event_name){
        attendee_info.checked_in = true
    }
    else {
        throw new Error("Error checking attendee in. Attendee either doesnt exist or isnt registered to this event.")
    }
    
    localStorage.setItem(name, JSON.stringify(attendee_info))
}

const attendance_report = (name) => {
    let num_attendees = 0
    let num_checked_in = 0
    let attendee_list = [];
    
    for (let i = 0; i < localStorage.length; i++)
    {
        const key = localStorage.key(i);
        const value = JSON.parse(localStorage.getItem(key));
        if (value.type == "Attendee")
            {
                if (value.event_name == name)
                {
                    num_attendees++;
                    if (value.checked_in == true)
                    {
                        num_checked_in++;
                        attendee_list.push(value);
                    }
                }
            }
    }

    let report = [name, num_attendees, num_checked_in, attendee_list]

    return report;
}

const clearStorage = () => {
    localStorage.clear();
}

module.exports = {create_event, get_event, register_attendee, get_attendee, check_in, attendance_report, clearStorage};