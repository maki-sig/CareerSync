import Header from "../components/header"
import "../styles/forms.css"
export default function Forms() {
    return(
        <>
            <Header />

            <form className="forms">
                <div className="workstyle-section">
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
                </div>
            </form>
        </>
    )
}