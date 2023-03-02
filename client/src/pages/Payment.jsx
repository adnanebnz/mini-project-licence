import axios from "axios"
import { useEffect } from "react"
import {create_payment} from "chargily-epay-react-js"

const Payment = () => {
useEffect(()=>{
    const pay = async()=>{
        const res = await axios.post("http://epay.chargily.com.dz/api/invoice",{headers: {
            "Accept" : "application/json",
            "X-Authorization" : "api_LwXx9pU7cDIU3XROo9LwRipdFCRW5TtnExAcEJMVqbLakableY3a6AHkzSrbPubT"
          }})
    }
},[])
const handleClick = async()=>{

    const invoice = {
      "amount":600,
      "invoice_number":23,
      "client":"Ahmed malek", // add a text field to allow the user to enter his name, or get it from a context api (depends on the project architecture)
      "mode":"CIB",
      "webhook_url":"https://your_beeceptor_url.free.beeceptor.com", // here is the webhook url, use beecptor to easly see the post request and it's body, you will use this in backened to save and validate the transactions.
      "back_url":"https://www.youtube.com/", // to where the user will be redirected after he finish/cancel the payement 
      "discount" :0
  }
    try {
      await create_payement(invoice)
    } catch (error) {
      // handle your error here 
      console.log(error)
    }
  }
  return (
    <div>

    </div>
  )
}

export default Payment