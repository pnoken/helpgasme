export const HowItWorks = () => {
    return (
        <section id="how-it-works" className="hero bg-base-300 info-content flex flex-col p-12">
            <h1 className="text-5xl font-bold">How it works</h1>
            <ul className="gap-12 flex md:flex-row flex-col p-12">
                <img className="mask mask-hexagon max-w-xs md:w-1/4" src="/deposit.png" />
                <img className="mask mask-hexagon max-w-xs md:w-1/4" src="/stake.png" />
                <img className="mask mask-hexagon max-w-xs md:w-1/4" src="/win.png" />
            </ul>

            <ul className="steps mx-auto">

                <li className="step step-primary text-3xl font-bold">Deposit</li>
                <li className="step step-primary text-3xl font-bold">Stake {""}</li>
                <li className="step text-3xl font-bold">Win</li>
            </ul>

        </section>

    )
}