import { AddToCartForm } from "./AddToCartForm";

const PetsPage = () => {
  return (
    <section className="flex flex-col items-center">
      <p>Pets Page</p>
      <AddToCartForm itemID="1" itemTitle="How to use React server actions" />
    </section>
  );
};

export default PetsPage;
