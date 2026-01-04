import { memo } from "react";

const TitleHeader = memo(({ title, sub }) => {
  return (
    <div className="showcase-badge">
            <span className="badge-dot"></span>
            <span>{title}</span>
    </div>
  );
});

export default TitleHeader;
