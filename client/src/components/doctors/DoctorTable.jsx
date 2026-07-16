export default function DoctorTable({ doctors, onView,onEdit }) {
  return (
    <div className="mt-8 bg-white rounded-2xl shadow overflow-hidden">

      <div className="px-6 py-5 border-b">
        <h2 className="text-xl font-semibold text-gray-800">
          Doctor List
        </h2>
      </div>

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead className="bg-blue-100">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Doctor ID
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Name
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Specialization
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Phone
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>

            {doctors.map((doctor) => (

              <tr
                key={doctor.id}
                className="border-b hover:bg-gray-50 transition"
              >

                <td className="px-6 py-4 font-medium">
                  {doctor.doctorId}
                </td>

                <td className="px-6 py-4">
                  {doctor.name}
                </td>

                <td className="px-6 py-4">
                  {doctor.specialization}
                </td>

                <td className="px-6 py-4">
                  {doctor.phone}
                </td>

                <td className="px-6 py-4">

                  <div className="flex justify-center gap-2">

                    <button
                    onClick={() => onView(doctor)}
                    className="px-3 py-1 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200"
                    >
                        View
                    </button>

                    <button
                        onClick={() => onEdit(doctor)}
                        className="px-3 py-1 rounded-lg bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                    >
                        Edit
                    </button>

                    <button className="px-3 py-1 rounded-lg bg-red-100 text-red-700 hover:bg-red-200">
                      Delete
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}