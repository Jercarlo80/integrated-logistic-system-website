export default function Layer() {
  return (
    <div className="w-full min-h-screen bg-[#020617] text-slate-100 p-4 md:p-6">
      {/* Background gelap (opsional) */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.12),transparent_28%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.12),transparent_24%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:48px_48px]" />
      </div>

      <h1 className="text-xl md:text-2xl font-bold text-gray-100 mb-6">
        Pengaturan
      </h1>
    </div>
  );
}
