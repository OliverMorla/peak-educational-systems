import { useEffect, useState } from "react";

const DigitalClock = () => {
  const [time, setTime] = useState({
    hour: 0,
    minute: 0,
    second: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      setTime({
        hour: date.getHours(),
        minute: date.getMinutes(),
        second: date.getSeconds(),
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center items-center flex-col shadow-md p-4">
      <h1 className="text-lg font-bold">Digital Clock</h1>
      <div className="flex">
        <h2>{time.hour.toString().padStart(2, "0")}:</h2>
        <h2>{time.minute.toString().padStart(2, "0")}:</h2>
        <h2>{time.second.toString().padStart(2, "0")}</h2>
        <h2 className="opacity-60 ml-1">{time.hour >= 12 ? "PM" : "AM"}</h2>
      </div>
    </div>
  );
};

export default DigitalClock;
