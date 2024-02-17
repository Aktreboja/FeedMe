
import { NextRequest, NextResponse } from "next/server"

// Gets the search results of the 
export async function GET(request: Request) {

    try {
        const { searchParams } = new URL(request.url)
        const term = searchParams.get('term')
        const location = searchParams.get('location')
        console.log(term)
    
        const options = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + process.env.YELP_API_KEY
            }
        }

        const res = await fetch(process.env.YELP_API_ENDPOINT + `/businesses/search?location=${location}&term=${term}&limit=10`, options)
        const product = await res.json()
        // return Response.json({ product })
        return Response.json(product.businesses)
    } catch (e) {
        console.error("Error searching: ", e)
    }

  }



export async function POST() {
    const res = await fetch('https://data.mongodb-api.com/...', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'API-Key': process.env.DATA_API_KEY!,
      },
      body: JSON.stringify({ time: new Date().toISOString() }),
    })
   
    const data = await res.json()
   
    return Response.json(data)
  }