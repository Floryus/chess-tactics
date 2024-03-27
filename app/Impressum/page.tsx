export default function Impressum() {
  return (
    <div className="h-screen">
      <table className="border border-gray-300 m-10" style={{ width: "500px", height: "300px" }}>
        <thead>
          <tr>
            <th className="border border-gray-300">Category</th>
            <th className="border border-gray-300">Information</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-300">About</td>
            <td className="border border-gray-300">Chess Tactics is a student project</td>
          </tr>
          <tr>
            <td className="border border-gray-300">Contact</td>
            <td className="border border-gray-300">email@example.com</td>
          </tr>
          <tr>
            <td className="border border-gray-300">People</td>
            <td className="border border-gray-300">Alex, Flo, Alex, Marten</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
