import React from 'react';
export default function Home() {
  const data = [
    { id: 1, name: 'John Doe', age: 28 },
    { id: 2, name: 'Jane Smith', age: 34 },
    { id: 3, name: 'Bob Johnson', age: 45 }
  ];
  return (
    <>
      <table className="border-collapse border border-white">
        <thead>
          <th className="border border-white">ID</th>
          <th className="border border-white">Name</th>
          <th className="border border-white">Age</th>
        </thead>
        <tbody>
          {data.map((item) => (
            <React.Fragment key={item.id}>
              <tr>
                <td className="border border-white">{item.id}</td>
                <td className="border border-white">{item.name}</td>
                <td className="border border-white">{item.age}</td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </>
  );
}
