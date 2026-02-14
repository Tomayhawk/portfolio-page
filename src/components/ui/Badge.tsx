import { getTagColor } from '@/utils/data/helpers';

interface BadgeProps {
    text: string;
    className?: string;
}

export const Badge = ({ text, className = "" }: BadgeProps) => (
    <span className={`px-2 py-1 rounded text-xs font-bold ${getTagColor(text)} ${className}`}>{text}</span>
);
