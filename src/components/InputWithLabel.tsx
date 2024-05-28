function InputWithLabel({ label, placeholder, form, error }: any) {
  return (
    <div className="flex relative text-black grid-cols-2  w-80">
      <div className="text-black  w-20">{label}</div>
      <input className="text-black w-40" placeholder={placeholder} {...form} />
      <span className="absolute right-0 bottom-0 text-red-500  text-[10px]">
        {error?.message}
      </span>
    </div>
  );
}
export default InputWithLabel;
