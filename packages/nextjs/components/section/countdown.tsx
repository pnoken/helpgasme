import { useState, useEffect } from "react";
import { useEffectOnce } from "usehooks-ts";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";
export const Countdown = () => {
    const { data: remainingTime } = useScaffoldContractRead({
        contractName: "Staker",
        functionName: "timeLeft",
        watch: true,
    });

    const [timeLeft, setTimeLeft] = useState(0);

    useEffect(() => {

        setTimeout(() => setTimeLeft(Number(remainingTime)), 2000);
    }, [remainingTime])


    useEffect(() => {
        // Exit the countdown if timeLeft reaches zero
        if (timeLeft <= 0) return;

        // Create an interval to decrement timeLeft every second
        const intervalId = setInterval(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);

        // Clean up the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, [timeLeft]);

    // Format seconds into HH:MM:SS
    const days = Math.floor(timeLeft / 86400);
    const hours = Math.floor(timeLeft / 3600) % 24;
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const remainingSeconds = timeLeft % 60;

    return (
        <section className="mx-auto p-12">
            <h1 className="text-5xl font-bold">Next raffle begins in</h1>
            <div className="grid grid-flow-col gap-2 md:gap-5 text-center auto-cols-max">
                <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                    <span className="countdown font-mono text-5xl">
                        <span style={{ "--value": days }}></span>
                    </span>
                    days
                </div>
                <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                    <span className="countdown font-mono text-5xl">
                        <span style={{ "--value": hours }}></span>
                    </span>
                    hours
                </div>
                <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                    <span className="countdown font-mono text-5xl">
                        <span style={{ "--value": minutes }}></span>
                    </span>
                    min
                </div>
                <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                    <span className="countdown font-mono text-5xl">
                        <span style={{ "--value": remainingSeconds }}></span>
                    </span>
                    sec
                </div>
            </div>
        </section>
    )
}