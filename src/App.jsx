import axios from "axios";
import { useRef, useState } from "react"
import { youtube_parser } from "./utils";

function App() {
  const inputLinkRef = useRef();
  const [linkResult, setLinkResult] = useState(null);

  const handleSubmit = (e)=> {
    e.preventDefault();
    const youtubeID = youtube_parser(inputLinkRef.current.value);
    console.log(youtubeID);

    const options = {
      method: 'GET',
      url: 'https://youtube-mp3-downloader2.p.rapidapi.com/ytmp3/ytmp3/',
      headers: {
        'X-RapidAPI-Key': import.meta.env.VITE_RAPID_API_KEY,
        'X-RapidAPI-Host': 'youtube-mp3-downloader2.p.rapidapi.com'
      },
      params: {
        id: youtubeID
      }
    }

    axios(options)
      .then(response => setLinkResult(response.data.link))
      .catch(err => console.log(err))

    inputLinkRef.current.value = '';
  }

  return (
    <div className="app">
        <span className="logo">conversorYoutubeParaMp3</span>
        <section className="content">
            <h1 className="content_title">Conversor Youtube para MP3</h1>
            <p className="content_description">Transforme vídeos do YouTube em aúdios MP3 com apenas alguns cliques!</p>

            <form onSubmit={handleSubmit} className="form">
                <input ref={inputLinkRef} placeholder="Cole o link de um vídeo do YouTube..." className="form_input" type="text" />
                <button type="submit" className="form_button">Procurar</button>
            </form>

            {linkResult ? <a target="_blank" rel="noreferrer" href={linkResult} className="download">Download MP3</a> : ''}            
        </section>
    </div>
  )
}

export default App
