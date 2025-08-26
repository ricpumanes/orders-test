import { useForm } from "react-hook-form";
import { useRef } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./Dialog";
import { useCreateOrder } from "../hooks/useSummary";
import { useQueryClient } from "@tanstack/react-query";

type FormData = {
  productName: string;
  quantity: number;
  price: number;
};

type OrderFormProps = {
  queryKeyDeps: (string | number)[];
};

export default function OrderForm({ queryKeyDeps }: OrderFormProps) {
  const queryClient = useQueryClient();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const { mutate, isPending } = useCreateOrder();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      productName: "",
      quantity: 1,
      price: 0,
    },
  });

  const onSubmit = (data: FormData) => {
    mutate(
      {
        product: data.productName,
        qty: data.quantity,
        price: data.price,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: queryKeyDeps });
          queryClient.invalidateQueries({ queryKey: ["summary"] });
          closeButtonRef.current?.click();
        },
      }
    );
  };

  return (
    <Dialog>
      <DialogTrigger className="bg-gray-500 text-white px-4 py-2 rounded mb-4">
        + Create Order
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Order</DialogTitle>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <input
              type="text"
              placeholder="Product Name"
              className="border border-gray-500 p-2"
              {...register("productName", { required: true })}
            />
            <input
              type="number"
              placeholder="Quantity"
              className="border border-gray-500 p-2"
              {...register("quantity", { valueAsNumber: true })}
            />
            <input
              type="number"
              placeholder="Price"
              className="border border-gray-500 p-2"
              {...register("price", { valueAsNumber: true })}
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
              disabled={isPending}
            >
              Create Order
            </button>
          </form>
        </DialogHeader>
        <DialogClose ref={closeButtonRef} className="hidden" />
      </DialogContent>
    </Dialog>
  );
}
