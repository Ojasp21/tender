"use client";

type Props = {
  categories: any[];
  selected: string;
  onChange: (id: string) => void;
};

export default function CategoryFilter({
  categories,
  selected,
  onChange,
}: Props) {
  return (
    <select
      value={selected}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">All Categories</option>

      {categories.map((cat) => (
        <option key={cat.id} value={cat.id}>
          {cat.name}
        </option>
      ))}
    </select>
  );
}