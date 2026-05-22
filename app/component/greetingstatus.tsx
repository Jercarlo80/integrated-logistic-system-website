"use client";

import { useEffect, useState } from "react";

export default function LiveClock() {
  const [timeString, setTimeString] = useState<string>("--:--:-- WIB");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const jakarta = new Date(
        now.toLocaleString("en-US", { timeZone: "Asia/Jakarta" })
      );

      const pad = (n: number) => n.toString().padStart(2, "0");

      setTimeString(
        `${pad(jakarta.getHours())}:${pad(
          jakarta.getMinutes()
        )}:${pad(jakarta.getSeconds())} WIB`
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-lg font-semibold text-black">
      {timeString}
    </div>
  );
}