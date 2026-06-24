type Props = {
  tag: string;
};

const tagStyles: Record<string, string> = {
  V: "bg-green-100 text-green-700",
  GF: "bg-blue-100 text-blue-700",
  spicy: "bg-red-100 text-red-700",
};

export default function Tag({ tag }: Props) {
  return (
    <span
      className={`rounded-full px-2 py-1 text-xs font-medium ${
        tagStyles[tag] || "bg-gray-100 text-gray-700"
      }`}
    >
      {tag}
    </span>
  );
}
