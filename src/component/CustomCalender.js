import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft } from 'react-feather';
const CustomCalendar = ({ selectedDate, onDateChange, filteredData }) => {
    const [currentDate, setCurrentDate] = useState(selectedDate || new Date());

    useEffect(() => {
        if (selectedDate) {
            setCurrentDate(selectedDate);
        }
    }, [selectedDate]);

    const filteredEvents = filteredData.filter(item => {
        const eventDate = new Date(item.date);
        return eventDate.toDateString() === currentDate.toDateString();
    });

    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

    const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const emptyDaysArray = Array.from({ length: firstDayOfMonth }, (_, i) => i);

    const handlePreviousMonth = () => {
        const newDate = new Date(currentYear, currentMonth - 1, 1);
        setCurrentDate(newDate);
    };

    const handleNextMonth = () => {
        const newDate = new Date(currentYear, currentMonth + 1, 1);
        setCurrentDate(newDate);
    };

    return (
        <div className="calendar">
            <div className="calendar-header">
                <button onClick={handlePreviousMonth}><ArrowLeft/></button>
                <h2>{`${new Intl.DateTimeFormat('en-US', { month: 'long' }).format(currentDate)} ${currentYear}`}</h2>
                <button onClick={handleNextMonth}><ArrowRight/></button>
            </div>
            <div className="calendar-body">
                <div className="calendar-days">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                        <div key={day} className="calendar-day">{day}</div>
                    ))}
                </div>
                <div className="calendar-dates">
                    {emptyDaysArray.map((_, index) => (
                        <div key={`empty-${index}`} className="calendar-date empty"></div>
                    ))}
                    {daysArray.map(day => {
                        const hasEvent = filteredData.some(item => {
                            return new Date(item.date).toLocaleDateString() === new Date(currentYear, currentMonth, day).toLocaleDateString();
                        });
                        
                        const className = hasEvent ? "calendar-date selectedDate" : "calendar-date";

                        return (
                            <div
                                key={day}
                                className={className}
                                onClick={() => {
                                    const selectedDay = new Date(currentYear, currentMonth, day);
                                    onDateChange(selectedDay);
                                }}
                            >
                                {day}
                            </div>
                        );
                    })}
                </div>
                <div className='calendar-event-info'>
                    {filteredEvents.map((item, index) => (
                        <div key={index} className='calendar-event-info-wrap'>
                            <p>{new Date(item.date).toLocaleDateString()}</p>
                            <p>{item.upcomingeventname}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CustomCalendar;
