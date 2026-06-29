import "./BodyAnalysis.css";

function BodyAnalysis({ bodyAnalysis }) {

    return (

        <div className="bodySection">

            <h4>🧠 Body Analysis</h4>

            <div className="bodyRow">
                <span>Head</span>

                <strong className={bodyAnalysis?.head ? "good" : "bad"}>
                    {bodyAnalysis?.head ? "✔" : "✖"}
                </strong>
            </div>

            <div className="bodyRow">
                <span>Shoulder</span>

                <strong className={bodyAnalysis?.shoulder ? "good" : "bad"}>
                    {bodyAnalysis?.shoulder ? "✔" : "✖"}
                </strong>
            </div>

            <div className="bodyRow">
                <span>Back</span>

                <strong className={bodyAnalysis?.back ? "good" : "bad"}>
                    {bodyAnalysis?.back ? "✔" : "✖"}
                </strong>
            </div>

            <div className="bodyRow">
                <span>Hip</span>

                <strong className={bodyAnalysis?.hip ? "good" : "bad"}>
                    {bodyAnalysis?.hip ? "✔" : "✖"}
                </strong>
            </div>

            <div className="bodyRow">
                <span>Knee</span>

                <strong className={bodyAnalysis?.knee ? "good" : "bad"}>
                    {bodyAnalysis?.knee ? "✔" : "✖"}
                </strong>
            </div>

            <div className="bodyRow">
                <span>Feet</span>

                <strong className={bodyAnalysis?.feet ? "good" : "bad"}>
                    {bodyAnalysis?.feet ? "✔" : "✖"}
                </strong>
            </div>

        </div>

    );

}

export default BodyAnalysis;