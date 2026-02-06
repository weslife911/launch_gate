
export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm">
      {/* Animated Spinner */}
      <div className="relative h-16 w-16">
        <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
        <div className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></div>
      </div>
      
      {/* Loading Text */}
      <h2 className="mt-4 text-xl font-semibold text-gray-700 animate-pulse">
        Securing LaunchGate...
      </h2>
      <p className="text-sm text-gray-500">Connecting to your workspace</p>
    </div>
  );
}