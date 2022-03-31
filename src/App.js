import React, { useEffect, useState } from "react";
import "./App.css";
import Authors from "./Components/Authors";
import Books from "./Components/Books";
import BooksAndMagazines from "./Components/BooksAndMagazines";
import Magazines from "./Components/Magazines";
import "./Components/Books/index.css";

function App() {
  const [xpage, setPage] = useState('books');
  const [component,setComponent]= useState(<></>)
  
  useEffect(()=>{
    if(xpage==='books'){
      setComponent(<Books/>)
    }else if(xpage==='authors'){
      setComponent(<Authors/>)
      
    }else if(xpage==='magazines'){
      setComponent(<Magazines/>)
    }else if(xpage==='books_magazines'){
      setComponent(<BooksAndMagazines/>)
    }
    console.log(xpage)
  },[xpage])

  return (
    <div className="App">
      <header className="App-header">
        <div className="btns">
          <button className="btn" onClick={()=>{setPage('books')}}>Books</button>
          <button className="btn" onClick={()=>{setPage('authors')}}>Authors</button>
          <button className="btn" onClick={()=>{setPage('magazines')}}>Magazines</button>
          <button className="btn" onClick={()=>{setPage('books_magazines')}}>Books And Magazines Together</button>
        </div>
        {component}
      </header>
    </div>
  );
}

export default App;
