import React, { useState, useRef, useEffect } from 'react';

const MODEL_IMAGE = 'https://media.base44.com/images/public/6a4623baae30bbc2404dae18/3f09271ea_untitled_Gemini-3-Nano-Banana-Pro_2026-07-07_11-36-46.png';

// onModel: where exactly on the model body this item sits
// top/left as % of model container, width as % of model container width
const ITEMS = [
  {
    id: 1,
    name: 'Organic Cotton Tee',
    price: '$120',
    src: 'https://media.base44.com/images/public/6a4623baae30bbc2404dae18/949acc962_untitled_Gemini-3-Nano-Banana-Pro_2026-07-07_09-12-10.png',
    defaultPos: { side: 'left', index: 0 },
    onModel: { top: '22%', left: '10%', width: '80%' },
  },
  {
    id: 2,
    name: 'Cashmere Blend Sweater',
    price: '$480',
    src: 'https://media.base44.com/images/public/6a4623baae30bbc2404dae18/f6f3d2e55_untitled_Gemini-3-Nano-Banana-Pro_2026-07-07_08-44-36.png',
    defaultPos: { side: 'left', index: 1 },
    onModel: { top: '20%', left: '8%', width: '84%' },
  },
  {
    id: 3,
    name: 'Linen Wide-Leg Trousers',
    price: '$340',
    src: 'https://media.base44.com/images/public/6a4623baae30bbc2404dae18/6be1d38ea_untitled_Gemini-3-Nano-Banana-Pro_2026-07-07_07-57-48.png',
    defaultPos: { side: 'right', index: 0 },
    onModel: { top: '48%', left: '5%', width: '90%' },
  },
  {
    id: 4,
    name: 'Structured Wool Blazer',
    price: '$595',
    src: 'https://media.base44.com/images/public/6a4623baae30bbc2404dae18/918684f28_fashion-store_Gemini-3-Nano-Banana-Pro_2026-07-06_14-36-44.png',
    defaultPos: { side: 'right', index: 1 },
    onModel: { top: '18%', left: '5%', width: '90%' },
  },
];

