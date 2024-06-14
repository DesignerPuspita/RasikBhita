import React from 'react';

const CustomCalender = ({ selectedDate, onDateChange, filteredData }) => {    
 
    const filteredEvents = filteredData.filter(item => {
        const eventDate = new Date(item.date);
        return eventDate.toDateString() === selectedDate.toDateString();
    });
    // Get current date
    const currentDate = selectedDate || new Date();

    // Get current month and year
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    // Get the number of days in the current month
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    // Get the first day of the month
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

    // Generate an array of days in the month
    const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    // Generate an array of days to display before the first day of the month
    const emptyDaysArray = Array.from({ length: firstDayOfMonth }, (_, i) => i);

    return (
        <div className="calendar">
            <div className="calendar-header">
                {/* <button onClick={() => console.log("Previous Month")}>Prev</button> */}
                <h2>{`${new Intl.DateTimeFormat('en-US', { month: 'long' }).format(currentDate)} ${currentYear}`}</h2>
                {/* <button onClick={() => console.log("Next Month")}>Next</button> */}
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
                        // Check if the current day has an upcoming event
                        const hasEvent = filteredData.some(item => {
                            return new Date(item.date).toLocaleDateString() === new Date(currentYear, currentMonth, day).toLocaleDateString();
                        });

                        // Set className based on whether there's an event
                        const className = hasEvent
                            ? "calendar-date selectedDate"
                            : "calendar-date";

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

                <div className='calender-event-info'>
                    {filteredEvents.map((item, index) => (
                        <div key={index} className='calender-event-info-wrap'>
                             <p>{new Date(item.date).toLocaleDateString()}</p>
                            <p>{item.upcomingeventname}</p>
                           
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CustomCalender;
