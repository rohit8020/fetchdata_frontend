import React, { useEffect, useState } from 'react'
import './index.css'

function Books() {
    const [books, setBooks] = useState([])
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
    <table>
        <tr><th>Title</th><th>Authors</th><th>ISBN</th><th>Description</th></tr>
            <tr>
        { books.map(book=> (<>
          <td>{book.title}</td>
          <td>{book.authors}</td>
          <td>{book.isbn}</td>
          <td>{book.description}</td>
          </>
          )
        )
      }
            </tr>
    </table>
    <button className="btn" onClick={() => func('books')} >Download {page}</button>

  
  </>
  )
}

export default Books