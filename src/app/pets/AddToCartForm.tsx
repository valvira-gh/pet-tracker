"use client";
import { useState } from "react";
import { useFormState } from "react-dom";
import { addToCart } from "@/lib/actions";
interface AddToCartFormProps {
  itemID: string;
  itemTitle: string;
}

export const AddToCartForm: React.FC<AddToCartFormProps> = ({
  itemID,
  itemTitle,
}) => {
  const [message, formAction] = useFormState(addToCart, null);

  return (
    <form action={formAction}>
      <h2>{itemTitle}</h2>
      <input type="hidden" name="itemID" value={itemID} />
      <button type="submit">Add to Cart</button>
      {message}
    </form>
  );
};
