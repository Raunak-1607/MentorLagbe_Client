export const checkoutVerify = async(sessionId : string)=>{

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payments`, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
        },
        body: JSON.stringify({sessionId})
    })
    return res.json();
}