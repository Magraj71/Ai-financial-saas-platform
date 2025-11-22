import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

// Badge with glassmorphism
const FeaturedBadge = ({ text }: { text: string }) => (
  <span className="absolute top-4 left-4 rounded-full backdrop-blur-md bg-white/30 border border-white/40 text-blue-900 px-3 py-1 text-xs font-semibold shadow-lg">
    {text}
  </span>
);

interface PlanProps {
  title: string;
  price: string;
  description: string;
  features: string[];
  buttonLabel: string;
  accent?: string;
  badge?: string;
  recommended?: boolean;
  priceId: string;
}

const PlanCard = ({
  title,
  price,
  description,
  features,
  buttonLabel,
  accent = "bg-white",
  badge,
  recommended,
  priceId
}: PlanProps) => {
  
  // Call backend to create Stripe checkout session
  const handleSubscribe = async () => {
    const res = await fetch("http://localhost:3000/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ priceId }),
    });

    const data = await res.json();
    window.location.href = data.checkoutUrl;
  };

  return (
    <div
      className={cn(
        "relative rounded-2xl p-7 flex flex-col transition-all duration-300 shadow-lg",
        "w-full mx-auto border border-gray-200/60 hover:shadow-2xl hover:-translate-y-1",
        "md:w-[380px] lg:w-[410px]",
        accent,
        recommended &&
          "border-blue-600 ring-2 ring-blue-400/60 shadow-blue-500/20 shadow-xl"
      )}
    >
      {badge && <FeaturedBadge text={badge} />}
      <h2 className="text-2xl font-semibold mb-1">{title}</h2>
      <p className="text-4xl font-extrabold mb-1 tracking-tight">{price}</p>
      <p className="text-sm text-muted-foreground mb-4">{description}</p>

      <ul className="space-y-2 mb-6">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-start gap-2 text-sm">
            <span className="mt-1 h-2 w-2 rounded-full bg-blue-500/70"></span>
            {feature}
          </li>
        ))}
      </ul>

      <button
        className={cn(
          "mt-auto w-full py-2.5 rounded-md text-white font-medium transition-all shadow-md hover:shadow-lg focus:ring-2 focus:ring-offset-2",
          recommended
            ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
            : accent === "bg-green-50"
            ? "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
            : "bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900"
        )}
        onClick={handleSubscribe}
      >
        {buttonLabel}
      </button>

      {recommended && (
        <p className="text-center text-xs mt-3 text-blue-600 font-medium">
          ⭐ Most Popular
        </p>
      )}
    </div>
  );
};

const Billing = () => {
  return (
    <div className="max-w-6xl mx-auto py-12 px-4 space-y-10">
      <div className="text-center space-y-2">
        <h3 className="text-3xl font-bold">Billing</h3>
        <p className="text-base text-muted-foreground">
          Choose the plan that fits you. Upgrade or downgrade anytime.
        </p>
      </div>

      <Separator className="max-w-md mx-auto" />

      <div className="flex flex-col items-center md:flex-row md:justify-center md:gap-10 gap-8 mt-8">
        
        {/* Premium Monthly */}
        <PlanCard
          title="Premium Monthly"
          price="₹199"
          description="per month"
          features={[
            "Everything in Free",
            "Unlimited categories",
            "Advanced expense analytics",
            "Export to PDF / Excel / CSV",
            "Smart budgeting tools",
            "Monthly spending insights",
            "AI-powered financial recommendations",
            "Multi-device sync",
          ]}
          buttonLabel="Subscribe Monthly"
          accent="bg-gradient-to-br from-blue-50 to-blue-100/60"
          recommended={true}
          badge="Popular"
          priceId="price_1234567890"  // YOUR MONTHLY PRICE ID
        />

        <PlanCard
          title="Premium Yearly"
          price="₹1,999"
          description="Save 15%"
          features={[
            "Everything in Monthly",
            "Priority Customer Support",
            "Advanced goal tracking",
            "Personal finance dashboard",
            "Investment insights",
            "Tax estimation reports",
            "Early access to new features",
          ]}
          buttonLabel="Subscribe Yearly"
          accent="bg-gradient-to-br from-green-50 to-green-100/60"
          badge="Best Value"
          priceId="price_9876543210"  // YOUR YEARLY PRICE ID
        />

      </div>
    </div>
  );
};

export default Billing;
