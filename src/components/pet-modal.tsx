import { PetData } from "@/lib/types";

const PetModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  pet: PetData | null;
}> = ({ isOpen, onClose, pet }) => {
  if (!isOpen || !pet) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
    >
      <div className=" text-center flex flex-col items-center  bg-white sm:w-[80%] md:w-[70%] lg:w-[50%] p-4 rounded shadow-lg relative">
        {/* <button onClick={onClose} className="absolute top-2 right-2 text-lg">
          ✖
        </button> */}
        <h2 className="text-2xl  font-bold mb-4">{pet.name}</h2>
        <div className="border flex justify-start lg:w-[30%]  px-4 py-2 m-2">
          <p className="text-xl flex justify-evenly w-full m-2">
            <span className="font-semibold text-md text-secondary-foreground">
              Ikä:
            </span>{" "}
            {pet.age ? `${pet.age}v` : "Ei tiedossa"}
          </p>
        </div>
        {/* Lisää muita lemmikin tietoja tähän */}
      </div>
    </div>
  );
};

export default PetModal;
