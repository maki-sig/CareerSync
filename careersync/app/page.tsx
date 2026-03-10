import "../app/styles/page.css"

export default function Landing(){
  return(
    <>
      <div className="program-toggle-div"> 
        <span>svg here</span>
      </div> 
      <section className="program-section"> 
        <h1 className="title-txt">CareerSync</h1> 
        <span className="option-txt">This  is a decision support form based web app that will align IT and CS students to related industry careers. Powered by Gemini.</span>
        {/* the card */}
        <div className="program-card"> 
          <span className="caption-txt">Choose your program to start</span>
          {/* btn grp */}
          <div>
            <button className="btn-txt">Computer Science</button>
            <button className="btn-txt">Information Technology</button>
          </div> 
          <span className="caption-txt">Developed by: Marc Botis</span> 
        </div>
      </section> 
    </>
  )
}