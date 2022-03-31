import React, { useEffect, useState } from 'react'
import './index.css'
import axios from 'axios'
function Books() {
    const [books, setBooks] = useState([])
    const [isbnSearch,setIsbnSearch] = useState('')
    const [added,setAdded]=useState(null)
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

const handleSubmit=(e)=>{
    e.preventDefault()
    const form=new FormData(e.target)
    let formData={
      title:form.get('title'),
      authors:form.get('authors'),
      isbn:form.get('isbn'),
      description:form.get('description')
    }
    axios.post('http://localhost:3001/newbook',formData)
    .then(()=>{
      setAdded(<h1>Book added, can download csv file!</h1>)
    })
    .catch((err)=>{
      setAdded(<h1>Unable to add book!</h1>)
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
    <form onSubmit={(e)=>{handleSubmit(e)}}>
        <label htmlFor="title">Title: 
            <input type="text" name="title"/>
        </label>
        <label htmlFor="authors">Authors: 
            <input type="text" name="authors"/>
        </label>
        <label htmlFor="isbn">ISBN: 
            <input type="text" name="isbn"/>
        </label>
        <label htmlFor="description">Description: 
            <input type="text" name="description"/>
        </label>
        {added}
        <input className="btn" type="submit" value="Submit"/>
    </form>
    <label>Search:
    <input type="text" value={isbnSearch} onChange={(e) => {
        setIsbnSearch(e.target.value)
    }} placeholder="Search by ISBN or author email" />
    </label>
    

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

        { books.filter((m) => (m.isbn.includes(isbnSearch)||m.authors.includes(isbnSearch))).map(book=> (
            <tr key={Math.floor(Math.random()*1000000)}>
          <td style={{fontSize: "0.9rem",textAlign : book?.title?'left':'center'}}>{book?.title || '-'}</td>
          <td style={{fontSize: "0.9rem",textAlign : 'left'}}>{book?.authors || '-' }</td>
          <td style={{fontSize: "0.9rem",textAlign : 'left'}}>{book?.isbn || '-'}</td>
          <td style={{fontSize: "0.9rem",textAlign : book?.description? 'left': 'center'}}>{book?.description || '-'}</td>
          </tr>
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