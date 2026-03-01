import EditProfileForm from "@/components/forms/profile/editProfileForm"

export default function EditProfilePage() {
  return (
    <div className="container mx-auto py-10 px-4">
        <div className="mb-8 text-center">
            <h2 className="text-sm font-black uppercase tracking-[0.3em] text-[#0052ff]">Settings</h2>
            <p className="text-slate-400 text-xs">Manage your ambassador credentials</p>
        </div>
        <EditProfileForm/>
    </div>
  )
}