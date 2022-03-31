import React, { useEffect, useState } from 'react'
import './index.css'
import axios from 'axios'
function Magazines() {
    const [magazines, setMagazines] = useState([])
    const [isbnSearch,setIsbnSearch] = useState('')
    const [added,setAdded]=useState(null)
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

const handleSubmit=(e)=>{
    e.preventDefault()
    const form=new FormData(e.target)
    let formData={
      title:form.get('title'),
      authors:form.get('authors'),
      isbn:form.get('isbn'),
      publishedAt:form.get('publishedAt')
    }
    axios.post('http://localhost:3001/newmagazine',formData)
    .then(()=>{
      setAdded(<h1>Magazine added, can download csv file!</h1>)
    })
    .catch((err)=>{
      setAdded(<h1>Unable to add Magazine!</h1>)
    })
  }


  return (<>
    <h1 style={{textAlign: "center"}}>You can Add Magazine in csv file and download it</h1>
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
        <label htmlFor="publishedAt">Published-At: 
            <input type="text" name="publishedAt"/>
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

        <tr><th style={{fontSize: '1.3 rem',textAlign: 'left',}}>Title</th><th style={{fontSize: '1.3 rem',textAlign: 'left',}}>Authors</th><th style={{fontSize: '1.3 rem',textAlign: 'left',}}>ISBN</th><th style={{fontSize: '1.3 rem',textAlign: 'left',}}>Published-At</th></tr>
        </thead>
<tbody>
     
        {magazines.filter((m) => (m.isbn.includes(isbnSearch)||m.authors.includes(isbnSearch))).map(magazine=>
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
                 style={{fontSize: "0.9rem",textAlign : magazine.publishedAt?'left':'center'}}
                
                >{magazine.publishedAt || '-'} </td>
              </tr>      
              )}
              </tbody>
    </table>
    <button className="btn" onClick={() => func('magazines')}  >Download magazines.csv </button>
  
  </>
  
  
)
}

export default Magazines