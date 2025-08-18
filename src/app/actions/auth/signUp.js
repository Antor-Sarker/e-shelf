"use server"

import { redirect } from "next/navigation"

export default async function signUp(formData) {
    
    
    const res = await fetch(`${process.env.BASE_URL}/api/auth/signUp`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify(formData)
    })

    if(res.status===201){
        redirect("/auth/login")
    }
    else{
        return "info"
    }

}