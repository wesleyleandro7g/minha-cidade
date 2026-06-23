import type { Metadata } from "next";
import { requireTenant } from "@/lib/tenant/get-tenant";
import { getActivePromotions } from "@/features/promotions/queries";
import { SectionHeading } from "@/components/section-heading";
import { PromotionCard } from "@/components/promotion-card";
import { CouponCard } from "@/features/promotions/components/coupon-card";

export const revalidate = 600;

export const metadata: Metadata = {
  title: "Promoções e cupons",
  description: "As melhores promoções e cupons de desconto da sua cidade.",
};

type Params = { params: Promise<{ city: string }> };

export default async function PromotionsPage({ params }: Params) {
  const { city } = await params;
  const tenant = await requireTenant(city);
  const promotions = await getActivePromotions(tenant.id);
  const coupons = promotions.filter((p) => p.couponCode);

  return (
    <div className="container py-8">
      <SectionHeading
        title="Promoções da cidade"
        subtitle={`${promotions.length} ofertas ativas em ${tenant.name}`}
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {promotions.map((promotion) => (
          <PromotionCard
            key={promotion.id}
            promotion={promotion}
            citySlug={tenant.slug}
          />
        ))}
      </div>

      {coupons.length > 0 && (
        <div className="mt-12">
          <SectionHeading title="Cupons de desconto" subtitle="Copie e use" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {coupons.map((promotion) => (
              <CouponCard key={promotion.id} promotion={promotion} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
