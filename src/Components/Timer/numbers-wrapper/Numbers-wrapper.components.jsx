import { useEffect, useState } from "react";

export function NumbersWrapper({
  showPara,
  date1 = new Date("2024-07-26T20:00:00"),
  date2 = new Date("2024-08-28T20:00:00"),
}) {
  const now = Date.now();

  const [state, setState] = useState({
    event1: {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    },
    event2: {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    },
    showPara: false,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const ev1 = calcDiff(now, date1);
      const ev2 = calcDiff(now, date2);
      setState({ event1: ev1, event2: ev2 });
    }, 1000);

    return () => clearInterval(timer);
  });

  return (
    <div className="timer-stats">
      <NumberWrapper
        label="Jours"
        number={state.event1.days}
        number2={state.event2.days}
        showPara={showPara}
      />
      <NumberWrapper
        label="Heures"
        number={state.event1.hours}
        number2={state.event2.hours}
        showPara={showPara}
      />
      <NumberWrapper
        label="mins"
        number={state.event1.minutes}
        number2={state.event2.minutes}
        showPara={showPara}
      />
      <NumberWrapper
        label="sec"
        number={state.event1.seconds}
        number2={state.event2.seconds}
        showPara={showPara}
      />
    </div>
  );
}

const NumberWrapper = ({
  label,
  number = 0,
  number2 = 0,
  showPara = false,
}) => {
  const n1 = Number(number).toLocaleString("en-US", {
    minimumIntegerDigits: 2,
  });
  const n2 = Number(number2).toLocaleString("en-US", {
    minimumIntegerDigits: 2,
  });
  return (
    <div className="timer-stat">
      <div
        className={`number-wrapper ${showPara && n1 !== n2 ? "animate" : ""}`}
      >
        <span>{n1}</span>
        {n1 !== n2 && <span>{n2}</span>}
      </div>
      <div>{label}</div>
    </div>
  );
};

const calcDiff = (date1, date2) => {
  const c = { day: 60 * 60 * 24, hour: 60 * 60, min: 60 };
  let difference = (date2 - date1) / 1000;

  let days = Math.floor(difference / c.day);

  let hours = Math.floor((difference % c.day) / c.hour);
  hours = Math.floor(hours);

  let minutes = Math.floor((difference % c.hour) / c.min);

  let seconds = Math.floor(difference % c.min);
  return { days, hours, minutes, seconds };
};
