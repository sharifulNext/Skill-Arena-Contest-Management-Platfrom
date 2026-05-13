"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: any) => console.log("Login Data:", data);

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white text-slate-900 font-sans">
      
      {/* --- Left Side: Branding (Consistent White/Soft Gray Look) --- */}
      <div className="hidden lg:flex flex-col justify-between p-16 bg-slate-50 border-r border-slate-100">
        <Link href="/" className="flex items-center gap-2 font-black text-2xl tracking-tighter text-slate-900">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold">S</div>
          SkillArena
        </Link>

        <div>
          <h2 className="text-5xl md:text-6xl font-black mb-6 leading-tight tracking-tighter text-slate-900">
            Welcome <br /> 
            <span className="text-primary italic">Back, Champ.</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-sm leading-relaxed">
            Log in to continue your progress, join active contests, and stay ahead in the rankings.
          </p>
        </div>

        <div className="text-slate-400 text-xs font-bold uppercase tracking-[0.3em]">
          Secure Access Protocol
        </div>
      </div>

      {/* --- Right Side: Login Form --- */}
      <div className="flex flex-col justify-center items-center p-8 md:p-16 bg-white">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md space-y-8"
        >
          <div className="text-center lg:text-left">
            <h1 className="text-3xl font-black tracking-tight mb-2 text-slate-900">Log In</h1>
            <p className="text-slate-500">
              Don't have an account? <Link href="/register" className="text-primary font-bold hover:underline transition-all">Sign up</Link>
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
              <input 
                {...register("email")}
                type="email"
                placeholder="name@university.edu" 
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-5 outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all placeholder:text-slate-400 text-sm text-slate-900"
              />
              {errors.email && <p className="text-red-500 text-[10px] ml-2">{errors.email.message as string}</p>}
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center px-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Password</label>
                <Link href="#" className="text-[10px] font-bold text-primary hover:underline">Forgot password?</Link>
              </div>
              <input 
                {...register("password")}
                type="password"
                placeholder="••••••••" 
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-5 outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all placeholder:text-slate-400 text-sm text-slate-900"
              />
              {errors.password && <p className="text-red-500 text-[10px] ml-2">{errors.password.message as string}</p>}
            </div>

            <Button className="w-full py-7 rounded-2xl font-black text-lg bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/20 active:scale-[0.98] transition-all">
              LOG IN
            </Button>
          </form>

          {/* Social Login Section */}
          <div className="space-y-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-100"></span>
              </div>
              <div className="relative flex justify-center text-[10px] uppercase tracking-[0.2em] font-black">
                <span className="bg-white px-4 text-slate-400">Or continue with</span>
              </div>
            </div>

            <button 
              type="button"
              className="w-full flex items-center justify-center gap-3 bg-white border border-slate-200 text-slate-900 font-bold py-4 rounded-2xl hover:bg-slate-50 transition-all active:scale-[0.98] shadow-sm"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.47 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Login with Google
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}