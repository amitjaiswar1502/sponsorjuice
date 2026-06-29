import { useState } from 'preact/hooks';
import { DELIVERABLES } from '../../data/calculator-math';
import type { DeliverableId } from '../../lib/types';

interface Props {
  basket: DeliverableId[];
  onAdd: (id: DeliverableId) => void;
  onRemove: (id: DeliverableId) => void;
}

const DELIVERABLE_LIST = Object.entries(DELIVERABLES) as [
  DeliverableId,
  { label: string; weight: number },
][];

export default function DeliverablesBasket({ basket, onAdd, onRemove }: Props) {
  const [draggedId, setDraggedId] = useState<DeliverableId | null>(null);

  const handleDragStart = (id: DeliverableId) => {
    setDraggedId(id);
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    if (draggedId && !basket.includes(draggedId)) {
      onAdd(draggedId);
    }
    setDraggedId(null);
  };

  return (
    <div class="space-y-4">
      <h3 class="text-lg font-semibold text-gray-900">Deliverables</h3>
      <p class="text-sm text-gray-500">Click or drag items into your package basket.</p>

      <div class="flex flex-wrap gap-2">
        {DELIVERABLE_LIST.map(([id, { label, weight }]) => {
          const inBasket = basket.includes(id);
          return (
            <button
              key={id}
              type="button"
              draggable
              onDragStart={() => handleDragStart(id)}
              onClick={() => (inBasket ? onRemove(id) : onAdd(id))}
              class={`cursor-grab rounded-lg border px-3 py-2 text-sm font-medium transition-colors active:cursor-grabbing ${
                inBasket
                  ? 'border-juice-300 bg-juice-50 text-juice-700'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-juice-300 hover:bg-juice-50'
              }`}
            >
              {label}
              <span class="ml-1 text-xs text-gray-500">({weight}x)</span>
            </button>
          );
        })}
      </div>

      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        class={`min-h-[80px] rounded-xl border-2 border-dashed p-4 transition-colors ${
          basket.length > 0
            ? 'border-juice-300 bg-juice-50/50'
            : 'border-gray-200 bg-gray-50'
        }`}
      >
        <p class="mb-2 text-xs font-medium uppercase tracking-wide text-gray-500">
          Package Basket
        </p>
        {basket.length === 0 ? (
          <p class="text-sm text-gray-500">Drop deliverables here or click to add</p>
        ) : (
          <div class="flex flex-wrap gap-2">
            {basket.map((id) => (
              <span
                key={id}
                class="inline-flex items-center gap-1 rounded-full bg-juice-600 px-3 py-1 text-sm text-white"
              >
                {DELIVERABLES[id].label}
                <button
                  type="button"
                  onClick={() => onRemove(id)}
                  class="ml-1 text-juice-200 hover:text-white"
                  aria-label={`Remove ${DELIVERABLES[id].label}`}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
