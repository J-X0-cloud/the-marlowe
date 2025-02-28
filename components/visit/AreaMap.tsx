const blocks: [number, number, number, number][] = [
  [20, 20, 140, 95],
  [190, 20, 130, 95],
  [350, 20, 150, 95],
  [20, 155, 140, 80],
  [350, 155, 150, 80],
  [20, 275, 140, 85],
  [190, 275, 130, 85],
  [350, 275, 150, 85],
];

const trees: [number, number, number][] = [
  [60, 315, 16],
  [92, 330, 12],
  [420, 60, 14],
  [450, 80, 10],
];

/** Illustrated neighborhood map; an inline SVG instead of a third-party embed. */
export function AreaMap() {
  return (
    <svg
      className="map"
      viewBox="0 0 520 380"
      role="img"
      aria-label="Illustrated map showing The Marlowe on Alameda Row, one block south of University Avenue in North Park"
    >
      <rect width="520" height="380" fill="#efe5d4" />
      <g fill="#e4d6bf">
        {blocks.map(([x, y, w, h]) => (
          <rect key={`${x}-${y}`} x={x} y={y} width={w} height={h} rx="4" />
        ))}
      </g>
      <rect x="190" y="155" width="130" height="80" rx="4" fill="#d9c7a6" />
      <g fill="#fff">
        <rect x="0" y="125" width="520" height="22" />
        <rect x="0" y="243" width="520" height="24" />
        <rect x="168" y="0" width="14" height="380" />
        <rect x="328" y="0" width="14" height="380" />
      </g>
      <rect x="0" y="125" width="520" height="22" fill="#c19a5b" opacity=".35" />
      <g fontFamily="Jost, sans-serif" fontSize="11" letterSpacing="2" fill="#5b4a3c">
        <text x="26" y="140">UNIVERSITY AVE</text>
        <text x="370" y="140">UNIVERSITY AVE</text>
        <text x="26" y="259">ALAMEDA ROW</text>
        <text x="360" y="259">ALAMEDA ROW</text>
        <text x="-110" y="178" transform="rotate(-90)">30TH ST</text>
        <text x="-340" y="338" transform="rotate(-90)">PARK BLVD</text>
      </g>
      <g fill="#6b8f6a" opacity=".55">
        {trees.map(([cx, cy, r]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} />
        ))}
      </g>
      <g transform="translate(255 196)">
        <circle r="34" fill="#6e1f2a" opacity=".15" />
        <path d="M0 22c-10-14-16-22-16-31a16 16 0 0 1 32 0c0 9-6 17-16 31z" fill="#6e1f2a" />
        <circle cy="-9" r="6" fill="#f4ede1" />
      </g>
      <text x="255" y="232" textAnchor="middle" fontFamily="Bodoni Moda, serif" fontSize="15" fill="#2a1418">
        The Marlowe
      </text>
    </svg>
  );
}
