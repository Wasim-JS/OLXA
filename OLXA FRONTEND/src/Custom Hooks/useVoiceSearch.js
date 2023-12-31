
const useVoiceSearch = () =>{
   

    const recognition = window.speechRecognition || window.webkitSpeechRecognition;
    let rec = new recognition()

    return [rec]
  
  }

  export default useVoiceSearch;