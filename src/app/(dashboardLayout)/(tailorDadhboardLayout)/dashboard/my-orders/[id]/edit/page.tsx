
import OrderEditForm from "@/components/moduels/Tailors/OrderManagement/OrderEditForm";
import { getAllCategories } from "@/services/tailors/category.service";
import { getOrderById } from "@/services/tailors/order.service";

interface Params {
  params: { id: string };
}

export default async function EditOrderPage({ params }: Params) {
  
  const { id } = await params; 
  const order = await getOrderById(id);
  const categories = await getAllCategories();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">✏️ Edit Order</h2>
      <OrderEditForm
        order={order.data}
        categories={categories}
      />
    </div>
  );
}