import React, { useEffect, useState } from 'react'

function BooksAndMagazines() {


      const [BooksAndMagazines, setBooksAndMagazines] = useState([])
    const fetchBooksAndMagzines = async () => {
        const response = await fetch(`${window.location.origin}/books`)
        const data = await response.json()
        setBooksAndMagazines([...BooksAndMagazines],[...data?.data])
        const response2 = await fetch(`${window.location.origin}/magzines`)
        const data2 = await response2.json()
        setBooksAndMagazines([...BooksAndMagazines],[...data2?.data])
    }
    useEffect(()=>{
      fetchBooksAndMagzines();
    })    
    
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


  return (<>
    <h1 style={{textAlign: "center"}}>You can Add Magazine in csv file and download it</h1>
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
        <label for="publishedAt">Published-At: 
            <input type="text" name="publishedAt"/>
        </label>
        <input class="btn" type="submit" value="Submit"/>
    </form>
    <table>
        <tr><th>Title</th><th>Authors</th><th>ISBN</th><th>Published-At</th></tr>
        <tr>
        {BooksAndMagazines.forEach(magazine=>{<>
                <td>{magazine.title} </td>
                <td>{magazine.authors} </td>
                <td>{magazine.isbn} </td>
                <td>{magazine.publishedAt} </td>
        </>
              }
              )}
              </tr>
    </table>
    <button class="btn" onClick={() => func('magazines')}  >Download {0} </button>
  
  </>
  
  
)
}

export default BooksAndMagazines