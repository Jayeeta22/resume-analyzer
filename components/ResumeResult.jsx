export default function ResumeResult({ result }) {
  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-semibold">Match Result</h2>
      <p className="mt-2"><strong>Score:</strong> {result.match_score}</p>
      <p className="mt-2"><strong>Skills Matched:</strong></p>
      <ul className="list-disc ml-6">
        {result.skills_matched.map((skill, idx) => (
          <li key={idx}>{skill}</li>
        ))}
      </ul>
      <p className="mt-2"><strong>Recommendations:</strong></p>
      <ul className="list-disc ml-6">
        {result.recommendations.map((rec, idx) => (
          <li key={idx}>{rec}</li>
        ))}
      </ul>
    </div>
  );
}