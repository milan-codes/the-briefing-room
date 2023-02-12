interface TableProps {
  title: string;
  headers: string[];
  data: string[][];
}

const Table: React.FC<TableProps> = ({ title, headers, data }) => (
  <div className="mx-auto max-w-screen-lg px-4 py-8 overflow-x-auto">
    <h1 className="text-3xl font-extrabold mb-8 text-gray-900 dark:text-gray-100">{title}</h1>
    <table className="min-w-full divide-y-2 divide-gray-300 dark:divide-gray-700 text-sm">
      <thead>
        <tr>
          {headers.map((header) => (
            <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900 dark:text-gray-100">
              {header}
            </th>
          ))}
        </tr>
      </thead>

      <tbody className="min-w-full divide-y-2 divide-gray-300 dark:divide-gray-700 text-sm">
        {data.map((row, index) => (
          <tr key={index} className="odd:bg-gray-200 dark:odd:bg-gray-800">
            {row.map((cell) => (
              <td className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900 dark:text-gray-100">
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default Table;
