import Layout from "@/components/Layout";
import dbConnect from "@/lib/mongodb";

export default function Dashboard(){   
    dbConnect();
    
    return(
        <Layout> 
            <div className="flex bg-gray-300 gap-1 text-black rounded-lg overflow-hidden">
                <span>
                    Welcome to ABZU, {}
                </span>
            </div>
        </Layout>
    )
}