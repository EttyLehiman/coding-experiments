import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
    const [time, setTime] = useState('טוען...');

    useEffect(() => {
        const eventSource = new EventSource('http://localhost:3000/time');

        eventSource.onmessage = (event) => {
            setTime(event.data);
            console.log(time);
            
        };

        return () => {
            eventSource.close();
        };
    }, []);

    return (
        <div className="container">
            <h1 className="title">השעה הנוכחית</h1>
            <p className="time-display">{time}</p>
        </div>
    );
}

export default App;
