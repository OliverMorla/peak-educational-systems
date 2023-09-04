import React, { useState, useEffect, useRef } from 'react';

export function Counter({ duration, targetCount }) {
    const [count, setCount] = useState(0);
    const frameRef = useRef(null);

    useEffect(() => {
        let startTimestamp;
        let currentCount = 0;

        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = timestamp - startTimestamp;
            currentCount = Math.floor(progress / duration);

            if (currentCount <= targetCount) {
                currentCount = Math.min(currentCount, targetCount);
                setCount(currentCount);
                frameRef.current = requestAnimationFrame(step);
            }
        };
        frameRef.current = requestAnimationFrame(step);

        return () => cancelAnimationFrame(frameRef.current);
    }, [duration, targetCount]);

    return (
        <>
            {count}
        </>
    )
}



