export const Mission = () => {
    return (
        <section id="mission" className="p-12 hero info-content">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div>
                    <h1 className="text-5xl font-bold">The Mission: Financial freedom for all</h1>
                    <p className="py-6">
                        Prize savings are a proven tool to help people save money and avoid wealth destroying lotteries.</p>
                    <a href="/dapp" target="_blank"><button className="btn btn-primary">Launch App</button></a>
                </div>
                <img src="/financial-freedom.svg" className="md:max-w-xl max-w-xs rounded-lg" />
            </div>
        </section>
    )
}