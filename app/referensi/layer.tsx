import BukuReferensi from "../component/bukureferensi";

export default function Layer() {
  return (
    <div className="w-full min-h-screen bg-gray-950 p-4 md:p-6">
      <h1 className="text-xl md:text-2xl font-bold text-gray-100 mb-6">
        Referensi
      </h1>
      <BukuReferensi />
    </div>
  );
}