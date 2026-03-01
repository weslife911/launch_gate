

function HubsUsernameLoading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <div className="h-12 w-12 border-4 border-[#0052ff]/20 border-t-[#0052ff] rounded-full animate-spin" />
        <p className="mt-4 text-slate-500 font-bold animate-pulse uppercase tracking-widest text-xs">
          Verifying Invitation...
        </p>
      </div>
  )
}

export default HubsUsernameLoading
