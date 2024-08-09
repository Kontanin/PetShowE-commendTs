interface PriceTagProps {
  price: number;
  className?: string;
}
// sdfadsf

export default function PriceTag({ price, className }: PriceTagProps) {
  return <span className={`badge ${className}`}>{price}</span>;
}
