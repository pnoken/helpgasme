export const Hero = () => {
    return (
        <section className="p-12 hero bg-base-300 info-content">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <img src="/rewards.svg" className="md:max-w-xl max-w-xs rounded-lg" />
                <div>
                    <h1 className="text-5xl font-bold">Pay for Gas based on your reputation score</h1>
                    <p className="py-6">Earn rewards for funding gas of others.</p>
                    <p className="py-6">Or try our gasless wallet that allows you use other tokens as replacement for your native token.</p>
                    <a href="/dapp" target="_blank"><button className="btn btn-primary">Launch App</button></a>
                </div>
            </div>
        </section>
    )
}