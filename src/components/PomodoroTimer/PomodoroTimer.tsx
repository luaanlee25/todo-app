import {useState, useEffect, useRef} from "react";

export default function PomodoroTimer() {
    const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
    const [isRunning, setIsRunning] = useState(false);
    const [isWorkPhase, setIsWorkPhase] = useState(true); // true = Work phase, false = Break phase
    const [pomodoroCount, setPomodoroCount] = useState(0); // Tracks completed Pomodoro cycles


    const workDuration = 25 * 60; // 25 minutes
    const shortBreakDuration = 5 * 60; // 5 minutes
    const longBreakDuration = 15 * 60; // 15 minutes


    const sendNotification = (message: string) => {
        if (Notification.permission === "granted") {
            try {
                const notification = new Notification("Pomodoro Timer", { body: message });
                notification.onclick = () => window.focus(); // Focus on click
            } catch (error) {
                console.error("Error sending notification:", error);
            }
        } else {
            console.error("Notifications not permitted.");
        }
    };


    const throttledNotification = useRef(false);
    const sendThrottledNotification = (message: string) => {
        if (!throttledNotification.current) {
            sendNotification(message);
            throttledNotification.current = true;

            // Reset throttle after a short delay
            setTimeout(() => (throttledNotification.current = false), 1000);
        }
    };


    useEffect(() => {
        checkNotificationPermission();
    }, []);


    useEffect(() => {
        let timer: number | null = null;

        if (isRunning) {
            timer = window.setInterval(() => {
                setTimeLeft((prevTime) => {
                    if (prevTime <= 1) {
                        clearInterval(timer!);
                        setIsRunning(false);

                        if (isWorkPhase) {
                            // Work phase complete
                            playSound();
                            sendThrottledNotification("Work session complete! Time for a break.");

                            // Increment Pomodoro count
                            const newCount = pomodoroCount + 1;
                            setPomodoroCount(newCount);

                            // Switch to break
                            if (newCount % 4 === 0) {
                                setTimeLeft(longBreakDuration); // Long break after 4 Pomodoros
                            } else {
                                setTimeLeft(shortBreakDuration); // Regular short break
                            }
                        } else {
                            // Break phase complete
                            playSound();
                            sendThrottledNotification("Break over! Time to focus.");
                            setTimeLeft(workDuration); // Back to work
                        }

                        setIsWorkPhase(!isWorkPhase); // Toggle phase
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);
        } else if (!isRunning && timer) {
            clearInterval(timer);
        }

        return () => {
            if (timer) {
                clearInterval(timer);
            }
        };
    }, [isRunning, isWorkPhase, pomodoroCount, workDuration, shortBreakDuration, longBreakDuration, sendThrottledNotification]);


    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, "0")}:${seconds
            .toString()
            .padStart(2, "0")}`;
    };


    const playSound = () => {
        const audio = new Audio();
        audio.src = "/todo-app/notification.mp3"; // Try mp3 first
        audio.onerror = () => {
            audio.src = "/todo-app/notification.ogg"; // Fallback to ogg if mp3 fails
            audio.play().catch((error) => {
                console.error("Error playing fallback sound:", error);
            });
        };

        audio.play().catch((error) => {
            console.error("Error playing sound:", error);
        });
    };


    const checkNotificationPermission = () => {
        if (Notification.permission === "default") {
            Notification.requestPermission()
                .then((permission) => {
                    if (permission === "granted") {
                        console.log("Notifications allowed.");
                    } else if (permission === "denied") {
                        console.error("Notifications denied.");
                    }
                })
                .catch((error) => console.error("Notification permission error:", error));
        }
    };


    return (
        <div className="flex flex-col items-center">
            <h2 className="text-center font-bold text-fuchsia-500 text-2xl">{isWorkPhase ? "Work Time" : pomodoroCount % 4 === 0 ? "Long Break" : "Short Break"}</h2>
            <h1 className="text-center text-2xl">{formatTime(timeLeft)}</h1>
            <button className="mt-6 w-1/4" onClick={() => setIsRunning(!isRunning)}>
                {isRunning ? "Pause" : "Start"}
            </button>
        </div>
    )
}