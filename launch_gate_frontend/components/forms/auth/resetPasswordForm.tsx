"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import { KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const resetSchema = Yup.object().shape({
  password: Yup.string().min(8, "Too short").required("Required"),
  confirmPassword: Yup.string().oneOf([Yup.ref("password")], "Passwords must match").required("Required"),
});

export default function ResetPasswordForm() {
  const formik = useFormik({
    initialValues: { password: "", confirmPassword: "" },
    validationSchema: resetSchema,
    onSubmit: (values) => alert("Password successfully reset!"),
  });

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <Card className="w-full max-w-md border-slate-200 shadow-xl">
        <CardHeader className="text-center">
          <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-2">
            <KeyRound className="w-7 h-7 text-[#0052ff]" />
          </div>
          <CardTitle className="text-2xl font-bold">Reset Password</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div className="space-y-2 text-sm">
              <Label>New Password</Label>
              <Input {...formik.getFieldProps("password")} type="password" placeholder="••••••••" className="h-11" />
              {formik.touched.password && formik.errors.password && <p className="text-red-500">{formik.errors.password}</p>}
            </div>
            <div className="space-y-2 text-sm">
              <Label>Confirm Password</Label>
              <Input {...formik.getFieldProps("confirmPassword")} type="password" placeholder="••••••••" className="h-11" />
              {formik.touched.confirmPassword && formik.errors.confirmPassword && <p className="text-red-500">{formik.errors.confirmPassword}</p>}
            </div>
            <Button type="submit" className="w-full h-11 bg-[#0052ff]">Update Password</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}