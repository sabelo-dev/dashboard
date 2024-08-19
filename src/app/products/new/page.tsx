import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function NewProduct(){
    return(
        <Layout>
            <Card>
                <CardContent>
                <div className="grid gap-4">
                    <div className="grid gap-2 py-2">
                        <Label>New Product</Label>
                        <Input
                            className="p-2 rounded-lg mb-4 focus:outline-none"
                            id="productname"
                            type="text"
                            value="product name"
                            placeholder="username"
                        />
                        <Textarea
                            placeholder="Description"
                        />
                    </div>
                </div>
                </CardContent>
            </Card>
        </Layout>
    )
}