import "../app/styles/page.css"
import CSicon from "@/public/cs.svg";
import ITicon from "@/public/it.svg"; 
import ThemeToggle from "@/app/components/themetoggle"

export default function Landing(){
  return(
    <>

      <ThemeToggle />

      <section className="program-section">
         
        <h1 className="title-txt">CareerSync</h1> 
        <span className="desc option-txt">This  is a decision support form based web app that will align IT and CS students to related industry careers.<br></br>Powered by Gemini.</span>
        
        {/* the card */}
        <div className="program-card"> 
          <span className="caption-txt">Choose your program to start</span>
          <button className="btn-txt">
            <CSicon />
            Computer Science
          </button>
          <button className="btn-txt">
            <ITicon />
            Information Technology
          </button> 
          <span className="caption-txt">Developed by: Marc Botis</span> 
        </div>

      </section> 
    </>
  )
}