import React, { useEffect } from 'react'
import './index.css'
function Authors() {
  
  const [authors, setAuthors] = React.useState([])
  const [emailSearch, setEmailSearch] = React.useState('')
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
    <form action="/newauthor" method="POST">
        <label for="email">Email: 
            <input type="email" name="email"/>
        </label>
        <label for="firstname">First Name: 
            <input type="text" name="firstname"/>
        </label>
        <label for="lastname">Last Name: 
            <input type="text" name="lastname"/>
        </label>
        <input class="btn" type="submit" value="Submit"/>
    </form>
    <input type="text" value={emailSearch} onChange={(e) => {
        setEmailSearch(e.target.value)
    }} placeholder="Search by ISBN" />

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
          authors.filter((m) => m.email.includes(emailSearch)).map(author=> (<>
          <tr>
          <td style={{fontSize: "0.9rem",textAlign : 'left'}}>{author.firstname || '-'}</td>
          <td style={{fontSize: "0.9rem",textAlign : 'left'}}>{author['lastname\r'] || '-'}</td>
          <td style={{fontSize: "0.9rem",textAlign : 'left'}}>{author.email || '-'}</td>
        </tr>
        </>)
        )
      }
      </tbody>      
    </table>
    
    <button class="btn" onClick={() => func('authors')}>Download {0}</button>
  </>
  )
}

export default Authors