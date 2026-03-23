
import OrderEditForm from "@/components/moduels/Tailors/OrderManagement/OrderEditForm";
import PageBackground from "@/components/shared/PageBackgroundColor";
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

    <PageBackground className="p-6 bg-linear-to-br from-[#fcf9ff] via-[#f0e4ff] to-[#d0abfd]">
      <OrderEditForm
        order={order.data}
        categories={categories}
      />
    </PageBackground>

  );
}