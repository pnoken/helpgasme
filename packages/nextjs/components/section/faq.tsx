export const FAQ = () => {
    return (<section id="faq" className="mx-auto p-12">
        <h1 className="text-5xl font-bold">Frequently asked questions</h1>
        <div className="collapse collapse-plus bg-base-200">
            <input type="radio" name="my-accordion-3" checked="checked" />
            <div className="collapse-title text-xl font-medium">
                What is the minimum amount to stake
            </div>
            <div className="collapse-content">
                <p>10 MATIC</p>
            </div>
        </div>
        <div className="collapse collapse-plus bg-base-200">
            <input type="radio" name="my-accordion-3" />
            <div className="collapse-title text-xl font-medium">
                When does the draw end?
            </div>
            <div className="collapse-content">
                <p>Draw begins at the start of every week, ie: 00:00 GMT on Sunday</p>
            </div>
        </div>
        <div className="collapse collapse-plus bg-base-200">
            <input type="radio" name="my-accordion-3" />
            <div className="collapse-title text-xl font-medium">
                What if I do not win?
            </div>
            <div className="collapse-content">
                <p>Users still earn claimable tokens</p>
            </div>
        </div>
    </section>)
}