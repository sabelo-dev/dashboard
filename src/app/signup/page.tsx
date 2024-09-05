"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import PersonalDetailsForm from "@/components/PersonalDetailsForm";
import BrandDetailsForm from "@/components/BrandDetailsForm";

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
        <>
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
        </>
    );
}