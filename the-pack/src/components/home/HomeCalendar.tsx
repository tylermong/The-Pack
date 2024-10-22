import React from 'react';
import { Calendar } from "@/components/ui/calendar"

const HomeCalendar = () =>{
    const [date, setDate] = React.useState<Date | undefined>(new Date())

    return(
        <div className="Scheduling">
            <div className="mb-6">
                <h3 className="text-white md:text-3xl text-2xl font-extrabold text-center max-md:text-center">SCHEDULING</h3>
            </div>
            <div className='calendar'>
                <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
                />
            </div>
        </div>
    );
};

export default HomeCalendar;