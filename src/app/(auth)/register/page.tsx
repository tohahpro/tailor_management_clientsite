import Image from "next/image";
import TailorRegister from "@/assets/images/register.jpg";
import { RegisterForm } from "@/components/moduels/auth/RegisterForm";
import BrandLogo from "@/components/shared/BrandLogo";


const RegisterPage = () => {

    return (
        <>
            <div className="relative min-h-svh grid grid-cols-1 lg:grid-cols-2">

                {/* ✅ Background Image (Small & Medium) */}
                <div className="absolute inset-0 -z-10 lg:hidden">
                    <Image
                        src={TailorRegister}
                        alt="Background"
                        fill
                        priority
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60" /> {/* overlay */}
                </div>

                {/* ✅ Left Side Image (Large Device) */}
                <div className="relative hidden bg-muted lg:block">
                    <Image
                        src={TailorRegister}
                        alt="Side Image"
                        fill
                        priority
                        className="object-cover dark:brightness-[0.8]"
                    />
                </div>

                {/* ✅ Right Side Content */}
                <div className="flex flex-col gap-4 p-6 md:p-10 bg-white/30 lg:bg-background backdrop-blur-xs">
                    <div className="flex justify-center gap-2 md:justify-start">
                        <BrandLogo/>
                    </div>

                    <div className="flex flex-1 items-center justify-center">
                        <div className="w-full max-w-xl lg:max-w-full">
                            <RegisterForm />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RegisterPage;