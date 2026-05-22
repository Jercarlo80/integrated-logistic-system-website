import React from 'react';

interface CardInformasiProps {
  mode?: 'simple' | 'detail';
  icon?: string;
  label?: string;
  value?: number;
  suffix?: string;
  leftIcon?: string;
  leftLabel?: string;
  leftValue?: number;
  rightIcon?: string;
  rightLabel?: string;
  rightValue?: number;
  totalLabel?: string;
  totalIcon?: string;
  valueSuffix?: string;
}

const CardInformasi: React.FC<CardInformasiProps> = ({
  mode = 'simple',
  icon,
  label,
  value,
  suffix = '',
  leftIcon,
  leftLabel,
  leftValue,
  rightIcon,
  rightLabel,
  rightValue,
  totalLabel,
  totalIcon,
  valueSuffix = '',
}) => {
  if (mode === 'detail') {
    return (
      <div className="bg-linear-to-r from-slate-950 via-slate-900 to-slate-900 rounded-lg p-4 shadow-md">
        <div className="flex justify-between items-start gap-4">
          {/* Left block */}
          <div className="flex-1">
            <div className="text-2xl mb-1">{leftIcon}</div>
            <div className="text-sm text-gray-400">{leftLabel}</div>
            <div className="text-xl font-semibold text-gray-100">
              {leftValue?.toLocaleString()}{valueSuffix}
            </div>
          </div>
          {/* Right block */}
          <div className="flex-1">
            <div className="text-2xl mb-1">{rightIcon}</div>
            <div className="text-sm text-gray-400">{rightLabel}</div>
            <div className="text-xl font-semibold text-gray-100">
              {rightValue?.toLocaleString()}{valueSuffix}
            </div>
          </div>
        </div>
        {/* Total row */}
        <div className="mt-3 pt-3 border-t border-gray-700 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-lg">{totalIcon}</span>
            <span className="text-sm text-gray-300">{totalLabel}</span>
          </div>
          <div className="text-lg font-bold text-gray-100">
            {((leftValue || 0) + (rightValue || 0)).toLocaleString()}{valueSuffix}
          </div>
        </div>
      </div>
    );
  }

  // Simple mode
  return (
    <div className="bg-linear-to-r from-slate-950 via-slate-900 to-slate-900 rounded-lg p-4 shadow-md">
      <div className="text-3xl mb-2">{icon}</div>
      <div className="text-sm text-gray-400">{label}</div>
      <div className="text-2xl font-bold text-gray-100">
        {value?.toLocaleString()}{suffix}
      </div>
    </div>
  );
};

export default CardInformasi;