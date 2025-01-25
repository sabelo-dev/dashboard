"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import PersonalDetailsForm from "@/components/PersonalDetailsForm";
import BrandDetailsForm from "@/components/BrandDetailsForm";
import { Card, CardHeader, CardTitle, CardDescription, CardContent} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function SignupPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: "",
        surname: "",
        contactNumber: "",
        email: "",
        password: "",
        confirmPassword: "",
        brandName: "",
        brandAddress: "",
        estDate: "",
    });
    const [loading, setLoading] = useState(false);

    const handleNext = (newData: any) => {
        setFormData({ ...formData, ...newData });
        setStep(step + 1);
    };

    const handlePrevious = () => {
        setStep(step - 1);
    };

    const handleSubmit = async (finalData: any) => {
        try {
            setLoading(true);
            const response = await fetch("/api/users/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(finalData),
            });

            if (!response.ok) {
                throw new Error("Failed to create account");
            }

            toast.success("Signup successful");
            router.push("/login");
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-8">
            <Card className="flex flex-col mx-auto max-w-lg my-10">
                <div className="flex flex-col items-center py-6">
                    <Image
                        src="/logo.ico"
                        alt="Picture of the author"
                        width={50}
                        height={50}
                    />
                </div>
                <CardHeader>
                    <CardTitle className="text-2xl">{loading ? "Processing" : "Sign Up"}</CardTitle>
                    <CardDescription>Welcome to TRIAD Corp</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="">
                        {step === 1 && (
                            <PersonalDetailsForm data={formData} onNext={handleNext} />
                        )}
                        {step === 2 && (
                            <BrandDetailsForm
                                data={formData}
                                onNext={handleSubmit}
                                onPrevious={handlePrevious}
                            />
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
