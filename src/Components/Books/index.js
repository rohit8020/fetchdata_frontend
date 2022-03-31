import React, { useEffect, useState } from 'react'
import './index.css'

function Books() {
    const [books, setBooks] = useState([])
    const [isbnSearch,setIsbnSearch] = useState('')
    const page = 1;
    function func(file){
        fetch(`${window.location.origin}/download/${file}`,{
            method : 'POST'})
            .then((res)=>res.blob().then((blob)=>{
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'filename.zip'); 
        document.body.appendChild(link);
        link.click();
    }).catch(()=>{
        console.log("error")
    })).catch(()=>{
        console.log("error")
    })
}
const fetchBooks = async () => {
    const response = await fetch(`${window.location.origin}/books`)
    const data = await response.json()
    setBooks(data?.data)
}
useEffect(()=>{
    fetchBooks();
},[])    

  return (<>
  
  <h1 style={{textAlign : "center"}}>You can Add book in csv file and download it</h1>
    <form action="/newbook" method="POST">
        <label for="title">Title: 
            <input type="text" name="title"/>
        </label>
        <label for="authors">Authors: 
            <input type="text" name="authors"/>
        </label>
        <label for="isbn">ISBN: 
            <input type="text" name="isbn"/>
        </label>
        <label for="description">Description: 
            <input type="text" name="description"/>
        </label>
        <input className="btn" type="submit" value="Submit"/>
    </form>
    <input type="text" value={isbnSearch} onChange={(e) => {
        setIsbnSearch(e.target.value)
    }} placeholder="Search by ISBN" />

    <table style={{
        margin: '5rem 0',
        padding:'1rem 1rem',
        overflowX: 'scroll',
        width : "100vw",
    }}>
        <thead>

        <tr><th style={{fontSize: '1.3 rem',textAlign: 'left',}}>Title</th><th style={{fontSize: '1.3 rem',textAlign: 'left',}}>Authors</th><th style={{fontSize: '1.3 rem',textAlign: 'left',}}>ISBN</th><th style={{fontSize: '1.3 rem',textAlign: 'left',}}>Description</th></tr>
        </thead>
        <tbody>

        { books.filter((m) => m.isbn.includes(isbnSearch)).map(book=> (<>
            <tr>
          <td style={{fontSize: "0.9rem",textAlign : book?.title?'left':'center'}}>{book?.title || '-'}</td>
          <td style={{fontSize: "0.9rem",textAlign : 'left'}}>{book?.authors || '-' }</td>
          <td style={{fontSize: "0.9rem",textAlign : 'left'}}>{book?.isbn || '-'}</td>
          <td style={{fontSize: "0.9rem",textAlign : book?.description? 'left': 'center'}}>{book?.description || '-'}</td>
          </tr>
          </>
          )
          )
        }
        </tbody>
    </table>
    <button className="btn" onClick={() => func('books')} >Download {page}</button>

  
  </>
  )
}

export default Books