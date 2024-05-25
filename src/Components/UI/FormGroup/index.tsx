// Form Group component consisting of a label, input, and handlers.
const FormGroup = ({
  name,
  label,
  placeholder,
  value,
  handleChange,
  type,
}: {
  name: string;
  label: string;
  placeholder: string;
  value: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}) => {
  return (
    <div className="w-full  flex flex-col px-2">
      <label className="text-lg font-semibold my-1">{label}</label>
      <input
        name={name}
        placeholder={placeholder}
        className="px-2 py-2 border rounded-sm"
        type={type ? type : 'text'}
        onChange={handleChange}
        value={value}
      />
    </div>
  );
};

export default FormGroup;
