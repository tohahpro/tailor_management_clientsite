"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import { useActionState, useEffect, useState } from "react";
import { PasswordInput } from "./PasswordInput";
import { PasswordStrength } from "./PasswordStrength";
import { toast } from "sonner";
import Link from "next/link";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SocialButtons } from "./SocialButtons";
import { registerTailor } from "@/services/auth/registerTailor";


export function RegisterForm() {

    const [state, formAction, isPending] = useActionState(registerTailor, null);
    const [password, setPassword] = useState("");
    const [comfirmPassword, setcomfirmPassword] = useState("");

    const getFieldError = (fieldName: string) => {
        if (state?.errors) {
            const error = state.errors.find((err: any) => err.field === fieldName);
            return error?.message ?? null;
        }
        return null;
    };

    useEffect(() => {
        if (!state) return;
        if (state.success) {
            toast.success(state.message || "Account created successfully!");
        }
        if (state && !state.success && state.message) {
            toast.error(state.message);
        }
    }, [state]);

    return (
        <div className="mx-auto w-full space-y-4 bg-black/60 lg:bg-transparent backdrop-blur-2xl 
                rounded-2xl p-6 sm:p-8 border-white/20 shadow-2xl lg:shadow-none">

            {/* Header */}
            <div className="space-y-2 text-center">
                <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold tracking-tight bg-gradient-to-r from-[#974fef] to-[#7640b8] bg-clip-text text-transparent inline-block "
                    style={{ WebkitBackgroundClip: "text" }}>
                    Create an account
                </h1>
                <p className="text-white/70 lg:text-black/70 text-sm">
                    Start managing your tailoring business today
                </p>
            </div>

            <form action={formAction} className="space-y-2.5 max-w-xl mx-auto">

                <div className="gap-4 space-t-2 md:grid grid-cols-2">
                    {/* Name */}
                    <Field className="">
                        <FieldLabel className="text-white/80 lg:text-black lg:text-black">
                            Full Name
                        </FieldLabel>
                        <Input
                            name="name"
                            placeholder="John Doe"
                            className="h-11 rounded-lg bg-white/10 border border-white/10 lg:border-[#393737]/10
                               text-white lg:text-black placeholder:text-white/40 lg:placeholder:text-black/40
                               focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
                        />
                        {getFieldError("name") && (
                            <FieldDescription className="text-rose-400 text-xs">
                                {getFieldError("name")}
                            </FieldDescription>
                        )}
                    </Field>

                    {/* Email */}
                    <Field className="">
                        <FieldLabel className="text-white/80 lg:text-black">
                            Email
                        </FieldLabel>
                        <Input
                            name="email"
                            type="email"
                            placeholder="m@example.com"
                            className="h-11 rounded-lg bg-white/10 border border-white/10 lg:border-[#393737]/10
                               text-white lg:text-black placeholder:text-white/40 lg:placeholder:text-black/40
                               focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
                        />
                        {getFieldError("email") && (
                            <FieldDescription className="text-rose-400 text-xs">
                                {getFieldError("email")}
                            </FieldDescription>
                        )}
                    </Field>

                    {/* contactNumber */}
                    <Field className="">
                        <FieldLabel className="text-white/80 lg:text-black lg:text-black">
                            Contact Number
                        </FieldLabel>
                        <Input
                            name="contactNumber"                            
                            placeholder="+880******"
                            className="h-11 rounded-lg bg-white/10 border border-white/10 lg:border-[#393737]/10
                               text-white lg:text-black placeholder:text-white/40 lg:placeholder:text-black/40
                               focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
                        />
                        {getFieldError("contactNumber") && (
                            <FieldDescription className="text-rose-400 text-xs">
                                {getFieldError("contactNumber")}
                            </FieldDescription>
                        )}
                    </Field>

                    {/* store Name */}
                    <Field className="">
                        <FieldLabel className="text-white/80 lg:text-black/50 lg:text-black">
                            Store Name
                        </FieldLabel>
                        <Input
                            name="storeName"
                            placeholder="example @store"
                            className="h-11 rounded-lg bg-white/10 border border-white/10 lg:border-[#393737]/10
                               text-white lg:text-black placeholder:text-white/40 lg:placeholder:text-black/40
                               focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
                        />
                        {getFieldError("storeName") && (
                            <FieldDescription className="text-rose-400 text-xs">
                                {getFieldError("storeName")}
                            </FieldDescription>
                        )}
                    </Field>

                    {/* Password */}
                    <Field className="">
                        <FieldLabel className="text-white/80 lg:text-black">
                            Password
                        </FieldLabel>
                        <PasswordInput
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="********"
                            className="h-11 rounded-lg bg-white/10 border border-white/20 lg:border-[#393737]/10
                               text-white lg:text-black placeholder:text-white/40 lg:placeholder:text-black/40
                               focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
                        />

                        {getFieldError("password") && (
                            <FieldDescription className="text-rose-400 text-xs">
                                {getFieldError("password")}
                            </FieldDescription>
                        )}
                    </Field>

                    {/* Confirm Password */}
                    <Field className="">
                        <FieldLabel className="text-white/80 lg:text-black">
                            Confirm Password
                        </FieldLabel>
                        <PasswordInput
                            name="confirmPassword"
                            value={comfirmPassword}
                            onChange={(e) => setcomfirmPassword(e.target.value)}
                            placeholder="********"
                            className="h-11 rounded-lg bg-white/10 border border-white/20 lg:border-[#393737]/10
                               text-white lg:text-black placeholder:text-white/40 lg:placeholder:text-black/40
                               focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
                        />
                        {getFieldError("confirmPassword") && (
                            <FieldDescription className="text-rose-400 text-xs">
                                {getFieldError("confirmPassword")}
                            </FieldDescription>
                        )}
                    </Field>
                </div>
                    <PasswordStrength password={password} />

                {/* Submit Button */}
                <Button
                    type="submit"
                    disabled={isPending}
                    className="w-full h-11 rounded-lg cursor-pointer
                       bg-gradient-to-r from-[#974fef] to-[#7640b8] hover:text-white/70
                       hover:from-[#974fef] hover:to-[#7640b8] hover:shadow-xl
                       text-white font-semibold transition-all duration-200 shadow-lg active:scale-[0.98]"
                >
                    {isPending ? "Creating..." : "Create Account"}
                </Button>
            </form>

            {/* Footer */}
            <div className="max-w-xl mx-auto space-y-2">
                {/* Divider */}
                <div className="flex items-center gap-1">
                    <div className="flex-1 h-px bg-white/20 lg:bg-black/20"></div>
                    <span className="text-sm text-white/60 lg:text-black/50 px-2">
                        Continue with
                    </span>
                    <div className="flex-1 h-px bg-white/20 lg:bg-black/20"></div>
                </div>
                <SocialButtons />
                <div className="text-center text-sm text-white/70 lg:text-black/60">
                    Already have an account?{" "}
                    <Link
                        href='/login'
                        className="text-[#b480f7] lg:text-[#904be2]/90 underline hover:text-indigo-300 font-medium"
                    >
                        Sign in
                    </Link>
                </div>
            </div>

        </div>


    );
}
