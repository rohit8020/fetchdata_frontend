import React, { useEffect, useState } from 'react'

function BooksAndMagazines() {


      const [BooksAndMagazines, setBooksAndMagazines] = useState([])
      const [booksAdded,setBooksAdded] = useState(false)
    const fetchBooks = async () => {
        const response = await fetch(`${window.location.origin}/books`)
        const data = await response.json()
        setBooksAndMagazines([...BooksAndMagazines || [],...data?.data])
        setBooksAdded(true)
    }
    const fetchMagzines = async () => {
        const response = await fetch(`${window.location.origin}/magazines`)
        const data = await response.json()
        setBooksAndMagazines([...BooksAndMagazines || [],...data?.data])
    }
    useEffect(()=>{
      fetchBooks();
    },[])    
    
useEffect(()=>{
    if(booksAdded === true){
        fetchMagzines();
    }
},[booksAdded])

  return (<>
    <h1 style={{textAlign: "center"}}>You can Add Magazine in csv file and download it</h1>
    <form action="/newbook" method="POST">
        <label htmlFor="title">Title: 
            <input type="text" name="title"/>
        </label>
        <label htmlFor="authors">Authors: 
            <input type="text" name="authors"/>
        </label>
        <label htmlFor="isbn">ISBN: 
            <input type="text" name="isbn"/>
        </label>
        <label htmlFor="publishedAt">Published-At: 
            <input type="text" name="publishedAt"/>
        </label>
        <input className="btn" type="submit" value="Submit"/>
    </form>
    <table style={{
        margin: '5rem 0',
        padding:'1rem 1rem',
        overflowX: 'scroll',
        width : "100vw",
    }}>
        <thead>

                <tr><th style={{fontSize: '1.3 rem',textAlign: 'left',}}>Title</th><th style={{fontSize: '1.3 rem',textAlign: 'left',}}>Authors</th><th style={{fontSize: '1.3 rem',textAlign: 'left',}}>ISBN</th><th style={{fontSize: '1.3 rem',textAlign: 'left',}}>Published At</th></tr>
        </thead>
<tbody>

        {BooksAndMagazines.sort(function (a,b) { return a.title.toLocaleLowerCase() > b.title.toLocaleLowerCase()?1:-1})?.length>0 && BooksAndMagazines?.map(magazine=>
        <tr key={Math.floor(Math.random()*1000000)}>
                <td
                style={{fontSize: "0.9rem",textAlign : 'left'}}
>{magazine.title} </td>
                <td
                style={{fontSize: "0.9rem",textAlign : 'left'}}
                >{magazine.authors} </td>
                <td
                style={{fontSize: "0.9rem",textAlign : 'left'}}
                >{magazine.isbn} </td>
                <td
                style={{fontSize: "0.9rem",textAlign : magazine.publishedAt?'left':`center`}}
                >{magazine.publishedAt || '-'} </td>
              </tr>
              )}
              </tbody>
    </table>
  </>
  
  
)
}

export default BooksAndMagazines