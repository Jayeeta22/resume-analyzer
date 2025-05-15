export default function JobInput({ value, onChange }) {
  return (
    <textarea
      placeholder="Paste the job description here..."
      className="w-full p-4 border border-gray-300 rounded h-40"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    ></textarea>
  );
}
