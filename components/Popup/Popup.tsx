import Modal from "./Modal";

type Props = {
  children: React.ReactNode;
  onClose: () => void;
};

export default function Popup({ onClose, children }: Props) {
  return (
    <Modal>
      <section
        className="fixed top-0 left-0 flex flex-col justify-center items-center w-full h-full z-50 bg-neutral-900/70"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
      >
        <div className=" relative">
          <button
            className=" top-[-20px] right-[-20px] p-8 text-black absolute"
            onClick={() => onClose()}
          >
            X
          </button>
          <article className="p-[50px] bg-white rounded-xl">{children}</article>
        </div>
      </section>
    </Modal>
  );
}
