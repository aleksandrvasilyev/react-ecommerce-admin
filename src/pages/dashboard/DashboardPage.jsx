const DashboardPage = () => {
  return (
    <>
      <header className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Overview</h2>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Add Product
        </button>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card */}
        <div className="bg-white p-4 shadow rounded-md">
          <h3 className="text-lg font-medium mb-2">Total Sales</h3>
          <p className="text-2xl font-bold">$15,230</p>
        </div>
        <div className="bg-white p-4 shadow rounded-md">
          <h3 className="text-lg font-medium mb-2">Orders</h3>
          <p className="text-2xl font-bold">120</p>
        </div>
        <div className="bg-white p-4 shadow rounded-md">
          <h3 className="text-lg font-medium mb-2">Customers</h3>
          <p className="text-2xl font-bold">89</p>
        </div>
      </section>

      <section className="mt-6">
        <h3 className="text-xl font-medium mb-4">Recent Orders</h3>
        <div className="overflow-auto">
          <table className="w-full bg-white shadow rounded-md">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left px-4 py-2">Order ID</th>
                <th className="text-left px-4 py-2">Customer</th>
                <th className="text-left px-4 py-2">Total</th>
                <th className="text-left px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="px-4 py-2">#1001</td>
                <td className="px-4 py-2">John Doe</td>
                <td className="px-4 py-2">$250</td>
                <td className="px-4 py-2">Completed</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">#1002</td>
                <td className="px-4 py-2">Jane Smith</td>
                <td className="px-4 py-2">$300</td>
                <td className="px-4 py-2">Pending</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default DashboardPage;
