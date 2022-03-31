import axios from 'axios'
import React, { useEffect } from 'react'
import './index.css'
function Authors() {
  
  const [authors, setAuthors] = React.useState([])
  const [emailSearch, setEmailSearch] = React.useState('')
  const [added,setAdded]=React.useState(null)
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
      email:form.get('email'),
      firstname:form.get('firstname'),
      lastname:form.get('lastname')
    }
    axios.post('http://localhost:3001/newauthor',formData)
    .then(()=>{
      setAdded(<h1>Author added, can download csv file!</h1>)
    })
    .catch(()=>{
      setAdded(<h1>Unable to add Author!</h1>)
    })
  }

const fetchAuthors = async () => {
  const response = await fetch(`${window.location.origin}/authors`)
  const data = await response.json()
  setAuthors(data?.data)
}
useEffect(()=>{
  fetchAuthors();
  console.log(authors)
},[])    

  return (<>
      <h1 style={{textAlign: "center"}}>You can Add Author in csv file and download it</h1>
    <form onSubmit={(e)=>{handleSubmit(e)}} >
        <label htmlFor="email">Email: 
            <input type="email" name="email"/>
        </label>
        <label htmlFor="firstname">First Name: 
            <input type="text" name="firstname"/>
        </label>
        <label htmlFor="lastname">Last Name: 
            <input type="text" name="lastname"/>
        </label>
        <input className="btn" type="submit" value="Submit"/>
    </form>
    <input type="text" value={emailSearch} onChange={(e) => {
        setEmailSearch(e.target.value)
    }} placeholder="Search by email" />

    <table style={{
        margin: '5rem 0',
        padding:'1rem 1rem',
        overflowX: 'scroll',
        width : "100vw",
    }}>
      <thead>

      <tr><th style={{fontSize: '1.3 rem',textAlign: 'left',}}>First Name</th><th style={{fontSize: '1.3 rem',textAlign: 'left',}}>Last Name</th><th style={{fontSize: '1.3 rem',textAlign: 'left',}}>Email</th></tr>

      </thead>

      <tbody>
        {
          authors.filter((m) => m.email.includes(emailSearch)).map(author=> (
          <tr key={Math.floor(Math.random()*1000000)}>
          <td style={{fontSize: "0.9rem",textAlign : 'left'}}>{author.firstname || '-'}</td>
          <td style={{fontSize: "0.9rem",textAlign : 'left'}}>{author.lastname || '-'}</td>
          <td style={{fontSize: "0.9rem",textAlign : 'left'}}>{author.email || '-'}</td>
        </tr>
        )
        )
      }
      </tbody>      
    </table>
    
    <button className="btn" onClick={() => func('authors')}>Download {0}</button>
  </>
  )
}

export default Authors