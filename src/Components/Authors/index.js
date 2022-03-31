import React, { useEffect } from 'react'
import './index.css'
function Authors() {
  
  const [authors, setAuthors] = React.useState([])

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
  const response = await fetch(`${window.location.origin}/books`)
  const data = await response.json()
  setAuthors(data?.data)
}
useEffect(()=>{
  fetchAuthors();
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
    <table>
        <tr><th>First Name</th><th>Last Name</th><th>Email</th></tr>
          <tr>
        {
        authors.forEach(author=> (<>
        
                <td>{author.firstname}</td>
                <td>{author.lastname}</td>
                <td>{author.email}</td>
                </>)
        )
      }
        
        </tr>
    </table>
    
    <button class="btn" onClick={() => func('authors')}>Download {0}</button>
  </>
  )
}

export default Authors