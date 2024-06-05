function InputWithLabel({ label, placeholder, form, error }: any) {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        placeholder={placeholder}
        {...form}
      />
      {error && <p className="text-red-500 text-xs italic">{error.message}</p>}
    </div>
  );
}

export default InputWithLabel;



