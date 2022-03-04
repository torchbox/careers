import styles from './Select.module.scss';

type SelectProps = {
    label: string;
    value: string;
    options: string[];
    handleChange: (event: React.FormEvent) => void;
    className?: string;
};

export const Select = ({
    label,
    value,
    options,
    handleChange,
    className,
}: SelectProps) => {
    const optionList = options.map((option: string, index: number) => (
        <option key={index}>{option}</option>
    ));
    return (
        <select
            aria-label={label}
            value={value}
            onChange={handleChange}
            className={[styles.button, className].join(' ')}
        >
            {optionList}
        </select>
    );
};

export default Select;
