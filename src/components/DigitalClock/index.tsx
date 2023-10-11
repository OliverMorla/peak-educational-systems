import { useEffect } from "react";

const DigitalClock = () => {
  const date = new Date();

  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  useEffect(() => {
    const interval = setInterval(() => {}, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h1>Digital Clock</h1>
      <div className="flex">
        <h2>{hour}:</h2>
        <h2>{minute}:</h2>
        <h2>{second}</h2>
      </div>
    </div>
  );
};

export default DigitalClock;
