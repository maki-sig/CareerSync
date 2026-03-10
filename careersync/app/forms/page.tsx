import Header from "../components/header"
import "../styles/forms.css"
export default function Forms() {
    return(
        <>
            <Header />

            <form className="forms">

                {/* <div className="workstyle-section">
                    <h1 className="category-txt">Workflow Mode</h1>
                    <div className="workstyle-card">
                        <span className="question-txt">How do you achieve your peak performance?</span>
                        <span className="caption-txt">Choose the work environment where you feel most in the zone</span>
                        
                        <div className="workstyle-btn-grp">
                            <label className="btn-txt"><input type="radio" name="workstyle" />Collaborative</label>
                            <label className="btn-txt"><input type="radio" name="workstyle" />Independent</label>
                        </div>
                    </div>
                    <button type="button" className="secondary-btn btn-txt">
                        Next
                    </button>
                </div> */}

                <div className="subjects-section">
                    <h1 className="category-txt">Core Domains</h1>
                    <div className="subjects-card">

                        <span className="question-txt">What technical subjects have you mastered or enjoyed most?</span>
                        <span className="caption-txt">Select the areas where you feel most confident or find the highest level of interest</span>

                    </div>

                    <div className="subjects-secbtn-grp">
                        <button type="button" className="secondary-btn btn-txt">Back</button>
                        <button type="button" className="secondary-btn btn-txt">Next</button>
                    </div>
                </div>
            </form>
        </>
    )
}