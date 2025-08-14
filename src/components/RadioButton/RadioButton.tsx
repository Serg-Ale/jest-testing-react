interface RadioButtonProps {
	label: string;
	value: string;
	onChange: (value: string) => void;
}

const RadioButton = ({ label, value, onChange }: RadioButtonProps) => {
	return (
		<div className='flex items-center gap-2 w-full'>
			<input type='radio' value={value} onChange={() => onChange(value)} />
			<label className='text-xl text-[#090129]'>{label}</label>
		</div>
	);
};

export default RadioButton;
