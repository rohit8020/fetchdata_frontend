import React, { useEffect, useState } from 'react'
import './index.css'

function Magazines() {
    const [magazines, setMagazines] = useState([])
    const [isbnSearch,setIsbnSearch] = useState('')
    const fetchMagzines = async () => {
        const response = await fetch(`${window.location.origin}/magazines`)
        const data = await response.json()
        setMagazines(data?.data)
    }
    useEffect(()=>{
        fetchMagzines();
    },[])    
    
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

        <tr><th style={{fontSize: '1.3 rem',textAlign: 'left',}}>Title</th><th style={{fontSize: '1.3 rem',textAlign: 'left',}}>Authors</th><th style={{fontSize: '1.3 rem',textAlign: 'left',}}>ISBN</th><th style={{fontSize: '1.3 rem',textAlign: 'left',}}>Published-At</th></tr>
        </thead>
<tbody>
     
        {magazines.filter((m) => m.isbn.includes(isbnSearch)).map(magazine=><>
        <tr>
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
                 style={{fontSize: "0.9rem",textAlign : magazine.publishedAt?'left':'center'}}
                
                >{magazine?.publishedAt || '-'} </td>
              </tr>
        </>
              
              )}
              </tbody>
    </table>
    <button class="btn" onClick={() => func('magazines')}  >Download {0} </button>
  
  </>
  
  
)
}

export default Magazines