'use client';

import { Fragment, useMemo, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { curveBasis } from '@visx/curve';
import { ParentSize } from '@visx/responsive';
import { scaleLinear } from '@visx/scale';
import { Area } from '@visx/shape';
import { Text } from '@visx/text';
import { cn } from '@repo/utils';
import { useMediaQuery } from '@/hooks/use-media-query';

interface FunnelChartStep {
  readonly id: string;
  readonly label: string;
  readonly value: number;
  readonly additionalValue?: number;
  readonly colorClassName: string;
}

export interface FunnelChartProps {
  readonly steps: FunnelChartStep[];
  readonly persistentPercentages?: boolean;
  readonly tooltips?: boolean;
  readonly defaultTooltipStepId?: string;
  readonly chartPadding?: number;
}

interface LayerConfig {
  readonly opacity: number;
  readonly padding: number;
}

const layers: LayerConfig[] = [
  { opacity: 1, padding: 0 },
  { opacity: 0.3, padding: 8 },
  { opacity: 0.15, padding: 16 },
];

const maxLayerPadding = 16;

interface InterpolatedPoint {
  readonly x: number;
  readonly y: number;
}

interface FunnelChartInnerProps extends FunnelChartProps {
  readonly width: number;
  readonly height: number;
}

/**
 * Responsive funnel visualization with motion powered transitions.
 */
export function FunnelChart(props: FunnelChartProps): JSX.Element {
  return (
    <div className="size-full">
      <ParentSize className="relative">
        {({ width, height }) =>
          width > 0 && height > 0 ? (
            <FunnelChartInner {...props} width={width} height={height} />
          ) : null
        }
      </ParentSize>
    </div>
  );
}

function FunnelChartInner({
  width,
  height,
  steps,
  persistentPercentages = true,
  tooltips = true,
  defaultTooltipStepId,
  chartPadding = 40,
}: FunnelChartInnerProps): JSX.Element {
  const { isMobile } = useMediaQuery();
  const [tooltip, setTooltip] = useState<string | null>(
    defaultTooltipStepId ?? null
  );
  const tooltipStep = steps.find(({ id }) => id === tooltip);
  const data = useMemo<Record<string, InterpolatedPoint[]>>(() => {
    return Object.fromEntries(
      steps.map(({ id, value }, idx) => [
        id,
        createInterpolatedPoints(
          value,
          steps[idx + 1]?.value ?? steps[steps.length - 1]?.value ?? value
        ),
      ])
    );
  }, [steps]);
  const zeroData = useMemo<InterpolatedPoint[]>(
    () => createInterpolatedPoints(0, 0),
    []
  );
  const maxValue = useMemo<number>(
    () => Math.max(...steps.map((step) => step.value)),
    [steps]
  );
  const xScale = scaleLinear({
    domain: [0, steps.length],
    range: [0, width],
  });
  const yScale = scaleLinear({
    domain: [maxValue, -maxValue],
    range: [
      height - maxLayerPadding - chartPadding,
      maxLayerPadding + chartPadding,
    ],
  });
  return (
    <div className="relative">
      <svg width={width} height={height}>
        {steps.map(({ id, value, colorClassName }, idx) => {
          const stepCenterX = (xScale(idx) + xScale(idx + 1)) / 2;
          return (
            <Fragment key={id}>
              {tooltips && (
                <rect
                  x={xScale(idx)}
                  y={0}
                  width={width / steps.length}
                  height={height}
                  className="fill-transparent transition-colors hover:fill-blue-600/5"
                  onPointerEnter={() => setTooltip(id)}
                  onPointerDown={() => setTooltip(id)}
                  onPointerLeave={() => {
                    if (!isMobile) {
                      setTooltip(defaultTooltipStepId ?? null);
                    }
                  }}
                />
              )}
              <line
                x1={xScale(idx)}
                y1={0}
                x2={xScale(idx)}
                y2={height}
                className="stroke-black/5 sm:stroke-black/10"
              />
              {layers.map(({ opacity, padding }) => (
                <Area
                  key={`${id}-${opacity}-${padding}`}
                  data={data[id]}
                  curve={curveBasis}
                  x={(point) => xScale(idx + point.x)}
                  y0={(point) => yScale(-point.y) - padding}
                  y1={(point) => yScale(point.y) + padding}
                >
                  {({ path }) => (
                    <motion.path
                      initial={{ d: path(zeroData) ?? '', opacity: 0 }}
                      animate={{ d: path(data[id]) ?? '', opacity }}
                      className={cn(colorClassName, 'pointer-events-none')}
                      fill="currentColor"
                    />
                  )}
                </Area>
              ))}
              {persistentPercentages && (
                <PersistentPercentage
                  x={stepCenterX}
                  y={height / 2}
                  value={`${formatPercentageValue((value / maxValue) * 100)}%`}
                  colorClassName={colorClassName}
                />
              )}
            </Fragment>
          );
        })}
      </svg>
      {tooltipStep && (
        <div
          key={tooltipStep.id}
          className={cn(
            'pointer-events-none absolute flex items-center justify-center px-1 pb-4',
            persistentPercentages
              ? 'animate-slide-up-fade top-16 sm:top-12'
              : 'animate-fade-in top-1/2 -translate-y-1/2'
          )}
          style={{
            left: xScale(steps.findIndex(({ id }) => id === tooltipStep.id)),
            width: width / steps.length,
          }}
        >
          <div className="rounded-lg border border-neutral-200 bg-white text-base shadow-sm">
            <p className="border-b border-neutral-200 px-3 py-2 text-sm text-neutral-900 sm:px-4 sm:py-3">
              {tooltipStep.label}
            </p>
            <div className="flex flex-wrap justify-between gap-x-4 gap-y-2 px-3 py-2 text-sm sm:px-4 sm:py-3">
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    tooltipStep.colorClassName,
                    'h-2 w-2 shrink-0 rounded-sm bg-current opacity-50 shadow-[inset_0_0_0_1px_#0003]'
                  )}
                />
                <p className="whitespace-nowrap capitalize text-neutral-600">
                  {`${formatPercentageValue((tooltipStep.value / maxValue) * 100)}%`}
                </p>
              </div>
              <p className="whitespace-nowrap font-medium text-neutral-900">
                {tooltipStep.value.toLocaleString('tr-TR')}
                {tooltipStep.additionalValue !== undefined && (
                  <span className="text-neutral-500">{` ${tooltipStep.additionalValue.toLocaleString('tr-TR')}`}</span>
                )}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

interface PersistentPercentageProps {
  readonly x: number;
  readonly y: number;
  readonly value: string;
  readonly colorClassName: string;
}

function PersistentPercentage({
  x,
  y,
  value,
  colorClassName,
}: PersistentPercentageProps): JSX.Element {
  const textRef = useRef<SVGTextElement>(null);
  const textWidth = textRef.current?.getComputedTextLength() ?? 0;
  const pillWidth = textWidth + 28;
  return (
    <g>
      <rect
        x={x - pillWidth / 2}
        width={pillWidth}
        y={y - 14}
        height={28}
        rx={14}
        fill="white"
      />
      <Text
        innerTextRef={textRef}
        x={x}
        y={y}
        textAnchor="middle"
        verticalAnchor="middle"
        fill="currentColor"
        fontSize={14}
        className={cn(
          'pointer-events-none select-none font-medium brightness-50',
          colorClassName
        )}
      >
        {value}
      </Text>
    </g>
  );
}

function formatPercentageValue(value: number): string {
  if (value > 0 && value < 0.01) {
    return '< 0.01';
  }
  return value.toLocaleString('tr-TR', { maximumFractionDigits: 2 });
}

function createInterpolatedPoints(
  from: number,
  to: number
): InterpolatedPoint[] {
  return [
    { x: 0, y: from },
    { x: 0.3, y: from },
    { x: 0.5, y: (from + to) / 2 },
    { x: 0.7, y: to },
    { x: 1, y: to },
  ];
}
