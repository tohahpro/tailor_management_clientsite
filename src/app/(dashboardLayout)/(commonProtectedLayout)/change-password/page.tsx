import ChangePasswordForm from "@/components/moduels/auth/ChangePasswordForm";

export const dynamic = "force-dynamic"; // Dynamic SSR - authenticated page

const ChangePasswordPage = () => {
    return (
        <div className="relative h-[100vh] flex items-center justify-center bg-gradient-to-br from-[#fcf9ff] via-[#f0e4ff] to-[#d0abfd]">

            {/* Card Wrapper */}
            <div className="w-full max-w-2xl">

                {/* Title Section */}
                <div className="text-center">
                    <h1 className="text-3xl pb-2.5 font-bold bg-gradient-to-r from-[#974fef] to-[#7640b8] bg-clip-text text-transparent">
                        Change Password
                    </h1>
                    <p className="text-sm text-muted-foreground max-w-md mx-auto">
                        Update your password to keep your account secure.
                        Make sure your new password is strong and unique.
                    </p>
                </div>

                {/* Card */}
                <div className="rounded-2xl border-gray-200/60 lg:bg-white/50  backdrop-blur-xl p-8 transition-all duration-300 mt-8">

                    {/* Decorative top bar */}
                    <div className="flex justify-center gap-2">
                        <span className="h-1 w-16 bg-gradient-to-r from-[#974fef] to-[#7640b8] rounded-full mb-6"></span>
                        <span className="h-1 w-16 bg-gradient-to-r from-[#974fef] to-[#7640b8] rounded-full mb-6"></span>
                    </div>
                    <ChangePasswordForm />
                </div>
            </div>
        </div>
    );
};

export default ChangePasswordPage;