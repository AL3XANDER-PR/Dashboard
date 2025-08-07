// src/modules/auth/pages/LoginPage.tsx
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/lib/supabase";
import { Link } from "react-router-dom";

// import SendLogo from "send-logo.png";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2Icon, MoveLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const loginSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function ForgotPassword({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [send, setSend] = useState<boolean>(false);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
      redirectTo: `${window.location.origin}/update-password`,
    });

    if (!error) return setSend(!send);
  };

  return (
    <>
      {send ? (
        <div className={cn("flex flex-col gap-6", className)}>
          <Link
            to="/login"
            className="text-sm text-muted-foreground flex items-center gap-2 hover:text-accent-foreground"
          >
            <MoveLeft size={20} /> Back to Login
          </Link>
          <div className="flex justify-center items-center ">
            <img src="send-logo.png" alt="" width={90} />
          </div>
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-2xl font-bold">Check your email</h1>
            <p className="text-muted-foreground text-sm text-balance">
              We sent a password reset link to your email. Please check your
              inbox.
            </p>
          </div>
        </div>
      ) : (
        <Form {...form}>
          <form
            autoComplete="off"
            onSubmit={form.handleSubmit(onSubmit)}
            className={cn("flex flex-col gap-6", className)}
            {...props}
          >
            <Link
              to="/login"
              className="text-sm text-muted-foreground flex items-center gap-2 hover:text-accent-foreground"
            >
              <MoveLeft size={20} /> Back to Login
            </Link>
            <div className="flex flex-col items-center gap-2 text-center">
              <h1 className="text-2xl font-bold">Forgot Password</h1>
              <p className="text-muted-foreground text-sm text-balance">
                No worries! Enter your email address below, and we'll send you a
                link to reset your password.
              </p>
            </div>
            <div className="grid gap-6">
              <div className="grid gap-3">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your email address"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting && (
                  <Loader2Icon className="animate-spin" />
                )}
                Submit
              </Button>
            </div>
          </form>
        </Form>
      )}
    </>
  );
}
