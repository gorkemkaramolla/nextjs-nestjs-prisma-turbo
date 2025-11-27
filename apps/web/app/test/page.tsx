import { Button } from '@repo/ui';
import { FunnelChart } from '@/components/charts/funnel-chart';
import type { FunnelChartProps } from '@/components/charts/funnel-chart';

const funnelSteps: FunnelChartProps['steps'] = [
  {
    id: 'giris',
    label: 'Ziyaretçiler',
    value: 12000,
    colorClassName: 'text-blue-500',
  },
  {
    id: 'urun',
    label: 'Ürün Görüntüleme',
    value: 8200,
    colorClassName: 'text-indigo-500',
  },
  {
    id: 'sepet',
    label: 'Sepete Ekleme',
    value: 4100,
    colorClassName: 'text-violet-500',
  },
  {
    id: 'satis',
    label: 'Satın Alma',
    value: 1900,
    colorClassName: 'text-purple-500',
  },
];

export default function UiShowcasePage() {
  return (
    <div className="space-y-10">
      <div className="w-64">
        <Button variant="success" text="Merhaba" title="Merhaba" />
      </div>
      <div className="rounded-xl border border-border-default bg-bg-default p-6 shadow-sm">
        <p className="text-sm text-content-muted">
          Satış hunisi performans örneği
        </p>
        <div className="mt-4 h-80">
          <FunnelChart steps={funnelSteps} defaultTooltipStepId="giris" />
        </div>
      </div>
    </div>
  );
}