export default function DepartmentNav() {
  const [dragging, setDragging] = useState(null); // { id, offsetX, offsetY }
  const [positions, setPositions] = useState({}); // { id: { x, y } }
  const [dropped, setDropped] = useState(null); // id of item dropped on model
  const [dragPos, setDragPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const modelRef = useRef(null);

  const handleMouseDown = (e, item) => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    setDragging({
      id: item.id,
      offsetX: e.clientX - rect.left - rect.width / 2,
      offsetY: e.clientY - rect.top - rect.height / 2,
      item,
    });
    setDragPos({ x: e.clientX, y: e.clientY });
  };

  const handleTouchStart = (e, item) => {
    const touch = e.touches[0];
    const rect = e.currentTarget.getBoundingClientRect();
    setDragging({
      id: item.id,
      offsetX: touch.clientX - rect.left - rect.width / 2,
      offsetY: touch.clientY - rect.top - rect.height / 2,
      item,
    });
    setDragPos({ x: touch.clientX, y: touch.clientY });
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!dragging) return;
      setDragPos({ x: e.clientX, y: e.clientY });
    };
    const handleTouchMove = (e) => {
      if (!dragging) return;
      e.preventDefault();
      const touch = e.touches[0];
      setDragPos({ x: touch.clientX, y: touch.clientY });
    };
    const handleMouseUp = (e) => {
      if (!dragging) return;
      checkDrop(e.clientX, e.clientY);
      setDragging(null);
    };
    const handleTouchEnd = (e) => {
      if (!dragging) return;
      const touch = e.changedTouches[0];
      checkDrop(touch.clientX, touch.clientY);
      setDragging(null);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [dragging]);

  const checkDrop = (clientX, clientY) => {
    if (!modelRef.current) return;
    const rect = modelRef.current.getBoundingClientRect();
    const onModel =
      clientX >= rect.left &&
      clientX <= rect.right &&
      clientY >= rect.top &&
      clientY <= rect.bottom;

    if (onModel) {
      setDropped(dragging.id);
    }
  };

  const resetItem = (id) => {
    setDropped((prev) => (prev === id ? null : prev));
  };

  // Slot positions for left/right panels
  const getSlotStyle = (item) => {
    const { side, index } = item.defaultPos;
    return {
      position: 'absolute',
      top: index === 0 ? '8%' : '52%',
      left: side === 'left' ? '4%' : undefined,
      right: side === 'right' ? '4%' : undefined,
    };
  };

  return (
    <section className="oxygen-gap bg-[#FFFDF6]">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-10 md:mb-16">
          <h2 className="section-heading text-obsidian">Style It</h2>
          <p className="technical-text text-obsidian/40">Drag items onto the model</p>
        </div>

        {/* Canvas */}
        <div
          ref={containerRef}
          className="relative w-full mx-auto select-none"
          style={{ height: 760, maxWidth: 1100 }}
        >
          {/* Model in center */}
          <div
            ref={modelRef}
            className="absolute left-1/2 -translate-x-1/2 top-0 h-full flex items-center justify-center z-10"
            style={{ width: 360 }}
          >
            <div className="relative h-full w-full">
              <img
                src={MODEL_IMAGE}
                alt="Model"
                className="h-full w-full object-contain"
                draggable={false}
              />
              {/* Dropped items layered precisely on model body */}
              {ITEMS.map(item => dropped === item.id ? (
                <img
                  key={item.id}
                  src={item.src}
                  alt={item.name}
                  onClick={() => resetItem(item.id)}
                  title="Click to remove"
                  draggable={false}
                  className="absolute cursor-pointer object-contain transition-opacity duration-200 hover:opacity-70"
                  style={{
                    top: item.onModel.top,
                    left: item.onModel.left,
                    width: item.onModel.width,
                    zIndex: 20,
                  }}
                />
              ) : null)}
            </div>
          </div>

          {/* Draggable items — only show if not currently being dragged and not dropped */}
          {ITEMS.map((item) => {
            const isBeingDragged = dragging?.id === item.id;
            const isDropped = dropped === item.id;
            if (isBeingDragged || isDropped) return null;

            return (
              <div
                key={item.id}
                className="absolute z-20 cursor-grab active:cursor-grabbing group"
                style={getSlotStyle(item)}
                onMouseDown={(e) => handleMouseDown(e, item)}
                onTouchStart={(e) => handleTouchStart(e, item)}
              >
                <div className="relative">
                  <img
                    src={item.src}
                    alt={item.name}
                    className="w-40 md:w-52 object-contain transition-transform duration-200 group-hover:scale-105"
                    draggable={false}
                  />
                  <div className="mt-2 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <p className="technical-text text-obsidian/70 text-xs">{item.name}</p>
                    <p className="technical-text text-obsidian/50 text-xs">{item.price}</p>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Ghost image following cursor while dragging */}
          {dragging && (
            <div
              className="fixed z-50 pointer-events-none"
              style={{
                left: dragPos.x - 70,
                top: dragPos.y - 90,
                transform: 'rotate(-4deg)',
              }}
            >
              <img
                src={dragging.item.src}
                alt=""
                className="w-48 object-contain opacity-90 drop-shadow-xl"
                draggable={false}
              />
            </div>
          )}

          {/* Drop hint */}
          {dragging && (
            <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-0 pointer-events-none">
              <div className="w-48 h-64 border border-dashed border-obsidian/20 rounded-none flex items-center justify-center">
                <p className="technical-text text-obsidian/30 text-xs">Drop here</p>
              </div>
            </div>
          )}
        </div>

        {/* Reset hint */}
        {dropped !== null && (
          <p className="technical-text text-obsidian/30 text-center mt-6 text-xs">
            Click the item on the model to remove it
          </p>
        )}
      </div>
    </section>
  );
}
