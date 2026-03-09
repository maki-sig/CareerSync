import "../app/styles/page.css"

export default function Landing(){
  return(
    <>
      <div className="program-toggle-div"> 
        <span>svg here</span>
      </div> 
      <section className="program-section"> 
        <h1>CareerSync</h1> 
        <span>This  is a decision support form based web app that will align IT and CS students to related industry careers. Powered by Gemini.</span>
        {/* the card */}
        <div className="program-card"> 
          <span>Choose your program to start</span>
          {/* btn grp */}
          <div>
            <button>Computer Science</button>
            <button>Information Technology</button>
          </div> 
          <span>Developed by: Marc Botis</span> 
        </div>
      </section> 
    </>
  )
}