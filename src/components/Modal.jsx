const Overlay = ({ onClick }) => {
  return (
    <div
      className="w-screen h-screen backdrop-blur-[1px] fixed z-10 inset-0 backdrop-brightness-[.8]"
      onClick={onClick}
    />
  );
};
const Backdrop = ({ title, content, onClick }) => {
  return (
    <div className="w-2/5 bg-white fixed z-20 flex flex-col top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
      <header className="bg-main p-2 text-white font-bold text-3xl">
        {title}
      </header>
      <p className="font-semibold text-xl p-4">{content}</p>
      <button
        onClick={onClick}
        className="bg-main w-20 h-8 self-end font-semibold text-white rounded-sm mr-4 mb-4">
        Ok
      </button>
    </div>
  );
};

const Modal = ({ title, content, onClick }) => {
  return (
    <>
      <Overlay onClick={onClick} />
      <Backdrop
        title={title}
        content={content}
        onClick={onClick}
      />
    </>
  );
};
export default Modal;
