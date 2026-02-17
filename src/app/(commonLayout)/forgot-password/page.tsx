import ForgotPasswordForm from "@/components/moduels/auth/ForgotPasswordForm";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic"; // Dynamic SSR

interface ForgotPasswordPageProps {
  searchParams: Promise<{ error?: string }>;
}

const ForgotPasswordPage = async ({
  searchParams,
}: ForgotPasswordPageProps) => {
  const params = await searchParams;
  const error = params.error;

  return (
    <div className="relative h-[92.98vh] flex items-center justify-center bg-gradient-to-br from-[#fcf9ff] via-[#f0e4ff] to-[#d0abfd] p-4">
      <div className="w-full max-w-md">

        {/* Title Section */}
        <div className="text-center">
          <h1 className="text-3xl pb-2.5 font-bold bg-gradient-to-r from-[#974fef] to-[#7640b8] bg-clip-text text-transparent">
            Forgot Password
          </h1>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Enter your email address and we&apos;ll send you a link to reset your password.
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border-gray-200/60 lg:bg-white/50  backdrop-blur-xl p-8 transition-all duration-300 mt-8">
          <div className="flex justify-center gap-2 mb-6">
            <span className="h-1 w-16 bg-gradient-to-r from-[#974fef] to-[#7640b8] rounded-full"></span>
            <span className="h-1 w-16 bg-gradient-to-r from-[#974fef] to-[#7640b8] rounded-full"></span>
          </div>
          {/* Error Alerts */}
          {error === "invalid-link" && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Invalid password reset link. The email or token does not match.
              </AlertDescription>
            </Alert>
          )}
          {error === "expired-link" && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Your password reset link has expired. Please request a new one.
              </AlertDescription>
            </Alert>
          )}

          {/* Forgot Password Form */}
          <ForgotPasswordForm />
          <div className="mt-4 text-center text-sm">
            Remember your password?{" "}
            <Link href="/login" className="text-[#7E44C5] underline hover:underline">
              Back to Login
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
