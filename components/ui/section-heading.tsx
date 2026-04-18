type SectionHeadingProps = {
  kicker: string;
  title: string;
  description: string;
};

export function SectionHeading({
  kicker,
  title,
  description
}: SectionHeadingProps) {
  return (
    <div className="max-w-3xl" data-reveal>
      <p className="section-kicker">{kicker}</p>
      <h2 className="section-title mt-4">{title}</h2>
      <p className="section-description">{description}</p>
    </div>
  );
}
