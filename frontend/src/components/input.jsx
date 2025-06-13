export default function Input({ id, label, placeholder, type = "text", icon, value, onChange }) {
  return (
    <div className="w-full">
      <label htmlFor={id} className="block mb-2 text-md font-medium text-black">{label}</label>
      <div className="relative flex items-center">
        <span className="absolute left-0 inline-flex items-center px-3 text-sm text-black bg-gray-200 border rounded-s-md border-gray-300 h-full">
          {icon}
        </span>
        <input
          type={type}
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="bg-gray-50 border border-gray-300 text-black text-sm rounded-md block w-full ps-12 p-2.5"
        />
      </div>
    </div>
  );
}
