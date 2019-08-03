const weatherForm=document.querySelector('form')
const messageOne=document.getElementById("msg-1")
const messageTwo=document.getElementById("msg-2")

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const search=document.getElementById("loc").value

    messageOne.textContent='Loading....'
    messageTwo.textContent=' '
    
    fetch('/weather?address='+search).then((response)=>{
    response.json().then((data)=>{
        if(data.error)
        {
            messageOne.textContent=data.error
        }
        else{
            messageOne.textContent=data.location
            messageTwo.textContent=data.forecast
        }
    })

})

})