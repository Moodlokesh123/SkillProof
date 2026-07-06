import { useEffect, useState } from "react";

function Timer({ minutes }) {

    const [timeLeft, setTimeLeft] = useState(minutes * 60);

    useEffect(() => {

        const timer = setInterval(() => {

            setTimeLeft(prev => {

                if (prev <= 1) {

                    clearInterval(timer);

                    return 0;

                }

                return prev - 1;

            });

        }, 1000);

        return () => clearInterval(timer);

    }, []);

    const min = Math.floor(timeLeft / 60);

    const sec = timeLeft % 60;

    return (

        <h2>

            ⏱ {String(min).padStart(2, "0")}:
            {String(sec).padStart(2, "0")}

        </h2>

    );

}

export default Timer;