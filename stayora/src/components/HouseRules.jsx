import { useState } from "react";
import { Clock, Ban, ShieldCheck, FlameKindling, Waves } from "lucide-react";

function Column({ title, children }) {
  return (
    <div>
      <h4 className="font-semibold mb-3">{title}</h4>
      <div className="space-y-2 text-sm text-gray-700">{children}</div>
    </div>
  );
}

export default function HouseRules({ property }) {
  const [expanded, setExpanded] = useState(false);
  const rules = property.houseRules;

  return (
    <div className="border-b border-gray-200 py-8">
      <h3 className="text-xl font-semibold mb-6">Things to know</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
        <Column title="House rules">
          <p className="flex items-center gap-2"><Clock size={16} /> Check-in: {rules.checkIn}</p>
          <p className="flex items-center gap-2"><Clock size={16} /> Checkout: {rules.checkOut}</p>
          {expanded && (
            <>
              <p className="flex items-center gap-2"><Ban size={16} /> {rules.smoking}</p>
              <p className="flex items-center gap-2"><Ban size={16} /> {rules.parties}</p>
              <p className="flex items-center gap-2"><Ban size={16} /> {rules.pets}</p>
            </>
          )}
        </Column>
        <Column title="Safety & property">
          {(expanded ? property.safety : property.safety.slice(0, 1)).map((s, i) => (
            <p key={i} className="flex items-center gap-2">
              {i === 0 ? <FlameKindling size={16} /> : i === 1 ? <ShieldCheck size={16} /> : <Waves size={16} />}
              {s}
            </p>
          ))}
        </Column>
        <Column title="Cancellation policy">
          <p className={expanded ? "" : "line-clamp-2"}>{property.cancellationPolicy}</p>
        </Column>
      </div>
      <button onClick={() => setExpanded((v) => !v)} className="underline font-semibold text-sm mt-6">
        {expanded ? "Show less" : "Show more"}
      </button>
    </div>
  );
}
