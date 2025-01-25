export default function UserProfile(params: any){
    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr/>
            <p>Profile <span className="bg-amber-500 text-zinc-950 py-2">{params.id}</span></p>
        </div>
    )
}