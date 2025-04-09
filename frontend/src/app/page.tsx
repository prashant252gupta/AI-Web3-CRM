export default function Home() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Welcome to AI Web3 CRM</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2">Total Contacts</h2>
          <p className="text-3xl font-bold text-blue-600">124</p>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2">Active Deals</h2>
          <p className="text-3xl font-bold text-green-600">37</p>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2">Open Conversations</h2>
          <p className="text-3xl font-bold text-yellow-600">9</p>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2">AI Tasks</h2>
          <p className="text-3xl font-bold text-purple-600">5 pending</p>
        </div>
      </div>
    </div>
  )
}
