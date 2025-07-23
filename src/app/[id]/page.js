export default async function details({params}){

    const {id} = await params 
    return(<>
        <h1>details{id}</h1>
    </>)
}