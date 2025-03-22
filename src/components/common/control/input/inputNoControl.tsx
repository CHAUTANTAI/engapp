interface InputNoControlProps {
  newClassName?: string;
  additionalClassName?: string;
  type: "search" | "text";
}
export const InputNoControl: React.FC<InputNoControlProps> = ({}) => {
  return (
    <div className="input-no-control-wrp">
      <input className="inc" type="search" placeholder="Search all fields" />
      <i className="pi pi-search text-[var(--color-primary-light)] inc-search-icon" />
    </div>
  );
};
