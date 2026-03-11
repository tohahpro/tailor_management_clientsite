import OrderEdit from "@/components/moduels/Tailors/OrderManagement/OrderEdit";
import { getOrderById } from "@/services/tailors/order.service";

interface Params {
  params: { id: string };
}

export default async function EditOrder({ params }: Params) {
  const order = await getOrderById(params.id);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Order</h1>
      <OrderEdit/>
    </div>
  );
}