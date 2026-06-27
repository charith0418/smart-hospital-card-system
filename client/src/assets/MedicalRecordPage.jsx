export default function MedicalRecordPage() {
  const patient = {
    name: "John Doe",
    patientId: "PT-102345",
    age: 29,
    gender: "Male",
    bloodType: "O+",
    dob: "March 12, 1996",
    phone: "+1 234 567 890",
    email: "john@email.com",
    address: "123 Main Street, New York",
    emergencyContact: "Jane Doe - +1 987 654 321",
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Medical File */}
        <div className="lg:col-span-2 space-y-6">

          {/* Profile */}
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center gap-5">
              <img
                src="https://i.pravatar.cc/120"
                alt="Patient"
                className="w-24 h-24 rounded-full"
              />

              <div>
                <h1 className="text-2xl font-bold">{patient.name}</h1>
                <p className="text-gray-500">
                  Patient ID: {patient.patientId}
                </p>
                <div className="flex gap-4 mt-2 text-sm text-gray-600">
                  <span>Age: {patient.age}</span>
                  <span>Gender: {patient.gender}</span>
                  <span>Blood: {patient.bloodType}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-semibold mb-4">
              Personal Information
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              <Info title="Date of Birth" value={patient.dob} />
              <Info title="Phone" value={patient.phone} />
              <Info title="Email" value={patient.email} />
              <Info title="Address" value={patient.address} />
              <Info
                title="Emergency Contact"
                value={patient.emergencyContact}
              />
            </div>
          </div>

          {/* Medical History */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-semibold mb-4">
              Medical History
            </h2>

            <ul className="space-y-3">
              <li className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-semibold">Asthma</h3>
                <p className="text-gray-500 text-sm">
                  Diagnosed in 2018. Controlled with inhaler.
                </p>
              </li>

              <li className="border-l-4 border-green-500 pl-4">
                <h3 className="font-semibold">Appendectomy</h3>
                <p className="text-gray-500 text-sm">
                  Surgery completed in 2020.
                </p>
              </li>
            </ul>
          </div>

          {/* Allergies */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-semibold mb-4">
              Allergies
            </h2>

            <div className="flex gap-3 flex-wrap">
              <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full">
                Penicillin
              </span>

              <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">
                Peanuts
              </span>
            </div>
          </div>

          {/* Medications */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-semibold mb-4">
              Current Medications
            </h2>

            <table className="w-full">
              <thead>
                <tr className="text-left border-b">
                  <th className="py-2">Medicine</th>
                  <th>Dosage</th>
                  <th>Frequency</th>
                </tr>
              </thead>

              <tbody>
                <tr className="border-b">
                  <td className="py-3">Albuterol</td>
                  <td>2 Puffs</td>
                  <td>As Needed</td>
                </tr>

                <tr>
                  <td className="py-3">Vitamin D</td>
                  <td>1000 IU</td>
                  <td>Daily</td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>

        {/* Digital Medical Card */}
        <div>

          <div className="sticky top-8">
            <div className="rounded-3xl bg-gradient-to-br from-blue-700 via-blue-600 to-cyan-500 text-white p-6 shadow-2xl">

              <div className="flex justify-between items-center">
                <h2 className="font-bold text-lg">
                  Digital Medical Card
                </h2>

                <div className="w-12 h-12 rounded-full bg-white/20"></div>
              </div>

              <div className="mt-8 flex items-center gap-4">

                <img
                  src="https://i.pravatar.cc/80"
                  alt=""
                  className="w-16 h-16 rounded-full border-2 border-white"
                />

                <div>
                  <h3 className="text-xl font-semibold">
                    {patient.name}
                  </h3>

                  <p className="text-blue-100">
                    {patient.patientId}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-8 text-sm">

                <div>
                  <p className="text-blue-200">Blood Type</p>
                  <p className="font-semibold">
                    {patient.bloodType}
                  </p>
                </div>

                <div>
                  <p className="text-blue-200">Gender</p>
                  <p className="font-semibold">
                    {patient.gender}
                  </p>
                </div>

                <div>
                  <p className="text-blue-200">DOB</p>
                  <p className="font-semibold">
                    {patient.dob}
                  </p>
                </div>

                <div>
                  <p className="text-blue-200">Status</p>
                  <p className="font-semibold text-green-300">
                    Active
                  </p>
                </div>

              </div>

              <div className="mt-8">
                <div className="bg-white p-3 rounded-lg inline-block">
                  <img
                    src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=PT-102345"
                    alt="QR"
                  />
                </div>

                <p className="text-xs mt-3 text-blue-100">
                  Scan to verify patient identity
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

function Info({ title, value }) {
  return (
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}